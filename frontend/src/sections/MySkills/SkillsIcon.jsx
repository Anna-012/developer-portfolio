import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAws,
  FaCode,
} from "react-icons/fa";

import {
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiVercel,
  SiCloudinary,
  SiRender,
  SiRedux,
  SiPostgresql,
  SiJest,
} from "react-icons/si";

const skillIcons = {
  html: {
    icon: FaHtml5,
    color: "#E34F26",
  },

  css: {
    icon: FaCss3Alt,
    color: "#1572B6",
  },

  javascript: {
    icon: FaJs,
    color: "#F7DF1E",
  },

  js: {
    icon: FaJs,
    color: "#F7DF1E",
  },

  ts: {
    icon: SiTypescript,
    color: "#3178C6",
  },

  react: {
    icon: FaReact,
    color: "#61DAFB",
  },

  node: {
    icon: FaNodeJs,
    color: "#339933",
  },

  "node.js": {
    icon: FaNodeJs,
    color: "#339933",
  },

  python: {
    icon: FaPython,
    color: "#3776AB",
  },

  express: {
    icon: SiExpress,
    color: "#000000",
  },

  "express.js": {
    icon: SiExpress,
    color: "#000000",
  },

  mongodb: {
    icon: SiMongodb,
    color: "#47A248",
  },

  "mongo db": {
    icon: SiMongodb,
    color: "#47A248",
  },

  tailwind: {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  "tailwind css": {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  git: {
    icon: FaGitAlt,
    color: "#F05032",
  },

  github: {
    icon: FaGithub,
    color: "#181717",
  },

  vercel: {
    icon: SiVercel,
    color: "#000000",
  },

  cloudinary: {
    icon: SiCloudinary,
    color: "#3448C5",
  },
  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
  },

  redux: {
    icon: SiRedux,
    color: "#764ABC",
  },

  postgresql: {
    icon: SiPostgresql,
    color: "#4169E1",
  },

  docker: {
    icon: FaDocker,
    color: "#2496ED",
  },

  aws: {
    icon: FaAws,
    color: "#232F3E",
  },

  jest: {
    icon: SiJest,
    color: "#C21325",
  },
  render: {
    icon: SiRender,
    color: "#46E3B7",
  },
};

const SkillsIcon = ({ skillName }) => {
  const skill = skillIcons[skillName.toLowerCase().trim()];

  if (!skill) {
    return <FaCode />;
  }

  const Icon = skill.icon;

  return <Icon style={{ color: skill.color }} />;
};

export default SkillsIcon;
