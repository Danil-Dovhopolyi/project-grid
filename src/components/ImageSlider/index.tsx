import { ImageSliderProps } from '../../types/image.types';
import { useImageLoader } from '../../hooks/useImageLoader';
import { useSliderNavigation } from '../../hooks/useSliderNavigation';
import { SliderIndicator, SliderImage } from './components';

const DEFAULT_ASPECT_RATIO = 16 / 9;
const DEFAULT_PLACEHOLDER = '/placeholder-image.jpg';

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const ImageSlider = ({
  images,
  title,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  defaultPlaceholder = DEFAULT_PLACEHOLDER,
}: ImageSliderProps) => {
  const {
    currentIndex: currentImageIndex,
    showControls,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    setCurrentIndex
  } = useSliderNavigation({
    totalImages: images.length
  });

  const { loadingState, loadedImages } = useImageLoader({
    images,
    currentIndex: currentImageIndex,
    aspectRatio
  });

  const currentSrc = loadedImages[images[currentImageIndex]] || defaultPlaceholder;

  return (
    <div
      className="image-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label={`Image slider for ${title}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ aspectRatio: aspectRatio }}
    >
      <SliderImage
        src={currentSrc}
        title={title}
        currentIndex={currentImageIndex}
        totalImages={images.length}
        aspectRatio={aspectRatio}
        isLoading={loadingState === 'loading'}
        isError={loadingState === 'error'}
        onRetry={() => window.location.reload()}
      />

      {showControls && (
        <>
          <button
            type="button"
            className="slider-control prev-button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentImageIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <PrevIcon />
          </button>
          <button
            type="button"
            className="slider-control next-button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentImageIndex + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <NextIcon />
          </button>
          <SliderIndicator
            totalImages={images.length}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentIndex}
          />
        </>
      )}
      <div
        className="new-building-badge"
        role="status"
        aria-label="New building status"
      >
        NEW BUILDING
      </div>
      <button
        type="button"
        className="favorite-button"
        aria-label="Add to favorites"
        aria-pressed="false"
      >
        ❤
      </button>
    </div>
  );
};

export default ImageSlider; 