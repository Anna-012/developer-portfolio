import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const descriptionPoints =
    project.description?.split("\n").filter((point) => point.trim()) || [];

  return (
    <article className="project-card">
      {/* Project Image */}
      <div className="project-image-container">
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title}
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder">No Image</div>
        )}

        {/* Edit / Delete */}
        <div className="project-actions">
          <button
            type="button"
            className="edit-project-btn"
            onClick={onEdit}
            title="Edit project"
            aria-label="Edit project"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
            </svg>
          </button>

          <button
            type="button"
            className="delete-project-btn"
            onClick={onDelete}
            title="Delete project"
            aria-label="Delete project"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="m19 6-1 14H6L5 6" />
              <path d="M10 11v5M14 11v5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Project Information */}
      <div className="project-content">
        <h3>{project.title}</h3>

        {/* Project Description */}
        <div className="project-description-wrapper">
          <p className="project-description">{descriptionPoints.join(" ")}</p>
        </div>

        {/* See More + Project Links */}
        <div className="project-description-footer">
          <button
            type="button"
            className="see-more-btn"
            onClick={() => navigate(`/project/${project._id}`)}
          >
            See More ↓
          </button>

          <div className="project-links">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-link"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.61 1.21 3.25.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z"
                  />
                </svg>
              </a>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-link"
                aria-label="Live Demo"
                title="Live Demo"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14 21 3" />
                  <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="project-technologies">
          {project.technologies?.slice(0, 5).map((technology, index) => (
            <span key={index}>{technology}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
