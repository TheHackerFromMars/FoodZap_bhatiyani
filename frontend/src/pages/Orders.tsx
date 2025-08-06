/**
 * Orders management page component.
 * Displays order list with filtering, status updates, and detailed views.
 */

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  MapPin, 
  Clock,
  Search
} from 'lucide-react'
import { orderAPI, restaurantAPI } from '../lib/api'
import { formatCurrency, formatDate, getStatusColor, getTimeAgo } from '../lib/utils'
import { Order, Restaurant } from '../types'

/**
 * Orders page component with comprehensive order management.
 */
export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadOrdersData()
  }, [])

  useEffect(() => {
    filterOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, selectedStatus, searchTerm])

  /**
   * Load orders and restaurants data.
   */
  const loadOrdersData = async () => {
    try {
      setLoading(true)
      const [ordersData, restaurantsData] = await Promise.all([
        orderAPI.getAll(),
        restaurantAPI.getAll()
      ])
      setOrders(ordersData)
      setRestaurants(restaurantsData)
    } catch (error) {
      console.error('Error loading orders data:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Filter orders based on status and search term.
   */
  const filterOrders = () => {
    let filtered = orders

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm) ||
        (order.customer_phone && order.customer_phone.includes(searchTerm))
      )
    }

    setFilteredOrders(filtered)
  }

  /**
   * Get restaurant name by ID.
   */
  const getRestaurantName = (restaurantId: number): string => {
    const restaurant = restaurants.find(r => r.id === restaurantId)
    return restaurant ? restaurant.name : 'Unknown Restaurant'
  }

  /**
   * Handle status change for an order.
   */
  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      // Update local state immediately for better UX
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
      setOrders(updatedOrders)
      
      // Here you would make an API call to update the order status
      console.log(`Updating order ${orderId} status to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const nextStatusMap: Record<Order['status'], Order['status']> = {
    pending: 'confirmed',
    confirmed: 'preparing',
    preparing: 'ready',
    ready: 'delivered',
    delivered: 'delivered', // No next status
    cancelled: 'cancelled', // No next status
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by customer name, phone, or order ID..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  {/* Order Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge variant="outline">
                        {order.order_type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Customer:</span>
                          <span>{order.customer_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{order.customer_phone}</span>
                        </div>
                        {order.delivery_address && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{order.delivery_address}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Restaurant:</span>
                          <span>{getRestaurantName(order.restaurant_id)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(order.created_at)}</span>
                          <span className="text-gray-400">({getTimeAgo(order.created_at)})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Total:</span>
                          <span className="text-lg font-semibold text-green-600">
                            {formatCurrency(order.total_amount || 0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {order.special_instructions && (
                      <div className="bg-yellow-50 p-3 rounded-md">
                        <p className="text-sm">
                          <strong>Special Instructions:</strong> {order.special_instructions}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {nextStatusMap[order.status] && (
                      <Button
                        onClick={() => handleStatusChange(order.id, nextStatusMap[order.status])}
                        size="sm"
                        className="w-full lg:w-auto"
                      >
                        Mark as {nextStatusMap[order.status]}
                      </Button>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Order Statistics</CardTitle>
          <CardDescription>Current order distribution and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {statusOptions.slice(1).map(status => {
              const count = orders.filter(order => order.status === status.value).length
              return (
                <div key={status.value} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{status.value}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Orders
