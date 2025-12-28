import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../components_styles/ProjectSlider.css';
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


type Category = 'University' | 'Personal';

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  color: string;
  projectLink: string;
  infoLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Example University 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada pulvinar justo. Sed sit amet vehicula sem.",
    category: "University",
    color: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))",
    projectLink: "https://github.com/exampleUniversity",
    infoLink: "https://exampleUniversity.com/"
  },
  {
    id: 2,
    title: "Example University 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada pulvinar justo. Sed sit amet vehicula sem.",
    category: "University",
    color: "linear-gradient(to bottom right, rgba(59, 246, 230, 0.3), rgba(6, 202, 212, 0.3))",
    projectLink: "https://github.com/exampleUniversity",
    infoLink: "https://exampleUniversity.com/"
  },
  {
    id: 3,
    title: "Example Personal 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada pulvinar justo. Sed sit amet vehicula sem.",
    category: "Personal",
    color: "linear-gradient(to bottom right, rgba(234, 179, 8,0.3), rgba(249, 115, 22, 0.3))",
    projectLink: "https://github.com/examplePersonal",
    infoLink: "https://examplePersonal.com/"
  },
  {
    id: 4,
    title: "Example Personal 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada pulvinar justo. Sed sit amet vehicula sem.",
    category: "Personal",
    color: "linear-gradient(to bottom right, rgba(234, 95, 8, 0.3), rgba(249, 115, 22, 0.3))",
    projectLink: "https://github.com/examplePersonal",
    infoLink: "https://examplePersonal.com/"
  }
];

export default function ProjectSlider() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('University');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = projects.filter(p => p.category === selectedCategory);
  const currentProject = filteredProjects[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  return (
    <>
      <div className="selector-wrapper">
        <div className="selector">
          <button
            onClick={() => handleCategoryChange('University')}
            className="selector-button"
          >
            <motion.div
              animate={{
                boxShadow: selectedCategory === 'University' 
                  ? 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.05)'
                  : 'none'
              }}
              transition={{ duration: 0.3 }}
              className={`selector-button-content ${selectedCategory === 'University' ? 'active' : 'inactive'}`}
            >
              University
            </motion.div>
          </button>
          <button
            onClick={() => handleCategoryChange('Personal')}
            className="selector-button"
          >
            <motion.div
              animate={{
                boxShadow: selectedCategory === 'Personal' 
                  ? 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(255,255,255,0.05)'
                  : 'none'
              }}
              transition={{ duration: 0.3 }}
              className={`selector-button-content ${selectedCategory === 'Personal' ? 'active' : 'inactive'}`}
            >
              Personal
            </motion.div>
          </button>
        </div>
      </div>

      <div className="slides-container">
        <button onClick={prevSlide} className="nav-button prev">
            <FaArrowLeft/>
        </button>

        <div className="slides-wrapper">
          <motion.div
            className="slide"
            animate={{ background: currentProject.color }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentIndex}`}
                className="slide-content"
                transition={{ duration: 0.4 }}
              >
                <div>
                  <motion.span
                    className="slide-badge"
                  >
                    {selectedCategory === 'University' ? 'University Development' : 'Personal App'}
                  </motion.span>
                  
                  <motion.h2
                    className="slide-title"
                  >
                    <Typewriter
                      key={currentProject.id + '-title'}
                      words={[currentProject.title]}
                      cursor
                      typeSpeed={60}
                      deleteSpeed={0}
                      delaySpeed={300}
                      loop={1}
                      cursorStyle="_"
                    />
                  </motion.h2>

                  <motion.p
                    className="slide-description"
                  >
                    <Typewriter
                      key={currentProject.id + '-desc'}
                      words={[currentProject.description]}
                      cursor
                      typeSpeed={30}
                      deleteSpeed={0}
                      delaySpeed={500}
                      loop={1}
                      cursorStyle=""
                    />
                  </motion.p>

                </div>

                <motion.div
                  className="slide-buttons"
                >
                  <a href={currentProject.projectLink} target="_blank" rel="noopener noreferrer" className="slide-button primary">
                    Ver Proyecto
                  </a>
                  <a href={currentProject.infoLink} target="_blank" rel="noopener noreferrer" className="slide-button secondary">
                    Más Info
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <button onClick={nextSlide} className="nav-button next">
          <FaArrowRight/>
        </button>

        <div className="indicators">
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="indicator"
            >
              <div className={`indicator-dot ${index === currentIndex ? 'active' : 'inactive'}`} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}