import {NavLink} from 'react-router-dom';
import { CiWarning } from "react-icons/ci";



const ErrorModal = () => {
  const reasons = ["Invalid session", "Network error" ,"Internal server error"];
  return (
    <div className = "w-100 min-vh-100 position-fixed d-flex justify-content-center align-items-center ">
      <main className = "  w-75">
        <h4 className = "text-light "><CiWarning className = "mx-2"/>Something unexpected has occurred</h4>
                  <label className = "mt-3 text-light">Possible reasons:</label>
        <ul className = "mt-1 mb-4">
          {
            reasons.map(reason => <p className = "mb-0 text-light ">{reason}</p>)
          }
        </ul>
        <div className = "hstack gap-3">
          <button className = "btn btn-outline-light" onClick = {() => window.location.reload()}>Retry</button>
          <NavLink to = "/" className = "btn btn-outline-light">Login</NavLink>
        </div>
      </main>
    </div>
  )
}

export default ErrorModal