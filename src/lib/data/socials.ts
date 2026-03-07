export interface Social {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/ryan-prayoga",
    icon: "github",
    label: "ryan-prayoga",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ryanprayogaaa",
    icon: "linkedin",
    label: "ryanprayogaaa",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#tech-journey" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Operations", href: "#operations" },
  { label: "Contact", href: "#contact" },
];
