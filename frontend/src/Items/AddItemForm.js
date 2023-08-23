import React from "react";
const AddForm = ({ newItem, handleInputChange, saveNewItem }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Time"
                    name="time"
                    value={newItem.time}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    value={newItem.cost}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                />
            </div>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={saveNewItem}
            >
                Save Item
            </button>
        </div>
    );
};

export default AddForm;