/**
 * Navigation component for the RestaurantFlow application.
 * Provides main navigation links and responsive mobile menu.
 */

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { 
  Home, 
  Store, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ChefHat
} from 'lucide-react'
import { cn } from '../lib/utils'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Restaurants', href: '/restaurants', icon: Store },
  { name: 'Orders', href: '/orders', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Order Flow', href: '/order-flow', icon: ChefHat },
  { name: 'Settings', href: '/settings', icon: Settings },
]

/**
 * Main navigation component with responsive design.
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to={isLoggedIn ? "/dashboard" : "/"}
                className="flex items-center space-x-2"
              >
                <img src="/restaurantIcon.png" alt="Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-gray-900">FoodZap</span>
              </Link>
            </div>
            
            {/* Desktop navigation items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden sm:flex items-center">
            <Button
              onClick={handleLogout}
              className="ml-4 bg-rose-500 text-white hover:bg-rose-600"
            >
              Log Out
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            {/* Mobile Logout Button */}
            <Button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full mt-2 bg-rose-500 text-white hover:bg-rose-600"
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
