import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../../api/contactApi";
import "./EditContact.css";

const EditContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContact();
        const contact = response.data.data;

        setFormData({
          email: contact?.email || "",
          phone: contact?.phone || "",
          linkedin: contact?.linkedin || "",
          github: contact?.github || "",
        });
      } catch (err) {
        console.error("Failed to fetch contact:", err);
        setError("Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

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
      await updateContact(formData);
      navigate("/#contact");
    } catch (err) {
      console.error("Failed to update contact:", err);
      setError(
        err.response?.data?.message || "Failed to update contact information.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="edit-contact-section">
        <div className="edit-contact-container">
          <p>Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="edit-contact-section">
      <div className="edit-contact-container">
        <div className="edit-contact-header">
          <h2>Edit Contact</h2>

          <button
            type="button"
            className="cancel-contact-btn"
            onClick={() => navigate("/#contact")}
            disabled={saving}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-contact-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-contact-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="edit-contact-form-group">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="edit-contact-form-group">
            <label htmlFor="github">GitHub URL</label>
            <input
              id="github"
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="save-contact-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditContact;
