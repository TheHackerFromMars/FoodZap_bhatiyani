/**
 * API service for RestaurantFlow application.
 * Handles all HTTP requests to backend APIs and JSON Server.
 */

import axios from 'axios'
import {
  Restaurant,
  MenuItem,
  Order,
  SalesAnalytics,
  DashboardData,
  CreateOrderForm,
  UpdateOrderForm,
  CreateRestaurantForm,
  CreateMenuItemForm,
} from '../types'

// API Base URLs
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
const JSON_SERVER_URL = process.env.REACT_APP_JSON_SERVER_URL || 'http://localhost:3001'

// Create axios instances
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const jsonServerClient = axios.create({
  baseURL: JSON_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Restaurant API calls
export const restaurantAPI = {
  /**
   * Get all restaurants with pagination support.
   */
  getAll: async (skip = 0, limit = 100): Promise<Restaurant[]> => {
    const response = await apiClient.get(`/restaurants?skip=${skip}&limit=${limit}`)
    return response.data
  },

  /**
   * Get restaurant by ID.
   */
  getById: async (id: number): Promise<Restaurant> => {
    const response = await apiClient.get(`/restaurants/${id}`)
    return response.data
  },

  /**
   * Create a new restaurant.
   */
  create: async (restaurant: CreateRestaurantForm): Promise<Restaurant> => {
    const response = await apiClient.post('/restaurants', restaurant)
    return response.data
  },

  /**
   * Update restaurant information.
   */
  update: async (id: number, restaurant: Partial<CreateRestaurantForm>): Promise<Restaurant> => {
    const response = await apiClient.put(`/restaurants/${id}`, restaurant)
    return response.data
  },

  /**
   * Delete (deactivate) restaurant.
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/restaurants/${id}`)
  },
}

// Menu Items API calls
export const menuItemAPI = {
  /**
   * Get menu items with filtering options.
   */
  getAll: async (filters?: {
    restaurant_id?: number;
    category?: string;
    available_only?: boolean;
    skip?: number;
    limit?: number;
  }): Promise<MenuItem[]> => {
    const params = new URLSearchParams()
    if (filters?.restaurant_id) params.append('restaurant_id', filters.restaurant_id.toString())
    if (filters?.category) params.append('category', filters.category)
    if (filters?.available_only !== undefined) params.append('available_only', filters.available_only.toString())
    if (filters?.skip) params.append('skip', filters.skip.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const response = await apiClient.get(`/menu-items?${params.toString()}`)
    return response.data
  },

  /**
   * Get menu item by ID.
   */
  getById: async (id: number): Promise<MenuItem> => {
    const response = await apiClient.get(`/menu-items/${id}`)
    return response.data
  },

  /**
   * Create a new menu item.
   */
  create: async (menuItem: CreateMenuItemForm): Promise<MenuItem> => {
    const response = await apiClient.post('/menu-items', menuItem)
    return response.data
  },

  /**
   * Update menu item information.
   */
  update: async (id: number, menuItem: Partial<CreateMenuItemForm>): Promise<MenuItem> => {
    const response = await apiClient.put(`/menu-items/${id}`, menuItem)
    return response.data
  },

  /**
   * Delete (mark unavailable) menu item.
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/menu-items/${id}`)
  },

  /**
   * Get menu categories for a restaurant.
   */
  getCategories: async (restaurantId: number): Promise<string[]> => {
    const response = await apiClient.get(`/menu-items/restaurant/${restaurantId}/categories`)
    return response.data
  },
}

// Orders API calls
export const orderAPI = {
  /**
   * Get orders with filtering options.
   */
  getAll: async (filters?: {
    restaurant_id?: number;
    status?: string;
    skip?: number;
    limit?: number;
  }): Promise<Order[]> => {
    const params = new URLSearchParams()
    if (filters?.restaurant_id) params.append('restaurant_id', filters.restaurant_id.toString())
    if (filters?.status) params.append('status', filters.status)
    if (filters?.skip) params.append('skip', filters.skip.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const response = await apiClient.get(`/orders?${params.toString()}`)
    return response.data
  },

  /**
   * Get order by ID.
   */
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get(`/orders/${id}`)
    return response.data
  },

  /**
   * Create a new order.
   */
  create: async (order: CreateOrderForm): Promise<Order> => {
    const response = await apiClient.post('/orders', order)
    return response.data
  },

  /**
   * Update order information.
   */
  update: async (id: number, order: UpdateOrderForm): Promise<Order> => {
    const response = await apiClient.put(`/orders/${id}`, order)
    return response.data
  },

  /**
   * Cancel an order.
   */
  cancel: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}`)
  },

  /**
   * Get order status.
   */
  getStatus: async (id: number): Promise<{
    order_id: number;
    status: string;
    estimated_delivery_time?: string;
    created_at: string;
  }> => {
    const response = await apiClient.get(`/orders/${id}/status`)
    return response.data
  },
}

// Analytics API calls
export const analyticsAPI = {
  /**
   * Get sales analytics for a restaurant.
   */
  getSalesAnalytics: async (restaurantId: number): Promise<SalesAnalytics> => {
    const response = await apiClient.get(`/analytics/sales/${restaurantId}`)
    return response.data
  },

  /**
   * Get dashboard data for a restaurant.
   */
  getDashboardData: async (restaurantId: number): Promise<DashboardData> => {
    const response = await apiClient.get(`/analytics/dashboard/${restaurantId}`)
    return response.data
  },

  /**
   * Get order trends for a restaurant.
   */
  getOrderTrends: async (restaurantId: number, days = 7): Promise<{
    trends: Array<{
      date: string;
      order_count: number;
      revenue: number;
    }>;
    period_days: number;
  }> => {
    const response = await apiClient.get(`/analytics/order-trends/${restaurantId}?days=${days}`)
    return response.data
  },
}

// JSON Server API calls for mock data
export const mockDataAPI = {
  /**
   * Get all restaurants from JSON Server.
   */
  getRestaurants: async (): Promise<Restaurant[]> => {
    const response = await jsonServerClient.get('/restaurants')
    return response.data
  },

  /**
   * Get all menu items from JSON Server.
   */
  getMenuItems: async (): Promise<MenuItem[]> => {
    const response = await jsonServerClient.get('/menuItems')
    return response.data
  },

  /**
   * Get all orders from JSON Server.
   */
  getOrders: async (): Promise<Order[]> => {
    const response = await jsonServerClient.get('/orders')
    return response.data
  },

  /**
   * Get analytics data from JSON Server.
   */
  getAnalytics: async (): Promise<any> => {
    const response = await jsonServerClient.get('/analytics')
    return response.data
  },
}

// Error handler for API calls
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}
