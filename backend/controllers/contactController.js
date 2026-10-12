import Contact from "../models/Contact.js";

// Get contact information
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact information not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact information",
    });
  }
};

// Create contact information
export const createContact = async (req, res) => {
  try {
    const { email, phone, github, linkedin } = req.body;

    const existingContact = await Contact.findOne();

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "Contact information already exists",
      });
    }

    const contact = await Contact.create({
      email,
      phone,
      github,
      linkedin,
    });

    return res.status(201).json({
      success: true,
      message: "Contact information created successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create contact information",
    });
  }
};

// Update contact information
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact information not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact information updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact information",
    });
  }
};
