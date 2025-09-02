import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";

const LoginPage = () => {
const navigate = useNavigate()
const {fetchProfile} = useMainContext()


  const [loading, setLoading] = useState(false);
    const [hide,setHide]  = useState(true)
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      setLoading(true);
     
           const response = await axiosClient.post('/login',values)
           
     toast.success(response.data.message)
     localStorage.setItem('user',response.data.token)
           resetForm();
           await fetchProfile()
           navigate("/");
         } catch (error) {
     toast.error(error?.response?.data?.message || error.message)
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
          Login to Your Account
          <span className="absolute top-3 right-11 bg-amber-400 size-[12px] text-amber-400  animate-bounce">
          </span>
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
             <div     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between">
 <Field 
                type={hide?'password':'text'}
                id="password"
                name="password"
                placeholder="••••••••"
                className="outline-none"
            
              />
         <button type="button" onClick={()=>setHide(!hide)} className="font-semibold text-sm outline-none">
            {
                hide? 'show' : 'hide'
            }
         </button>

             </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
         <LoaderButton text={'Login'} isLoading={loading}/>
          </Form>
        </Formik>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
