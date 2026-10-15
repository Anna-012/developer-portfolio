import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExperiences, deleteExperience } from "../../api/experienceApi";
import ExperienceCard from "./ExperienceCard";
import "./MyExperience.css";

const MyExperience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        setExperiences(response.data.data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?",
    );

    if (!confirmDelete) return;

    try {
      await deleteExperience(id);

      setExperiences((prev) =>
        prev.filter((experience) => experience._id !== id),
      );
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-header">
        <div>
          <h2>My Experience</h2>
          <p>My professional experience and career journey</p>
        </div>

        <button
          type="button"
          className="add-experience-btn"
          onClick={() => navigate("/add-experience")}
        >
          <span>+</span>
          Add Experience
        </button>
      </div>

      <div className="experience-list">
        {experiences.length === 0 ? (
          <p className="no-experience">No experience added yet.</p>
        ) : (
          experiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              onEdit={() => navigate(`/edit-experience/${experience._id}`)}
              onDelete={() => handleDelete(experience._id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyExperience;
