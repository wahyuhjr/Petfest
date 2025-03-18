'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import Image from 'next/image';

export default function DashboardPage() {
  // State management
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('clicksDesc');
  const [limit, setLimit] = useState(10);
  const [activeFilter, setActiveFilter] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // You can modify this to include query parameters for date ranges if your API supports it
      const res = await axios.get('/api/animals');
      setAnimals(res.data);
      
      showNotification('Data refreshed successfully');
    } catch (err) {
      setError('Failed to load analytics data. Please try again later.');
      console.error('Error fetching animals:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
    
    // Set up an interval to refresh data every 5 minutes
    const refreshInterval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchData]);
  
  // Show notification
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };
  
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalClicks = animals.reduce((sum, animal) => sum + animal.clickCount, 0);
    const avgClicks = animals.length ? (totalClicks / animals.length).toFixed(2) : 0;
    const maxClicks = animals.length ? Math.max(...animals.map(a => a.clickCount)) : 0;
    const mostPopular = animals.length ? 
      animals.reduce((prev, current) => prev.clickCount > current.clickCount ? prev : current, animals[0]).name : 
      'None';
    
    return {
      totalAnimals: animals.length,
      totalClicks,
      avgClicks,
      maxClicks,
      mostPopular
    };
  }, [animals]);
  
  // Prepare chart data
  const prepareChartData = useCallback(() => {
    // Sort data based on selected sort option
    let sortedData = [...animals];
    
    switch(sortBy) {
      case 'clicksAsc':
        sortedData.sort((a, b) => a.clickCount - b.clickCount);
        break;
      case 'clicksDesc':
        sortedData.sort((a, b) => b.clickCount - a.clickCount);
        break;
      case 'nameAsc':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    // Limit the number of items to display
    return sortedData.slice(0, limit).map(animal => ({
      name: animal.name,
      clicks: animal.clickCount,
      id: animal.id,
      image: animal.imageUrl
    }));
  }, [animals, sortBy, limit]);
  
  const chartData = useMemo(() => prepareChartData(), [prepareChartData]);
  
  // Custom colors for charts
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  
  // Toggle filter active state
  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };
  
  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const animal = animals.find(a => a.name === label);
      
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            {animal?.imageUrl && (
              <div className="w-10 h-10 overflow-hidden rounded-full border">
                <Image 
                  src={animal.imageUrl} 
                  alt={animal.name} 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </div>
            )}
            <p className="font-bold text-gray-800">{label}</p>
          </div>
          <p className="text-blue-600 font-medium">{`Clicks: ${payload[0].value}`}</p>
        </div>
      );
    }
    
    return null;
  };
  
  // Render loading state
  if (isLoading && animals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error && animals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg max-w-lg">
          <div className="flex items-center">
            <div className="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button 
                onClick={fetchData} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg transition-opacity">
          {notification.message}
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Animal Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track engagement and performance metrics</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <button 
            onClick={fetchData} 
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Animals</h3>
          <p className="text-3xl font-bold mt-2 text-blue-700">{metrics.totalAnimals}</p>
          <div className="mt-2 text-gray-500 text-xs">Registered animals</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Clicks</h3>
          <p className="text-3xl font-bold mt-2 text-green-700">{metrics.totalClicks}</p>
          <div className="mt-2 text-gray-500 text-xs">Total engagement</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Average Clicks</h3>
          <p className="text-3xl font-bold mt-2 text-purple-700">{metrics.avgClicks}</p>
          <div className="mt-2 text-gray-500 text-xs">Per animal</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Highest Clicks</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-700">{metrics.maxClicks}</p>
          <div className="mt-2 text-gray-500 text-xs">Best performing animal</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Most Popular</h3>
          <p className="text-xl font-bold mt-2 text-red-700 truncate" title={metrics.mostPopular}>
            {metrics.mostPopular}
          </p>
          <div className="mt-2 text-gray-500 text-xs">Highest engagement animal</div>
        </div>
      </div>
      
      {/* Chart Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Animal Engagement Analysis</h2>
          
          <div className="flex flex-wrap gap-3">
            {/* Chart Type Selection */}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  chartType === 'bar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200`}
              >
                Bar
              </button>
              <button
                type="button"
                onClick={() => setChartType('pie')}
                className={`px-4 py-2 text-sm font-medium ${
                  chartType === 'pie' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border-t border-b border-gray-200`}
              >
                Pie
              </button>
              <button
                type="button"
                onClick={() => setChartType('line')}
                className={`px-4 py-2 text-sm font-medium ${
                  chartType === 'line' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border-t border-b border-gray-200`}
              >
                Line
              </button>
              <button
                type="button"
                onClick={() => setChartType('area')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  chartType === 'area' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200`}
              >
                Area
              </button>
            </div>
            
            {/* Show more filters button */}
            <button
              type="button"
              onClick={() => toggleFilter('filters')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {activeFilter === 'filters' && (
          <div className="bg-gray-50 p-4 rounded-lg mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sort By */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="clicksDesc">Clicks (High to Low)</option>
                <option value="clicksAsc">Clicks (Low to High)</option>
                <option value="nameAsc">Name (A to Z)</option>
                <option value="nameDesc">Name (Z to A)</option>
              </select>
            </div>
            
            {/* Limit */}
            <div>
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">Show Top</label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="5">5 animals</option>
                <option value="10">10 animals</option>
                <option value="15">15 animals</option>
                <option value="20">20 animals</option>
                <option value="50">All animals</option>
              </select>
            </div>
            
            {/* Date Range (placeholder, would need implementation) */}
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Charts */}
        <div className="mt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend />
                  <Bar dataKey="clicks" fill="#8884d8" name="Clicks" animationDuration={1000} />
                </BarChart>
              ) : chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="clicks"
                    nameKey="name"
                    animationDuration={1000}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : chartType === 'line' ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
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
                  <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} name="Clicks" animationDuration={1000} />
                </LineChart>
              ) : (
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
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
                  <Area type="monotone" dataKey="clicks" stroke="#8884d8" fill="#8884d8" name="Clicks" animationDuration={1000} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Detailed Animal Engagement</h2>
          <span className="text-gray-500 text-sm">{chartData.length} of {animals.length} animals shown</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image 
                          className="h-10 w-10 rounded-full object-contain bg-gray-100" 
                          src={animal.image} 
                          alt={animal.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{animal.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{animal.clicks}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {((animal.clicks / metrics.totalClicks) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`absolute top-0 left-0 h-4 rounded-full ${
                          animal.clicks > metrics.avgClicks * 1.5 ? 'bg-green-500' :
                          animal.clicks > metrics.avgClicks ? 'bg-blue-500' :
                          animal.clicks > metrics.avgClicks * 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (animal.clicks / metrics.maxClicks) * 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{chartData.length}</span> of{' '}
                <span className="font-medium">{animals.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}