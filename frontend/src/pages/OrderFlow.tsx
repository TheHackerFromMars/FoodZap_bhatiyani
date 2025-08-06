/**
 * Order Flow visualization page using React Flow.
 * Displays interactive workflow diagram showing order status transitions.
 */

import React, { useState, useEffect, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  Connection,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { orderAPI } from '../lib/api'
import { Order } from '../types'
import { getStatusColor, formatCurrency } from '../lib/utils'

/**
 * Custom node component for order status visualization.
 */
const OrderStatusNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[150px]">
      <div className="flex items-center justify-between">
        <div className="font-bold text-sm">{data.label}</div>
        <Badge className={getStatusColor(data.status)}>
          {data.count || 0}
        </Badge>
      </div>
      {data.orders && data.orders.length > 0 && (
        <div className="mt-2 space-y-1">
          {data.orders.slice(0, 3).map((order: Order) => (
            <div key={order.id} className="text-xs text-gray-600 truncate">
              #{order.id} - {order.customer_name}
            </div>
          ))}
          {data.orders.length > 3 && (
            <div className="text-xs text-gray-500">
              +{data.orders.length - 3} more...
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Define custom node types
const nodeTypes = {
  orderStatus: OrderStatusNode,
}

/**
 * Order Flow page component with interactive workflow visualization.
 */
export function OrderFlow() {
  const [orders, setOrders] = useState<Order[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrderData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Load order data and create flow visualization.
   */
  const loadOrderData = async () => {
    try {
      setLoading(true)
      const ordersData = await orderAPI.getAll()
      setOrders(ordersData)
      createFlowDiagram(ordersData)
    } catch (error) {
      console.error('Error loading order data:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Create flow diagram nodes and edges from order data.
   */
  const createFlowDiagram = (ordersData: Order[]) => {
    // Group orders by status
    const ordersByStatus = ordersData.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = []
      }
      acc[order.status].push(order)
      return acc
    }, {} as Record<string, Order[]>)

    // Define status flow positions
    const statusPositions = {
      pending: { x: 100, y: 100 },
      confirmed: { x: 300, y: 100 },
      preparing: { x: 500, y: 100 },
      ready: { x: 700, y: 100 },
      delivered: { x: 500, y: 300 },
      cancelled: { x: 300, y: 300 },
    }

    // Create nodes for each status
    const flowNodes: Node[] = Object.entries(statusPositions).map(([status, position]) => ({
      id: status,
      type: 'orderStatus',
      position,
      data: {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        status,
        count: ordersByStatus[status]?.length || 0,
        orders: ordersByStatus[status] || [],
      },
    }))

    // Create edges for status transitions
    const flowEdges: Edge[] = [
      {
        id: 'pending-confirmed',
        source: 'pending',
        target: 'confirmed',
        type: 'smoothstep',
        animated: true,
      },
      {
        id: 'confirmed-preparing',
        source: 'confirmed',
        target: 'preparing',
        type: 'smoothstep',
        animated: true,
      },
      {
        id: 'preparing-ready',
        source: 'preparing',
        target: 'ready',
        type: 'smoothstep',
        animated: true,
      },
      {
        id: 'ready-delivered',
        source: 'ready',
        target: 'delivered',
        type: 'smoothstep',
        animated: true,
      },
      {
        id: 'pending-cancelled',
        source: 'pending',
        target: 'cancelled',
        type: 'smoothstep',
        style: { stroke: '#ef4444' },
      },
      {
        id: 'confirmed-cancelled',
        source: 'confirmed',
        target: 'cancelled',
        type: 'smoothstep',
        style: { stroke: '#ef4444' },
      },
    ]

    setNodes(flowNodes)
    setEdges(flowEdges)
  }

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Calculate flow statistics
  const totalOrders = orders.length
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const completedCount = orders.filter(o => o.status === 'delivered').length
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + (order.total_amount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Flow</h1>
        <p className="text-gray-600">Interactive visualization of order workflow and status transitions</p>
      </div>

      {/* Flow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* React Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Order Workflow Visualization</CardTitle>
          <CardDescription>
            Interactive diagram showing order status transitions and current order distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] w-full border rounded-lg">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* Flow Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Order Status Flow</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• <strong>Pending:</strong> New orders awaiting confirmation</li>
                <li>• <strong>Confirmed:</strong> Orders accepted by restaurant</li>
                <li>• <strong>Preparing:</strong> Orders being cooked/prepared</li>
                <li>• <strong>Ready:</strong> Orders ready for pickup/delivery</li>
                <li>• <strong>Delivered:</strong> Completed orders</li>
                <li>• <strong>Cancelled:</strong> Cancelled orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Visual Elements</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Node size indicates order volume</li>
                <li>• Animated edges show active transitions</li>
                <li>• Red edges indicate cancellation paths</li>
                <li>• Badges show current order counts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderFlow
