export const profile = {
  name: "Alvee Hossain",
  shortName: "Alvee",
  initials: "AH",
  title: "Software Engineer",
  pronouns: "he/him",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  timezoneLabel: "Dhaka Time",
  countryCode: "+880",
  email: "md.hosen.pro@gmail.com",
  website: "alveehossain.netlify.app",
  websiteUrl: "https://alveehossain.netlify.app/",
  github: "AlveeHossain45",
  githubUrl: "https://github.com/AlveeHossain45",
  image: "/Alveejob.png",
  resumeUrl: "/resume.pdf",
};

export const about = [
  "I am a Computer Science and Engineering student at Uttara University and an aspiring Software Engineer focused on building modern, responsive, and user-friendly web applications.",
  "I work with technologies including HTML, CSS, JavaScript, Python, C, C++, and React. I enjoy learning software engineering, cybersecurity, problem solving, and building real-world projects.",
  "My goal is to continuously improve my technical skills and become a professional Software Engineer capable of building useful and reliable software.",
];

export const socialLinks = [
  {
    id: "github",
    title: "GitHub",
    subtitle: "AlveeHossain45",
    href: "https://github.com/AlveeHossain45",
    kind: "github",
  },
  {
    id: "email",
    title: "Email",
    subtitle: "md.hosen.pro@gmail.com",
    href: "mailto:md.hosen.pro@gmail.com",
    kind: "email",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "alveehossain.netlify.app",
    href: "https://alveehossain.netlify.app/",
    kind: "globe",
  },
];

export const stack = [
  { name: "HTML", slug: "html5", color: "#E34F26" },
  { name: "CSS", slug: "css3", color: "#1572B6" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "C", slug: "c", color: "#A8B9CC" },
  { name: "C++", slug: "cplusplus", color: "#00599C" },
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "Git", slug: "git", color: "#F05032" },
  { name: "GitHub", slug: "github", color: "#181717" },
  { name: "VS Code", slug: "vscode", color: "#007ACC" },
  { name: "Linux", slug: "linux", color: "#FCC624" },
  { name: "REST API", slug: "rest", color: "#000000" },
];

export const education = {
  school: "Uttara University",
  degree: "Bachelor of Science in Computer Science and Engineering",
  status: "Currently Pursuing",
  statusShort: "Currently pursuing",
};

export const projects = [
  {
    id: "uu-student-hub",
    name: "UU Student Hub",
    date: "2026",
    description:
      "A student-focused web platform designed to provide useful academic and university-related resources in one place.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    live: "https://uustudenthub.netlify.app/",
    github: "https://github.com/AlveeHossain45/UU-Student-Hub",
    icon: "UU",
    iconBg: "#0f172a",
  },
  {
    id: "yfm-stock",
    name: "YFM Stock",
    date: "",
    description:
      "A modern stock-related web project with a clean responsive interface and useful stock/product-oriented functionality.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    live: "https://yfmstock.netlify.app/",
    github: "https://github.com/AlveeHossain45/food-company-website",
    icon: "YF",
    iconBg: "#14532d",
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    date: "",
    description:
      "My personal developer portfolio showcasing my skills, projects, education, and software engineering journey.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    live: "https://alveehossain.netlify.app/",
    github: "https://github.com/AlveeHossain45",
    icon: "AH",
    iconBg: "#111827",
  },
];

export const achievements = [];
export const certifications = [];
export const research = [];

export const navItems = [
  { label: "Alvee's Portfolio", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Blog", href: "#blog" },
];

export const searchItems = [
  { title: "About", href: "#about", group: "Sections" },
  { title: "Stack", href: "#stack", group: "Sections" },
  { title: "Projects", href: "#projects", group: "Sections" },
  { title: "Experience", href: "#experience", group: "Sections" },
  ...(achievements.length
    ? [{ title: "Achievements", href: "#achievements", group: "Sections" }]
    : []),
  ...(certifications.length
    ? [{ title: "Certifications", href: "#certs", group: "Sections" }]
    : []),
  ...(research.length
    ? [{ title: "Research", href: "#research", group: "Sections" }]
    : []),
  { title: "Blog", href: "#blog", group: "Sections" },
  { title: "Resume", href: "#resume", group: "Sections" },
  { title: "GitHub Activity", href: "#github", group: "Sections" },
  ...projects.map((p) => ({
    title: p.name,
    href: "#projects",
    group: "Projects",
  })),
];
