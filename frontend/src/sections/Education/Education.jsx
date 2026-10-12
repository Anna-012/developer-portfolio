import { useEffect, useState } from "react";
import { getEducation, deleteEducation } from "../../api/educationApi";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";
import "./Education.css";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation();
        console.log("Education API response:", data);
        setEducation(data.data.data);
      } catch (error) {
        console.error("Failed to fetch education:", error);
      }
    };

    fetchEducation();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id);

      setEducation((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  if (isAdding) {
    return (
      <AddEducation setEducation={setEducation} setIsAdding={setIsAdding} />
    );
  }

  if (editingEducation) {
    return (
      <EditEducation
        education={editingEducation}
        setEducation={setEducation}
        setEditingEducation={setEditingEducation}
      />
    );
  }

  return (
    <section className="education-section" id="education">
      <div className="education-header">
        <h2>Education</h2>

        <button className="add-education-btn" onClick={() => setIsAdding(true)}>
          <span>+</span> Add Education
        </button>
      </div>

      <div className="education-list">
        {education.map((item) => (
          <div className="education-card" key={item._id}>
            <div className="education-icon">🎓</div>

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
                className="edit-education-btn"
                onClick={() => setEditingEducation(item)}
              >
                ✏️
              </button>

              <button
                className="delete-education-btn"
                onClick={() => handleDelete(item._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
