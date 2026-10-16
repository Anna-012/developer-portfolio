import axios from "axios";

const API_URL = "https://developer-portfolio-q0a0.onrender.com/api/contact";

// Get contact information
export const getContact = async () => {
  const response = await axios.get(API_URL);
  return response;
};

// Create contact information
export const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData);
  return response;
};

// Update contact information
export const updateContact = async (contactData) => {
  const response = await axios.put(API_URL, contactData);
  return response;
};

// Send message to portfolio owner's Gmail
export const sendContactEmail = async (emailData) => {
  const response = await axios.post(`${API_URL}/send-email`, emailData);

  return response;
};
