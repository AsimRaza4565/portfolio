"use client";

import Image from "next/image";
import Link from "next/link";
import LinkedInLogo from "../public/linkedin.webp";
import GitHubLogo from "../public/github.webp";
import InstagramLogo from "../public/instagram-logo.webp";

export default function Footer() {
  return (
    <section id="contact">
      <div className="w-full sm:px-8 xs:px-4 sm:mt-24 xs:mt-12 bg-white sm:pt-24 xs:pt-16 pb-1 mx-auto flex flex-col gap-4 items-center">
        <div className="flex sm:gap-5 xs:gap-3 flex-wrap justify-center text-lg font text-gray-800 lg:mb-5">
          <Link
            href={"#home"}
            className="hover:text-blue-800 hover:underline hover:font-semibold"
          >
            Home
          </Link>
          <Link
            href={"#background"}
            className="hover:text-blue-800 hover:underline hover:font-semibold"
          >
            About Me
          </Link>
          <Link
            href={"#services"}
            className="hover:text-blue-800 hover:underline hover:font-semibold"
          >
            Services
          </Link>
          <Link
            href={"#projects"}
            className="hover:text-blue-800 hover:underline hover:font-semibold"
          >
            Projects
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h2 className="text-xl md:text-2xl text-center font-semibold text-black">
            Let&apos;s Work Together
          </h2>
          <h3 className="xs:text-2xl sm:text-3xl font-semibold text-yellow-500">
            Asim Raza
          </h3>
        </div>
        <h4 className="text-xl lg:text-2xl text-center font-semibold text-gray-700">
          Frontend Developer | React/Next.js Developer
        </h4>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-md lg:text-lg text-center">
            Open to freelance and collaboration opportunities
          </p>
          <Link
            href="mailto:asimr4858@gmail.com"
            className="text-blue-800 hover:text-gray-800 hover:underline text-md"
          >
            asimr4858@gmail.com
          </Link>
        </div>
        <div className="flex items-center gap-4 pt-1">
          <Link
            href="https://www.linkedin.com/in/asim-raza-689636324/"
            aria-label="LinkedIn Profile"
            target="blank"
            rel="noopener noreferrer"
            className="w-[44] p-2 border border-gray-400 rounded-full hover:bg-yellow-200"
          >
            <Image
              src={LinkedInLogo}
              width={48}
              height={48}
              alt="Asim Raza LinkedIn Profile"
              className="w-full rounded-full"
            ></Image>
          </Link>
          <Link
            href="https://github.com/AsimRaza4565/"
            aria-label="Github Profile"
            target="blank"
            rel="noopener noreferrer"
            className="w-[44] p-2 border-1 border-gray-400 rounded-full hover:bg-yellow-200"
          >
            <Image
              src={GitHubLogo}
              width={48}
              height={48}
              alt="Asim Raza Github Profile"
              className="hover:bg-yellow-200 rounded-full w-full"
            ></Image>
          </Link>
          <Link
            href="https://www.instagram.com/asim_raza_awan"
            aria-label="Instagram Profile"
            target="blank"
            rel="noopener noreferrer"
            className="w-[44] p-2 border-1 border-gray-400 rounded-full hover:bg-yellow-200"
          >
            <Image
              src={InstagramLogo}
              width={36}
              height={36}
              alt="Asim Raza Instagram Profile"
              className="w-full rounded-md"
            ></Image>
          </Link>
        </div>
        <p className="mt-10 text-center">
          &copy; 2026 Asim Raza. <span className="font-semibold">All Rights Reserved.</span>
        </p>
      </div>
    </section>
  );
}
