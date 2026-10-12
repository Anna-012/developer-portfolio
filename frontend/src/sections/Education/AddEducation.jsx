import { useState } from "react";
import { createEducation } from "../../api/educationApi";
import "./AddEducation.css";

const AddEducation = ({ setEducation, setIsAdding }) => {
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEducation({
        ...formData,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
      });

      setEducation((prev) => [...prev, response.data.data]);

      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  };

  return (
    <section className="education-form-section">
      <div className="education-form-header">
        <h2>Add Education</h2>
      </div>

      <form onSubmit={handleSubmit} className="education-form">
        <div className="form-group">
          <label>Degree</label>

          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Institution</label>

          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Year</label>

            <input
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Year</label>

            <input
              type="number"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="education-form-actions">
          <button type="button" onClick={() => setIsAdding(false)}>
            Cancel
          </button>

          <button type="submit">Add Education</button>
        </div>
      </form>
    </section>
  );
};

export default AddEducation;
