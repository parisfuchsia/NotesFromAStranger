
import { MoonLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { fade } from '../variant/variant.ts';

const Loading = () => {
  return (
    <motion.div 
    variants = {fade} 
    initial = "hidden" 
    animate = "visible"
    className = "position-fixed min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <MoonLoader size = "40" color = "white" />
    </motion.div>
  )
}

export default Loading