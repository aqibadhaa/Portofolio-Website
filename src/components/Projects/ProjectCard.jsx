import React from 'react';
import Tilt from 'react-parallax-tilt';
import { AnimateOnScroll } from '../../AnimateOnScroll';

const TILT_CONFIG = {
  tiltMaxAngleX: -8,
  tiltMaxAngleY: -8,
  scale: 1.05,
  transitionSpeed: 2000,
  glareEnable: false,
  glareMaxOpacity: 0.2,
  glareColor: '#d9d686',
  glarePosition: 'all',
  glareBorderRadius: '16px'
};

export const ProjectCard = ({ project, index }) => {
  const animationDelay = 80 + index * 30;

  const handleCardClick = () => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimateOnScroll animation="slide-up" delay={animationDelay}>
      <Tilt {...TILT_CONFIG}>
        <div
          className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px] cursor-pointer"
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-[#aaa765] p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
            <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">
              {project.title}
            </h3>
            <span className={`${project.bgColor} backdrop-blur-2xl text-gray-800 text-xs sm:text-sm md:text-base font-normal px-2 py-1 rounded-xl text-center`}>
              {project.tech}
            </span>
          </div>
        </div>
      </Tilt>
    </AnimateOnScroll>
  );
};
