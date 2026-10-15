import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExperience } from "../../api/experienceApi";
import "./AddExperience.css";

const AddExperience = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const convertDate = (date) => {
    if (!date) return null;

    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        company: formData.company,
        role: formData.role,
        startDate: convertDate(formData.startDate),
        endDate: convertDate(formData.endDate),
        description: formData.description,
      };

      await createExperience(data);

      navigate("/#experience");
    } catch (err) {
      console.error("Failed to add experience:", err);
      setError(err.response?.data?.message || "Failed to add experience.");
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
            onClick={() => navigate("/#experience")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="experience-form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY (leave blank if ongoing)"
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and work..."
              rows={5}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

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
