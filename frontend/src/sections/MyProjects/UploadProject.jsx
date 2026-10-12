import { useState } from "react";
import { createProject } from "../../api/projectApi";

import "./UploadProject.css";

const UploadProject = ({ setProjects, setIsUploading }) => {
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

  // Text input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      // Convert comma separated technologies into array
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

      const response = await createProject(data);

      console.log("Project created:", response);

      // Add newly created project to UI
      setProjects((prev) => [...prev, response.data.data]);

      setIsUploading(false);
    } catch (error) {
      console.error("Failed to create project:", error);
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
            className="cancel-project-btn"
            onClick={() => setIsUploading(false)}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}

          <div className="form-group">
            <label>Project Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. TastyBite"
              required
            />
          </div>

          {/* Description */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="4"
              required
            />
          </div>

          {/* Image */}

          <div className="form-group">
            <label>Project Thumbnail</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                alt="Project preview"
                className="project-upload-preview"
              />
            )}
          </div>

          {/* Technologies */}

          <div className="form-group">
            <label>Technologies</label>

            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, Express, MongoDB"
            />

            <small>Separate technologies with commas.</small>
          </div>

          {/* GitHub */}

          <div className="form-group">
            <label>GitHub Link</label>

            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          {/* Live */}

          <div className="form-group">
            <label>Live Demo Link</label>

            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="save-project-btn" disabled={loading}>
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProject;
