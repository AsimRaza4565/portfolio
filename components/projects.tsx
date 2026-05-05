"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import RoleBasedImg from "../public/role-based-CRUD.webp";
import NextJsLogo from "../public/nextjs-logo.webp";
import FigmaImg from "../public/Figma.webp";
import CSSLogo from "../public/CSS-Logo.webp";
import ThreeStepImg from "../public/3-step-form.webp";
import JSLogo from "../public/javascript-logo.webp";
import { IProjectInfo } from "@/types";

const Project_Info: IProjectInfo = {
  Project_1: "Full-stack RBAC system with secure authentication and CRUD operations, built with Next.js and MongoDB. Features scalable architecture and a modern, responsive frontend.",
  Project_2: "Responsive website converted from Figma design, optimized for performance, cross-browser compatibility, and pixel-perfect accuracy.",
  Project_3: "Multi-step form wizard with real-time validation using vanilla JS. Smooth user navigation and clean data handling."
};

const projectsData = [
  {
    id: 1,
    description: Project_Info.Project_1,
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
    id: 2,
    description: Project_Info.Project_2,
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
  {
    id: 3,
    description: Project_Info.Project_3,
    mainImage: {
      src: ThreeStepImg,
      alt: "3-step-form",
      title: "3-step-form Project Thumbnail",
    },
    badgeImage: {
      src: JSLogo,
      alt: "JS Logo",
      title: "Built with modern JavaScript",
      width: 42,
      height: 42,
      className: "absolute top-[-24] left-[-24] rotate-325 rounded-lg",
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
              className="border-1 relative rounded-b-lg border-gray-700 hover:shadow-sm hover:shadow-gray-700 hover:scale-[1.02] transition-transform duration-500 ease-in-out"
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
              <p className="p-4 text-white text-lg md:min-h-[120] sm:h-auto text-left">
                {project.description}
              </p>
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
          <Button className="text-md px-3 py-1 my-8 shadow-sm shadow-gray-700 border-1 border-gray-700 hover:scale-105 rounded-3xl text-center text-gray-200">
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
