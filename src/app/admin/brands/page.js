"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({ name: "", websiteUrl: "" });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
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
    fetchBrands();
  }, []);

  async function fetchBrands() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/brands");
      setBrands(res.data);
    } catch (error) {
      showNotification("error", "Failed to load brands");
      console.error("Error fetching brands:", error);
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

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an accepted image format
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!acceptedTypes.includes(file.type)) {
      showNotification(
        "error",
        "Please upload an image in PNG, JPEG, JPG, or GIF format"
      );
      return;
    }

    setLogoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Create form data for file upload
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("websiteUrl", formData.websiteUrl || "");
      if (logoFile) {
        formDataWithFile.append("logo", logoFile);
      }

      if (editingId) {
        await axios.put(`/api/brands/${editingId}`, formDataWithFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("success", "Brand updated successfully");
      } else {
        await axios.post("/api/brands", formDataWithFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("success", "Brand added successfully");
      }

      // Reset form
      setFormData({ name: "", websiteUrl: "" });
      setLogoFile(null);
      setLogoPreview(null);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchBrands();
    } catch (error) {
      showNotification("error", "Operation failed");
      console.error("Error saving brand:", error);
    }
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this brand?")) {
      try {
        await axios.delete(`/api/brands/${id}`);
        showNotification("success", "Brand deleted successfully");
        fetchBrands();
      } catch (error) {
        showNotification("error", "Failed to delete brand");
        console.error("Error deleting brand:", error);
      }
    }
  }

  function handleEdit(brand) {
    setFormData({
      name: brand.name,
      websiteUrl: brand.websiteUrl || "",
    });
    setEditingId(brand.id);
    setLogoPreview(brand.logoUrl);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setFormData({ name: "", websiteUrl: "" });
    setLogoFile(null);
    setLogoPreview(null);
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {editingId ? "Edit Brand" : "Add New Brand"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Brand Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="Enter brand name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Website URL
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, websiteUrl: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Brand Logo (PNG, JPEG, JPG, GIF)
                </label>
                <input
                  id="logo"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept=".png, .jpeg, .jpg, .gif"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                />
                <p className="mt-1 text-sm text-black">
                  Please upload an image file in PNG, JPEG, JPG, or GIF format
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {logoPreview ? (
                <div className="relative h-48 w-48 border border-black rounded-md overflow-hidden">
                  <Image
                    src={logoPreview}
                    width={200}
                    height={200}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      setLogoFile(null);
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
                <div className="h-48 w-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
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
                    <p className="mt-1 text-sm text-gray-500">Logo preview</p>
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
              {editingId ? "Update Brand" : "Add Brand"}
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
          <p className="mt-2 text-gray-600">Loading brands...</p>
        </div>
      ) : brands.length === 0 ? (
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
          <p className="mt-2 text-gray-600">
            No brands found. Add your first brand using the form above.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 w-full relative flex items-center justify-center p-4 bg-gray-50">
                <Image
                  width={100}
                  height={100}
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">
                  {brand.name}
                </h3>
                {brand.websiteUrl && (
                  <Link
                    href={brand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline mt-1 block truncate"
                  >
                    {brand.websiteUrl}
                  </Link>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
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
                  Logo
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
                  Website
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
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {brand.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        width={64}
                        height={64}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {brand.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {brand.websiteUrl ? (
                      <Link
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {brand.websiteUrl}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">No website</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
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
