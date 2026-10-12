import { useEffect, useState } from "react";
import { getProfile } from "../../api/profileApi";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import "./HeroSection.css";

const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = (image) => {
    setProfile((prev) => ({
      ...prev,
      image: image,
    }));
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {isEditing ? (
          <EditProfile profile={profile} setProfile={setProfile} />
        ) : (
          <Profile profile={profile} />
        )}

        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Back" : "Edit Profile"}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
