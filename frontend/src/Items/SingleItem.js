import React from "react";

const Item = ({ item, onToggleBought, onEdit, onDelete }) => {
    const handleToggle = () => {
        onToggleBought(item.id);
    };

    const handleEdit = () => {
        onEdit(item);
    };

    const handleDelete = () => {
        onDelete(item.id);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <p className="text-gray-700 text-base mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {item.time}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {item.cost}
                    </span>
                </div>
                <div className="flex">
                    <input
                        type="checkbox"
                        checked={item.bought}
                        onChange={handleToggle}
                        className="mr-2"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item;
