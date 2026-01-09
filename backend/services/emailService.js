import nodemailer from "nodemailer";

// Debug (remove after success)
console.log("📧 MAIL_USER:", process.env.MAIL_USER ? "OK" : "MISSING");
console.log("📧 MAIL_PASS:", process.env.MAIL_PASS ? "OK" : "MISSING");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // App password
  },
});

export const sendSupplierMail = async (supplierEmail, data) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: supplierEmail,
    subject: "New Customer Requirement",
    html: `
      <h3>New Requirement Received</h3>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Category:</b> ${data.category}</p>
      <p><b>Sub Category:</b> ${data.subCategory}</p>
      <p><b>Product:</b> ${data.product}</p>
      <p><b>Quantity:</b> ${data.quantity}</p>
      <p><b>Description:</b> ${data.description}</p>
      <p><b>Contact:</b> ${data.contact}</p>
    `,
  });
};
