import { motion } from "framer-motion";


type Props = {
  image: string;
  height?: string;
  styleClass?: string;
  children?: React.ReactNode;
};

function ImageBox({ image, height = '100vh', styleClass, children}: Props) {
  return (
    <motion.div
      className={styleClass}
      style={{
        minHeight: height,
        backgroundImage: `url(${image})`,
        width: "100vw"
      }}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 0.25 }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
}

export default ImageBox;
