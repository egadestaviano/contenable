import React from "react";
import Header from "@/components/layouts/AppHeader";
import Footer from "@/components/layouts/AppFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <main className="container mx-auto flex-1 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}
