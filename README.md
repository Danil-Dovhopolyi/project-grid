## Main Features
- Real estate project grid display
- Responsive design
- Pagination for project navigation
- Optimized image loading
- Image slider with keyboard navigation support
- Accessibility according to WCAG standards
- High contrast mode support

## Tech Stack
- React 18
- TypeScript
- SCSS
- Jest + React Testing Library
- Vite

## Project Structure
```
src/
├── api/               # API integration layer
├── components/        # React components
├── hooks/            # Custom React hooks
├── styles/           # Global styles and SCSS modules
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── __mocks__/        # Jest mocks
├── __tests__/        # Test files
├── App.tsx           # Main application component
├── App.scss          # Main application styles
├── main.tsx          # Application entry point
└── setupTests.ts     # Test setup configuration
```

## Installation and Setup

### Requirements
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install
# or
yarn install
```

### Running the Project
```bash
# Development mode
npm run dev
# or
yarn dev

# Run tests
npm test
# or
yarn test

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Implementation Details

### Image Optimization
- Automatic image scaling based on screen size
- Retina display support
- Lazy loading implementation
- Optimized image caching

### Accessibility
- ARIA attributes for all interactive elements
- Keyboard navigation support
- Semantic HTML structure
- High contrast mode support

### Testing
- Component unit tests
- Utility function tests
- Test coverage > 80%
- Accessibility testing

### Styling
- Modular SCSS styles
- CSS variables for colors and dimensions
- Responsive design with breakpoints
- Animations and transitions

## API Integration
The project integrates with an API for fetching project data. Required environment variables:
```
VITE_API_URL=
VITE_API_ACCESS_KEY=
VITE_API_SECRET_KEY=
```

## Performance Optimization
- Component code splitting
- Image optimization
- Component memoization
