
import MailIcon from '../assets/mail.png';
import UnreadMailIcon from '../assets/unreadmail.png';
import { Link } from 'react-router-dom';
import { fade } from '../variant/variant.ts';
import { motion } from 'framer-motion';

const staggerChild = {
  hidden: { opacity: 0},
  visible: { opacity: 1},
};

const Mail = ({mail}) => {
  
  return (

    <motion.div
    variants = {fade} 
    initial = "hidden" 
   animate = {{
      opacity:1, 
      transition: {
        duration: 0.5
      }
    }}
    className = "p-1 hover-scale col-6 col-md-4 col-lg-3" >
          <Link to = {`/note/${mail?._id}`}>
      <img className = "img-fluid "src = {mail?.read ? MailIcon : UnreadMailIcon} />
          </Link>
    </motion.div>

  )
}

export default Mail