import Experience from "../models/Experience.js";

// Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      startDate: -1,
    });

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Get experiences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
};

// Add experience
export const addExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, description } = req.body;

    const experience = await Experience.create({
      company,
      role,
      startDate,
      endDate,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Add experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add experience",
    });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Update experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};
