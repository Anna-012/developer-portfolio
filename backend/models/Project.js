import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    githubLink: {
      type: String,
      trim: true,
    },

    liveLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
