import { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../../api/skillApi";
import AddSkills from "./AddSkills";
import SkillsIcon from "./SkillsIcon";
import "./MySkills.css";

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();

        console.log("Skills API response:", data);

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

  if (isAdding) {
    return <AddSkills setSkills={setSkills} setIsAdding={setIsAdding} />;
  }

  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <h2>My Skills</h2>

        <button className="add-skill-btn" onClick={() => setIsAdding(true)}>
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
                      className="delete-skill-btn"
                      onClick={() => handleDelete(skill._id)}
                    >
                      🗑️
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
