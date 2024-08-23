import prisma from "@/../prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
export const mailer = async ({ email, emailType, userId }: any) => {
  try {
    const token = uuidv4();
    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "CHANGE") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          changeEmailToken: token,
          changeEmailTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
      },
    });

    const getMailHtml = () => {
      if (emailType === "VERIFY")
        return `<p>Click <a href="https://${process.env.DOMAIN}/verify-email?token=${token}">here</a> to verify your email
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${token}
                </p>`;
      else if (emailType === "RESET") {
        return `<p>Click <a href="https://${process.env.DOMAIN}/reset-password?token=${token}">here</a> to reset your password
                    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}
                    </p>`;
      } else if (emailType === "CHANGE") {
        return `<p>Click <a href="https://${process.env.DOMAIN}/change-email?token=${token}&email=${email}">here</a> to change your email address
                    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/change-email?token=${token}&email=${email}
                    </p>`;
      }
    };

    const mailData = {
      from: "talhakhan8300@gmail.com",
      to: [email],
      subject:
        emailType === "VERIFY" || emailType === "CHANGE"
          ? "Verify your email"
          : "Reset your password",
      html: getMailHtml(),
    };

    await transporter.sendMail(mailData);
  } catch (error) {
    console.log("error while sending email " + error);
  }
};
