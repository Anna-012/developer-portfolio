import mongoose from "mongoose";
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
    },

    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Skill = new mongoose.model("Skill", skillSchema);

export default Skill;
