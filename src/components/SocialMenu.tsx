import React, { useState } from 'react';
import { FaPlus, FaLinkedin, FaGithub} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SocialMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const icons = [
    <FaLinkedin size={20} />,
    <FaGithub size={20} />
  ];

  return (
    <>
      <div className="fab-wrapper">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="icons-container"
            >
              {icons.map((icon, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      delay: i * 0.06,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20, 
                    scale: 0.8,
                    transition: { 
                      delay: (icons.length - i) * 0.03
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    borderColor: '#ffffffaf',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="icon-button"
                >
                  {icon}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onHoverStart={() => setIsOpen(true)}
          onHoverEnd={() => setIsOpen(false)}
          whileHover={{ 
            scale: 1.05, 
            borderColor: '#ffffff9c',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          whileTap={{ scale: 0.95 }}
          className="main-button"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaPlus size={28} strokeWidth={2} />
          </motion.div>
        </motion.button>

      </div>
    </>
  );
};

export default SocialMenu;