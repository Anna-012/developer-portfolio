import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExperiences, updateExperience } from "../../api/experienceApi";
import "./EditExperience.css";

const EditExperience = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert MongoDB date to DD/MM/YYYY
  const formatDateForInput = (date) => {
    if (!date) return "";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return "";

    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const year = d.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  // Fetch selected experience using URL ID
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setError("");

        const response = await getExperiences();
        const records = response.data.data;

        const selectedExperience = records.find((item) => item._id === id);

        if (!selectedExperience) {
          setError("Experience record not found.");
          return;
        }

        setFormData({
          company: selectedExperience.company || "",
          role: selectedExperience.role || "",
          startDate: formatDateForInput(selectedExperience.startDate),
          endDate: formatDateForInput(selectedExperience.endDate),
          description: selectedExperience.description || "",
        });
      } catch (err) {
        console.error("Failed to load experience:", err);

        setError(err.response?.data?.message || "Failed to load experience.");
      }
    };

    fetchExperience();
  }, [id]);

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
    if (!date.trim()) return null;

    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
      throw new Error("Enter dates in DD/MM/YYYY format.");
    }

    const [, day, month, year] = match;

    const parsedDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    if (
      parsedDate.getUTCFullYear() !== Number(year) ||
      parsedDate.getUTCMonth() !== Number(month) - 1 ||
      parsedDate.getUTCDate() !== Number(day)
    ) {
      throw new Error("Please enter a valid date.");
    }

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const updatedData = {
        company: formData.company.trim(),
        role: formData.role.trim(),
        startDate: convertDate(formData.startDate),
        endDate: convertDate(formData.endDate),
        description: formData.description,
      };

      await updateExperience(id, updatedData);

      navigate("/#experience");
    } catch (err) {
      console.error("Failed to update experience:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update experience.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <section className="edit-experience-section">
        <div className="edit-experience-container">
          <p role={error ? "alert" : "status"}>
            {error || "Loading experience..."}
          </p>

          {error && (
            <button
              type="button"
              className="cancel-edit-experience-btn"
              onClick={() => navigate("/#experience")}
            >
              ← Back to portfolio
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="edit-experience-section">
      <div className="edit-experience-container">
        <div className="edit-experience-header">
          <h2>Edit Experience</h2>
          <button
            type="button"
            className="cancel-edit-experience-btn"
            onClick={() => navigate("/#experience")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="experience-form-group">
            <label htmlFor="edit-company">Company</label>
            <input
              id="edit-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="edit-role">Role</label>
            <input
              id="edit-role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="edit-start-date">Start Date</label>
            <input
              id="edit-start-date"
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="edit-end-date">End Date</label>
            <input
              id="edit-end-date"
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY (leave blank if ongoing)"
            />
          </div>

          <div className="experience-form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
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

          <div className="experience-form-actions">
            <button
              type="submit"
              className="save-edit-experience-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditExperience;
