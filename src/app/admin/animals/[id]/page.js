// src/app/admin/animals/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function AnimalDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [animal, setAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAnimal(id);
    }
  }, [id]);

  async function fetchAnimal(animalId) {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/animals/${animalId}`);
      setAnimal(res.data);
    } catch (error) {
      console.error("Error fetching animal details:", error);
      setError("Failed to load animal details");
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    router.push("/admin/animals");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading animal details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700">{error}</p>
            <button
              onClick={handleBack}
              className="mt-2 px-3 py-1 text-sm text-blue-600 hover:underline"
            >
              Back to animals
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!animal) {
    return <div>Animal not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{animal.name}</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Back to Animals
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="rounded-lg overflow-hidden border">
              <Image
                src={animal.imageUrl}
                alt={animal.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Details</h3>
              <div className="mt-2 border-t pt-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{animal.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{animal.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Click Count:</span>
                  <span className="font-medium">{animal.clickCount}</span>
                </div>
                {animal.createdAt && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(animal.createdAt).toLocaleString()}
                    </span>
                  </div>
                )}
                {animal.updatedAt && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(animal.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
