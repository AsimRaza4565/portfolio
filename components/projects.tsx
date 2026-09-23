"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import RoleBasedImg from "../public/role-based-CRUD.webp";
import ReactNativeImg from "../public/react-native.webp";
import BettermentImage from "../public/betterment.webp";
import NextJsLogo from "../public/nextjs-logo.webp";
import FigmaImg from "../public/Figma.webp";
import CSSLogo from "../public/CSS-Logo.webp";
import { IProjectInfo } from "@/types";

const Project_Info: IProjectInfo = {
  Project_1: {
    title: "Betterment",
    description:
      "Full-stack civic-engagement mobile app (React Native/Expo, Node.js/Express, PostgreSQL/Prisma) built in ~2 days for a hackathon — gamification engine, AI-powered photo verification via Google Gemini vision, Urdu-language support. Won a placement for Revnix at the Build for Pakistan 'Best Software Solution' hackathon.",
  },
  Project_2: {
    title: "Scalable Authz System",
    description:
      "An enterprise-grade, full-stack application centered around an end-to-end Role-Based Access Control (RBAC) engine using Next.js (App Router), TypeScript, and MongoDB. The platform integrates authentication, dynamic role assignment, and granular permission enforcement across two primary content domains: Posts and Events.",
  },
  Project_3: {
    title: "Figma to Web",
    description:
      "Engineered a high-performance, fully responsive web application translated from Figma design with pixel-perfect precision. The project bridges design and frontend engineering by implementing fluid, mobile-first layouts across all device breakpoints, ensuring seamless visual continuity from displays down to mobile screens.",
  }
};

const projectsData = [
  {
    id: 1,
    title: Project_Info.Project_1.title,
    description: Project_Info.Project_1.description,
    mainImage: {
      src: BettermentImage,
      alt: "Betterment",
      title: "Betterment App Thumbnail",
    },
    badgeImage: {
      src: ReactNativeImg,
      alt: "Betterment",
      title: "Built with React Native Framework",
      width: 50,
      height: 50,
      className: "absolute top-[-24] left-[-24] rotate-325 rounded-full",
    },
  },
  {
    id: 2,
    title: Project_Info.Project_2.title,
    description: Project_Info.Project_2.description,
    mainImage: {
      src: RoleBasedImg,
      alt: "Role-Based CRUD",
      title: "Role-Based CRUD Project Thumbnail",
    },
    badgeImage: {
      src: NextJsLogo,
      alt: "Next.js Logo",
      title: "Built with Next.js Framework",
      width: 50,
      height: 50,
      className: "absolute top-[-24] left-[-24] rotate-325 rounded-full",
    },
  },
  {
    id: 3,
    title: Project_Info.Project_3.title,
    description: Project_Info.Project_3.description,
    mainImage: {
      src: FigmaImg,
      alt: "Figma to Web",
      title: "Figma to Web Project Thumbnail",
    },
    badgeImage: {
      src: CSSLogo,
      alt: "CSS Logo",
      title: "Styled with Custom CSS",
      width: 58,
      height: 58,
      className: "absolute top-[-28] left-[-28] rotate-325",
    },
  },
];

export default function Projects() {
  return (
    <section className="py-3" id="projects">
      <div className="max-w-[1200px] mx-auto sm:mt-24 xs:mt-12 px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="text-lg px-3 py-1 mb-4 shadow-md shadow-gray-700 border border-gray-700 rounded-3xl text-black bg-gray-300 inline-block"
        >
          Selected Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="text-gray-300 text-lg sm:text-base leading-7 mb-10"
        >
          Real-world projects demonstrating clean code, modern frameworks, and scalable solutions.
        </motion.p>


        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-y-8 gap-6 xs:grid-cols-1 md:p-0 sm:px-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="border relative rounded-b-lg border-gray-700 hover:shadow-sm hover:shadow-gray-700 hover:scale-[1.02] transition-transform duration-500 ease-in-out"
            >
              <div className="h-[200px]">
                <Image
                  src={project.mainImage.src}
                  width={768}
                  height={200}
                  alt={project.mainImage.alt}
                  title={project.mainImage.title}
                  className="w-full h-full"
                ></Image>
              </div>
              <Image
                src={project.badgeImage.src}
                height={project.badgeImage.height}
                width={project.badgeImage.width}
                alt={project.badgeImage.alt}
                title={project.badgeImage.title}
                className={project.badgeImage.className}
              />
              <div className="p-4 text-white text-lg md:min-h-[120] sm:h-auto text-left flex flex-col gap-2">
                <span className="font-semibold text-xl">{project.title}</span>
                <span className="text-base text-gray-300">{project.description}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="flex justify-center"
        >
          <Button className="text-md px-3 py-1 my-8 shadow-sm shadow-gray-700 border border-gray-700 hover:scale-105 rounded-3xl text-center text-gray-200">
            <a
              href="https://github.com/AsimRaza4565/"
              target="blank"
              rel="noopener noreferrer"
            >
              Explore My Work
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
