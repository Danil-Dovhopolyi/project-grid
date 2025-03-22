import { memo } from 'react';

interface SliderIndicatorProps {
  totalImages: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

interface SliderImageProps {
  src: string;
  title: string;
  currentIndex: number;
  totalImages: number;
  aspectRatio: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export const SliderIndicator = memo(({ totalImages, currentIndex, onIndexChange }: SliderIndicatorProps) => (
  <div className="slider-indicator" role="tablist">
    <div className="dots-container">
      {Array.from({ length: totalImages }).map((_, index) => (
        <button
          key={index}
          className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onIndexChange(index)}
          aria-label={`Show image ${index + 1} of ${totalImages}`}
          aria-selected={index === currentIndex}
          role="tab"
          type="button"
        />
      ))}
    </div>
  </div>
));

export const SliderImage = memo(({
  src,
  title,
  currentIndex,
  totalImages,
  aspectRatio,
  isLoading,
  isError,
  onRetry
}: SliderImageProps) => (
  <div className="image-container">
    {isLoading && <div className="image-loading" />}
    {isError && (
      <div className="image-error">
        <span>Failed to load image</span>
        <button
          onClick={onRetry}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    )}
    {!isLoading && !isError && (
      <img
        src={src}
        alt={`${title} - Image ${currentIndex + 1} of ${totalImages}`}
        className="slider-image loaded"
        loading="lazy"
        width="373"
        height={Math.round(373 / aspectRatio)}
        srcSet={`${src} 1x, ${src} 2x`}
        sizes="(max-width: 768px) 100vw, 373px"
      />
    )}
  </div>
)); 