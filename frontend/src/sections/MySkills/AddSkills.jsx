import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSkill } from "../../api/skillApi";
import "./AddSkills.css";

const AddSkills = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",

    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createSkill(formData);
      navigate("/#skills");
    } catch (error) {
      console.error("Failed to add skill:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add skill. Please try again.",
      );
    } finally {
      setLoading(false);
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
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Skill"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/#skills")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddSkills;
