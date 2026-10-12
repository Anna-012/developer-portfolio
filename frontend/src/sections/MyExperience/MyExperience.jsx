import { useEffect, useState } from "react";
import { getExperiences, deleteExperience } from "../../api/experienceApi";

import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import ExperienceCard from "./ExperienceCard";

import "./MyExperience.css";

const MyExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();

        console.log("Experience API response:", response);

        setExperiences(response.data.data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  // Delete experience
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

  // Show Add Experience
  if (isAdding) {
    return (
      <AddExperience
        setExperiences={setExperiences}
        setIsAdding={setIsAdding}
      />
    );
  }

  // Show Edit Experience
  if (editingExperience) {
    return (
      <EditExperience
        experience={editingExperience}
        setExperiences={setExperiences}
        setEditingExperience={setEditingExperience}
      />
    );
  }

  return (
    <section className="experience-section" id="experience">
      <div className="experience-header">
        <div>
          <h2>My Experience</h2>

          <p>My professional experience and career journey</p>
        </div>

        <button
          className="add-experience-btn"
          onClick={() => setIsAdding(true)}
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
              onEdit={() => setEditingExperience(experience)}
              onDelete={() => handleDelete(experience._id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyExperience;
