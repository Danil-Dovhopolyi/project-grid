const API_SETTINGS = {
    URL: 'https://api.example.com/projects',
    ACCESS_KEY: process.env.REACT_APP_API_ACCESS_KEY || '',
    SECRET_KEY: process.env.REACT_APP_API_SECRET_KEY || ''
};

const GRID_SETTINGS = {
    ITEMS_PER_PAGE: 12
};

export const createApiUrl = (page: number): string => {
    const params = new URLSearchParams({
        accessKey: API_SETTINGS.ACCESS_KEY,
        secretKey: API_SETTINGS.SECRET_KEY,
        isPagination: 'true',
        size: GRID_SETTINGS.ITEMS_PER_PAGE.toString(),
        page: page.toString()
    });

    return `${API_SETTINGS.URL}?${params}`;
}; 