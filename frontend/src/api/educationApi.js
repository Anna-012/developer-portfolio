import axios from "./axios";

export const getEducation = async () => {
  return await axios.get("/education");
};

export const createEducation = async (educationData) => {
  return await axios.post("/education", educationData);
};

export const updateEducation = async (id, educationData) => {
  return await axios.put(`/education/${id}`, educationData);
};

export const deleteEducation = async (id) => {
  return await axios.delete(`/education/${id}`);
};
