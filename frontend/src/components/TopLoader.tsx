import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';

const TopLoader = () => {
  return (
    <motion.div className = "p-1 position-fixed   z-3 d-flex justify-content-center w-100 ">
      <div className = "p-2 my-5 z-3 rounded-circle bg-light">
              <MoonLoader size = "25" color = "black" />
      </div>
    </motion.div>
  )
}

export default TopLoader