import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import { fade } from '../variant/variant.ts';

const TopLoader = () => {
  return (
    <motion.div 
    variants = {fade}
    initial = "hidden" 
    animate = "visible"
    exit = "hidden"
    className = "p-1 position-fixed   z-3 d-flex justify-content-center w-100 ">
      <div className = "p-2 my-5 z-3 rounded-circle bg-light">
              <MoonLoader size = "25" color = "black" />
      </div>
    </motion.div>
  )
}

export default TopLoader