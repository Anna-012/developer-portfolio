import axios from "./axios";

// Get all experiences
export const getExperiences = async () => {
  return await axios.get("/experience");
};

// Add experience
export const createExperience = async (experienceData) => {
  return await axios.post("/experience", experienceData);
};

// Update experience
export const updateExperience = async (id, experienceData) => {
  return await axios.put(`/experience/${id}`, experienceData);
};

// Delete experience
export const deleteExperience = async (id) => {
  return await axios.delete(`/experience/${id}`);
};
