import { useMemo } from 'react';
import { Project } from '../types/types';
import ImageSlider from './ImageSlider';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const formattedPrice = useMemo(() => {
        return `$${project.price.toLocaleString()}`;
    }, [project.price]);

    const details = useMemo(() => (
        <dl className="project-details">
            <div className="detail-item">
                <dt className="visually-hidden">Bedrooms</dt>
                <span className="detail-icon" aria-hidden="true">🛏️</span>
                <dd>{project.bedrooms} Beds</dd>
            </div>
            <div className="detail-item">
                <dt className="visually-hidden">Bathrooms</dt>
                <span className="detail-icon" aria-hidden="true">🛁</span>
                <dd>{project.bathrooms} Baths</dd>
            </div>
            <div className="detail-item">
                <dt className="visually-hidden">Area</dt>
                <span className="detail-icon" aria-hidden="true">📏</span>
                <dd>{project.area} sqft</dd>
            </div>
        </dl>
    ), [project.bedrooms, project.bathrooms, project.area]);

    return (
        <article className="project-card">
            <ImageSlider images={project.images} title={project.title} />
            <div className="card-content">
                <div className="content-top">
                    <h2 className="project-title">{project.title}</h2>
                    <div
                        className="project-price"
                        aria-label={`Price: ${formattedPrice}`}
                    >
                        {formattedPrice}
                    </div>
                    <div className="project-address">
                        <span className="address-icon" aria-hidden="true">📍</span>
                        <address>{project.address}</address>
                    </div>
                </div>
                {details}
            </div>
        </article>
    );
};

export default ProjectCard;
