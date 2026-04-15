"use client";

import { motion } from "framer-motion";

const My_Services = {
  service_1_title: "Responsive Web Development",
  service_1_desc:
    "I transform Figma designs into production-ready websites using React, Next.js, Tailwind CSS, and ShadcnUI. Every site adapts seamlessly across devices, performs smoothly, and meets modern accessibility standards.",

  service_2_title: "Bug Fixes & Feature Enhancements",
  service_2_desc:
    "I fix UI glitches, resolve functionality issues, and enhance React/Next.js components to improve user experience. From dashboards to e-commerce stores, I ensure your web apps run flawlessly.",

  service_3_title: "Performance & Accessibility",
  service_3_desc:
    "I optimize websites to load faster, run smoother, and meet accessibility standards. Users get a seamless experience, while your SEO and conversion potential improve."
};

export default function Services() {
  return (
    <section className="py-3" id="services">
      <div className="max-w-[1200px] mx-auto sm:mt-24 xs:mt-12 sm:px-8 xs:px-3">
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
          <h2 className="text-lg px-3 py-1 mb-4 shadow-md shadow-gray-700 border-1 border-gray-700 rounded-3xl text-center text-black bg-gray-300">
            Services to Elevate Your Website
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
          Fixing, enhancing, and optimizing your web presence for maximum impact
        </motion.p>

        <div className="mx-auto flex lg:flex-row xs:flex-col gap-6">
          {[
            {
              num: "01",
              title: My_Services.service_1_title,
              desc: My_Services.service_1_desc,
              duration: 0.5,
            },
            {
              num: "02",
              title: My_Services.service_2_title,
              desc: My_Services.service_2_desc,
              duration: 0.9,
            },
            {
              num: "03",
              title: My_Services.service_3_title,
              desc: My_Services.service_3_desc,
              duration: 1.3,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: card.duration,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex-1 border border-gray-300 rounded-sm lg:p-8 p-4 text-white flex flex-col gap-3 hover:shadow-md shadow-gray-600 hover:scale-[1.02] transition-transform duration-500 ease-in-out hover:bg-gray-700 hover:border-yellow-500"
            >
              <span className="text-2xl font-semibold text-yellow-200">
                {card.num}
              </span>
              <h3 className="text-[24px] font-semibold text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text">
                {card.title}
              </h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
