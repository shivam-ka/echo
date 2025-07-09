import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/config/font";
import AuthProvider from "@/context/AuthProvider";


export const metadata: Metadata = {
  title: "Echo - Feedback Reimagined",
  description: "Collect, analyze, and act on user feedback with Echo - the modern feedback platform for teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${fontVariables} antialiased`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
