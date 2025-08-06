/**
 * Restaurants page component.
 * Displays restaurant list and management functionality.
 */

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Plus,
  Edit,
  Eye
} from 'lucide-react'
import { restaurantAPI } from '../lib/api'
import { Restaurant } from '../types'

/**
 * Restaurants management page component.
 */
export function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRestaurants()
  }, [])

  /**
   * Load restaurants data from API.
   */
  const loadRestaurants = async () => {
    try {
      setLoading(true)
      const data = await restaurantAPI.getAll()
      setRestaurants(data)
    } catch (error) {
      console.error('Error loading restaurants:', error)
    } finally {
      setLoading(false)
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>
          <p className="text-gray-600">Manage restaurant locations and information</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Restaurant
        </Button>
      </div>

      {/* Restaurants Table */}
      <div className="p-6">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Cuisine</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r: any) => (
              <tr key={r.id}>
                <td className="py-2 px-4 text-left">{r.id}</td>
                <td className="py-2 px-4 text-left">{r.name}</td>
                <td className="py-2 px-4 text-left">{r.cuisine}</td>
                <td className="py-2 px-4 text-left">{r.address}</td>
                <td className="py-2 px-4 text-left">{r.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Statistics</CardTitle>
          <CardDescription>Overview of restaurant network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{restaurants.length}</div>
              <div className="text-sm text-gray-600">Total Restaurants</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {restaurants.filter(r => r.is_active).length}
              </div>
              <div className="text-sm text-gray-600">Active Locations</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {restaurants.filter(r => !r.is_active).length}
              </div>
              <div className="text-sm text-gray-600">Inactive Locations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Restaurants
