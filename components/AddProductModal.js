import React, { useState } from "react";

const AddProductModal = ({ isOpen, onClose, addProduct }) => {
  const [productForm, setProductForm] = useState({});

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(productForm);
    setProductForm({});
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-content">
          <h1 className="text-2xl font-bold mb-2">Add a Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Product ID</label>
              <input
                name="id"
                onChange={handleChange}
                type="text"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                name="slug"
                onChange={handleChange}
                type="text"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Quantity</label>
              <input
                name="quantity"
                onChange={handleChange}
                type="number"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Price</label>
              <input
                name="price"
                onChange={handleChange}
                type="number"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
