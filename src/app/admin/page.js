'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/animals');
        setAnimals(res.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // Prepare data for bar chart
  const barChartData = {
    labels: animals.map(animal => animal.name),
    datasets: [
      {
        label: 'Click Count',
        data: animals.map(animal => animal.clickCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };
  
  // Options for bar chart
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Animal Click Statistics',
        font: {
          size: 14
        }
      },
    },
  };
  
  // Prepare data for doughnut chart
  const doughnutChartData = {
    labels: animals.map(animal => animal.name),
    datasets: [
      {
        data: animals.map(animal => animal.clickCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Doughnut chart options
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12
          }
        }
      }
    }
  };
  
  // Calculate total clicks
  const totalClicks = animals.reduce((sum, animal) => sum + animal.clickCount, 0);
  
  // Find most clicked animal
  const mostClickedAnimal = animals.length > 0 
    ? animals.reduce((prev, current) => (prev.clickCount > current.clickCount) ? prev : current)
    : null;
    
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Top stats cards - 2 cards in a row for tablet */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-blue-50 p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Total Animals</h3>
          <p className="text-3xl font-bold text-blue-600">{animals.length}</p>
        </div>
        <div className="bg-green-50 p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-green-800 mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold text-green-600">{totalClicks}</p>
        </div>
      </div>
      
      {/* Most clicked card - full width below other cards */}
      <div className="mb-5">
        <div className="bg-purple-50 p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-purple-800 mb-2">Most Clicked</h3>
          <p className="text-3xl font-bold text-purple-600">
            {mostClickedAnimal ? `${mostClickedAnimal.name} (${mostClickedAnimal.clickCount})` : 'N/A'}
          </p>
        </div>
      </div>
      
      {/* Charts - optimized for tablet view */}
      <div className="grid grid-cols-1 gap-5">
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-black">Click Statistics by Animal</h3>
          <div className="h-72">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-black">Click Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <Doughnut 
              data={doughnutChartData}
              options={doughnutChartOptions} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}