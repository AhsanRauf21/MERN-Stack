import React, { useState } from 'react';
import { taskCategories } from '../utils/constant';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoaderButton from '../components/LoaderButton';
import { axiosClient } from '../utils/axiosClient';
import { useMainContext } from '../context/MainContext';

const TaskUpdateView = ({data,fetchData}) => {

const [loading,setLoading]  = useState(false)

const {fetchTasks} = useMainContext()

  const categories = Object.keys(taskCategories);

  const initialValues = {
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    category: yup
      .string()
      .required('Category is required')
      .oneOf(categories, 'Select a valid category'),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
        setLoading(true)
 const response = await axiosClient.put(`/task/${data._id}`,values,{
    headers:{
        "user":localStorage.getItem('user') ||''
    }
 })


        
      toast.success(response.data.message);
      await fetchTasks()
      await fetchData()

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className=" p-2 rounded-lg ">
      <h2 className="text-2xl font-bold text-center ">Update Task</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 " htmlFor="title">
              Task Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="title"
              className="text-rose-500 text-sm"
              component="p"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Enter task description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <ErrorMessage
              name="description"
              className="text-rose-500 text-sm"
              component="p"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700" htmlFor="category">
              Category
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select category</option>
              {categories.map((cur, i) => (
                <option key={i} value={cur} className="capitalize">
                  {cur}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="category"
              className="text-rose-500 text-sm"
              component="p"
            />
          </div>

          {/* Submit Button */}
        <LoaderButton text={'Update Task'} isLoading={loading}/>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskUpdateView;
