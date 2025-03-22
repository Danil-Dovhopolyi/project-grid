import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageSlider from '../../components/ImageSlider';
import { loadImage } from '../../utils/imageLoader';

jest.mock('../../utils/imageLoader', () => ({
  loadImage: jest.fn()
}));

const mockLoadImage = loadImage as jest.MockedFunction<typeof loadImage>;

describe('ImageSlider', () => {
  const defaultProps = {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    title: 'Test Slider'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadImage.mockResolvedValue('https://example.com/optimized-image.jpg');
  });

  it('should render component correctly with initial props', async () => {
    await act(async () => {
      render(<ImageSlider {...defaultProps} />);
    });

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByAltText(/Test Slider - Image 1 of 3/)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('NEW BUILDING');
  });

  it('should show/hide controls on mouse hover', async () => {
    await act(async () => {
      render(<ImageSlider {...defaultProps} />);
    });

    const slider = screen.getByRole('region');

    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseEnter(slider);
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseLeave(slider);
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
  });

  it('should switch images when clicking navigation buttons', async () => {
    await act(async () => {
      render(<ImageSlider {...defaultProps} />);
    });

    const slider = screen.getByRole('region');

    await act(async () => {
      fireEvent.mouseEnter(slider);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Next image'));
    });
    expect(await screen.findByAltText(/Test Slider - Image 2 of 3/)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Previous image'));
    });
    expect(await screen.findByAltText(/Test Slider - Image 1 of 3/)).toBeInTheDocument();
  });

  it('should handle keyboard navigation correctly', async () => {
    await act(async () => {
      render(<ImageSlider {...defaultProps} />);
    });

    const slider = screen.getByRole('region');

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
    });
    expect(screen.getByAltText(/Test Slider - Image 2 of 3/)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    });
    expect(screen.getByAltText(/Test Slider - Image 1 of 3/)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'End' });
    });
    expect(screen.getByAltText(/Test Slider - Image 3 of 3/)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'Home' });
    });
    expect(screen.getByAltText(/Test Slider - Image 1 of 3/)).toBeInTheDocument();
  });

  it('should handle loading errors correctly', async () => {
    mockLoadImage.mockRejectedValue(new Error('Failed to load image'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    await act(async () => {
      render(<ImageSlider {...defaultProps} />);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
}); 