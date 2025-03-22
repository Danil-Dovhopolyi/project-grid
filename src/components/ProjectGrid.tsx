import { useState, useEffect } from 'react';
import '../styles/main.scss';
import { Project } from '../types/types';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';

const API_SETTINGS = {
    URL: import.meta.env.VITE_API_URL,
    ACCESS_KEY: import.meta.env.VITE_API_ACCESS_KEY,
    SECRET_KEY: import.meta.env.VITE_API_SECRET_KEY
} as const;

if (!API_SETTINGS.URL || !API_SETTINGS.ACCESS_KEY || !API_SETTINGS.SECRET_KEY) {
    throw new Error(
        'Missing required environment variables. Please check your .env file and ensure all required variables are set.'
    );
}

const GRID_SETTINGS = {
    ITEMS_PER_PAGE: 9,
    DEFAULT_IMAGES: [
        'https://placehold.co/600x400/png',
        'https://placehold.co/600x400/png?text=Image+2',
        'https://placehold.co/600x400/png?text=Image+3',
    ] as string[]
} as const;

const DEFAULT_PROJECT: Project = {
    id: 0,
    title: 'Loading Project',
    address: 'Loading Address',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: GRID_SETTINGS.DEFAULT_IMAGES
};

const ProjectGrid = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createApiUrl = (page: number): string => {
        const params = new URLSearchParams({
            accessKey: API_SETTINGS.ACCESS_KEY,
            secretKey: API_SETTINGS.SECRET_KEY,
            isPagination: 'true',
            size: GRID_SETTINGS.ITEMS_PER_PAGE.toString(),
            page: page.toString()
        });

        return `${API_SETTINGS.URL}?${params}`;
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(createApiUrl(currentPage), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();

                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid API response format');
                }

                if (!Array.isArray(data.projects)) {
                    throw new Error('Projects data is not an array');
                }

                const formattedProjects = data.projects.map((project: any) => ({
                    id: project._id,
                    title: project.generalInfo.name,
                    address: project.generalInfo.province,
                    price: project.generalInfo.price,
                    bedrooms: parseInt(project.generalInfo.rooms),
                    bathrooms: project.generalInfo.bathrooms,
                    area: project.generalInfo.size,
                    images: project.images.map((img: any) => img.original)
                }));

                setProjects(formattedProjects);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
                console.error('Error fetching projects:', err);
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    if (error) {
        return (
            <div className="project-grid-container">
                <div className="error-message">
                    {error}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="project-grid-container">
                <div className="project-grid">
                    {Array(GRID_SETTINGS.ITEMS_PER_PAGE).fill(DEFAULT_PROJECT).map((project, index) => (
                        <ProjectCard
                            key={`loading-${index}`}
                            project={project}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="project-grid-container">
            <div className="project-grid">
                {Array.isArray(projects) && projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ProjectGrid;
