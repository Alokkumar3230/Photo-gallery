import { useReducer, useEffect } from 'react';

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: string[] };

interface FavoritesState {
  favorites: string[];
}

const STORAGE_KEY = 'photo-gallery-favorites';

function getInitialFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.includes(action.payload)) {
        return state;
      }
      return { favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FAVORITE':
      return { favorites: state.favorites.filter((id) => id !== action.payload) };

    case 'TOGGLE_FAVORITE':
      if (state.favorites.includes(action.payload)) {
        return { favorites: state.favorites.filter((id) => id !== action.payload) };
      }
      return { favorites: [...state.favorites, action.payload] };

    case 'LOAD_FAVORITES':
      return { favorites: action.payload };

    default:
      return state;
  }
}

export function useFavorites() {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: getInitialFavorites(),
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [state.favorites]);

  const toggleFavorite = (photoId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  };

  const isFavorite = (photoId: string): boolean => {
    return state.favorites.includes(photoId);
  };

  return {
    favorites: state.favorites,
    toggleFavorite,
    isFavorite,
  };
}
