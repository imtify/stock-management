"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { ...productForm };
      setProducts([...products, newProduct]);
      await axios.post("/api/product", productForm);
      setAlertMessage("Product Added Successfully");
      setProductForm({});
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // useEffect(() => {
  //   const filtered = products.filter(
  //     (product) =>
  //       product.slug?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
  //       "" ||
  //       product.id?.toString()?.includes(searchQuery) ||
  //       ""
  //   );
  //   setFilteredProducts(filtered);
  // }, [searchQuery, products]);

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const onDropdown = async (e) => {
    setSearchQuery(e.target.value);
    const response = await fetch("/api/search?query=" + searchQuery);
    let rjson = await response.json();
    console.log(rjson.products);
    setDropdown(rjson.products);
  };

  const handleDownload = () => {
    const xlsData = [
      ["Product ID", "Product Name", "Quantity", "Price"],
      ...filteredProducts.map((product) => [
        product.id,
        product.slug,
        product.quantity,
        product.price,
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(xlsData);
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    XLSX.writeFile(wb, "products.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Product ID", "Product Name", "Quantity", "Price"]],
      body: products.map((product) => [
        product.id,
        product.slug,
        product.quantity,
        product.price,
      ]),
    });
    doc.save("products.pdf");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold mb-2">Add a Product</h1>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Product ID</label>
            <input
              name="id"
              value={productForm.id || ""}
              onChange={handleChange}
              type="text"
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              name="slug"
              value={productForm.slug || ""}
              onChange={handleChange}
              type="text"
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              name="quantity"
              value={productForm.quantity || ""}
              onChange={handleChange}
              type="number"
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Price</label>
            <input
              name="price"
              value={productForm.price || ""}
              onChange={handleChange}
              type="number"
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
          {alertMessage && (
            <div className="bg-green-300 p-2 my-4 text-center">
              {alertMessage}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">Current Stock</h1>
          <div className="mb-2">
            <h2 className="text-lg font-semibold mb-2">Search Product</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onDropdown(e);
              }}
              onBlur={onDropdown}
              className="w-full px-2 py-1 border rounded"
              placeholder="Enter Product ID or Name"
            />
          </div>

          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-1 my-1 mr-1 rounded hover:bg-green-600"
          >
            Download as XLSX
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-red-500 text-white px-4 py-1 my-1 rounded hover:bg-red-600"
          >
            Download as PDF
          </button>
          <div
            className="table-container mt-2"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border py-2 px-4 sticky top-0 bg-gray-100">
                    Product ID
                  </th>
                  <th className="border py-2 px-4 sticky top-0 bg-gray-100">
                    Product Name
                  </th>
                  <th className="border py-2 px-4 sticky top-0 bg-gray-100">
                    Quantity
                  </th>
                  <th className="border py-2 px-4 sticky top-0 bg-gray-100">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {dropdown.length > 0
                  ? dropdown.map((product) => (
                      <tr key={product.slug}>
                        <td className="border py-2 px-4">{product.id}</td>
                        <td className="border py-2 px-4">{product.slug}</td>
                        <td className="border py-2 px-4">{product.quantity}</td>
                        <td className="border py-2 px-4">{product.price}</td>
                      </tr>
                    ))
                  : products.map((product) => (
                      <tr key={product.slug}>
                        <td className="border py-2 px-4">{product.id}</td>
                        <td className="border py-2 px-4">{product.slug}</td>
                        <td className="border py-2 px-4">{product.quantity}</td>
                        <td className="border py-2 px-4">{product.price}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
