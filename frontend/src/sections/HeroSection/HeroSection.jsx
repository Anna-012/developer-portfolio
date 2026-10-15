import { useEffect, useState } from "react";
import { getProfile } from "../../api/profileApi";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const loadingMessages = [
  "Convincing the code to behave...",
  "Asking bugs to leave quietly...",
  "Brewing some developer magic...",
  "Almost ready. No promises to the bugs!",
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data;
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <section className="portfolio-loader" aria-live="polite">
        <div className="loader-content">
          <div className="loader-circle">
            <span>💻</span>
          </div>

          <h2>Just a moment...</h2>

          <p key={messageIndex} className="loader-message">
            {loadingMessages[messageIndex]}
          </p>

          <div className="loader-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-card">
          {/* Pencil Edit Icon button */}
          <button
            type="button"
            className="edit-profile-icon"
            onClick={() => navigate("/edit-profile")}
            aria-label="Edit profile"
            title="Edit profile"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
            </svg>
          </button>

          <div className="profile-content">
            {/* Tumhara existing profile content yahan rahega */}
          </div>

          <div className="profile-content">
            <div className="profile-text">
              <p className="profile-greeting">Hi, I'm</p>

              <h1>{profile.name}</h1>

              <h2>{profile.role}</h2>

              <p className="profile-bio">{profile.shortBio}</p>

              <p className="profile-projects">
                {profile.projectsCompleted}+ Projects Made
              </p>

              <div className="profile-buttons">
                <a
                  href="https://github.com/Anna-012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn"
                >
                  View My Work
                </a>

                <a href="#contact" className="secondary-btn">
                  Contact Me
                </a>
              </div>
            </div>

            <div className="profile-image">
              {profile.image?.url ? (
                <img src={profile.image.url} alt={profile.name} />
              ) : (
                <div className="image-placeholder">Your Photo</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
