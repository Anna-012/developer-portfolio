import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../api/projectApi";
import "./UploadProject.css";

const UploadProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      const technologiesArray = formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      technologiesArray.forEach((technology) => {
        data.append("technologies", technology);
      });

      data.append("githubLink", formData.githubLink);
      data.append("liveLink", formData.liveLink);

      if (image) {
        data.append("image", image);
      }

      await createProject(data);

      navigate("/#projects");
    } catch (error) {
      console.error("Failed to create project:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add project. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-project-section">
      <div className="upload-project-container">
        <div className="upload-project-header">
          <h2>Upload Project</h2>

          <button
            type="button"
            className="cancel-project-btn"
            onClick={() => navigate("/#projects")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. TastyBite"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Project Thumbnail</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <img
                src={preview}
                alt="Project preview"
                className="project-upload-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies</label>
            <input
              id="technologies"
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, Express, MongoDB"
            />
            <small>Separate technologies with commas.</small>
          </div>

          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link</label>
            <input
              id="githubLink"
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="liveLink">Live Demo Link</label>
            <input
              id="liveLink"
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="save-project-btn" disabled={loading}>
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProject;
