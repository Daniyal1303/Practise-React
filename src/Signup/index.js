import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context.js";

const Signup = () => {
  const { user, setUser } = useContext(AuthContext);
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("State User", user);
  }, [user]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:7000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => console.log(error));

    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 2000);
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up Register User
        </h2>

        <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="username"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.username}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.email}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.password}
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {submit && (
            <div className="mt-4">
              <p className="bg-gradient-to-r from-gray-400 to-gray-800 px-4 py-2 text-center font-bold text-white transition-transform ">
                User is Registered
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
