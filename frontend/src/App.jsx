import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import { MainContextProvider } from "./context/MainContext";
import { ToastContainer } from "react-toastify";
import ProtectedLayer from "./layout/ProtectedLayer";
import AddTask from "./pages/AddTask";

const App = () => {
  return (
    <>
      <Router>
        <MainContextProvider>
          <ToastContainer/>
        <NavBar />
        <Routes>
          <Route Component={ProtectedLayer}>

          <Route path="/" Component={Dashboard} />
          <Route path="/add-task" Component={AddTask} />
          </Route>

          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
        <Footer />
        </MainContextProvider>
      </Router>
    </>
  );
};

export default App;
