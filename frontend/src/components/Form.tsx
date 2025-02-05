
import { NavLink } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import Cloud from '../components/Cloud.tsx';
import { fade } from '../variant/variant.ts';

const zoomVariant = {
  hidden: {
    opacity:0,
    padding: 0,
    
  },
  visible: {
    opacity: 1,
    padding: '1.2rem',
    
    transition: {
      duration: 1
    }
  }
}

const Form = ({ username, password, handleChange, redirect, onSubmit, message, loading}) => {
  
  return (
    <motion.div 
    initial = {{opacity:0}}
    animate = {{opacity:1, transition: {
      duration: 0.8
    }}}
    className = "rounded-5 ultraviolet bg-dark-ultra overflow-hidden shadow col-8 col-sm-7 col-md-6 w-75">
      <h1 className = "p-4 mb-0 text-light gloria-font">{redirect === "/login" ? "Register" : "Login"}</h1>
      <motion.form 
      variants = {zoomVariant}
      initial = "hidden"
      animate = "visible"
      onSubmit = {onSubmit} novalidate className = "d-flex flex-column  gap-2">
        <div className = "form-floating">
          <input maxlength="10" minlength="6" onChange = {handleChange} autocomplete = "off" name = "username" type = "text" required className = "form-control" placeholder = "Username" value = {username}/>
       
          <label className = "text-secondary">Username</label>
        </div>
        <div className = "form-floating">
          <input minlength = "6" maxlength="20" name = "password" onChange = {handleChange} type = "password" required value = {password}className = "form-control" placeholder = "Password"/>
          <label className = "text-secondary">Password</label>
          </div>
        {
          message &&   <div className = "text-left badge badge-primary " role = "badge" >{message}</div>
        }
        <div className = "d-flex justify-content-start w-100 align-items-center gap-3">

                  <button type = "submit" className = "btn btn-dark text-truncate w-50 d-flex justify-content-center align-items-center">{loading ? <MoonLoader size = "16" color="white" /> : "Submit"}</button>
                  <p className = "mb-0 w-75 text-light z-5">
                    {
                      redirect === "/" ? "Already have an account?" : "Doesn't have an account?"
                    } <NavLink to = {redirect} className = " z-3 text-light">
                      {redirect === "/login" ? "Login" : "Register"}
                    </NavLink>
                  </p>
        </div>
      </motion.form>
                        <Cloud />
    </motion.div>
  )
}

export default Form