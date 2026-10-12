import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// Add project
export const addProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;

    let image = {};

    // Upload image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio/projects",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        uploadStream.end(req.file.buffer);
      });

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const project = await Project.create({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (error) {
    console.error("Failed to add project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add project",
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const { title, description, technologies, githubLink, liveLink } = req.body;

    // Update normal fields
    project.title = title;
    project.description = description;
    project.technologies = technologies;
    project.githubLink = githubLink;
    project.liveLink = liveLink;

    // If a new image was selected
    if (req.file) {
      // Delete old Cloudinary image
      if (project.image?.public_id) {
        await cloudinary.uploader.destroy(project.image.public_id);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio/projects",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        uploadStream.end(req.file.buffer);
      });

      project.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedProject = await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Failed to update project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete image from Cloudinary
    if (project.image?.public_id) {
      await cloudinary.uploader.destroy(project.image.public_id);
    }

    // Delete project from MongoDB
    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
