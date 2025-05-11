import React, { useState } from 'react';
import { FiDownload, FiFilter, FiCheck, FiTruck } from 'react-icons/fi';

const OrdersManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'Green Earth Gardens',
        email: 'contact@greenearth.com',
        phone: '+91 9876543210'
      },
      product: 'Premium Compost',
      quantity: '100kg',
      amount: '₹5,000',
      orderDate: '2023-07-20',
      deliveryDate: '2023-07-25',
      status: 'processing',
      deliveryAddress: '123 Garden Street, Anna Nagar, Chennai'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Urban Farms',
        email: 'info@urbanfarms.com',
        phone: '+91 9876543211'
      },
      product: 'Organic Fertilizer',
      quantity: '50kg',
      amount: '₹2,500',
      orderDate: '2023-07-19',
      deliveryDate: '2023-07-24',
      status: 'delivered',
      deliveryAddress: '456 Farm Road, T Nagar, Chennai'
    },
    {
      id: 'ORD003',
      customer: {
        name: 'City Parks Department',
        email: 'parks@citygov.com',
        phone: '+91 9876543212'
      },
      product: 'Bio-enzymes',
      quantity: '20L',
      amount: '₹3,000',
      orderDate: '2023-07-21',
      deliveryDate: '2023-07-26',
      status: 'pending',
      deliveryAddress: '789 Park Avenue, Adyar, Chennai'
    }
  ]);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const exportOrdersData = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Product', 'Quantity', 'Amount', 'Order Date', 'Status'],
      ...orders.map(order => [
        order.id,
        order.customer.name,
        order.product,
        order.quantity,
        order.amount,
        order.orderDate,
        order.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(order =>
    filterStatus === 'all' || order.status === filterStatus
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge-warning';
      case 'processing':
        return 'status-badge-info';
      case 'delivered':
        return 'status-badge-success';
      default:
        return '';
    }
  };

  return (
    <div className="orders-management-container">
      <div className="section-header">
        <h1>Orders Management</h1>
        <div className="header-actions">
          <div className="filter-group">
            <FiFilter />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <button
            className="export-btn"
            onClick={exportOrdersData}
            title="Export Orders"
          >
            <FiDownload /> Export Data
          </button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Details</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div className="customer-details">
                    <p className="customer-name">{order.customer.name}</p>
                    <p className="customer-email">{order.customer.email}</p>
                    <p className="customer-phone">{order.customer.phone}</p>
                  </div>
                </td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.amount}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {order.status !== 'delivered' && (
                      <button
                        className="process-btn"
                        onClick={() => handleStatusUpdate(order.id, 'processing')}
                        title="Mark as Processing"
                      >
                        <FiCheck /> Process
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        className="deliver-btn"
                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        title="Mark as Delivered"
                      >
                        <FiTruck /> Deliver
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManagement;