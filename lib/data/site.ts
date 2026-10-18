export const site = {
  name: "Asim Raza",
  wordmark: "asim.dev",
  role: "Frontend Developer",
  location: "Haripur, Pakistan",
  email: "asimrazadev@gmail.com",
  resume: "/AsimRaza.pdf",
  availability: "Open to full-time · freelance · remote",
  url: "https://asimraza.me",
  description:
    "Asim Raza — frontend developer building React and Next.js interfaces at Revnix, from dealer storefronts serving 25+ US locations to personal tools like Job Radar.",
  socials: [
    { label: "GitHub", href: "https://github.com/AsimRaza4565" },
    { label: "LinkedIn", href: "https://linkedin.com/in/asim-raza-689636324" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
    { label: "Writing", href: "/#writing" },
  ],
  proof: {
    label: "In production with",
    note:
      "Dealer storefronts serving 25+ US locations, client platforms, and live products of my own.",
    marks: [
      { name: "Revnix", href: "https://revnix.com" },
      { name: "21st Century Equipment", href: "https://21stcenturyequipment.com" },
      { name: "4Rivers Equipment", href: "https://4riversequipment.com" },
      { name: "The Backyard", href: "https://thebackyard.com" },
      { name: "Foursight Solutions", href: "https://foursightsolutions.com" },
      { name: "CodexSpot", href: "https://codexspot.com" },
    ],
  },
  portrait: {
    src: "/Asim_Raza.webp",
    alt: "Portrait of Asim Raza",
    caption: "fig. 1 — the developer",
  },
};

export type Site = typeof site;
