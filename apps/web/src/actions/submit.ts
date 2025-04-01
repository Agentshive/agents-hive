"use server";
import { createServerAction } from "zsa";
import nodemailer from "nodemailer";
import { submitToolSchema } from "~/server/schemas";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const submitTool = createServerAction()
  .input(submitToolSchema)
  .handler(async (data) => {
    try {
      const emailContent = Object.entries(data.input)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join("\n");

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: "New Submission",
        html: `<h2>New Submission</h2>${emailContent}`,
      });

      return {
        name: "Submission",
        slug: "email-submission",
        publishedAt: new Date(),
        isFeatured: false,
      };
    } catch (error) {
      console.error("Email error:", error);
      if (error instanceof Error) {
        throw new Error("Failed to send email: " + error.message);
      } else {
        throw new Error("Failed to send email due to an unknown error.");
      }
    }
  });
