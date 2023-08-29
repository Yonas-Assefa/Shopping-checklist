import React from "react";
import Typed from "react-typed";
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
        EMBRACING SHOPPING EXCELLENCE
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 text-white">
          Grow with Program.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4 text-white">
            Fast, flexible planning for
          </p>
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-[#00df9a]"
            strings={["School", "Kitchen", "Finance","More.."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-400">
        Efficiently Manage Your Shopping Items for Timely Delivery and Optimal Organization
        </p>
        <Link to="/register">
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
