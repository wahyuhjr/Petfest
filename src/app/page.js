'use client';

import { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import GuestStar from '../components/sections/Guest-Star';
import Brand from '../components/sections/Brand';

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [seoSettings, setSeoSettings] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data/all');
        const { animals, brands, seo } = (await res.json()).data;

        setAnimals(animals);
        setBrands(brands);
        setSeoSettings(seo.global || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  async function handleAnimalClick(id) {
    try {
      const res = await fetch(`/api/animals/click/${id}`, {
        method: 'POST',
      });
      const updatedAnimal = (await res.json()).data;

      setAnimals(prevAnimals =>
        prevAnimals.map(animal =>
          animal.id === id ? updatedAnimal : animal
        )
      );
    } catch (error) {
      console.error('Error updating click count:', error);
    }
  }

  return (
    <MainLayout
      title={seoSettings.title || 'Petfest ID'}
      description={seoSettings.description}
      keywords={seoSettings.keywords}
      ogImage={seoSettings.ogImage}
    >
      <Hero animals={animals} onAnimalClick={handleAnimalClick} />
      <About />
      <GuestStar />
      <Brand brands={brands} />
    </MainLayout>
  );
}