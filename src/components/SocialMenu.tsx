import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import "../components_styles/SocialMenu.css";

function SocialMenu() {
  return (
    <div className="social-wrapper">
      <motion.div
        className="social-menu"
        initial="closed"
        whileHover="open"
      >
        <motion.div
          className="social-links"
          variants={{
            closed: { y: 80, opacity: 0 },
            open: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
        >
          <a href="https://github.com/JCGabr" target="_blank">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jose-gabriel-cornejo-castro-38045729b/" target="_blank">
            <FaLinkedin />
          </a>
        </motion.div>

        <motion.div
          className="arrow"
          variants={{
            closed: { rotate: 0 },
            open: { rotate: 180 }
          }}
        >
          <FaArrowUp />
        </motion.div>
      </motion.div>
    </div>
  );
}


export default SocialMenu;