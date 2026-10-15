import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjects, updateProject } from "../../api/projectApi";
import "./EditProject.css";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
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
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await getProjects();
        const projects = response.data.data;
        const foundProject = projects.find((item) => item._id === id);

        if (!foundProject) {
          setError("Project not found.");
          return;
        }

        setProject(foundProject);
        setFormData({
          title: foundProject.title || "",
          description: foundProject.description || "",
          technologies: foundProject.technologies?.join(", ") || "",
          githubLink: foundProject.githubLink || "",
          liveLink: foundProject.liveLink || "",
        });
        setPreview(foundProject.image?.url || null);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project) return;

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

      await updateProject(project._id, data);
      navigate("/#projects");
    } catch (err) {
      console.error("Failed to update project:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update project. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <section className="edit-project-section">
        <div className="edit-project-container">
          <p>Loading project...</p>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="edit-project-section">
        <div className="edit-project-container">
          <p>{error || "Project not found."}</p>
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={() => navigate("/#projects")}
          >
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="edit-project-section">
      <div className="edit-project-container">
        <div className="edit-project-header">
          <h2>Edit Project</h2>

          <button
            type="button"
            className="cancel-edit-btn"
            onClick={() => navigate("/#projects")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label htmlFor="edit-title">Project Title</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-image">Project Thumbnail</label>

            {preview && (
              <img
                src={preview}
                alt={project.title}
                className="edit-project-preview"
              />
            )}

            <input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-technologies">Technologies</label>
            <input
              id="edit-technologies"
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-github">GitHub Link</label>
            <input
              id="edit-github"
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-live">Live Demo Link</label>
            <input
              id="edit-live"
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

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
