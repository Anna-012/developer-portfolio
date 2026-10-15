import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../../api/projectApi";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import "./MyProjects.css";

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <div>
          <h2>My Projects</h2>
          <p>Some of the things I've built</p>
        </div>

        <button
          type="button"
          className="add-project-btn"
          onClick={() => navigate("/add-project")}
        >
          <span>+</span>
          Upload Project
        </button>
      </div>

      <div className="projects-list">
        {loading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : projects.length === 0 ? (
          <p className="no-projects">No projects added yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={() => navigate(`/edit-project/${project._id}`)}
              onDelete={() => handleDelete(project._id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyProjects;
