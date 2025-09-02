import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { VscLoading } from "react-icons/vsc";
const LoaderButton = ({text,isLoading}) => {
  return (
    <>
    
    <button type='submit' disabled={isLoading} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-x-1.5 disabled:cursor-not-allowed disabled:bg-indigo-200 cursor-pointer">
    {text}
    <span>
        {
            isLoading? <VscLoading className='
            animate-spin'/> : <FaArrowRight/>
        }
    </span>
    </button>

    </>
  )
}

export default LoaderButton