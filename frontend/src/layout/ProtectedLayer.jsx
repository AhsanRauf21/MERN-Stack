import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MainLoader from '../components/MainLoader'
import { useMainContext } from '../context/MainContext'

const ProtectedLayer = () => {
const {user} = useMainContext()
const [loading,setLoading] = useState(true)
const navigate = useNavigate()
useEffect(()=>{
if(!user) navigate('/login')
else setLoading(false)
},[user])


if(loading){
    return <MainLoader/>
}
  return (
    <>
    
    <Outlet/>
    </>
  )
}

export default ProtectedLayer