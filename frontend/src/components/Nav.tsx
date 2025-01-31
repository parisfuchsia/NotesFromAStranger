
import { NavLink } from 'react-router-dom';


const Nav = () => {
  
  return (
    <div className = "hstack bg-transparent gap-2 opacity-75 px-3 text-light pt-3">
      <NavLink to = "/register" className = "f-5 text-light text-decoration-none">Register</NavLink>
      /
      <NavLink to = "/" className = "f-5 breadcrumb-item text-light text-decoration-none ">Main</NavLink>
    </div>
  )
}

export default Nav