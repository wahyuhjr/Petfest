"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  async function fetchAnimals() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/animals");
      setAnimals(res.data);
    } catch (error) {
      showNotification("error", "Failed to load animals");
      console.error("Error fetching animals:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function showNotification(type, message) {
    setNotification({ show: true, type, message });
    setTimeout(
      () => setNotification({ show: false, type: "", message: "" }),
      3000
    );
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is a PNG
    if (file.type !== "image/png") {
      showNotification("error", "Please upload a PNG image only");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Create form data for file upload
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      if (imageFile) {
        formDataWithFile.append("image", imageFile);
      }

      if (editingId) {
        await axios.put(`/api/animals/${editingId}`, formDataWithFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("success", "Animal updated successfully");
      } else {
        await axios.post("/api/animals", formDataWithFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("success", "Animal added successfully");
      }

      // Reset form
      setFormData({ name: "" });
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchAnimals();
    } catch (error) {
      showNotification("error", "Operation failed");
      console.error("Error saving animal:", error);
    }
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this animal?")) {
      try {
        await axios.delete(`/api/animals/${id}`);
        showNotification("success", "Animal deleted successfully");
        fetchAnimals();
      } catch (error) {
        showNotification("error", "Failed to delete animal");
        console.error("Error deleting animal:", error);
      }
    }
  }

  function handleEdit(animal) {
    setFormData({ name: animal.name });
    setEditingId(animal.id);
    setImagePreview(animal.imageUrl);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setFormData({ name: "" });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Animal Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('table')} 
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {editingId ? "Edit Animal" : "Add New Animal"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Animal Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="Enter animal name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Animal Image (PNG only)
                </label>
                <input
                  id="image"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept=".png"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Please upload a PNG image file
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {imagePreview ? (
                <div className="relative h-48 w-48 border rounded-md overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-contain bg-gray-50" // Changed from object-cover to object-contain
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="h-48 w-48 border-2 border-dashed border-black rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">Image preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingId ? "Update Animal" : "Add Animal"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-black">Loading animals...</p>
        </div>
      ) : animals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="mt-2 text-black">
            No animals found. Add your first animal using the form above.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 w-full relative">
                <Image
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="h-full w-full object-contain bg-gray-50" // Changed from object-cover to object-contain
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {animal.clickCount} clicks
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">
                  {animal.name}
                </h3>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(animal)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Click Count
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {animal.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-24 overflow-hidden rounded-md">
                      {" "}
                      {/* Changed from rounded-full to rounded-md and adjusted dimensions */}
                      <Image
                        src={animal.imageUrl}
                        alt={animal.name}
                        width={96}
                        height={64}
                        className="h-full w-full object-contain bg-gray-50"
                      />{" "}
                      {/* Changed from object-cover to object-contain */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {animal.clickCount} clicks
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(animal)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(animal.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
