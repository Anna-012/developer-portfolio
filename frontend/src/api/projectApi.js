import axios from "./axios";

export const getProjects = async () => {
  return await axios.get("/projects");
};

export const createProject = async (projectData) => {
  return await axios.post("/projects", projectData);
};

export const updateProject = async (id, projectData) => {
  return await axios.put(`/projects/${id}`, projectData);
};

export const deleteProject = async (id) => {
  return await axios.delete(`/projects/${id}`);
};
