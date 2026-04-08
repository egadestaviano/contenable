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

      <div className="container mx-auto flex-1 py-6">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </div>

      <Footer />
    </div>
  );
}
