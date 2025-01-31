import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form.tsx';
import axios from 'axios';

const Register = () => {
  
  const [format, setFormat] = useState<{
    username: string,
    password: string
  }>({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  
  const handleChange = useCallback((e) => {
   
      const { name, value } = e.target;
     
      setFormat(prev => {
        return {
          ...prev, [name] : value
        }
      })
  })
  
  const handleSubmit = useCallback(async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { username, password } = format;
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { username, password },
        {
        withCredentials: true
      })
      
      if(res.data.success){
        nav("/");
      }
      setLoading(false);
    }catch(e){

        setMessage(e?.response?.data?.message || "Internal server error");
      
      
      setLoading(false);
    }
  })
  
  return (
    <div className = "min-vh-100 d-flex container flex-column gap-4 justify-content-center align-items-center  w-100">
                        <h1 className = "gloria-font text-light">NotesFromAStranger</h1>
      <Form message = {message} loading = {loading} password = {format.password} username = {format.username} handleChange = {handleChange} onSubmit = {handleSubmit} redirect = "/register" />
    </div>
  )
}

export default Register