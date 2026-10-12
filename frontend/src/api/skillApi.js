import axios from "./axios";

export const getSkills = async () => {
  return await axios.get("/skills");
};

export const createSkill = async (skillData) => {
  return await axios.post("/skills", skillData);
};

export const updateSkill = async (id, skillData) => {
  return await axios.put(`/skills/${id}`, skillData);
};

export const deleteSkill = async (id) => {
  return await axios.delete(`/skills/${id}`);
};
