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
        <div className="flex items-center gap-2">
          <SignInButton mode="redirect">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-none border-custom-light dark:border-neutral-700 text-custom-primary dark:text-custom-primary-dark hover:bg-custom-light/20 hover:text-custom-primary dark:hover:bg-neutral-800 dark:hover:text-custom-primary-dark"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <Button 
              size="sm" 
              className="rounded-none bg-custom-primary text-white hover:bg-custom-primary-hover dark:bg-custom-primary dark:hover:bg-custom-primary-hover"
            >
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>

        <div className="sm:hidden">
          <UserButton 
            userProfileMode="modal"
            appearance={{
              elements: {
                avatarBox: "w-7 h-7 rounded-none",
                userButtonTrigger: "rounded-none",
                userButtonPopoverCard: "rounded-none border border-custom-light shadow-none",
                userButtonPopoverMain: "rounded-none",
                userButtonPopoverFooter: "rounded-none",
                userPreviewMainIdentifier: "font-serif text-custom-primary",
                userButtonPopoverActionButton: "rounded-none hover:bg-custom-light/20 text-custom-primary",
                userButtonPopoverActionButtonText: "text-sm font-medium",
              },
            }}
          />
        </div>

        <div className="hidden sm:block">
          <UserButton
            userProfileMode="modal"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 rounded-none",
                userButtonTrigger: "rounded-none",
                userButtonPopoverCard: "rounded-none border border-custom-light shadow-none",
                userButtonPopoverMain: "rounded-none",
                userButtonPopoverFooter: "rounded-none",
                userPreviewMainIdentifier: "font-serif text-custom-primary",
                userButtonPopoverActionButton: "rounded-none hover:bg-custom-light/20 text-custom-primary",
                userButtonPopoverActionButtonText: "text-sm font-medium",
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}
