import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Items = () => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalBoughtCost, setTotalBoughtCost] = useState(0);
  let [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:8000/api/v1/shoppingItems",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        const itemsArray = result.data.data;
        console.log("itemsArray:", itemsArray); // Log itemsArray to verify data
        setItems(itemsArray);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/totalCosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTotalCost(response.data.totalCost);
        setTotalBoughtCost(response.data.totalBoughtCost);

        calculatePercentage();
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculatePercentage();
  }, [items, totalCost, totalBoughtCost]);

  const calculatePercentage = () => {
    if (totalCost > 0) {
      const avg = (totalBoughtCost / totalCost) * 100;
      setPercentage(avg);
    } else {
      setPercentage(0);
    }
  };

  const onDelete = async (id, cost, isBought) => {
    try {
      // Delete the item
      await axios.delete(`http://localhost:8000/api/v1/shoppingItems/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));

      // Update totalCost and totalBoughtCost
      setTotalCost((prevTotalCost) => prevTotalCost - cost);
      if (isBought) {
        setTotalBoughtCost((prevTotalBoughtCost) => prevTotalBoughtCost - cost);
      }

      // Recalculate percentage
      calculatePercentage();
    } catch (error) {
      console.error("API Error:", error);
    }
    window.location.reload();
  };

  const handleToggleIsBought = async (id, currentIsBought, cost) => {
    const newIsBought = !currentIsBought;

    try {
      // Toggle isBought for the item
      await axios.put(
        `http://localhost:8000/api/v1/shoppingItems/${id}`,
        { isBought: newIsBought },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, isBought: newIsBought } : item
        )
      );

      // Update totalBoughtCost
      if (newIsBought) {
        setTotalBoughtCost((prevTotalBoughtCost) => prevTotalBoughtCost + cost);
      } else {
        setTotalBoughtCost((prevTotalBoughtCost) => prevTotalBoughtCost - cost);
      }

      // Recalculate percentage
      calculatePercentage();
    } catch (error) {
      console.error("API Error:", error);
    }
    window.location.reload();
  };

  const handleAddClick = () => {
    navigate(`/items/addItems`);
  };

  const handleEditClick = (item) => {
    navigate(`/items/${item._id}`, {
      state: item,
    });
  };
  return (
    <div className="bg-gray-300 py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-6">
          <Link to="/items/addItems">
            <button
              type="button"
              onClick={() => handleAddClick()}
              className="inline-block  font-serif rounded bg-primary bg-red-500 px-6 py-1 mb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add an Item
            </button>
          </Link>

          <h1 className="text-4xl font-bold font-serif uppercase">
            Your Shopping Items List
          </h1>

          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${percentage}%` }}
            >
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/5"></div>
          <div className="flex flex-col justify-center w-3/5">
            {items.length === 0 ? (
              <p className="text-2xl text-center p-10">
                Oops, you don't have any items.{" "}
                <span>
                  <Link to="/items/addItems">
                    <button
                      type="button"
                      onClick={() => handleAddClick()}
                      className="inline-block  font-serif rounded bg-primary bg-red-900 px-6 py-1 mb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Add an Item
                    </button>
                  </Link>
                </span>
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-gray-700 p-2 mb-2 shadow-md rounded-md"
                >
                  <div
                    className={`${
                      item.isBought ? "bg-green-800" : "bg-red-800"
                    } absolute top-0 right-0 mt-2 mr-2 text-xs text-white px-2 py-1 rounded cursor-pointer`}
                    onClick={() =>
                      handleToggleIsBought(item._id, item.isBought)
                    }
                  >
                    {item.isBought ? "Bought" : "Not Bought"}
                  </div>

                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 capitalize">
                    {item.name}
                  </h5>
                  <p className="mb-1 text-base text-neutral-600 dark:text-neutral-200">
                    {item.description}
                  </p>
                  <p className="mb-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Cost: ETB {item.cost}
                  </p>
                  <Link to={`/items/${item._id}`} state={{ test: item }}>
                    <button
                      type="button"
                      href="#"
                      className="inline-block rounded bg-primary bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => handleEditClick(item)}
                    >
                      edit
                    </button>
                  </Link>

                  <button
                    type="button"
                    href="#"
                    onClick={() => {
                      onDelete(item._id);
                    }}
                    className="inline-block mx-2 rounded bg-primary bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Delete
                  </button>
                  <div className="absolute bottom-0 right-0 mb-2 mr-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Date: {item.timeToBuy}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-1/5"></div>
        </div>
      </div>
    </div>
  );
};

export default Items;
