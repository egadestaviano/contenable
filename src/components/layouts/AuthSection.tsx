"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function AuthSection() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="redirect">
            <Button
              variant="outline"
              size="sm"
              className="border-custom-light dark:border-neutral-700 hover:cursor-pointer text-custom-primary dark:text-custom-primary-dark hover:bg-custom-light/20 hover:text-custom-primary dark:hover:bg-neutral-800 dark:hover:text-custom-primary-dark"
            >
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="redirect">
            <Button
              size="sm"
              className="bg-custom-primary text-white hover:bg-custom-primary-hover hover:cursor-pointer dark:bg-custom-primary dark:hover:bg-custom-primary-hover"
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
                avatarBox: "w-7 h-7",
                userButtonPopoverCard:
                  "border border-custom-light shadow-none",
                userPreviewMainIdentifier: "font-serif text-custom-primary",
                userButtonPopoverActionButton:
                  "hover:bg-custom-light/20 text-custom-primary",
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
                avatarBox: "w-8 h-8",
                userButtonPopoverCard:
                  "border border-custom-light shadow-none",
                userPreviewMainIdentifier: "font-serif text-custom-primary",
                userButtonPopoverActionButton:
                  "hover:bg-custom-light/20 text-custom-primary",
                userButtonPopoverActionButtonText: "text-sm font-medium",
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}