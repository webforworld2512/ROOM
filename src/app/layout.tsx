import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ROOM",
  description: "Video Calling App",
  icons: { icon: '/icons/logo.svg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: 'icons/logo.svg',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: "#F5F0EB",
            colorPrimary: "#E8A84C",
            colorBackground: "#211C19",
            colorInputBackground: "#2E2722",
            colorInputText: "#F5F0EB",
          }
        }}>
        <body className="bg-room-void antialiased">
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
