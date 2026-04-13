"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RevnixLogo from "../public/revnix-logo.png";
import BispLogo from "../public/bisp-logo.png";

const experiences = {
  experience_1: {
    title:
      "Frontend Developer at Revnix (formerly Revnix Technologies), Haripur, KPK, Pakistan",
    desc: "Contribute to the development and maintenance of production-grade client applications using React.js, TypeScript, Next.js, Tailwind CSS, and Shadcn UI. Focus on building reusable UI components, integrating APIs, implementing custom filters, and enhancing responsiveness, performance, accessibility, and SEO across scalable frontend systems.",
    duration: "January 2026 – Present",
    previousRole: "Previously: Frontend Intern (April 2025 – December 2025)",
  },
  experience_2: {
    title:
      "Web Developer Intern at Benazir Income Support Programme Headquarters, Islamabad, Pakistan",
    desc: "Supported web application development using C#, SQL, and Bootstrap by building responsive web forms and functional interfaces. Gained practical experience working within structured development workflows and real-world system requirements in a government environment.",
    duration: "July 2024 – September 2024",
  },
};

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

        {/* Experience 1 */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <h2 className="xs:text-2xl sm:text-3xl pb-2 font-semibold text-orange-500">
            {experiences.experience_1.title}
          </h2>
          <span className="text-md font-semibold text-gray-400">
            {experiences.experience_1.duration}
          </span>

          <p className="text-sm sm:text-base text-gray-500 pt-1">
            {experiences.experience_1.previousRole}
          </p>
        </motion.div>

        <div className="flex items-center xs:gap-4 mb-8 lg:flex-row xs:flex-col">
          <p className="pt-3 text-lg lg:w-2/3 xs:w-full sm:pb-8 text-white">
            {experiences.experience_1.desc}
          </p>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="lg:w-1/3 xs:w-full flex justify-center relative"
          >
            <a
              href="https://www.revnix.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={RevnixLogo}
                width={200}
                height={200}
                alt="Revnix Logo"
                className="rounded-full shadow-md shadow-orange-500"
              />
            </a>
          </motion.div>
        </div>

        {/* Experience 2 */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <h2 className="xs:text-2xl sm:text-3xl pb-2 font-semibold text-orange-500">
            {experiences.experience_2.title}
          </h2>
          <span className="text-md font-semibold text-gray-400">
            {experiences.experience_2.duration}
          </span>
        </motion.div>

        <div className="flex items-center xs:gap-4 lg:flex-row xs:flex-col">
          <p className="pt-3 text-lg lg:w-2/3 sm:w-full sm:pb-8 text-white">
            {experiences.experience_2.desc}
          </p>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="lg:w-1/3 xs:w-full flex justify-center relative"
          >
            <a
              href="https://bisp.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={BispLogo}
                width={200}
                height={200}
                alt="BISP Logo"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}