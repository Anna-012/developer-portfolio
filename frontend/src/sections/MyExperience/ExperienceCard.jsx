import "./ExperienceCard.css";

const ExperienceCard = ({ experience, onEdit, onDelete }) => {
  // Format date
  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article className="experience-card">
      {/* Icon */}

      <div className="experience-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      </div>

      {/* Experience information */}
      <div className="experience-info">
        <h3>{experience.role}</h3>

        <h4>{experience.company}</h4>

        <p className="experience-duration">
          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
        </p>

        {experience.description && (
          <ul className="experience-description">
            {experience.description
              .split("\n")
              .filter((point) => point.trim())
              .map((point, index) => (
                <li key={index}>{point.trim()}</li>
              ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="experience-actions">
        {/* Edit Icon */}
        <button
          type="button"
          className="edit-experience-btn"
          onClick={onEdit}
          title="Edit experience"
          aria-label="Edit experience"
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

        {/* Delete Icon */}
        <button
          type="button"
          className="delete-experience-btn"
          onClick={onDelete}
          title="Delete experience"
          aria-label="Delete experience"
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
    </article>
  );
};

export default ExperienceCard;
