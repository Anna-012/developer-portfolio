import { useState } from "react";
import { updateExperience } from "../../api/experienceApi";
import "./EditExperience.css";

const EditExperience = ({
  experience,
  setExperiences,
  setEditingExperience,
}) => {
  // Convert MongoDB date to DD/MM/YYYY
  const formatDateForInput = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const [formData, setFormData] = useState({
    company: experience.company || "",
    role: experience.role || "",
    startDate: formatDateForInput(experience.startDate),
    endDate: formatDateForInput(experience.endDate),
    description: experience.description || "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
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

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = {
        company: formData.company,
        role: formData.role,
        startDate: convertDate(formData.startDate),
        endDate: convertDate(formData.endDate),
        description: formData.description,
      };

      const response = await updateExperience(experience._id, updatedData);

      console.log("Updated experience:", response);

      // Update experience in UI
      setExperiences((prev) =>
        prev.map((item) =>
          item._id === experience._id ? response.data.data : item,
        ),
      );

      // Go back to experience list
      setEditingExperience(null);
    } catch (error) {
      console.error("Failed to update experience:", error);

      console.error("Server response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="edit-experience-section">
      <div className="edit-experience-container">
        <div className="edit-experience-header">
          <h2>Edit Experience</h2>

          <button
            type="button"
            className="cancel-edit-experience-btn"
            onClick={() => setEditingExperience(null)}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company */}

          <div className="experience-form-group">
            <label>Company</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}

          <div className="experience-form-group">
            <label>Role</label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          {/* Start Date */}

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

          {/* End Date */}

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

          {/* Description */}

          <div className="experience-form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add each responsibility on a new line..."
              rows="6"
            />
          </div>

          {/* Save */}

          <button
            type="submit"
            className="save-edit-experience-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Experience"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditExperience;
