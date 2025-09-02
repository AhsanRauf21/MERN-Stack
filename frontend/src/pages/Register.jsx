import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { useMainContext } from "../context/MainContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const {fetchProfile} = useMainContext()

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const response = await axiosClient.post('/register',values)
      
toast.success(response.data.message)
     localStorage.setItem('user',response.data.token)

      resetForm();
      await fetchProfile()
      navigate("/login");
    } catch (error) {
toast.error(error?.response?.data?.message || error.message)

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-5">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
          Create Your Account
             <span className="absolute top-3 right-14 animate-spin bg-amber-400 size-[12px] text-amber-400  ">
          </span>
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-rose-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-rose-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <div className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between">
                <Field
                  type={hide ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="outline-none"
                />
                <button
                  type="button"
                  onClick={() => setHide(!hide)}
                  className="font-semibold text-sm outline-none"
                >
                  {hide ? "show" : "hide"}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-rose-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <LoaderButton text="Register" isLoading={loading} />
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-500 hover:underline ml-1 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
