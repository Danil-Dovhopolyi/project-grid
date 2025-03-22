export interface Project {
    id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
}

export interface ProjectResponse {
    projects: Array<{
        _id: string;
        generalInfo: {
            name: string;
            province: string;
            price: number;
            rooms: string;
            bathrooms: number;
            size: number;
        };
        images: Array<{
            original: string;
        }>;
    }>;
    totalPages: number;
} 