import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Portfolio Contact Message from ${name}`,

    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
  };

  await transporter.sendMail(mailOptions);
};
