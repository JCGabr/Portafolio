import { motion, type Variants } from "motion/react";
import '../components_styles/MotionBox.css'

type MotionBoxProps = {
  children: React.ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideRight' | 'slideLeft' | 
            'scale' | 'blur' | 'subtleFade' | 'breathe';
};

const variants: Record<string, Variants> = {
  // Variantes básicas
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" }
  },

  subtleFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  breathe: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
  }
};

const transitionConfigs: Record<string, any> = {
  subtleFade: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1]
  },
  breathe: {
    duration: 0.7,
    ease: [0.43, 0.13, 0.23, 0.96]
  },
  default: { 
    duration: 0.6, 
    ease: "easeInOut" 
  }
};

function MotionBox({ children, variant = 'slideUp' }: MotionBoxProps) {
  const transition = transitionConfigs[variant] || transitionConfigs.default;
  
  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className='container'
    >
      {children}
    </motion.div>
  );
}

export default MotionBox;