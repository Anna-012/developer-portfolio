import { useState } from "react";
import { createExperience } from "../../api/experienceApi";
import "./AddExperience.css";

const AddExperience = ({ setExperiences, setIsAdding }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const convertDate = (date) => {
    if (!date) return null;

    const [day, month, year] = date.split("/");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit button clicked");
    console.log("Form data:", formData);

    try {
      setLoading(true);

      // Convert dates before sending to backend
      const data = {
        company: formData.company,
        role: formData.role,
        startDate: convertDate(formData.startDate),
        endDate: convertDate(formData.endDate),
        description: formData.description,
      };

      console.log("Data sent to API:", data);

      const response = await createExperience(data);

      console.log("API response:", response);

      setExperiences((prev) => [...prev, response.data.data]);

      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add experience:", error);
      console.error("Server response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-experience-section">
      <div className="add-experience-container">
        <div className="add-experience-header">
          <h2>Add Experience</h2>

          <button
            type="button"
            className="cancel-experience-btn"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="experience-form-group">
            <label>Company</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              required
            />
          </div>

          <div className="experience-form-group">
            <label>Role</label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Claims Associate"
              required
            />
          </div>

          <div className="experience-form-group">
            <label>Start Date</label>

            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>

          <div className="experience-form-group">
            <label>End Date</label>

            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div className="experience-form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and work..."
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="save-experience-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Experience"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddExperience;
