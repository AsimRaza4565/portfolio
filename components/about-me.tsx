"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import EduSymbol from "../public/education-symbol.svg";
import CertSymbol from "../public/certifications-symbol.png";

export default function About() {
  return (
    <section className="sm:mt-24 xs:mt-12 py-3" id="background">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="max-w-[1200px] mx-auto px-8"
      >
        <div className="flex justify-center">
          <h2 className="text-lg px-3 py-1 mb-4 shadow-md shadow-gray-700 border-1 border-gray-700 rounded-3xl text-center text-black bg-gray-300">
            About Me
          </h2>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-300 text-center text-lg! sm:text-base leading-7 mb-10">
            The education, certifications, and hands-on learning behind my development journey.
          </p>
        </div>
        <div className="mx-auto space-y-5">
          {/* Education Card */}
          <div className="bg-gray-200 sm:px-8 sm:py-6 xs:px-4 xs:py-3 rounded-lg shadow-lg shadow-gray-600 hover:scale-101 transition-transform duration-500 ease-in-out">
            <div className="flex gap-3 items-center border-b border-gray-300 pb-3">
              <h3 className="text-xl font-semibold">Education</h3>
              <Image
                src={EduSymbol}
                alt="education-symbol"
                width={30}
                height={30}
              ></Image>
            </div>
            <div className="mt-2 flex xs:flex-col sm:flex-row sm:items-center xs:items-start justify-between">
              <h4 className="text-lg font-semibold">BS Software Engineering</h4>
              <span className="sm:text-lg xs:text-sm font-semibold text-gray-700">
                CGPA: 3.55
              </span>
            </div>
            <p className="text-gray-500 xs:flex flex-col md:block">
              University of Haripur •{" "}
              <span className="font-semibold">2021 – 2025</span>
            </p>
          </div>
          {/* Certifications Card */}
          <div className="bg-gray-200 sm:px-8 sm:py-6 xs:px-4 xs:py-3 rounded-lg shadow-lg shadow-gray-600 hover:scale-101 transition-transform duration-500 ease-in-out">
            <div className="flex gap-3 items-center border-b border-gray-300 pb-3">
              <h3 className="text-xl font-semibold">Training & Certifications</h3>
              <Image
                src={CertSymbol}
                alt="education-symbol"
                width={30}
                height={30}
              ></Image>
            </div>

            <h3 className="text-lg font-semibold mt-2">
              Frontend Web Development
            </h3>
            <p className="text-gray-500 xs:flex flex-col md:block">
              Revnix fmr. Revnix Technologies •{" "}
              <span className="font-semibold">April 2025 - Present</span>
            </p>
            <h3 className="text-lg font-semibold mt-2">
              Web Development (C#, SQL)
            </h3>
            <p className="text-gray-500 xs:flex flex-col md:block">
              Benazir Income Support Programme HQ, Islamabad •{" "}
              <span className="font-semibold">July 2024 - September 2024</span>
            </p>
            <h3 className="text-lg font-semibold mt-2">Google Cybersecurity Professional Certificate</h3>
            <p className="text-gray-500 xs:flex flex-col md:block">
              Coursera •{" "}
              <span className="font-semibold">April 2024 - July 2024</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
