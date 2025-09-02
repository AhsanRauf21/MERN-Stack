import React from 'react'
import { SiTask } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useMainContext } from '../context/MainContext'
const NavBar = () => {

  const {user,logoutHandler} = useMainContext()
  
  return (
 <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl hover:text-indigo-700 transition">
          <SiTask className="text-2xl" />
          <span>Task Manager</span>
        </Link>


        {/* Auth Button */}
        <div>
          {
!user?
            <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
            Login
          </Link> :
<ul className="flex items-center justify-center gap-x-2" >
  <li>
  <Link to={'/add-task'}
  className="hover:bg-indigo-600 border border-black text-black hover:text-white px-4 py-2 rounded-lg  transition font-semibold duration-100 hover:border-white"
  >
            Add Task
          </Link>
  </li>
  <li>
      <button onClick={logoutHandler}
  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
  >
            Logout
          </button>
  </li>
</ul>

          }
        </div>
      </nav>
    </header>
    
  
)
}

export default NavBar