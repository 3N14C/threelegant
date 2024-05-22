import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Provider } from "@/providers/provider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={poppins.className}>
          <Provider>
            <div className="">{children}</div>
          </Provider>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
