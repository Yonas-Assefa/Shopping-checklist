import React from "react";

const Card = ({ children }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            {children}
        </div>
    );
}

export default Card;