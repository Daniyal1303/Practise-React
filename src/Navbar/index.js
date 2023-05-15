import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context.js";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log("user id on logout ", user.id);
  function onlogout() {
    fetch(`http://localhost:7000/login/${user?.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    console.log("State User", user);
  }, [user]);

  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="#">
                <h2 className="text-2xl text-white font-bold">NavBar</h2>
              </a>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <Link to="/form">
                  <li className="text-white font-medium hover:opacity-30 cursor-pointer">
                    Form
                  </li>
                </Link>

                <li className="text-white font-medium hover:opacity-30 cursor-pointer">
                  {user?.username}
                </li>
                <li
                  className="text-white font-medium hover:opacity-30 cursor-pointer"
                  onClick={() => onlogout()}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
