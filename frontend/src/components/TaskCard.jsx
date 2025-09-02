import React, { useState } from "react";
import { taskCategories } from "../utils/constant";
import TaskViewModel from "./TaskViewModel";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { useMainContext } from "../context/MainContext";
import { CgSpinner } from "react-icons/cg";

const TaskCard = ({data}) => {

    const category = data.category
    const categoryClass = taskCategories[category]
  const {fetchTasks} = useMainContext()
const [loading,setLoading]  = useState(false)

const deleteTask = async()=>{
  try {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

      setLoading(true)
      const resposne = await axiosClient.delete(`/task/${data._id}`,{
        headers:{
          user:localStorage.getItem('user') || ''
        }
      })
      
      
      // console.log(data);
      
      toast.success(resposne?.data?.message)
    
await fetchTasks()
    
  } catch (error) {
    
    toast.error(error?.response?.data?.message || error.message)

  }finally{
setLoading(false)
  }
}



  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{data.title}</h3>
        <button onClick={deleteTask} type="button" title="Delete" className="pb-2 text-lg   text-rose-500">
       {
       loading? <CgSpinner className="animate-spin"/> : <FaTrash/>
       }
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-3 line-clamp-3">
       {
        data.description
       }
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Priority */}
        <span className={`${categoryClass} capitalize`}>{category}</span>


        {/* Actions */}
       <TaskViewModel id={data._id} />
        
      </div>
    </div>
  );
};

export default TaskCard;
