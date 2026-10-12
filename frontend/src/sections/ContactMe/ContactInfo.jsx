import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./ContactInfo.css";

const ContactInfo = ({ contact }) => {
  return (
    <div className="contact-info">
      {/* Email */}
      <div className="contact-item">
        <FaEnvelope className="contact-icon" />

        <div>
          <h4>Email</h4>

          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>

      {/* Phone */}
      {contact.phone && (
        <div className="contact-item">
          <FaPhone className="contact-icon" />

          <div>
            <h4>Phone</h4>

            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </div>
        </div>
      )}

      {/* GitHub */}
      {contact.github && (
        <div className="contact-item">
          <FaGithub className="contact-icon" />

          <div>
            <h4>GitHub</h4>

            <a href={contact.github} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        </div>
      )}

      {/* LinkedIn */}
      {contact.linkedin && (
        <div className="contact-item">
          <FaLinkedin className="contact-icon" />

          <div>
            <h4>LinkedIn</h4>

            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
