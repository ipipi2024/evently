"use client"

import { useTheme } from "next-themes";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";

const MobileNav = () => {
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
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image 
                        src={theme === "dark" ? "/assets/icons/menu-white.svg" : "/assets/icons/menu.svg"}
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent className="dark:bg-gray-900 flex flex-col gap-6 bg-white md:hidden">
                    <Image 
                        src={theme === "dark" ? "/assets/images/logo-white.svg" : "/assets/images/logo.svg"}
                        alt="logo"
                        width={128}
                        height={38}
                    />
                    <Separator className="border border-gray-50" />
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>
    );
};

export default MobileNav;
