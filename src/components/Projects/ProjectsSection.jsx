import React from 'react';
import { AnimateOnScroll } from '../../AnimateOnScroll';
import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from '../../data/projectsData';

export const ProjectsSection = () => {
  return (
    <div className="bg-black min-h-screen w-full py-20 px-8 md:px-12 mt-25 mb-20" style={{ animation: 'fadeIn 0.8s ease-in' }}>
      <div className="max-w-7xl mx-auto">
        {/* Judul - muncul duluan */}
        <AnimateOnScroll animation="slide-up" delay={0}>
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">
            <span className="text-white">some </span>
            <span className="bg-gradient-to-r from-[#d9d686] via-[#d9d670] to-[#d9d699] bg-clip-text text-transparent">
              Project
              <span className="text-blue-400 bg-clip-text">.</span>
            </span>
          </div>
        </AnimateOnScroll>

        {/* 3 kolom grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-1 md:gap-12 mt-20 md:mt-45 max-w-[90%] ml-9 sm:max-w-[85%] md:max-w-[100%] mx-auto md:ml-8">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
