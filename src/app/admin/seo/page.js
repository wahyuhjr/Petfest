// src/app/admin/seo/page.js

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SEOPage() {
  const [seoEntries, setSeoEntries] = useState([]);
  const [formData, setFormData] = useState({
    pageType: "",
    entityId: "",
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonical: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchSEOEntries();
  }, []);

  async function fetchSEOEntries() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/seo");
      setSeoEntries(res.data.data);
    } catch (error) {
      showNotification("error", "Failed to load SEO entries");
      console.error("Error fetching SEO entries:", error);
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const dataToSend = { ...formData };

      // Convert entityId to number if it exists
      if (dataToSend.entityId) {
        dataToSend.entityId = parseInt(dataToSend.entityId);
      } else {
        delete dataToSend.entityId;
      }

      if (editingId) {
        await axios.put(`/api/seo/${editingId}`, dataToSend);
        showNotification("success", "SEO entry updated successfully");
      } else {
        await axios.post("/api/seo", dataToSend);
        showNotification("success", "SEO entry added successfully");
      }

      // Reset form
      resetForm();
      fetchSEOEntries();
    } catch (error) {
      showNotification("error", "Operation failed");
      console.error("Error saving SEO entry:", error);
    }
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this SEO entry?")) {
      try {
        await axios.delete(`/api/seo/${id}`);
        showNotification("success", "SEO entry deleted successfully");
        fetchSEOEntries();
      } catch (error) {
        showNotification("error", "Failed to delete SEO entry");
        console.error("Error deleting SEO entry:", error);
      }
    }
  }

  function handleEdit(entry) {
    setFormData({
      pageType: entry.pageType || "",
      entityId: entry.entityId?.toString() || "",
      title: entry.title || "",
      description: entry.description || "",
      keywords: entry.keywords || "",
      ogTitle: entry.ogTitle || "",
      ogDescription: entry.ogDescription || "",
      ogImage: entry.ogImage || "",
      canonical: entry.canonical || "",
    });
    setEditingId(entry.id);
  }

  function resetForm() {
    setFormData({
      pageType: "",
      entityId: "",
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonical: "",
    });
    setEditingId(null);
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

      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">SEO Management</h1>
        <p className="text-gray-600">
          Optimize your content for search engines
        </p>
      </div> */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {editingId ? "Edit SEO Entry" : "Add New SEO Entry"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="pageType"
                className="block text-sm font-medium text-black mb-1"
              >
                Page Type*
              </label>
              <select
                id="pageType"
                value={formData.pageType}
                onChange={(e) =>
                  setFormData({ ...formData, pageType: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                required
              >
                <option value="">Select Page Type</option>
                <option value="global">Global (Site-wide)</option>
              </select>
            </div>

            {/* <div>
              <label htmlFor="entityId" className="block text-sm font-medium text-black mb-1">Entity ID (optional)</label>
              <input
                id="entityId"
                type="number"
                value={formData.entityId}
                onChange={(e) => setFormData({...formData, entityId: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                placeholder="For animal/brand specific pages"
              />
              <p className="mt-1 text-xs text-black">Leave blank for general pages</p>
            </div> */}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-black mb-1"
            >
              Title*
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
              placeholder="Meta title for the page"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black mb-1"
            >
              Description*
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
              placeholder="Meta description for the page"
              rows={3}
              required
            />
          </div>

          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-black mb-1"
            >
              Keywords*
            </label>
            <input
              id="keywords"
              type="text"
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
              placeholder="Keywords separated by commas"
              required
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium text-black mb-2">
              Open Graph Settings (Social Media)
            </h3>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="ogTitle"
                  className="block text-sm font-medium text-black mb-1"
                >
                  OG Title
                </label>
                <input
                  id="ogTitle"
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, ogTitle: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="Title for social media sharing"
                />
              </div>

              <div>
                <label
                  htmlFor="ogDescription"
                  className="block text-sm font-medium text-black mb-1"
                >
                  OG Description
                </label>
                <textarea
                  id="ogDescription"
                  value={formData.ogDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, ogDescription: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="Description for social media sharing"
                  rows={2}
                />
              </div>

              <div>
                <label
                  htmlFor="ogImage"
                  className="block text-sm font-medium text-black mb-1"
                >
                  OG Image URL
                </label>
                <input
                  id="ogImage"
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) =>
                    setFormData({ ...formData, ogImage: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
                  placeholder="URL to image for social media sharing"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="canonical"
              className="block text-sm font-medium text-black mb-1"
            >
              Canonical URL
            </label>
            <input
              id="canonical"
              type="text"
              value={formData.canonical}
              onChange={(e) =>
                setFormData({ ...formData, canonical: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 text-black"
              placeholder="Canonical URL if different from page URL"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingId ? "Update SEO Entry" : "Add SEO Entry"}
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b text-black">
          SEO Entries
        </h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-black">Loading SEO entries...</p>
          </div>
        ) : seoEntries.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-black">
              No SEO entries found. Add your first entry using the form above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Page Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Entity ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {seoEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {entry.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {entry.pageType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {entry.entityId || "Default"}
                    </td>
                    <td className="px-6 py-4 text-sm text-black max-w-xs truncate">
                      {entry.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
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
    </div>
  );
}
