import { Heart } from 'lucide-react';
import type { Photo } from '../hooks/useFetchPhotos';

interface PhotoCardProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function PhotoCard({ photo, isFavorite, onToggleFavorite }: PhotoCardProps) {
  // Use Picsum's resize URL for optimized images
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">
            {photo.author}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Photo #{photo.id}
          </p>
        </div>
        
        <button
          onClick={onToggleFavorite}
          className={`ml-3 p-2.5 rounded-full transition-all duration-200 
                     ${isFavorite 
                       ? 'bg-rose-100 text-rose-500 hover:bg-rose-200' 
                       : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-rose-500'
                     }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`h-5 w-5 transition-transform duration-200 
                       ${isFavorite ? 'fill-current scale-110' : 'hover:scale-110'}`} 
          />
        </button>
      </div>
    </div>
  );
}
