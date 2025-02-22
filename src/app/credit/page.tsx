"use client";

import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  CheckCircle,
  Link,
} from "lucide-react";
import Image from "next/image";

// Interface definitions
interface TechCardProps {
  name: string;
  version: string;
}

interface ProjectPhaseProps {
  phase: string;
  title: string;
  color: string;
  items: string[];
}

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-lime-500 bg-clip-text animate-gradient">
  Credits
</h1>

          <p className="text-xl text-gray-300 mb-8">
            Meet the awesome duo behind this website
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Developers Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* First Developer */}
            <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 overflow-hidden relative">
                  <Image
                    src="/tenor.gif"
                    alt="Faiz Bagus P"
                    width={128}
                    height={128}
                    className="rounded-full object-cover w-32 h-32"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">Faiz Bagus P</h2>
                <p className="text-blue-400 mb-2">Fullstack Developer</p>
                <div className="text-gray-400 mb-4">
                  <p>Kelas XI.9</p>
                  <p>Angkatan: 2023/2026</p>
                </div>
                <p className="text-gray-300 mb-6">
                  Designs and develops both frontend and backend systems,
                  creating responsive user interfaces while ensuring scalable,
                  secure, and efficient server-side logic with modern frameworks
                  and databases.
                  <span className="block mt-2 text-sm italic">
                    "Passionate about creating clean, efficient code and
                    learning new technologies."
                  </span>
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/faizonly5953"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://faizonly5953.netlify.app/"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <Link className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:faizbagusp@gmail.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Second Developer */}
            <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full items-center justify-center mb-4">
                  <img src="/Moon.jpeg" alt="Rakha Ardani D" className="rounded-full object-cover w-32 h-32" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Rakha Ardani D</h2>
                <p className="text-green-400 mb-2">
                  UI/UX And Front-End Developer
                </p>
                <div className="text-gray-400 mb-4">
                  <p>Kelas: XI.9</p>
                  <p>Angkatan: 2023/2026</p>
                </div>
                <p className="text-gray-300 mb-6">
                  Ensure's a high UI/UX quality by conducting extensive testing,
                  in-depth usability evaluations, and adhering to design
                  consistency standards to enhance user experience, and
                  interface.
                  <span className="block mt-2 text-sm italic">
                    "A Creative Designer and Front-End Developer Building
                    Engaging Digital Experiences"
                  </span>
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/Luciuus"
                    className="hover:text-green-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:infelxeon@gmail.com"
                    className="hover:text-green-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="bg-gray-800/50 rounded-lg p-8 mb-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Technologies Used</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <TechCard name="Next.js" version="15.1.6" />
              <TechCard name="React" version="19.0.8" />
              <TechCard name="Tailwind CSS" version="3.4.17" />
              <TechCard name="lucide-react" version="0.475.0" />
              <TechCard name="Node.js" version="20.17.17" />
              <TechCard name="Firestore" version="1.1.6" />
            </div>
          </div>

          {/* Project Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-8 mb-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Project Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectPhase
                  phase="Phase 1"
                  title="Planning and Design"
                  color="text-blue-400"
                  items={[
                    "Define project goals and objectives",
                    "Conduct research and gather requirements",
                    "Invent model for design and development",
                    "Create wireframes and UI/UX design",
                   
                  ]}
                />
                <ProjectPhase
                  phase="Phase 2"
                  title="Frontend Development"
                  color="text-purple-400"
                  items={[
                    "Set up development environment",
                    "Implement UI components based on design",
                    "Ensure responsive and accessible design",
                    "Conduct initial UI testing",
                  ]}
                />
                <ProjectPhase
                  phase="Phase 3"
                  title="Backend Execution"
                  color="text-green-400"
                  items={[
                    "Set up database and server infrastructure",
                    "Develop core backend functionality",
                    "Implement authentication and authorization",
                    "Optimize performance and security measures",
                  ]}
                />
                <ProjectPhase
                  phase="Phase 4"
                  title="Testing and Distribution"
                  color="text-orange-400"
                  items={[
                    "Perform unit and integration testing",
                    "Conduct user acceptance testing (UAT)",
                    "Fix bugs and optimize performance",
                    "Deploy to production environment",
                    "Monitor and maintain post-deployment",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Special Thanks */}
          <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Special Thanks</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <a href="https://chatgpt.com/" target="_blank">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                </a>
                <span>OpenAI - for Base Structure & Logic</span>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://claude.ai/" target="_blank">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                </a>
                <span>Claude Ai - for Base Design</span>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://firebase.google.com/docs/firestore?hl=id" target="_blank">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                </a>
                <span>Firestore - for database</span>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://vercel.com/" target="_blank">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                </a>
                <span>Vercel - for Hosting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for displaying technologies
const TechCard = ({ name, version }: TechCardProps) => (
  <div className="bg-gray-700/50 p-4 rounded-lg">
    <h4 className="font-bold">{name}</h4>
    <p className="text-sm text-gray-400">v{version}</p>
  </div>
);

// Component for displaying project phases
const ProjectPhase = ({ phase, title, color, items }: ProjectPhaseProps) => (
  <div className="bg-gray-700/50 rounded-lg p-6">
    <div className="flex flex-col mb-4">
      <div className={`w-[15vh] font-bold ${color}`}>{phase}</div>
      <div className="text-xl font-semibold">{title}</div>
    </div>
    <ul className="space-y-2 pl-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CreditsPage;
