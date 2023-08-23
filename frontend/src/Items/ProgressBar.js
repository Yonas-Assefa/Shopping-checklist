import React from "react";

const ProgressBar = ({ totalCost }) => {
    const progressBarWidth = (totalCost / 500) * 100;

    return (
        <div className="mt-8">
            <p>Total Cost of Items Bought: ${totalCost}</p>
            <div className="bg-gray-200 h-4 rounded mt-2">
                <div
                    className="bg-blue-500 h-4 rounded"
                    style={{ width: `${progressBarWidth}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
