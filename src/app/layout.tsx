import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/ReduxProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ToastProvider from "@/providers/ToastProvider";

const inter = IBM_Plex_Mono({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  metadataBase: new URL('https://todo-app-talha.vercel.app/'),
  title: {
    default: "Todo App",
    template: "%s | NextJs Todo App",
  },
  description:
    "Todo App with NextJS, Redux Toolkit, Next Auth, MongoDB, Prisma ORM and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <ToastProvider />
            <div className="bg-dotted-pattern  bg-dotted-size bg-vintageGardenBackground min-h-screen">
              {children}
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
