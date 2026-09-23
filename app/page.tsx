import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProofStrip from "@/components/proof-strip";
import Work from "@/components/work";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import About from "@/components/about";
import Writing from "@/components/writing";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Work />
        <Skills />
        <Experience />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
