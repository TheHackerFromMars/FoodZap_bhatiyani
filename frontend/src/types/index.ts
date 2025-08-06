/**
 * TypeScript type definitions for RestaurantFlow application.
 * Defines interfaces for all data models used throughout the app.
 */

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  is_available: boolean;
  preparation_time: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_requests?: string;
  created_at: string;
  menu_item?: MenuItem;
}

export interface Order {
  id: number;
  restaurant_id: number;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  delivery_address?: string;
  order_type?: 'delivery' | 'pickup' | 'dine-in';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total?: number; // Backend sends 'total'
  total_amount?: number; // Fallback for different API versions
  items?: string[]; // Backend sends array of item names
  payment_status?: 'pending' | 'paid' | 'refunded';
  special_instructions?: string;
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
  created_at?: string; // May not be present in backend response
  updated_at?: string;
  order_items?: OrderItem[];
  restaurant?: Restaurant;
}

export interface SalesAnalytics {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  popular_items: PopularItem[];
  revenue_by_category: CategoryRevenue[];
  orders_by_status: StatusCount[];
}

export interface PopularItem {
  menu_item_id: number;
  name: string;
  category: string;
  order_count: number;
  total_revenue: number;
}

export interface CategoryRevenue {
  category: string;
  total_revenue: number;
  percentage?: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

export interface DashboardData {
  today_orders: number;
  pending_orders: number;
  today_revenue: number;
  active_menu_items: number;
}

// React Flow types for order workflow
export interface OrderFlowNode {
  id: string;
  type: 'orderStatus';
  position: { x: number; y: number };
  data: {
    label: string;
    status: Order['status'];
    order: Order;
    count?: number;
  };
}

export interface OrderFlowEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep';
  animated?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Form types
export interface CreateOrderForm {
  restaurant_id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  order_type: Order['order_type'];
  special_instructions?: string;
  items: {
    menu_item_id: number;
    quantity: number;
    special_requests?: string;
  }[];
}

export interface UpdateOrderForm {
  status?: Order['status'];
  payment_status?: Order['payment_status'];
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
}

export interface CreateRestaurantForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface CreateMenuItemForm {
  restaurant_id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  preparation_time?: number;
}
