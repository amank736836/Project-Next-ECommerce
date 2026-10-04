import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/app.scss";

export const metadata: Metadata = {
  title: "VirtuoStore - Premium E-commerce",
  description: "Shop the best products at VirtuoStore. Quality, Speed, and Trust.",
  icons: {
    icon: "/icon.svg",
  },
};

import ReduxProvider from "@/components/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
