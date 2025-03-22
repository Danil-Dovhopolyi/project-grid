import {
    ImageCache,
    ImageOptimizationConfig,
    OptimizedImageUrls,
    ImageDimensions
} from '../types/image.types';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 години
const imageCache: ImageCache = {};

const DEFAULT_ASPECT_RATIO = 0.6; // 16:9 приблизно
const DEFAULT_IMAGE_DIMENSIONS: ImageDimensions = {
    width: 373,
    height: Math.round(373 * DEFAULT_ASPECT_RATIO)
};

const calculateImageDimensions = (width: number, aspectRatio: number = DEFAULT_ASPECT_RATIO): ImageDimensions => ({
    width: Math.round(width),
    height: Math.round(width * aspectRatio)
});

const getOptimizedImageUrl = (
    url: string,
    dimensions: ImageDimensions,
    devicePixelRatio: number = 1
): string => {
    const { width, height } = dimensions;
    const size = {
        width: Math.round(width * devicePixelRatio),
        height: Math.round(height * devicePixelRatio)
    };

    if (url.includes('placehold.co')) {
        return `https://placehold.co/${size.width}x${size.height}/png`;
    }
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${size.width}&height=${size.height}`;
};

const getOptimalImageWidth = (): ImageOptimizationConfig => {
    let width = DEFAULT_IMAGE_DIMENSIONS.width;
    let pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            width = screenWidth;
        }
    }

    return { width, pixelRatio };
};

const createOptimizedUrls = (
    src: string,
    config: ImageOptimizationConfig,
    aspectRatio: number = DEFAULT_ASPECT_RATIO
): OptimizedImageUrls => {
    const dimensions = calculateImageDimensions(config.width, aspectRatio);
    
    return {
        standard: getOptimizedImageUrl(src, dimensions, 1),
        retina: getOptimizedImageUrl(src, dimensions, config.pixelRatio)
    };
};

export const loadImage = async (
    src: string,
    aspectRatio: number = DEFAULT_ASPECT_RATIO
): Promise<string> => {
    const cachedImage = imageCache[src];
    if (cachedImage && Date.now() - cachedImage.timestamp < CACHE_DURATION) {
        return cachedImage.data;
    }

    const config = getOptimalImageWidth();
    const urls = createOptimizedUrls(src, config, aspectRatio);

    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            const optimizedUrl = config.pixelRatio > 1 ? urls.retina : urls.standard;
            
            imageCache[src] = {
                data: optimizedUrl,
                timestamp: Date.now()
            };
            
            resolve(optimizedUrl);
        };
        
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = config.pixelRatio > 1 ? urls.retina : urls.standard;
    });
};

export const preloadImages = async (
    images: string[],
    aspectRatio: number = DEFAULT_ASPECT_RATIO
): Promise<void> => {
    const loadPromises = images.map(src => loadImage(src, aspectRatio));
    await Promise.all(loadPromises);
};

export const clearImageCache = (): void => {
    Object.keys(imageCache).forEach(key => {
        delete imageCache[key];
    });
}; 