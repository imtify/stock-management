"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const initialStockData = [
    { id: 1, name: "Laptop", quantity: 10, price: 100 },
    { id: 2, name: "Mobile", quantity: 5, price: 120 },
    { id: 3, name: "Handheld", quantity: 8, price: 80 },
    // Add more initial products as needed
  ];

  const [stockData, setStockData] = useState(initialStockData);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const handleAddProduct = () => {
    if (newProductName && newProductQuantity) {
      const newProduct = {
        id: stockData.length + 1,
        name: newProductName,
        quantity: parseInt(newProductQuantity),
        price: parseInt(newProductPrice),
      };
      setStockData([...stockData, newProduct]);
      setNewProductName("");
      setNewProductQuantity("");
      setNewProductPrice("");
    }
  };

  const filteredStockData = stockData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.quantity.toString().includes(searchItem) ||
      product.price.toString().includes(searchItem)
  );

  return (
    <>
      <Header />
      <div className="container bg-red-50 mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add a Product</h1>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              type="number"
              value={newProductQuantity}
              onChange={(e) => setNewProductQuantity(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <button
            onClick={handleAddProduct}
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
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
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
              {filteredStockData.map((product) => (
                <tr key={product.id}>
                  <td className="border py-2 px-4">{product.id}</td>
                  <td className="border py-2 px-4">{product.name}</td>
                  <td className="border py-2 px-4">{product.quantity}</td>
                  <td className="border py-2 px-4">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
