import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fade } from '../variant/variant.ts';
import { useEffect } from 'react';

const LogoutConfirmation = ({onClose, name, open}) => {
  
  const nav = useNavigate();
  
  useEffect(() => {
      document.documentElement.style.overflow = open ? "hidden" : "" 
      return() => document.documentElement.style.overflow = "";
    }, [open])
    
  
  const handleLogout = async () => {
    
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
            {},
            { withCredentials: true }
        );
        if (res?.data?.success) {
          
            nav("/");
            window.location.reload();
            onClose()
        }
    };
  
  return (
    <motion.div
    variants = {fade} 
    initial = "hidden" 
    animate = "visible" 
    exit = "hidden"
    onClick = {onClose}
    className = "vstack position-fixed min-vh-100 w-100 align-items-center justify-content-center z-2 bg-semiblack ">
      <main
      onClick = {e => e.stopPropagation()}className = "w-75 w-md-50 z-3 p-4 bg-dark rounded-4 d-flex flex-column gap-1 ">
        <div>
                        <p className = "h6 mb-3 opacity-50 text-light">Logout | {name}</p>
      <h1 className = " text-light mb-0">Are you sure?</h1>
      <p className = " text-light opacity-25  ">ma-mi-miss kta...</p>
        </div>
        <div>
          <button onClick = {handleLogout} className = "btn btn-outline-light text-light p-2 rounded">Log out</button>
        </div>
      </main>
    </motion.div>
  )
}

export default LogoutConfirmation