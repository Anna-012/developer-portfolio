import { useState } from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [showMore, setShowMore] = useState(false);

  const descriptionPoints =
    project.description?.split("\n").filter((point) => point.trim() !== "") ||
    [];

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

        {/* Edit/Delete */}

        <div className="project-actions">
          <button
            className="edit-project-btn"
            onClick={onEdit}
            title="Edit project"
          >
            ✏️
          </button>

          <button
            className="delete-project-btn"
            onClick={onDelete}
            title="Delete project"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Project information */}

      <div className="project-content">
        <h3>{project.title}</h3>

        {/* Project Description */}

        {descriptionPoints.length > 0 && (
          <>
            <ul className="project-description">
              {(showMore
                ? descriptionPoints
                : descriptionPoints.slice(0, 2)
              ).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            {descriptionPoints.length > 2 && (
              <button
                className="see-more-btn"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? "See less ↑" : "See more ↓"}
              </button>
            )}
          </>
        )}

        {/* Technologies */}

        <div className="project-technologies">
          {project.technologies?.map((technology, index) => (
            <span key={index}>{technology}</span>
          ))}
        </div>

        {/* Links */}

        <div className="project-links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}

          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
