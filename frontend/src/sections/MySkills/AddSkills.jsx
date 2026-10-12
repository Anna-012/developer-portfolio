import { useState } from "react";
import { createSkill } from "../../api/skillApi";
import "./AddSkills.css";

const AddSkills = ({ setSkills, setIsAdding }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createSkill(formData);

      setSkills((prev) => [...prev, data.data.data]);

      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  };

  return (
    <section className="add-skill-section">
      <h2>Add Skill</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Skill name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="icon"
          placeholder="Icon"
          value={formData.icon}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <button type="submit">Add Skill</button>

        <button type="button" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddSkills;
