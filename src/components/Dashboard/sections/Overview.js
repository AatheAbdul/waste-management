import React from 'react';
import { FiUsers, FiBell, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview = () => {
  // Sample data for demonstration
  const metrics = [
    {
      title: 'Total Function Halls',
      value: '5',
      color: '#16a34a'
    },
    {
      title: 'Pending Events',
      value: '2',
      color: '#ea580c'
    },
    {
      title: 'Waste Collected',
      value: '50kgs',
      color: '#2563eb'
    },
    {
      title: 'Recent Orders',
      value: '10',
      color: '#7c3aed'
    }
  ];

  const collectionData = [
    { month: 'Jan', organic: 65, recyclable: 45, mixed: 30 },
    { month: 'Feb', organic: 75, recyclable: 55, mixed: 35 },
    { month: 'Mar', organic: 85, recyclable: 50, mixed: 40 },
    { month: 'Apr', organic: 70, recyclable: 60, mixed: 45 },
    { month: 'May', organic: 90, recyclable: 65, mixed: 50 },
    { month: 'Jun', organic: 95, recyclable: 70, mixed: 55 }
  ];

  const recentOrders = [
    {
      id: '1',
      customer: 'Afiya',
      product: 'Bioenzyme',
      amount: '₹75',
      status: 'Delivered'
    },
    {
      id: '2',
      customer: 'Urban Farms',
      product: 'Compost',
      amount: '₹150',
      status: 'Processing'
    },
    {
      id: '3',
      customer: 'Dev',
      product: 'Bioenzyme',
      amount: '₹150',
      status: 'Delivered'
    }
  ];

  return (
    <div className="overview-container">
      <h1>Dashboard Overview</h1>
      
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card" style={{ borderColor: metric.color }}>
            <div className="metric-info">
              <h3>{metric.title}</h3>
              <p>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
<br></br>
      <div className="chart-section">
        <h2>Waste Collection Trends</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={collectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="organic" fill="#16a34a" name="Organic Waste" />
              <Bar dataKey="recyclable" fill="#2563eb" name="Recyclable Waste" />
              <Bar dataKey="mixed" fill="#ea580c" name="Mixed Waste" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="orders-table">
          <table border="1px">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;