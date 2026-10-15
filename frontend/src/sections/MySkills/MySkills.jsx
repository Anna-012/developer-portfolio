import { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../../api/skillApi";

import SkillsIcon from "./SkillsIcon";
import { useNavigate } from "react-router-dom";
import "./MySkills.css";

const MySkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();

        setSkills(data.data.data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);

      setSkills((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  // Get unique categories
  const categories = [
    ...new Set(skills.map((skill) => skill.category).filter(Boolean)),
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <h2>My Skills</h2>

        <button
          className="add-skill-btn"
          onClick={() => navigate("/add-skills")}
        >
          <span>+</span> Add Skill
        </button>
      </div>

      <div className="skills-container">
        {categories.map((category) => (
          <div className="skill-category" key={category}>
            <h3>{category}</h3>

            <div className="skills-list">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div className="skill-card" key={skill._id}>
                    <div className="skill-icon">
                      <SkillsIcon skillName={skill.name} />
                    </div>

                    <p>{skill.name}</p>

                    <button
                      type="button"
                      className="delete-skill-btn"
                      onClick={() => handleDelete(skill._id)}
                      title="Delete skill"
                      aria-label="Delete skill"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v5M14 11v5" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkills;
