import React, { useState } from 'react'
import { FaArrowRight, FaEdit, FaEye } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { MdClose } from 'react-icons/md';
import TaskShow from './TaskShow';
import TaskUpdateView from './TaskUpdateView'; // make sure it's imported
import { toast } from 'react-toastify';
import MainLoader from './MainLoader';
import { axiosClient } from '../utils/axiosClient';

const TaskViewModel = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get(`/task/${id}`, {
        headers: {
          user: localStorage.getItem('user') || ''
        }
      })
      // toast.success("Fetched")
      setTask(response.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  async function openModel() {
    await fetchData()
    setIsOpen(true)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModel}
        className="text-sm flex justify-center items-center gap-x-1 cursor-pointer border-2 rounded-full px-3 py-1 border-blue-900 bg-indigo-700 text-white hover:bg-indigo-800 transition"
      >
        <span className="font-semibold">View</span>
        <FaArrowRight />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          {/* Overlay transition */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>

          {/* Panel transition */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200">
                {/* Header */}
                <DialogTitle className="flex items-center justify-between px-5 py-3 border-b">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Task {isUpdate ? 'Update' : 'Details'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsUpdate(!isUpdate)}
                      className="text-gray-600 hover:text-indigo-600 transition"
                      title="Toggle Update"
                    >
                      {isUpdate ? <FaEye /> : <FaEdit />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <MdClose size={22} />
                  </button>
                </DialogTitle>

                {/* Content */}
                <div className="p-5 max-h-[70vh] overflow-y-auto bg-gray-50 rounded-b-2xl">
                  {loading ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <MainLoader />
                    </div>
                  ) : (
                    isUpdate ? (
                      <TaskUpdateView data={task} fetchData={fetchData} />
                    ) : (
                      <TaskShow data={task} />
                    )
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TaskViewModel
