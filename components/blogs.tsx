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
    title: "Architecting Scalable Design Systems: From Tokens to Production-Ready Components",
    content:
      "A scalable UI isn't built on isolated widgets—it's built on a cohesive system contract. I structure React component libraries by establishing strict design token boundaries and composable variant patterns using tools like Tailwind CSS and CVA (Class Variance Authority). By prioritizing slot composition over prop-heavy monolithic components, I ensure teams avoid style drift, prevent repetitive CSS overrides, and can safely roll out global theme updates across multi-page applications without layout regressions.",
    image: Blog1Img,
    altText: "Scalable React component architecture and design system workflow",
    reversed: true,
  },
  {
    id: 2,
    title: "Next.js App Router in Production: Leveraging Server Components and Streaming",
    content:
      "The Next.js App Router fundamentally shifts where computation belongs. Instead of shipping massive JavaScript bundles to the browser, I leverage React Server Components (RSC) to handle data fetching, token validation, and sensitive business logic directly on the server. By strategically wrapping asynchronous UI blocks in Suspense boundaries, critical layouts stream immediately while data-heavy sections hydrate progressively—substantially cutting initial bundle sizes and improving Core Web Vitals.",
    image: Blog2Img,
    altText: "Next.js App Router and React Server Components data streaming architecture",
    reversed: false,
  },
  {
    id: 3,
    title: "Bridging Web and Mobile: Structuring Shared Logic Between React and React Native",
    content:
      "Shipping across web and mobile shouldn't mean doubling your development surface. When engineering applications across Next.js and React Native, I decouple visual presentation from domain logic through headless component patterns, custom hooks, and shared TypeScript utilities. This allows web and mobile teams to share state stores, validation schemas, and API clients seamlessly, while preserving authentic, native gesture response and platform-specific interaction standards on iOS and Android.",
    image: Blog3Img,
    altText: "Cross-platform logic sharing between React web and React Native mobile",
    reversed: true,
  },
  {
    id: 4,
    title: "Pragmatic State Management: Moving Beyond Monolithic Global Stores",
    content:
      "A frequent bottleneck in modern React codebases is treating all dynamic data as client-side global state. In real-world applications, I separate asynchronous server cache from synchronous UI state. By letting cache layers like TanStack Query handle server syncing, retries, and pagination, client-side stores (like Zustand) stay lightweight and dedicated purely to transient UI state. This prevents cascading re-renders, removes hundreds of lines of reducer boilerplate, and keeps data fresh.",
    image: Blog4Img,
    altText: "Architectural separation of server caching and client UI state in React",
    reversed: false,
  },
  {
    id: 5,
    title: "Taming Interaction to Next Paint (INP): Practical Frontend Performance Profiling",
    content:
      "True web performance isn't just about quick initial loads; it's about runtime responsiveness during heavy user interactions. To optimize for Google's Interaction to Next Paint (INP), I profile long-running main-thread tasks, debounce compute-heavy operations, and leverage React concurrent primitives like useTransition and useDeferredValue. Prioritizing instant visual feedback before executing heavy state re-renders ensures complex dashboards and data tables remain butter-smooth even under load.",
    image: Blog5Img,
    altText: "Profiling and optimizing Interaction to Next Paint performance metrics in React",
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

  const cardClasses = `bg-gray-300 rounded-md flex gap-1 lg:flex-row xs:flex-col min-h-[280px] mt-6 hover:scale-101 transition-transform duration-500 ease-in-out hover:shadow-md shadow-gray-700 ${blog.reversed ? "lg:flex-row-reverse" : ""
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
          className={`h-full w-full xs:rounded-t-md lg:rounded-none ${blog.reversed ? "lg:rounded-r-md" : "lg:rounded-l-md"
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
