import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjects } from "../../api/projectApi";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjects();
        const projects = response.data.data || [];

        const selectedProject = projects.find((item) => item._id === id);

        if (!selectedProject) {
          setError("Project not found.");
          return;
        }

        setProject(selectedProject);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Unable to load project. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main className="project-details-page">
        <div className="project-details-container">
          <div className="details-skeleton-back shimmer" />
          <div className="details-skeleton-title shimmer" />
          <div className="details-skeleton-image shimmer" />

          <section className="project-details-section">
            <div className="details-skeleton-heading shimmer" />
            <div className="details-skeleton-line shimmer" />
            <div className="details-skeleton-line shimmer" />
            <div className="details-skeleton-line details-skeleton-line-short shimmer" />
            <div className="details-skeleton-line shimmer" />
          </section>

          <section className="project-details-section">
            <div className="details-skeleton-heading shimmer" />
            <div className="details-skeleton-tags">
              <span className="shimmer" />
              <span className="shimmer" />
              <span className="shimmer" />
              <span className="shimmer" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-details-page">
        <button
          className="project-back-btn"
          onClick={() => navigate("/#projects")}
        >
          ← Back to Projects
        </button>
        <p className="project-details-message">
          {error || "Project not found."}
        </p>
      </main>
    );
  }

  const descriptionPoints =
    project.description?.split("\n").filter((point) => point.trim()) || [];

  return (
    <main className="project-details-page">
      <div className="project-details-container">
        <button
          type="button"
          className="project-back-btn"
          onClick={() => navigate("/#projects")}
        >
          ← Back to Projects
        </button>

        <header className="project-details-header">
          <p className="project-details-label">PROJECT DETAILS</p>
          <h1>{project.title}</h1>
        </header>

        {project.image?.url && (
          <div className="project-details-image-container">
            <img
              src={project.image.url}
              alt={project.title}
              className="project-details-image"
            />
          </div>
        )}

        <section className="project-details-section">
          <h2>About the Project</h2>

          <div className="project-full-description">
            {descriptionPoints.length > 0 ? (
              <ul className="project-feature-list">
                {descriptionPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </section>

        <section className="project-details-section">
          <h2>Technologies Used</h2>

          <div className="project-details-technologies">
            {project.technologies?.length > 0 ? (
              project.technologies.map((technology, index) => (
                <span key={index}>{technology}</span>
              ))
            ) : (
              <p>No technologies listed.</p>
            )}
          </div>
        </section>

        {(project.githubLink || project.liveLink) && (
          <section className="project-details-section">
            <h2>Project Links</h2>

            <div className="project-details-links">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository ↗
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProjectDetails;
