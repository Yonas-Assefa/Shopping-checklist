import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const Logout = () => {
  //set the component user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Logout, setLogout] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();

  //register user onto db
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    console.log("aasfs", email, password);
    // set configurations
    const configuration = {
      method: "get",
      url: "http://localhost:8000/api/v1/auth/logout",
      
    };

    // make the API call
    axios(configuration)
      .then((result) => {

        // navigate("/items");
        window.location.href = "/login";
      })
      .catch((error) => {
        setLogout(false);
        console.log(error);
      });
  };
  return (
    <form className="flex" onSubmit={(e) => handleSubmit(e)}>
      <div className="w-1/5"></div>
      <div className="w-3/5">
        {/* display success message */}
        {!Logout && <p className="text-red-800">You Are Not Logged in</p>}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Logout
        </button>
      </div>
      <div className="w-1/5"></div>
    </form>
  );
};

export default Logout;
