'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [animals, setAnimals] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/animals');
      setAnimals(res.data);
      
      const total = res.data.reduce((sum, animal) => sum + animal.clickCount, 0);
      setTotalClicks(total);
    }
    
    fetchData();
  }, []);

  const chartData = animals.map(animal => ({
    name: animal.name,
    clicks: animal.clickCount
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Animals</h3>
          <p className="text-3xl font-bold mt-2">{animals.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Clicks</h3>
          <p className="text-3xl font-bold mt-2">{totalClicks}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm font-medium">Average Clicks per Animal</h3>
          <p className="text-3xl font-bold mt-2">
            {animals.length ? (totalClicks / animals.length).toFixed(2) : 0}
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Animal Click Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}