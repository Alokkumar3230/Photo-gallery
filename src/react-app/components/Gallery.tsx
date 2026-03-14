import { PhotoCard } from './PhotoCard';
import type { Photo } from '../hooks/useFetchPhotos';

interface GalleryProps {
  photos: Photo[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function Gallery({ photos, isFavorite, onToggleFavorite }: GalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <svg 
            className="w-8 h-8 text-slate-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <p className="text-slate-500 text-lg font-medium">No photos found</p>
        <p className="text-slate-400 text-sm mt-1">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={isFavorite(photo.id)}
          onToggleFavorite={() => onToggleFavorite(photo.id)}
        />
      ))}
    </div>
  );
}
