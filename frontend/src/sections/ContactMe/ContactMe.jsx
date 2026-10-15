import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContact } from "../../api/contactApi";

import ContactInfo from "./ContactInfo";
import EmailForm from "./EmailForm";
import "./ContactMe.css";

const ContactMe = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContact();
        setContact(response.data.data);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <p>Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-heading">
          <div>
            <h2>Contact Me</h2>
            <p>Let's build something amazing together.</p>
          </div>

          <button
            type="button"
            className="edit-contact-btn"
            onClick={() => navigate("/edit-contact")}
          >
            Edit Contact
          </button>
        </div>

        <div className="contact-content">
          <ContactInfo contact={contact} />
          <EmailForm />
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
