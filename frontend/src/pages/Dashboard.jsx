import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import {CiSearch} from 'react-icons/ci'
import { useMainContext } from '../context/MainContext'
const Dashboard = () => {

const {tasks} = useMainContext()
const [search,setSearch] = useState('')
const filterTasks = tasks.length > 0 ? tasks.filter((cur,i) => {
   const x = search.toLowerCase()
   const y = cur.title.trim().toLowerCase()
   const z = cur.description.trim().toLowerCase()

   return y.includes(x) || y.startsWith(x) || y.endsWith(x) || z.includes(x) || z.startsWith(x) || z.endsWith(x)

}) : []

  return (
    <>

    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-3 py-2">
        <CiSearch className="text-gray-500 text-2xl mr-2" />
        <input
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
          type="text"
          placeholder="Search tasks..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[97%] lg:w-[80%] mx-auto p-5">
  {
  
  filterTasks.length > 0 ? filterTasks.map((cur, i) => {
      
    return <TaskCard data={cur} key={i}/>
    }) :
<>
       <div className="col-span-3  py-10 ">
      <h1 className="text-lg text-center font-semibold text-gray-600">
        You have no tasks
      </h1>
    </div>

</>
    }




</div>
    </>

  )
}

export default Dashboard