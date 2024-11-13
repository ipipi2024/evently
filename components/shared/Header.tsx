"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = React.useState(false);

  React.useEffect(() => {
    // Ensure the theme is set before rendering
    setIsThemeLoaded(true);
  }, [theme]);

  if (!isThemeLoaded) {
    return null; // Optionally return a loader or empty state until the theme is loaded
  }

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src={theme === "dark" ? "/assets/images/logo-white.svg" : "/assets/images/logo.svg"}
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
