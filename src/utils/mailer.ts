import { Resend } from 'resend';
import prisma from '@/../prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Generate a UUID token
        const token = uuidv4();

        if (emailType === "VERIFY") {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    verifyToken: token,
                    verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
                },
            });
        } else if (emailType === "RESET") {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    forgotPasswordToken: token,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
                },
            });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log(resend + "my key " + process.env.RESEND_API_KEY);
       
        const mailOptions = {
            from: 'onboarding@resend.dev',
            to: [email],
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? 
                `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${token}">here</a> to verify your email
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${token}
                </p>` :
                `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${token}">here</a> to reset your password
                  or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}
                  </p>`
             
        };

        const { data, error } = await resend.emails.send(mailOptions);
        console.log('data is ' + data + " error is " + error);
    } catch (error) {
        console.log("error while sending email " + error);
    }
};
