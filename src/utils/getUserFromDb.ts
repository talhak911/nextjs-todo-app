// import prisma from "prismaClientPath";

// export const getUserFromDb=async({email,password}:{email:string,password:string})=> {
//   const user=  await prisma.user.findFirst({ where: { email} });
//         if (!user) {
//             throw new Error("Invalid Email or Password!");
//         }
//         if (user.provider === 'google'){
//             throw new Error("this account is associated with Google please login with Google");
//         }
//         const validPassword = await bcryptjs.compare(credentials.password as string, user.password);
//         if (!validPassword) {
//             throw new Error("Invalid Email or Password!");
//         }

//         if (!user.isVerified) {
//             await sendEmail({ email: user.email, emailType: 'VERIFY', userId: user.id });
//             throw new Error("Verify your account. Email has been sent to you.");
//         }

//         return user;
// }