import React from 'react'
import { taskCategories } from "../utils/constant";

const TaskShow = ({data}) => {

    const category = data.category
    const categoryClass = taskCategories[category]
  
  return (
<div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
  <h1 className="text-2xl font-bold text-gray-800">
    {data.title}
  </h1>

  {/* Description inline */}
  <div className="flex gap-2 text-gray-600">
    <span className="font-bold text-black">Description:</span>
    <p className="max-w-md">{data.description}</p>
  </div>

  {/* Category inline */}
  <div className="flex items-center gap-2">
    <span className="font-bold">Category:</span>
    <h4
      className={`px-4 py-1.5 text-sm font-semibold rounded-full ${categoryClass} capitalize`}
    >
      {data.category}
    </h4>
  </div>
</div>



  )
}

export default TaskShow