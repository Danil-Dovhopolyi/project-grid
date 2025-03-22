import { useState, useEffect } from 'react';
import { loadImage } from '../utils/imageLoader';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

interface UseImageLoaderProps {
  images: string[];
  currentIndex: number;
  aspectRatio: number;
}

interface UseImageLoaderResult {
  loadingState: LoadingState;
  loadedImages: Record<string, string>;
  error: Error | null;
}

export const useImageLoader = ({ images, currentIndex, aspectRatio }: UseImageLoaderProps): UseImageLoaderResult => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCurrentImage = async () => {
      try {
        setLoadingState('loading');
        setError(null);
        
        const imageUrl = await loadImage(images[currentIndex], 1 / aspectRatio);
        setLoadedImages(prev => ({
          ...prev,
          [images[currentIndex]]: imageUrl
        }));
        setLoadingState('loaded');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load image');
        setError(error);
        setLoadingState('error');
      }
    };

    loadCurrentImage();
  }, [currentIndex, images, aspectRatio]);

  return {
    loadingState,
    loadedImages,
    error
  };
}; 