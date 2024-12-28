import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: "NotesFlow",
  description: "NotesFlow is a note taking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ToastContainer />
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
