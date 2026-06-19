import type { Metadata } from "next";
import "./globals.css";
import TopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Rossin Apparel",
  description: "Data Analyst",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <TopLoader color="#2563eb" height={5} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}