import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosClient } from '../utils/axiosClient'
import MainLoader from '../components/MainLoader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const mainContext = createContext()
export const useMainContext = () => useContext(mainContext)

export const MainContextProvider = ({children}) => {


  const [user,setUser] = useState(null)
   const [loading,setLoading] = useState(true)
const navigate = useNavigate()
const [tasks,setTasks] = useState([])


const fetchTasks = async () => {

  try {
    
    const response = await axiosClient.get('/all-task',{
      headers:{
        user:localStorage.getItem('user') || ''     
     }
    })

    setTasks(response?.data)
    

  } catch (error) {
    toast.error(error?.reponse?.data?.message || error.message)
  }

}

  const logoutHandler = () => {
    try {

      localStorage.removeItem('user')
      toast.success('Loggedout Successfully')
navigate('/login')
setUser(null)
      
    } catch (error) {
      toast.error(error)
    }
  }


const fetchProfile = async () => {

try {
  
  setLoading(true)
  const token = localStorage.getItem('user')
if (!token) return

const response = await axiosClient.get('/profile',{
  headers:{
    user:token
  }
})

setUser(response.data)

await fetchTasks()

} catch (error) {
  
console.log(error.messages);


}finally{
  setLoading(false)

}

}

useEffect(()=>{
fetchProfile()
},[])


if(loading){
  return <div  className='min-h-screen flex items-center justify-center'>
    <MainLoader/>
  </div> 
}

  return (
 
<mainContext.Provider className="relative" value={{user,logoutHandler,fetchProfile,tasks,fetchTasks}}>
  {children}
</mainContext.Provider>

  )
}
