/**
 * Analytics page component with Chart.js visualizations.
 * Displays sales trends, popular items, and revenue analytics.
 */

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { analyticsAPI } from '../lib/api';
import { formatCurrency } from "../lib/utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * Analytics dashboard with comprehensive charts and metrics.
 */
export function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  /**
   * Load analytics data from API.
   */
  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const data = await analyticsAPI.getSalesAnalytics(1);
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return <div>No analytics data available</div>;
  }

  // Prepare chart data
  const revenueChartData = {
    labels: analytics.dailyRevenue.map((day: any) => {
      const date = new Date(day.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: "Revenue",
        data: analytics.dailyRevenue.map((day: any) => day.revenue),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const ordersChartData = {
    labels: analytics.dailyRevenue.map((day: any) => {
      const date = new Date(day.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: "Orders",
        data: analytics.dailyRevenue.map((day: any) => day.orders),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
    ],
  };

  const popularItemsData = {
    labels: analytics.popularItems.map((item: any) => item.name),
    datasets: [
      {
        label: "Orders",
        data: analytics.popularItems.map((item: any) => item.orders),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryRevenueData = {
    labels: analytics.revenueByCategory.map(
      (cat: any) => cat.category.charAt(0).toUpperCase() + cat.category.slice(1)
    ),
    datasets: [
      {
        data: analytics.revenueByCategory.map((cat: any) => cat.revenue),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive business insights and performance metrics
        </p>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(
                analytics.dailyRevenue.reduce(
                  (sum: number, day: any) => sum + day.revenue,
                  0
                )
              )}
            </div>
            <Badge className="mt-2" variant="success">
              +15.3% vs previous week
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {analytics.dailyRevenue.reduce(
                (sum: number, day: any) => sum + day.orders,
                0
              )}
            </div>
            <Badge className="mt-2" variant="success">
              +8.2% vs previous week
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(
                analytics.dailyRevenue.reduce(
                  (sum: number, day: any) => sum + day.revenue,
                  0
                ) /
                  analytics.dailyRevenue.reduce(
                    (sum: number, day: any) => sum + day.orders,
                    0
                  )
              )}
            </div>
            <Badge className="mt-2" variant="warning">
              +2.1% vs previous week
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <Line data={revenueChartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Orders</CardTitle>
            <CardDescription>Number of orders per day</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={ordersChartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Popular Items Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Menu Items</CardTitle>
            <CardDescription>Most ordered items by quantity</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar
              data={popularItemsData}
              options={{
                ...chartOptions,
                indexAxis: "y" as const,
              }}
            />
          </CardContent>
        </Card>

        {/* Revenue by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>
              Revenue distribution across menu categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Doughnut data={categoryRevenueData} options={doughnutOptions} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Items</CardTitle>
            <CardDescription>
              Detailed breakdown of popular menu items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.revenue)}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>
              Revenue breakdown by menu categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.revenueByCategory.map((category: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium capitalize">{category.category}</h4>
                    <p className="text-sm text-gray-600">
                      {category.percentage}% of total
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(category.revenue)}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
