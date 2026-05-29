export interface Social {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export const socials: Social[] = [
  {
    name: "Email",
    url: "mailto:developer@ryanprayoga.dev",
    icon: "email",
    label: "developer@ryanprayoga.dev",
  },
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
  { label: "Proof", href: "#proof" },
  { label: "Projects", href: "#projects" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Stack", href: "#tech-journey" },
  { label: "Contact", href: "#contact" },
];
