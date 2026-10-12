import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  shortBio: {
    type: String,
  },

  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },

  projectsCompleted: {
    type: Number,
    default: 0,
  },
});

const Profile = new mongoose.model("Profile", profileSchema);
export default Profile;
