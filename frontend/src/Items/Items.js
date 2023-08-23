import React, { useState } from "react";
import Item from "./SingleItem";
import AddForm from "./AddItemForm";
import EditItem from "./EditItemForm";
import ProgressBar from "./ProgressBar";

const Items = () => {
  const initialNewItem = {
    id: null,
    name: "",
    time: "",
    cost: "",
    description: "",
    bought: false,
  };

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      time: "1 hour",
      cost: "100",
      description: "This is item 1",
      bought: false,
    },
    {
      id: 2,
      name: "Item 2",
      time: "2 hours",
      cost: "200",
      description: "This is item 2",
      bought: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newItem, setNewItem] = useState(initialNewItem);
  const [selectedItem, setSelectedItem] = useState(null);

  const onAddItem = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveNewItem = () => {
    if (
      !newItem.name ||
      !newItem.time ||
      !newItem.cost ||
      !newItem.description
    ) {
      return;
    }

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setNewItem(initialNewItem);
    setShowAddForm(false);
  };

  const handleToggleBought = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, bought: !item.bought } : item
    );
    setItems(updatedItems);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowEditForm(true);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
    setSelectedItem(null);
  };

  const handleEditUpdate = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    setShowEditForm(false);
    setSelectedItem(null);
  };

  const totalCost = items
    .filter((item) => item.bought)
    .reduce((total, item) => total + parseInt(item.cost), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4">
        <div className="font-bold text-xl">All Shopping List</div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={onAddItem}
        >
          Add Item
        </button>
      </div>
      {showAddForm && (
        <AddForm
          newItem={newItem}
          handleInputChange={handleInputChange}
          saveNewItem={saveNewItem}
        />
      )}
      {showEditForm && (
        <EditItem
          item={selectedItem}
          handleEditFormClose={handleEditFormClose}
          updateItem={handleEditUpdate}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleBought={handleToggleBought}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
      <ProgressBar totalCost={totalCost} />
    </div>
  );
};

export default Items;
