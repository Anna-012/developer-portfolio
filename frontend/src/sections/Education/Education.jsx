import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEducation, deleteEducation } from "../../api/educationApi";
import "./Education.css";

const Education = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getEducation();
        setEducation(response.data.data);
      } catch (error) {
        console.error("Failed to fetch education:", error);
      }
    };

    fetchEducation();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?",
    );

    if (!confirmed) return;

    try {
      await deleteEducation(id);
      setEducation((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  return (
    <section className="education-section" id="education">
      <div className="education-header">
        <h2>Education</h2>

        <button
          type="button"
          className="add-education-btn"
          onClick={() => navigate("/add-education")}
        >
          <span>+</span> Add Education
        </button>
      </div>

      <div className="education-list">
        {education.map((item) => (
          <div className="education-card" key={item._id}>
            <div className="education-icon">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                <path d="M6 11v5c3.5 2.5 8.5 2.5 12 0v-5" />
                <path d="M22 9v6" />
              </svg>
            </div>

            <div className="education-info">
              <h3>{item.degree}</h3>
              <p className="education-description">{item.description}</p>
              <h4>{item.institution}</h4>
              <p className="education-year">
                {item.startYear} - {item.endYear}
              </p>
            </div>

            <div className="education-actions">
              <button
                type="button"
                className="edit-education-btn"
                aria-label={`Edit ${item.degree}`}
                title="Edit education"
                onClick={() => navigate(`/edit-education/${item._id}`)}
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
                className="delete-education-btn"
                aria-label={`Delete ${item.degree}`}
                title="Delete education"
                onClick={() => handleDelete(item._id)}
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
        ))}
      </div>
    </section>
  );
};

export default Education;
