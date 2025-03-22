import { loadImage, preloadImages, clearImageCache } from '../../utils/imageLoader';

const mockWindow = {
    innerWidth: 1024,
    devicePixelRatio: 1
};

global.window = mockWindow as any;

class MockImage {
    onload: () => void = () => {};
    onerror: () => void = () => {};
    src: string = '';

    constructor() {
        setTimeout(() => {
            if (this.src.includes('invalid')) {
                this.onerror();
            } else {
                this.onload();
            }
        }, 0);
    }
}

global.Image = MockImage as any;

describe('imageLoader', () => {
    beforeEach(() => {
        clearImageCache();
        jest.clearAllMocks();
    });

    describe('loadImage', () => {
        it('should load image and return optimized URL', async () => {
            const testUrl = 'https://example.com/image.jpg';
            const expectedUrl = 'https://example.com/image.jpg?width=373&height=224';

            const result = await loadImage(testUrl);
            expect(result).toBe(expectedUrl);
        }, 10000);

        it('should use cache for repeated requests', async () => {
            const testUrl = 'https://example.com/image.jpg';
            
            const firstResult = await loadImage(testUrl);
            const secondResult = await loadImage(testUrl);

            expect(firstResult).toBe(secondResult);
        }, 10000);

        it('should handle loading errors', async () => {
            const testUrl = 'https://example.com/invalid-image.jpg';
            
            await expect(loadImage(testUrl)).rejects.toThrow('Failed to load image');
        }, 10000);

        it('should handle different aspect ratios correctly', async () => {
            const testUrl = 'https://example.com/image.jpg';
            const aspectRatio = 0.5; 

            const result = await loadImage(testUrl, aspectRatio);
            expect(result).toContain('height=187'); 
        }, 10000);
    });

    describe('preloadImages', () => {
        it('should load all images', async () => {
            const testUrls = [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg'
            ];

            await expect(preloadImages(testUrls)).resolves.not.toThrow();
        }, 10000);

        it('should handle errors during batch loading', async () => {
            const testUrls = [
                'https://example.com/valid.jpg',
                'https://example.com/invalid.jpg'
            ];

            await expect(preloadImages(testUrls)).rejects.toThrow();
        }, 10000);
    });
}); 