import React, { useState } from "react";

const EditItem = ({ item, handleEditFormClose, updateItem }) => {
    const [editedItem, setEditedItem] = useState(item);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        // Call the updateItem function from parent component to update the item
        updateItem(editedItem);
        handleEditFormClose(); // Close the edit form after saving changes
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={editedItem.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Time"
                    name="time"
                    value={editedItem.time}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    value={editedItem.cost}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={editedItem.description}
                    onChange={handleInputChange}
                />
            </div>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
            <button
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={handleEditFormClose}
            >
                Cancel
            </button>
        </div>
    );
};

export default EditItem;
