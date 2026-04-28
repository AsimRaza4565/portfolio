"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import Blog1Img from "../public/Blog_1.webp";
import Blog2Img from "../public/Blog_2.webp";
import Blog3Img from "../public/Blog_3.webp";
import Blog4Img from "../public/Blog_4.webp";
import Blog5Img from "../public/Blog_5.webp";
import { IBlog, IBlogCardProps } from "@/types";

const blogs: IBlog[] = [
  {
    id: 1,
    title: "From Figma to Production: How I Build Responsive UIs That Don’t Break",
    content:
      "Turning a Figma design into code isn’t just about matching pixels, it’s about building something that holds up in real-world conditions. I start by extracting spacing systems, typography, and reusable patterns instead of blindly copying values. From there, I build modular React components styled with Tailwind CSS, ensuring consistency across the entire UI. I also handle edge cases early like content overflow, responsiveness across breakpoints, and accessibility. The result is not just a visually accurate UI, but one that remains stable, scalable, and maintainable as the project evolves.",
    image: Blog1Img,
    altText: "Figma design translated into responsive web components",
    reversed: true,
  },
  {
    id: 2,
    title: "Common Figma-to-Code Mistakes That Break Layouts (and How I Avoid Them)",
    content:
      "Most frontend issues don’t come from complex logic, they come from poor UI implementation. I’ve seen layouts break because of hardcoded values, inconsistent spacing, and misuse of breakpoints. My approach is to avoid these problems at the foundation level: I use consistent spacing scales, flexible layouts (Flexbox/Grid), and responsive utilities instead of fixed dimensions. I also prioritize reusability over quick fixes. This prevents fragile UIs and reduces the need for constant patching later in development.",
    image: Blog2Img,
    altText: "Fixing broken layout problems in web design",
    reversed: false,
  },
  {
    id: 3,
    title: "Building Scalable React UIs: Why Reusability Is More Than Just Components",
    content:
      "A lot of developers think reusable components are enough, they’re not. True scalability comes from designing systems, not just components. I focus on building flexible, configurable UI patterns that can adapt to multiple use cases instead of duplicating logic. For example, instead of creating separate components for every variation, I design components with props and composition in mind. This reduces code duplication, simplifies maintenance, and makes the codebase easier to extend as the application grows.",
    image: Blog3Img,
    altText: "Designing scalable and reusable React component systems",
    reversed: true,
  },
  {
    id: 4,
    title: "Why Next.js Is My Default Choice for Production Applications",
    content:
      "When building real-world applications, performance and structure matter more than convenience. Next.js gives me both. With server-side rendering (SSR) and static generation (SSG), I can control how and when content is delivered, improving both performance and SEO. Features like file-based routing, API routes, and built-in image optimization remove the need for extra setup and reduce complexity. Instead of stitching together multiple tools, I can focus on building a fast, scalable product with a clean architecture.",
    image: Blog4Img,
    altText: "Next.js performance features and architecture benefits",
    reversed: false,
  },
  {
    id: 5,
    title: "How I Improve Performance in Next.js Applications (Without Overengineering)",
    content:
      "Performance issues are often caused by unnecessary complexity, not lack of tools. In my Next.js projects, I focus on practical optimizations that actually make a difference: lazy loading components, using dynamic imports, optimizing images, and avoiding unnecessary re-renders. I also pay attention to bundle size and remove anything that doesn’t add value. The goal isn’t to chase perfect scores, it’s to build applications that load fast, feel smooth, and handle real user interactions without lag.",
    image: Blog5Img,
    altText: "Optimizing Next.js application performance practically",
    reversed: true,
  },
];

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="sm:mt-24 xs:mt-12 py-3 lg:px-8 sm:px-16 xs:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center"
      >
        <h2 className="text-lg px-3 py-1 mb-8 shadow-md shadow-gray-700 border border-gray-700 rounded-3xl text-center text-black bg-gray-300">
          My Thoughts
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
        Practical lessons from frontend development, performance, and UI architecture.
      </motion.p>

      {blogs.map((blog, index) => (
        <BlogCard key={blog.id} blog={blog} index={index} />
      ))}
    </section>
  );
}

function BlogCard({ blog }: IBlogCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const cardClasses = `bg-gray-300 rounded-md flex gap-1 lg:flex-row xs:flex-col min-h-[280px] mt-6 hover:scale-101 transition-transform duration-500 ease-in-out hover:shadow-md shadow-gray-700 ${
    blog.reversed ? "lg:flex-row-reverse" : ""
  } }`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cardClasses}
    >
      <div className="lg:w-2/3 xs:w-full">
        <Image
          src={blog.image}
          width={400}
          height={300}
          alt={blog.altText}
          title={blog.title}
          className={`h-full w-full xs:rounded-t-md lg:rounded-none ${
            blog.reversed ? "lg:rounded-r-md" : "lg:rounded-l-md"
          }`}
        />
      </div>

      <div className="lg: w-2/3 xs:w-full pt-8 lg:px-10 md:px-12 md:pb-10 sm:px-10 xs:p-6 pb-6 flex flex-col">
        <h2 className="md:text-2xl xs:text-lg font-bold text-black-500">
          {blog.title}
        </h2>
        <div className="min-h-[200px]">
          <p className="pt-3 lg:text-lg md:text-2xl sm:text-lg text-gray-800">
            {inView && (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString(blog.content).start();
                }}
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 0,
                  deleteSpeed: Infinity, // ensuring no deletion
                }}
              />
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
