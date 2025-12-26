import { motion } from "framer-motion";
import '../components_styles/MotionBox.css'


type MotionBoxProps = {
  children: React.ReactNode;
};

function MotionBox({ children }: MotionBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='container'
    >
      {children}
    </motion.div>
  );
}

export default MotionBox;
