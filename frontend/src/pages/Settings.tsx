/**
 * Settings page component.
 * Application configuration and preferences.
 */

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  Settings as SettingsIcon, 
  Database, 
  Globe, 
  Bell,
  Shield,
  Download,
  Upload
} from 'lucide-react'

/**
 * Settings page component.
 */
export function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure application preferences and system settings</p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>Configure backend API endpoints and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backend API URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="http://localhost:8000/api"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                JSON Server URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="http://localhost:3001"
              />
            </div>
            <Button>Save API Settings</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>Configure alerts and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Order Alerts</h4>
                <p className="text-sm text-gray-600">Get notified of new orders</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Status Updates</h4>
                <p className="text-sm text-gray-600">Notifications for order status changes</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Daily Reports</h4>
                <p className="text-sm text-gray-600">Receive daily analytics summaries</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <Button>Update Notifications</Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <CardTitle>Data Management</CardTitle>
            </div>
            <CardDescription>Import, export, and manage application data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Source</h4>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="json-server">JSON Server (Development)</option>
                <option value="backend-api">Backend API (Production)</option>
              </select>
            </div>
            <Button>Apply Changes</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>Configure security and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enable CORS</h4>
                <p className="text-sm text-gray-600">Allow cross-origin requests</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">API Rate Limiting</h4>
                <p className="text-sm text-gray-600">Limit API request frequency</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="30"
              />
            </div>
            <Button>Update Security</Button>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5 text-gray-600" />
            <CardTitle>System Information</CardTitle>
          </div>
          <CardDescription>Application and environment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900">Application</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Version: 1.0.0</p>
                <p>Build: Production</p>
                <p>Environment: Development</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Technology Stack</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Frontend: React 18 + TypeScript</p>
                <p>Backend: FastAPI + Python</p>
                <p>Database: SQLite</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Dependencies</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>UI: shadcn/ui + Tailwind</p>
                <p>Charts: Chart.js</p>
                <p>Flow: React Flow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
