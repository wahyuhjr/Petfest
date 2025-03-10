'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';

export default function HomePage() {
  const [animals, setAnimals] = useState([]);
  const [seoSettings, setSeoSettings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const [animalsRes, seoRes] = await Promise.all([
        axios.get('/api/animals'),
        axios.get('/api/seo')
      ]);
      
      setAnimals(animalsRes.data);
      setSeoSettings(seoRes.data || {});
    }
    
    fetchData();
  }, []);

  async function handleAnimalClick(id) {
    await axios.post(`/api/animals/${id}/click`);
    // Optionally update the local state to reflect the new click count
    setAnimals(animals.map(animal => {
      if (animal.id === id) {
        return { ...animal, clickCount: animal.clickCount + 1 };
      }
      return animal;
    }));
  }

  return (
    <>
      <Head>
        <title>{seoSettings.pageTitle}</title>
        <meta name="description" content={seoSettings.description} />
        <meta name="keywords" content={seoSettings.keywords} />
        <meta property="og:title" content={seoSettings.pageTitle} />
        <meta property="og:description" content={seoSettings.description} />
        {seoSettings.ogImage && <meta property="og:image" content={seoSettings.ogImage} />}
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Animal Gallery</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animals.map(animal => (
            <div key={animal.id} className="bg-white rounded shadow overflow-hidden">
              <img 
                src={animal.imageUrl} 
                alt={animal.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{animal.name}</h2>
                <button
                  onClick={() => handleAnimalClick(animal.id)}
                  className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Like this animal ({animal.clickCount})
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}