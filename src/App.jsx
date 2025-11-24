import React, { useState, useEffect } from 'react';
import { FaHandPaper } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import profileImg from './media/IMG_20240613_205222.jpg';
import objectdetect from './media/object detection.jpg';
import portoImg from './media/porto-web.png'
import classificationImg from './media/Screenshot 2025-10-27 123147.png'
import sentimentImg from './media/Screenshot 2025-10-31 134416.png'
import gameqiiImg from './media/Untitled design.png'




export default function InteractiveGridHero() {
  const [cells, setCells] = useState([]);
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const [activeCells, setActiveCells] = useState(new Set());
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const roles = [
    'Junior Fullstack Developer',
    'entry level React Native Developer',
    'Deep Learning & Machine Learning Engineer'
  ];

  // Grid kotak-kotak setup bayy
  useEffect(() => {
    const updateGrid = () => {
      const cellSize = 55;
      const cols = Math.ceil(window.innerWidth / cellSize);
      const rows = Math.ceil(window.innerHeight / cellSize);
      const totalCells = cols * rows;
      setGridSize({ rows, cols });
      setCells(Array.from({ length: totalCells }, (_, i) => i));
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  // typing animation untuk bidang / role yang gueh tekuni bayy
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timer;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRoleIndex]);

  // efek riple atau efek gelombang pada background grid bayyy
  const handleCellClick = (index) => {
    const { cols } = gridSize;
    const clickedRow = Math.floor(index / cols);
    const clickedCol = index % cols;

    const maxDistance = 14;
    for (let distance = 0; distance <= maxDistance; distance++) {
      setTimeout(() => {
        const newActive = new Set();
        for (let row = clickedRow - distance; row <= clickedRow + distance; row++) {
          for (let col = clickedCol - distance; col <= clickedCol + distance; col++) {
            const manhattanDist = Math.abs(row - clickedRow) + Math.abs(col - clickedCol);
            if (manhattanDist === distance) {
              const cellIndex = row * cols + col;
              if (cellIndex >= 0 && cellIndex < cells.length) {
                newActive.add(cellIndex);
              }
            }
          }
        }

        setActiveCells((prev) => new Set([...prev, ...newActive]));

        setTimeout(() => {
          setActiveCells((prev) => {
            const updated = new Set(prev);
            newActive.forEach((cell) => updated.delete(cell));
            return updated;
          });
        }, 180);
      }, distance * 60);
    }
  };

  return (
    <div className="bg-black w-full overflow-hidden relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .scale-up {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
      `}</style>

      {/* sung ajah */}
      <div className="relative h-screen" style={{ animation: 'fadeIn 0.8s ease-in' }}>
        {/* Background Grid nya bayyy */}
        <div
          className="grid gap-px bg-black w-full h-screen overflow-hidden relative"
          style={{
            gridTemplateColumns: `repeat(${gridSize.cols}, 55px)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 55px)`
          }}
        >
          {cells.map((index) => (
            <div
              key={index}
              onClick={() => handleCellClick(index)}
              className={`
                bg-neutral-900 border border-neutral-800 
                transition-all duration-300 cursor-pointer
                hover:bg-neutral-800/50 hover:border-neutral-700/50 
                hover:shadow-[0_0_8px_rgba(255,255,255,0.03)] 
                hover:scale-[1.02]
                ${activeCells.has(index)
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                  : ''}
              `}
            />
          ))}

          {/*  Gradient Overlay bayy  */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-10% to-transparent z-20"></div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-black via-10% to-transparent z-20"></div>
        </div>

        {/* Overlay Content bayy */}
        <div className="absolute inset-0 flex items-center pointer-events-none z-30">
          <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-1">
              {/* sapaan buat viewer gueh bayy  */}
              <div className="text-left lg:-ml-42 animate-slide-up">
                <div className="text-white text-1xl sm:text-3xl md:text-5xl mb-4 font-light tracking-wide">
                  Oh, Hi There!
                  <FaHandPaper
                    size={56}
                    color="#d9d686"
                    style={{ display: 'inline-block', marginLeft: '12px', verticalAlign: 'middle' }}
                  />
                </div>
                <div className="text-4xl sm:text-3xl md:text-6xl font-bold tracking-tight mb-6">
                  <span className="text-white">I'm </span>
                  <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                    Muhammad Tsaqib Adha.
                  </span>
                </div>

                <div className="text-lg mb-15 sm:text-2xl md:text-3xl font-semibold ">
                  <span className="text-white">A </span>
                  <span style={{ color: '#ebe9a9' }}>{displayText}</span>
                  <span style={{ color: '#ebe9a9' }} className="animate-pulse">|</span>
                </div>
              </div>

              {/* 🖼️ Photo profile gueh bay ganteng dikit la wkwkw*/}

              <div className="relative lg:-mr-40 animate-slide-up pointer-events-auto" style={{ animationDelay: '0.2s' }}>
                <div
                  className="absolute inset-0 w-[274px] h-[340px] sm:w-[299px] sm:h-[380px] lg:w-[365px] lg:h-[463px] rounded-4xl overflow-hidden"
                  style={{
                    transform: 'translate(2px, 5px)',
                    background: 'linear-gradient(to bottom right, rgb(37, 99, 235), rgb(29, 78, 216))',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(211, 245, 255, 0.8) 7px, transparent 0px)',
                      backgroundSize: '28.5px 3px'
                    }}
                  ></div>
                </div>

                <div className="relative w-[261px] h-[330px] sm:w-[291px] sm:h-[370px] lg:w-[350px] lg:h-[450px] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl border border-neutral-700 shadow-2xl overflow-hidden">
                  <div className="w-full h-full">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover scale-147"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>

                  <div
                    className="absolute bottom-12 right-4 sm:bottom-12 sm:right-6 lg:bottom-15 lg:left-63 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg animate-bounce cursor-pointer"
                    onClick={() => window.open('https://linkedin.com/in/muhammad-tsaqib-adha-', '_blank')}
                    style={{
                      background: '#bdba64',
                      boxShadow: '0 0 20px rgba(189, 186, 100, 0.5)'
                    }}
                  >
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-neutral-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-neutral-900 font-medium text-[8px] sm:text-[9px]">LinkedIn</span>
                  </div>

                  <div className="absolute -left-0.5 bottom-2 sm:bottom-5 lg:bottom-2 lg:-left-3 right-0 px-3 sm:px-4 lg:px-7 text-left">
                    <h5 className="text-white text-xs sm:text-base lg:text-lg font-semibold mb-0.5">
                      Undergraduate Informatics Student
                    </h5>
                    <p className="text-neutral-300 text-[10px] sm:text-xs lg:text-sm">at Gunadarma University</p>
                  </div>

                  <div
                    className="absolute top-0 left-10 w-full h-10"
                    style={{ background: 'linear-gradient(to left, #d9d686, #d9d686, transparent)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🧱 Project2 guah bay, maap masi dikit */}
      <div className="bg-black min-h-screen w-full py-20 px-8 md:px-12 mt-25 mb-20" style={{ animation: 'fadeIn 0.8s ease-in' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">
            <span className="text-white">some </span>
            <span className="bg-gradient-to-r from-[#d9d686] via-[#d9d670] to-[#d9d699] bg-clip-text text-transparent">
              Project
              <span className="text-blue-400 bg-clip-text">.</span>
            </span>
          </div>

          {/* kite bikin 3 kolom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-1 md:gap-12 mt-20 md:mt-45 max-w-[90%] ml-9 sm:max-w-[85%] md:max-w-[100%] mx-auto md:ml-8">
            {/* Card 1 */}
            <Tilt
              tiltMaxAngleX={-8}
              tiltMaxAngleY={-8}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable={false}
              glareMaxOpacity={0.2}
              glareColor="#d9d686"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px]" onClick={() => window.open('https://github.com/aqibadhaa/Gameqii-Gaming-Shop', '_blank')}>
                <img
                  src={gameqiiImg}
                  alt="Project 1"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-transparent p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">Gameqii Shop</h3>
                  <span className="bg-yellow-200/10 backdrop-blur-2xl text-gray-800 text-xs sm:text-sm md:text-base font-normal px-2 py-1 rounded text-center">React Native</span>
                </div>
              </div>
            </Tilt>

            {/* Card 2 */}
            <Tilt
              tiltMaxAngleX={-8}
              tiltMaxAngleY={-8}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable={false}
              glareMaxOpacity={0.2}
              glareColor="#d9d686"
              glarePosition="all"
              glareBorderRadius="16px"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px]" onClick={() => window.open('https://github.com/aqibadhaa/Sentiment-Analyst-myIM3-Apps', '_blank')}>
                <img
                  src={sentimentImg}
                  alt="Project 2"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-transparent p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">
                    Sentiment Analysis : myIM3 Apps
                  </h3>
                  <span className="bg-yellow-500/20 backdrop-blur-2xl text-gray-800 text-xs sm:text-sm md:text-base/5 font-normal px-2 py-1 rounded-xl text-center">
                    Machine Learning
                  </span>
                </div>
              </div>
            </Tilt>

            {/* Card 3 */}
            <Tilt
              tiltMaxAngleX={-8}
              tiltMaxAngleY={-8}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable={false}
              glareMaxOpacity={0.2}
              glareColor="#d9d686"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px]" onClick={() => window.open('https://github.com/aqibadhaa/Simple-Image-Classification-', '_blank')}>
                <img
                  src={classificationImg}
                  alt="Project 3"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-transparent p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">
                    Image Classification
                  </h3>
                  <span className="bg-yellow-100/30 backdrop-blur-2xl text-gray-800 text-xs sm:text-sm md:text-base/5 font-normal px-2 py-1 rounded-xl text-center">
                    Machine Learning
                  </span>
                </div>
              </div>
            </Tilt>

            {/* Card 4 */}
            <Tilt
              tiltMaxAngleX={-8}
              tiltMaxAngleY={-8}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable={false}
              glareMaxOpacity={0.2}
              glareColor="#d9d686"
              glarePosition="all"
              glareBorderRadius="10px"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px]" onClick={() => window.open('https://github.com/aqibadhaa/Yolov8-Webcam-Object-Detection', '_blank')}>
                <img
                  src={objectdetect}
                  alt="Project 4"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-transparent p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">Simple Real-time Object Detection</h3>
                  <span className="bg-yellow-100/50 backdrop-blur-3xl text-gray-800 text-xs sm:text-sm md:text-base/5 font-normal px-2 py-1 rounded-xl text-center">Machine Learning
                  </span>
                </div>
              </div>
            </Tilt>

            {/* Card 5 */}
            <Tilt
              tiltMaxAngleX={-8}
              tiltMaxAngleY={-8}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable={false}
              glareMaxOpacity={0.2}
              glareColor="#d9d686"
              glarePosition="all"
              glareBorderRadius="16px"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[220px] w-[90%] sm:h-[280px] md:h-[320px]" onClick={() => window.open('https://github.com/aqibadhaa/Portofolio-Website', '_blank')}>
                <img
                  src={portoImg}
                  alt="Project 5"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#d9d886] via-[#d9d670] to-transparent p-4 flex justify-between items-center transition-all duration-900 group-hover:translate-y-4/5">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl md:text-xl mr-3">Portofolio Website</h3>
                  <span className="bg-yellow-100/50 backdrop-blur-2xl text-gray-800 text-xs sm:text-sm md:text-base font-normal px-2 py-1 rounded-xl text-center">React
                  </span>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>

      {/* 💼 sedikit experience gueh bay, harus lebih banyak lagi nihhh */}
      <div className="bg-black w-full py-12 px-4 md:px-12 md:py-20">
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-25 md:mb-40">
          <span className="text-white">several </span>
          <span className="bg-gradient-to-r from-[#d9d686] via-[#d9d670] to-[#d9d699] bg-clip-text text-transparent">
            Experience & Journey
            <span className="text-blue-400">.</span>
          </span>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-500"></div>

          {/* Experience 1 */}
          <div className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-start items-start md:items-center">
            <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-12 text-left">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-2 border-blue-400">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Machine Learning Bootcamp & Cohort team</h3>
                <h4 className="text-base md:text-xl font-semibold text-gray-700 mb-3">Dicoding</h4>
                <p className="text-sm md:text-base text-gray-600 text-justify mb-3">
                  Participated in a 5-month intensive bootcamp program specializing in Machine Learning and Deep Learning, while also developing essential soft skills through hands-on projects, submissions, and a final capstone project.
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">July 2025 - November 2025</p>
              </div>
            </div>
            {/* Icon */}
            <div className="absolute left-4 md:left-1/2 top-0 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#d9d686] rounded-full flex items-center justify-center shadow-lg z-10">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* Experience 2 */}
          <div className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <div className="w-full md:w-1/2 pl-20 md:pl-12 text-left md:order-2">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-2 border-blue-400">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Robotics Extracurricular Co-Lead</h3>
                <h4 className="text-base md:text-xl font-semibold text-gray-700 mb-3">Man 7 Jakarta</h4>
                <p className="text-sm md:text-base text-gray-600 text-justify mb-3">
                  Experienced as co-leader of robotics extracurricular activities at Man 7 Jakarta and also participated in several competitions
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">2024 - 2025</p>
              </div>
            </div>
            {/* Icon */}
            <div className="absolute left-4 md:left-1/2 top-0 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#d9d686] rounded-full flex items-center justify-center shadow-lg z-10 md:order-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="hidden md:block md:w-1/2 md:order-0"></div>
          </div>

          {/* Experience 3 */}
          <div className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-start items-start md:items-center">
            <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-12 text-left">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-2 border-blue-400">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Asean Robotic Day Participant</h3>
                <h4 className="text-base md:text-xl font-semibold text-gray-700 mb-3">Sman 38 Jakarta</h4>
                <p className="text-sm md:text-base text-gray-600 text-justify mb-3">
                  Took part in the ASEAN Robotic Day, an multinational robotics competition, competing in the ASV (Autonomous Surface Vehicle) category.
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">2023</p>
              </div>
            </div>
            {/* Icon */}
            <div className="absolute left-4 md:left-1/2 top-0 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#d9d686] rounded-full flex items-center justify-center shadow-lg z-10">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* Experience 4 */}
          <div className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <div className="w-full md:w-1/2 pl-20 md:pl-12 text-left md:order-2">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-2 border-blue-400">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Silver Medals at Jakarta Robotik Games 2022</h3>
                <h4 className="text-base md:text-xl font-semibold text-gray-700 mb-3">Mts PKP Jakarta Islamic School</h4>
                <p className="text-sm md:text-base text-gray-600 text-justify mb-3">
                  became the 2nd place winner in JRG 2022 Robotics in the "Creative Senior" Category
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">2022</p>
              </div>
            </div>
            {/* Icon */}
            <div className="absolute left-4 md:left-1/2 top-0 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#d9d686] rounded-full flex items-center justify-center shadow-lg z-10 md:order-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="hidden md:block md:w-1/2 md:order-0"></div>
          </div>

          {/* Experience 5  */}
          <div className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-start items-start md:items-center">
            <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-12 text-left">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-2 border-blue-400">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Silver Medals at Jakarta Madrasah Competition 2022</h3>
                <h4 className="text-base md:text-xl font-semibold text-gray-700 mb-3">Kemenag</h4>
                <p className="text-sm md:text-base text-gray-600 text-justify mb-3">
                  became the 2nd place winner in JMC 2022 Robotics in the Creative Robot Category
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">2022</p>
              </div>
            </div>
            {/* Icon */}
            <div className="absolute left-4 md:left-1/2 top-0 transform md:-translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#d9d686] rounded-full flex items-center justify-center shadow-lg z-10">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}