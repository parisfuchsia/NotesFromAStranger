import { motion } from 'framer-motion';
import { fade } from '../variant/variant.ts';
import cloudpng from '../assets/cloudx.png';

const Cloud = () => {
  return (
          <motion.div 
          variant = {fade}
          initial = "hidden" 
          animate = "visible"
          className = "w-100 m-0">
              <img className = "img-fluid" src = {cloudpng} />
      </motion.div>
  )
}

export default Cloud