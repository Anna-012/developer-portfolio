import { useEffect, useState } from "react";
import { getContact } from "../../api/contactApi";

import ContactInfo from "./ContactInfo";
import EditContact from "./EditContact";
import EmailForm from "./EmailForm";

import "./ContactMe.css";

const ContactMe = () => {
  const [contact, setContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
      <section className="contact-section">
        <div className="contact-container">
          <p>Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Heading */}
        <div className="contact-heading">
          <div>
            <h2>Contact Me</h2>
            <p>Let's build something amazing together.</p>
          </div>

          {!isEditing && (
            <button
              className="edit-contact-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Contact
            </button>
          )}
        </div>

        {/* Contact Content */}
        {isEditing ? (
          <EditContact
            contact={contact}
            setContact={setContact}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="contact-content">
            {/* Left Side */}
            <ContactInfo contact={contact} />

            {/* Right Side */}
            <EmailForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactMe;
