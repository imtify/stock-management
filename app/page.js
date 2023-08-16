"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [productForm, setProductForm] = useState({});

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product", productForm);
      console.log(response.data);
      setProductForm({});
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  console.log(productForm);

  return (
    <>
      <Header />
      <div className="container bg-red-50 mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add a Product</h1>
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
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Display Current Stock</h1>
          {/* Search Input */}
          <div className="mb-2">
            <h2 className="text-lg font-semibold mb-2">Search Products</h2>
            <input
              type="text"
              className="w-full px-2 py-1 border rounded"
              placeholder="Search by product name"
            />
          </div>

          {/* Stock Table */}
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border py-2 px-4">ID</th>
                <th className="border py-2 px-4">Product Name</th>
                <th className="border py-2 px-4">Quantity</th>
                <th className="border py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border py-2 px-4">1</td>
                <td className="border py-2 px-4">Product 1</td>
                <td className="border py-2 px-4">3</td>
                <td className="border py-2 px-4">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
