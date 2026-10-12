import { useState } from "react";
import { updateProject } from "../../api/projectApi";

import "./EditProject.css";

const EditProject = ({ project, setProjects, setEditingProject }) => {
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    technologies: project.technologies?.join(", ") || "",
    githubLink: project.githubLink || "",
    liveLink: project.liveLink || "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(project.image?.url || null);

  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
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

      const technologiesArray = formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      technologiesArray.forEach((technology) => {
        data.append("technologies", technology);
      });

      data.append("githubLink", formData.githubLink);
      data.append("liveLink", formData.liveLink);

      // Only send new image if user selected one
      if (image) {
        data.append("image", image);
      }

      const response = await updateProject(project._id, data);

      console.log("Updated project:", response);

      const updatedProject = response.data.data;

      setProjects((prev) =>
        prev.map((item) => (item._id === project._id ? updatedProject : item)),
      );

      setEditingProject(null);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="edit-project-section">
      <div className="edit-project-container">
        <div className="edit-project-header">
          <h2>Edit Project</h2>

          <button
            className="cancel-edit-btn"
            onClick={() => setEditingProject(null)}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label>Project Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="edit-form-group">
            <label>Project Thumbnail</label>

            {preview && (
              <img
                src={preview}
                alt={project.title}
                className="edit-project-preview"
              />
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="edit-form-group">
            <label>Technologies</label>

            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="edit-form-group">
            <label>GitHub Link</label>

            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Live Demo Link</label>

            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="update-project-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
