import { motion } from 'framer-motion';
import { fade } from '../variant/variant.ts';

const AlertModal = ({message, color}) => {
  return (
                        <motion.div 
                        variants = {fade}
                        initial = "hidden" 
                        animate = "visible" 
                        exit = "hidden"
                        className=" position-fixed fixed-top">
                        <div className={`alert alert-${color || "light"} m-4`}>
                          {message}
                        </div>
                    </motion.div>
  )
}

export default AlertModal