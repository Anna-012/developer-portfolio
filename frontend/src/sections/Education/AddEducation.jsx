import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEducation } from "../../api/educationApi";
import "./AddEducation.css";

const AddEducation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await createEducation({
        ...formData,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
      });

      navigate("/#education");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add education.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="education-form-section">
      <div className="education-form-header">
        <button type="button" onClick={() => navigate("/#education")}>
          ← Back to portfolio
        </button>
        <h2>Add Education</h2>
      </div>

      <form onSubmit={handleSubmit} className="education-form">
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            id="degree"
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="institution">Institution</label>
          <input
            id="institution"
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startYear">Start Year</label>
            <input
              id="startYear"
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endYear">End Year</label>
            <input
              id="endYear"
              type="number"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="education-form-actions">
          <button
            type="button"
            onClick={() => navigate("/#education")}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Education"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddEducation;
