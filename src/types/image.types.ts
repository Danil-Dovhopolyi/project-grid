export interface ImageDimensions {
    width: number;
    height: number;
}

export interface ImageOptimizationConfig {
    width: number;
    pixelRatio: number;
}

export interface OptimizedImageUrls {
    standard: string;
    retina: string;
}

export interface ImageCacheEntry {
    data: string;
    timestamp: number;
}

export interface ImageCache {
    [key: string]: ImageCacheEntry;
}

export type ImageLoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export interface ImageSliderProps {
    images: string[];
    title: string;
    aspectRatio?: number;
    defaultPlaceholder?: string;
} 