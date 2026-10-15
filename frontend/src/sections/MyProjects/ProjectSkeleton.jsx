import "./ProjectSkeleton.css";

const ProjectSkeleton = () => {
  return (
    <article className="project-skeleton" aria-hidden="true">
      <div className="skeleton-image shimmer" />

      <div className="skeleton-content">
        <div className="skeleton-title shimmer" />

        <div className="skeleton-description shimmer" />
        <div className="skeleton-description skeleton-description-short shimmer" />

        <div className="skeleton-footer">
          <div className="skeleton-more shimmer" />
          <div className="skeleton-icons">
            <span className="skeleton-icon shimmer" />
            <span className="skeleton-icon shimmer" />
          </div>
        </div>

        <div className="skeleton-technologies">
          <span className="skeleton-tag shimmer" />
          <span className="skeleton-tag shimmer" />
          <span className="skeleton-tag shimmer" />
          <span className="skeleton-tag skeleton-tag-short shimmer" />
        </div>
      </div>
    </article>
  );
};

export default ProjectSkeleton;
