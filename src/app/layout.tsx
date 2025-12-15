import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./text-editor.css";
import { Toaster } from "react-hot-toast";
import CustomLayout from "@/custom-layout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wasan Jobs",
  description: "Jobs Portal for Recruiters and Job Seekers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${montserrat.className}`}>
        <CustomLayout>{children}</CustomLayout>
        <Toaster />
      </body>
    </html>
  );
}
