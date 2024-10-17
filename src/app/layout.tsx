import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { Sidebar } from "./_components/sidebar";
import { CSPostHogProvider } from "./_analytics/provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Answerstack",
  description: "A Q&A platform for everyone.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="flex min-h-screen flex-col bg-background">
            <TopNav />
            <div className="flex flex-grow">
              <aside className="w-64 flex-shrink-0 border-r border-border p-4">
                <Sidebar />
              </aside>
              <main className="flex-grow p-4">{children}</main>
              <Toaster richColors />
            </div>
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
