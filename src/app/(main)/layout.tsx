import React from "react";
import Header from "@/components/layouts/AppHeader";
import Footer from "@/components/layouts/AppFooter";
import { ReduxProvider } from "@/store/Provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <div className="w-full flex-1">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </div>

      <Footer />
    </div>
  );
}
