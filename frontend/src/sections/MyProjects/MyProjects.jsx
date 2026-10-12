import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/projectApi";

import UploadProject from "./UploadProject";
import EditProject from "./EditProject";
import ProjectCard from "./ProjectCard";

import "./MyProjects.css";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();

        console.log("Projects API response:", response);

        setProjects(response.data.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Delete project
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

  // Show upload form
  if (isUploading) {
    return (
      <UploadProject
        setProjects={setProjects}
        setIsUploading={setIsUploading}
      />
    );
  }

  // Show edit form
  if (editingProject) {
    return (
      <EditProject
        project={editingProject}
        setProjects={setProjects}
        setEditingProject={setEditingProject}
      />
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <div>
          <h2>My Projects</h2>

          <p>Some of the things I've built</p>
        </div>

        <button
          className="add-project-btn"
          onClick={() => setIsUploading(true)}
        >
          <span>+</span>
          Upload Project
        </button>
      </div>

      <div className="projects-list">
        {projects.length === 0 ? (
          <p className="no-projects">No projects added yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={() => setEditingProject(project)}
              onDelete={() => handleDelete(project._id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyProjects;
