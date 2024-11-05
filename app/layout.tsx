import "@/app/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { Header } from "@/components/Header";
import { TitlesProvider } from "@/contexts/TitlesProvider";
import { FilterProvider } from "@/contexts/FilterProvider";
import AuthGuard from "@/components/AuthGuard";
import { ToggleProvider } from "@/contexts/ToggleProvider";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#00003c] text-white`}>
        <SessionProvider>
          <FilterProvider>
            <TitlesProvider>
              <ToggleProvider>
                  <AuthGuard>
                    <header>
                      <Header />
                    </header>
                    <div className="flex h-full">
                      <div className="flex-grow-y">
                        <NavBar/>
                      </div>
                      <main className="flex-grow p-8 overflow-y-auto">
                        {children}
                      </main>
                    </div>
                  </AuthGuard>
              </ToggleProvider>
            </TitlesProvider>
          </FilterProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
