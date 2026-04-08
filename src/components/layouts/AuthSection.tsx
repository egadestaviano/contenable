"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function AuthSection() {
  return (
    <>
      <SignedOut>
        <div className="hidden sm:flex items-center gap-2">
          <SignInButton mode="redirect">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <Button size="sm" className="bg-primary text-white">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="sm:hidden">
          <UserButton userProfileMode="modal" />
        </div>

        <div className="hidden sm:block">
          <UserButton
            userProfileMode="modal"
            appearance={{ elements: { avatarBox: "w-8 h-8" } }}
          />
        </div>
      </SignedIn>
    </>
  );
}
