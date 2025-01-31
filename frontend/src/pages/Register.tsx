import { useState, useRef, useCallback } from 'react'
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
  const handleChange = useCallback((e) => {
   
      const { name, value } = e.target;
      setMessage("");
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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, { username, password },
        {
        withCredentials: true
      })
      
      if(res.status === 201){
        setMessage(res?.data?.message);
      }
      setLoading(false);
    }catch(e){
        if(e.status === 409){
        setMessage(e?.response?.data?.message);
      }
      
      setLoading(false);
    }
  })
  
  return (
    <div className = "min-vh-100 d-flex container flex-column gap-4 justify-content-center align-items-center w-100 ">
                        <h1 className = "gloria-font text-light">NotesFromAStranger</h1>
      <Form loading = {loading} message = {message} onSubmit = {handleSubmit} password = {format.password} username = {format.username} handleChange = {handleChange} redirect = "/login" />
    </div>
  )
}

export default Register