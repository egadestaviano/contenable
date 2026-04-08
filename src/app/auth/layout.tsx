import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account to join the Contenable community.",
  robots: {
    index: false,
    follow: false,
  },
};


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-background p-4 overflow-y-auto">
      <div className="w-full flex justify-center items-center py-8">
        {children}
      </div>
    </main>
  );
}

