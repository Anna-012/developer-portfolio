import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEducation, updateEducation } from "../../api/educationApi";
import "./EditEducation.css";

const EditEducation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setError("");

        const response = await getEducation();
        const records = response.data.data;
        const selectedEducation = records.find((item) => item._id === id);

        if (!selectedEducation) {
          setError("Education record not found.");
          return;
        }

        setFormData({
          degree: selectedEducation.degree || "",
          institution: selectedEducation.institution || "",
          startYear: selectedEducation.startYear ?? "",
          endYear: selectedEducation.endYear ?? "",
          description: selectedEducation.description || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load education.");
      }
    };

    fetchEducation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.endYear) < Number(formData.startYear)) {
      setError("End year cannot be earlier than start year.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateEducation(id, {
        ...formData,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
      });

      navigate("/#education");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update education.");
    } finally {
      setSaving(false);
    }
  };

  if (!formData) {
    return (
      <main className="edit-education-page">
        <div className="edit-education-header">
          <button type="button" onClick={() => navigate("/#education")}>
            ← Back to portfolio
          </button>

          <h2>{error ? "Unable to Load Education" : "Edit Education"}</h2>

          <p className={error ? "form-error" : "edit-education-status"}>
            {error || "Loading education..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-education-page">
      <div className="edit-education-header">
        <button
          type="button"
          onClick={() => navigate("/#education")}
          disabled={saving}
        >
          ← Back to portfolio
        </button>

        <h2>Edit Education</h2>
        <p>Update your education details.</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-education-form">
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            id="degree"
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g. BSc Information Technology"
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
            placeholder="Enter institution name"
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
              min="1900"
              max="2100"
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
              min={formData.startYear || 1900}
              max="2100"
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
            placeholder="Describe your education..."
            rows={4}
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
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditEducation;
