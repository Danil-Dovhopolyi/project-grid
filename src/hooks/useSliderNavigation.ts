import { useCallback, useState } from 'react';

interface UseSliderNavigationProps {
    totalImages: number;
    onIndexChange?: (index: number) => void;
}

interface UseSliderNavigationResult {
    currentIndex: number;
    showControls: boolean;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    setCurrentIndex: (index: number) => void;
}

export const useSliderNavigation = ({
    totalImages,
    onIndexChange
}: UseSliderNavigationProps): UseSliderNavigationResult => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => {
            const newIndex = (prev + 1) % totalImages;
            onIndexChange?.(newIndex);
            return newIndex;
        });
    }, [totalImages, onIndexChange]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => {
            const newIndex = (prev - 1 + totalImages) % totalImages;
            onIndexChange?.(newIndex);
            return newIndex;
        });
    }, [totalImages, onIndexChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Home':
                setCurrentIndex(0);
                onIndexChange?.(0);
                break;
            case 'End':
                setCurrentIndex(totalImages - 1);
                onIndexChange?.(totalImages - 1);
                break;
            default:
                break;
        }
    }, [nextImage, prevImage, totalImages, onIndexChange]);

    const handleMouseEnter = useCallback(() => setShowControls(true), []);
    const handleMouseLeave = useCallback(() => setShowControls(false), []);

    return {
        currentIndex,
        showControls,
        handleKeyDown,
        handleMouseEnter,
        handleMouseLeave,
        setCurrentIndex: (index: number) => {
            setCurrentIndex(index);
            onIndexChange?.(index);
        }
    };
}; 