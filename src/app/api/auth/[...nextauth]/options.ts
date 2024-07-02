
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import { prisma } from "../../../../../prisma/client";
// import bcryptjs from 'bcryptjs';
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { sendEmail } from "@/utils/mailer";
// import { AuthOptions } from "next-auth";
// export const authOptions:AuthOptions = {
//   // Configure one or more authentication providers
//   adapter:PrismaAdapter(prisma),
//   providers: [
    
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           email: { label: "Email", type: "text", placeholder: "user@example.com" },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//             if (!credentials?.email || !credentials?.password) {
//                 throw new Error("Email and Password are required");
//               }
//           const user = await prisma.user.findFirst({ where: { email: credentials?.email } });
//           if (!user) {
//             throw new Error("Invalid Email or Password!");
//           }
          
//           const validPassword = await bcryptjs.compare(credentials.password, user.password);
//           if (!validPassword) {
//             throw new Error("Invalid Email or Password!");
//           }
  
//           if (!user.isVerified) {
//             await sendEmail({ email: user.email, emailType: 'VERIFY', userId: user.id });
//             throw new Error("Verify your account. Email has been sent to you.");
//           }
  
//           return user;
//         },
//       }),
     
//   ],
//   callbacks: {
   
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
     
//       return session;
//     },
//   },

//   // pages:{
//   //   signIn:"/sign-in"
//   // }
  
// }

