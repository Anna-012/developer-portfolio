import { useState } from "react";
import { sendContactEmail } from "../../api/contactApi";
import "./EmailForm.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

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
    setStatus("");

    try {
      const response = await sendContactEmail(formData);

      setSuccess(true);
      setStatus(response.data.message || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSuccess(false);
      setStatus(
        error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          maxLength={254}
          required
        />
      </div>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        maxLength={150}
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        maxLength={5000}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message →"}
      </button>

      {status && (
        <p
          className={success ? "success-message" : "error-message"}
          role="status"
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default EmailForm;
