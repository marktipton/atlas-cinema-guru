import "@/app/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased  bg-[#00003c] text-white`}>
      <SessionProvider>
        <NavBar />
        <main>
          {children}
        </main>
      </SessionProvider>
      </body>
    </html>
  );
}
