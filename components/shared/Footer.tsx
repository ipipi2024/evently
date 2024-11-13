"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Footer = () => {
  const { theme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Ensure theme is set before rendering
    setIsThemeLoaded(true);
  }, [theme]);

  if (!isThemeLoaded) {
    return null; // Optionally, show a loading state here
  }

  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src={theme === "dark" ? "/assets/images/logo-white.svg" : "/assets/images/logo.svg"} 
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p>2023 Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;
