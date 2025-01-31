import React from 'react'
import PinkCloud from '../assets/pinkclouds.png';
import { motion } from 'framer-motion';
import { fade } from '../variant/variant.ts';

const PinkCloudOverlay = () => {
  return (
    <motion.div
    variants = {fade} 
    initial = "hidden" 
    animate = {{
      opacity: 0.5,
      transition: {
        duration: 2
      }
    }}
    className = " position-fixed no-pointer z-3 min-vh-100 w-100 bottom-0 ">
      <img className = "img-fluid w-100  position-fixed bottom-0" src = {PinkCloud} />
    </motion.div>
  )
}

export default PinkCloudOverlay