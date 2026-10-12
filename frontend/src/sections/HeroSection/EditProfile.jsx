import { useState } from "react";
import { updateProfile } from "../../api/profileApi";
import UploadPhoto from "../common/UploadPhoto";
import "./EditProfile.css";

const EditProfile = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    role: profile.role || "",
    shortBio: profile.shortBio || "",
    projectsCompleted: profile.projectsCompleted || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "projectsCompleted" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfile(formData);

      setProfile(data.data);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
      />

      <textarea
        name="shortBio"
        value={formData.shortBio}
        onChange={handleChange}
        placeholder="Short Bio"
      />

      <UploadPhoto setProfile={setProfile} />

      <input
        type="number"
        name="projectsCompleted"
        value={formData.projectsCompleted}
        onChange={handleChange}
        placeholder="Projects Completed"
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;
