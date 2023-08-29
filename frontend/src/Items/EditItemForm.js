import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const EditItem = () => {
  //featch the previous data
  const { state } = useLocation();
  console.log(state.test);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const item = state.test;

  //set the component user data
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [cost, setCost] = useState(item.cost);
  const [isBought, setIsBought] = useState(item.isBought);
  const [date, setDate] = useState(item.date);
  const { itemId } = useParams();

  const navigate = useNavigate();

  //register user onto db
  const handleSubmit = (e, id) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "put",
      url: `http://localhost:8000/api/v1/shoppingItems/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        description,
        cost,
        isBought,
        date,
      },
    };

    // make the API call
    axios(configuration);

    navigate("/items");
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div className="w-1/5"></div>
      <div className="w-3/5">
        <h1 className="font-serif text-white text-lg mb-8 text-center">
          Login Here
        </h1>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="isBought"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Is Bought
          </label>
          <select
            name="isBought"
            value={isBought}
            onChange={(e) => setIsBought(e.target.value)}
            id="isBought"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="true">Bought</option>
            <option value="false">Not Bought</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="datetime-local"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cost
          </label>
          <input
            type="number"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            id="cost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => handleSubmit(e, item._id)}
        >
          Submit
        </button>
      </div>
      <div className="w-1/5"></div>
    </form>
  );
};

export default EditItem;
