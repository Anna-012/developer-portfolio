import "./Profile.css";

const Profile = ({ profile }) => {
  return (
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
  );
};

export default Profile;
