import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context.js";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [submit, setSubmit] = useState(false);
  const [press, setPress] = useState(false);
  const [fetchedApi, setFetchedApi] = useState([]);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:7000/signup")
      .then((res) => res.json())
      .then((users) => setFetchedApi(users))
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  useEffect(() => {
    console.log("State User", user);
  }, [user]);

  function handleChange(e) {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const registerUser = fetchedApi?.find(
      (user) =>
        user?.email === loginUser.email && user?.password === loginUser.password
    );

    if (registerUser) {
      fetch("http://localhost:7000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      })
        .then((res) => res.json())
        .then((data) => console.log("Api user", data))
        .catch((error) => console.log(error));
      setLoginUser({
        email: "",
        password: "",
      });
      setSubmit(true);
      setSubmit(false);
      setUser(registerUser);
    } else {
      setSubmit(false);
      setPress(true);
      return;
    }
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
          Sign in to your account
        </h2>

        <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
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
              value={loginUser.email}
              onChange={(e) => handleChange(e)}
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
              value={loginUser.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        {submit
          ? submit &&
            press && (
              <div className="mt-4">
                <p className="bg-gradient-to-r from-gray-500 to-gray-800  px-4 py-2 text-center font-bold text-green-600 font-italic  transition-transform ">
                  User is LoggedIn
                </p>
              </div>
            )
          : !submit &&
            press && (
              <div className="mt-4">
                <p className="bg-gradient-to-r from-gray-500 to-gray-800  px-4 py-2 text-center font-bold text-red-600 font-italic  transition-transform ">
                  Users Crdentials are not valid.
                </p>
              </div>
            )}

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

//React Component
