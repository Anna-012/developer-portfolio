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
      <div className="experience-icon">💼</div>

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
        <button
          className="edit-experience-btn"
          onClick={onEdit}
          title="Edit experience"
        >
          ✏️
        </button>

        <button
          className="delete-experience-btn"
          onClick={onDelete}
          title="Delete experience"
        >
          🗑️
        </button>
      </div>
    </article>
  );
};

export default ExperienceCard;
