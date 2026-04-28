"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RevnixLogo from "../public/revnix-logo.webp";
import RhombixLogo from "../public/rhombix-logo.webp";
import BispLogo from "../public/bisp-logo.webp";
import Link from "next/link";
import { IExperience } from "@/types";

const experiences: IExperience[] = [
  {
    id: "experience_1",
    title:
      "Frontend Developer at Revnix (formerly Revnix Technologies), Haripur, KPK, Pakistan",
    desc: "Contribute to the development and maintenance of production-grade client applications and company products using React.js, Next.js, TypeScript, Tailwind CSS, and Shadcn UI. Focus on building reusable UI components, integrating APIs, implementing custom filters, and enhancing responsiveness, performance, accessibility, and SEO across scalable frontend systems.",
    duration: "January 2026 – Present",
    previousRole: "Previously: Frontend Intern (April 2025 – December 2025)",
    logo: RevnixLogo,
    href: "https://www.revnix.com",
    alt: "Revnix Logo",
    logoTitle: "Revnix Technologies",
    logoClassName: "rounded-full shadow-md shadow-yellow-500",
  },
  {
    id: "experience_2",
    title: "Web Developer Intern (Remote) at Rhombix Technologies, Lahore, Pakistan",
    desc: "Developed interactive frontend applications using React, JavaScript, HTML, CSS, and Tailwind CSS, focusing on functionality, usability, and responsive design. Built features such as search, categorization, playlist management, and dynamic UI updates across multiple applications, including a library management system and a music player.",
    duration: "October 2025 – January 2026",
    logo: RhombixLogo,
    href: "https://www.rhombixtechnologies.com",
    alt: "Rhombix Logo",
    logoTitle: "Rhombix Technologies",
    logoClassName: "",
  },
  {
    id: "experience_3",
    title:
      "Web Developer Intern at Benazir Income Support Programme Headquarters, Islamabad, Pakistan",
    desc: "Supported web application development using C#, SQL, and Bootstrap by building responsive web forms and functional interfaces. Gained practical experience working within structured development workflows and real-world system requirements in a government environment.",
    duration: "July 2024 – September 2024",
    logo: BispLogo,
    href: "https://bisp.gov.pk",
    alt: "BISP Logo",
    logoTitle: "BISP Organization",
    logoClassName: "",
  },
];

export default function Experience() {
  return (
    <section className="py-3" id="experience">
      <div className="max-w-[1200px] mx-auto sm:mt-24 xs:mt-12 sm:px-8 xs:p-6">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="flex justify-center"
        >
          <h2 className="text-lg px-3 py-1 mb-4 shadow-md shadow-gray-700 border border-gray-700 rounded-3xl text-center text-black bg-gray-300">
            Professional Experience
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="text-gray-300 text-center text-lg! sm:text-base leading-7 mb-10"
        >
          Hands-on experience delivering scalable frontend solutions
        </motion.p>

        {experiences.map((exp, index) => (
          <div key={exp.id} className="mb-16 lg:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <h2 className="xs:text-2xl sm:text-3xl pb-2 font-semibold text-yellow-500">
                {exp.title}
              </h2>
              <span className="text-md font-semibold text-gray-400">
                {exp.duration}
              </span>

              {exp.previousRole && (
                <p className="text-sm sm:text-base text-gray-500 pt-1">
                  {exp.previousRole}
                </p>
              )}
            </motion.div>

            <div className={`flex items-center xs:gap-4 mb-8 lg:flex-row xs:flex-col`}>
              <p className={`py-4 text-lg lg:w-2/3 ${index === 0 ? "xs:w-full" : "sm:w-full"} text-white`}>
                {exp.desc}
              </p>

              <motion.div
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className="lg:w-1/3 xs:w-full flex justify-center"
              >
                <Link
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={exp.logo}
                    width={180}
                    height={180}
                    alt={exp.alt}
                    title={exp.logoTitle}
                    className={exp.logoClassName}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}