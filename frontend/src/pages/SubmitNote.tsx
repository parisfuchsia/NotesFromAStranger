import { useState, useRef, useEffect, lazy } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/Loading.tsx';
import AlertModal from '../components/AlertModal.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { fade } from '../variant/variant.ts';


const SubmitNote = () => {
  const [message, setMessage] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [empty, setEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
 
  const textareaRef = useRef(null);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    const getUser = async() => {
      const res = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/api/user/name/${id}`
        );
      setUser(res.data.user);
      
    }
    try {
      getUser();
      setLoading(false);
    }catch(e){
      setLoading(false);
    }
  }, [id]);
  
  const handleSubmit = async() => {
    if(!message){
      setEmpty(true);
      setSuccess(false);
      setTimeout(() => {
        setEmpty(false);
      }, 2000)
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/new/note`, { message, to: user?.username});
      if(res.data.success){
        setSuccess(true);
        setMessage("");
        setError(false);
      }
      textareaRef.current.style.height = "40vh"
    }catch(e){
      console.log("submission", {e})
      setError(e.response.data.message || "Network error");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }
  
  useEffect(() => {
    const textarea = textareaRef.current; 
    if(textarea){
      
      const totalScrollHeight = textarea.scrollHeight;
      textarea.style.height =  `${totalScrollHeight}px`
      
    }
  }, [message])
  
  if(Object.keys(user).length > 0 && !loading){
    return (
    <motion.div 
    variants = {fade}
    initial = "hidden" 
                        animate = "visible" 
                        exit = "hidden"
    className = "container d-flex  flex-column align-items-center justify-content-start ">
      <AnimatePresence>
                      {
        error && error.length > 0 ? <AlertModal message = {error} color = "danger" /> : success ? <motion.div 
        variants = {fade}
    
        className = " position-fixed fixed-top">
          <div className = "alert alert-primary m-4 hstack justify-content-between">
            Sent successfully <span onClick = {() => setSuccess(false)} className = "btn btn-close"></span>
          </div>
        </motion.div> : empty && <AlertModal message = "Note cannot be empty" color = "danger" /> 
      }
      </AnimatePresence>
      <div className = "text-center p-4 mb-4">
              <h1 className = "mt-5 mb-3 fs-1 gloria-font text-light">Send a message to {user?.username}</h1>
              <p className = "gloria-font opacity-75  text-light">! The recipient won't be able to know the sender of this message</p>
      </div>
      <textarea placeholder = "Type your message here..." ref = {textareaRef} value = {message} onChange = {e => setMessage(e.target.value)}className = " min-vh-40  bg-transparent text-light mb-5 w-75" />

        <button onClick = {handleSubmit} className = "btn btn-outline-light w-75 z-3 text-truncate">
          Submit
        </button>
      
    </motion.div>
  )}
  else{
    return <LoadingSpinner/>
  }
}

export default SubmitNote