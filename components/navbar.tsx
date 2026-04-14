"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AsimLogo from "../public/Asim.webp";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center sm:px-8 xs:px-4 sm:py-3 xs:py-1">
        {/* Logo */}
        <a href="#home">
          <div className="flex items-center w-[150] h-[84]">
            <Image
              src={AsimLogo}
              alt="Author Asim-Raza"
              width={136}
              height={36}
            />
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent className="flex gap-2 text-blue-700">
                  <Link href="#home">
                    <NavigationMenuLink>Home</NavigationMenuLink>
                  </Link>
                  <Link href="#background">
                    <NavigationMenuLink>Background</NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Expertise</NavigationMenuTrigger>
                <NavigationMenuContent className="flex gap-2 text-blue-700">
                  <Link href="#skills">
                    <NavigationMenuLink>Skills</NavigationMenuLink>
                  </Link>
                  <Link href="#services">
                    <NavigationMenuLink>Services</NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Work</NavigationMenuTrigger>
                <NavigationMenuContent className="flex gap-2 text-blue-700">
                  <Link href="#projects">
                    <NavigationMenuLink>Projects</NavigationMenuLink>
                  </Link>
                  <Link href="#experience">
                    <NavigationMenuLink>Experience</NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="#blogs"
                  className="rounded-sm px-4 py-2 text-md font-medium mr-4 text-white hover:text-gray-200 hover:underline"
                >
                  Blogs
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="#contact"
                  className="rounded-sm bg-background px-4 py-2 text-md font-medium hover:bg-gray-200 hover:text-accent-foreground disabled:pointer-events-none"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button title="Menu" className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-gray-900 text-white border-l border-gray-700 w-[80vw] sm:w-[250px] [&>button]:top-8 [&>button]:right-6 [&>button_svg]:size-6"
            >
              <nav className="flex flex-col gap-6 mt-14 text-lg sm:text-xl xs:px-3 sm:px-6">
                {/* About Section */}
                <Collapsible className="mt-6 pr-4">
                  <CollapsibleTrigger className="flex justify-between items-center font-semibold w-full gap-2">
                    <span>About</span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 space-y-1">
                    <Link
                      href="#home"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Home
                    </Link>
                    <Link
                      href="#background"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Background
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* Expertise Section */}
                <Collapsible className="pr-4">
                  <CollapsibleTrigger className="flex justify-between items-center font-semibold w-full gap-2">
                    <span>Expertise</span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 space-y-1">
                    <Link
                      href="#skills"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Skills
                    </Link>
                    <Link
                      href="#services"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Services
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* Work Section */}
                <Collapsible className="pr-4">
                  <CollapsibleTrigger className="flex justify-between items-center font-semibold w-full gap-2">
                    <span>Work</span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 space-y-1">
                    <Link
                      href="#projects"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Projects
                    </Link>
                    <Link
                      href="#experience"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:underline"
                    >
                      Experience
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* Direct Links */}
                <Link
                  href="#blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold hover:underline"
                >
                  Blogs
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold bg-white text-black xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 rounded-md w-full text-base text-center sm:text-lg"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
