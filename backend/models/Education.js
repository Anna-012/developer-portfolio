import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    startYear: {
      type: Number,
      required: true,
    },

    endYear: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
