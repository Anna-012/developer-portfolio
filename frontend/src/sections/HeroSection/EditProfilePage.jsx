import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../api/profileApi";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => setFormData(res.data))
      .catch(() => setError("Could not load profile."));
  }, []);

  const wordCount = (formData?.shortBio || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (wordCount > 50) {
      setError("Profile summary must not exceed 50 words.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateProfile({
        ...formData,
        projectsCompleted: Number(formData.projectsCompleted),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!formData) {
    return <p className="edit-status">{error || "Loading profile..."}</p>;
  }

  return (
    <main className="edit-page">
      <div className="edit-header">
        <button type="button" onClick={() => navigate("/")}>
          ← Back to portfolio
        </button>
        <h1>Edit Profile</h1>
        <p>Update your professional introduction.</p>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Professional Role
          <input
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Profile Summary (maximum 50 words)
          <textarea
            name="shortBio"
            value={formData.shortBio || ""}
            onChange={handleChange}
            rows={4}
            required
          />
          <span className={wordCount > 50 ? "word-error" : "word-count"}>
            {wordCount}/50 words
          </span>
        </label>

        <label>
          Projects Completed
          <input
            type="number"
            name="projectsCompleted"
            min="0"
            value={formData.projectsCompleted ?? 0}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="edit-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
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

export default EditProfilePage;
