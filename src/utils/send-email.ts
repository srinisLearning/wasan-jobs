"use server";

const nodemailer = require("nodemailer");

export const sendEmail = async ({
  email,
  subjectLine,
  content,
}: {
  email: string;
  subjectLine: string;
  content: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sathyaprakash195@gmail.com",
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const mailResponse = await transporter.sendMail({
      from: '"Next Job Board" <sathyaprakash195@gmail.com>',
      to: email,
      subject: subjectLine,
      html: content,
    });

    console.log("Mail response", mailResponse);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
