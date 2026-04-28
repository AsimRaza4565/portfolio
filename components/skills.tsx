"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Wrench,
  Zap,
  ShieldCheck,
  Search,
} from "lucide-react";
import { ITechGroup, ICoreStrength } from "@/types";

const techGroups: ITechGroup[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    icon: <Code2 className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "Backend & APIs",
    items: ["REST APIs", "API Integration", "Node.js (Basic)"],
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "Database & CMS",
    items: ["MongoDB", "CMS Management", "Content Updates"],
    icon: <Database className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "GitHub", "Postman", "VS Code", "Responsive Design"],
    icon: <Wrench className="w-5 h-5 text-yellow-400" />,
  },
];

const strengths: ICoreStrength[] = [
  {
    title: "Performance Optimization",
    description:
      "Improve page speed, reduce unnecessary re-renders, and optimize frontend performance across production pages.",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "Accessibility",
    description:
      "Enhance usability with accessible markup, semantic structure, and better user experience across devices.",
    icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "SEO & Visibility",
    description:
      "Implement SEO-conscious frontend practices including semantic HTML, metadata, and performance-focused improvements.",
    icon: <Search className="w-5 h-5 text-yellow-400" />,
  },
];

export default function Skills() {
  return (
    <section className="py-10" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1200px] mx-auto sm:mt-24 xs:mt-12 px-6 sm:px-8"
      >
        {/* Section Heading */}
        <div className="flex justify-center mb-6">
          <h2 className="text-lg px-3 py-1 mb-4 shadow-md shadow-gray-700 border-1 border-gray-700 rounded-3xl text-center text-black bg-gray-300">
            Tech Stack & Core Strengths
          </h2>
        </div>

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            More than just UI development
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-7">
            I build responsive frontend experiences, integrate APIs, manage CMS
            updates, fix functionality issues, and improve performance,
            accessibility, and SEO across production web applications.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-700 bg-[#1c2435] p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {group.icon}
                <h4 className="text-lg font-semibold text-white">{group.title}</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 border border-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Strengths */}
        <div className="mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
            What I bring beyond the stack
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-700 bg-[#1c2435] p-5 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-300 leading-6">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}