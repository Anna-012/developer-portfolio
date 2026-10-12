import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { name, icon, category } = req.body;

    const skill = await Skill.create({
      name,
      icon,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add skill",
      error: error.message,
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, category } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        category,
      },
      { new: true, runValidators: true },
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};
