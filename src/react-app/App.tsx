import { useState, useCallback, useMemo } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { useFavorites } from './hooks/useFavorites';
import { SearchBar } from './components/SearchBar';
import { Gallery } from './components/Gallery';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Heart, ImageIcon } from 'lucide-react';

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // useCallback for search handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // useMemo to calculate filtered photos list
  const filteredPhotos = useMemo(() => {
    let result = photos;

    // Filter by search query (author name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((photo) =>
        photo.author.toLowerCase().includes(query)
      );
    }

    // Filter by favorites if toggle is on
    if (showFavoritesOnly) {
      result = result.filter((photo) => isFavorite(photo.id));
    }

    return result;
  }, [photos, searchQuery, showFavoritesOnly, isFavorite]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                Photo Gallery
              </h1>
            </div>
            
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                         transition-all duration-200 ${
                           showFavoritesOnly
                             ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                             : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                         }`}
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
              <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 
                              text-xs font-semibold rounded-full bg-white/20">
                {favorites.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />

        {/* Stats */}
        {!loading && !error && (
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-500">
            <span>
              <strong className="text-slate-700">{filteredPhotos.length}</strong> photos
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {showFavoritesOnly && (
              <span className="text-rose-500">
                Showing favorites only
              </span>
            )}
          </div>
        )}

        {/* Content States */}
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={() => window.location.reload()} 
          />
        )}

        {!loading && !error && (
          <Gallery
            photos={filteredPhotos}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-400 text-sm">
            Photos provided by <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" 
                                  className="text-rose-500 hover:underline">Picsum</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
