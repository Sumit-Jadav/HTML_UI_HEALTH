'use client'

import { Globe, Building2, TrendingUp, BarChart3, Settings, LogOut, Bell, Users, AlertTriangle, Database } from 'lucide-react'
import { useState } from 'react'

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const statistics = [
    { label: 'Total Hospitals', value: '24', change: '+3', icon: Building2, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '45,234', change: '+8%', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Global Revenue', value: '₹2.4M', change: '+12%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'System Uptime', value: '99.98%', change: 'Excellent', icon: Database, color: 'from-orange-500 to-orange-600' }
  ]

  const hospitalsList = [
    { id: 1, name: 'City General Hospital', location: 'New York', admins: 3, patients: 4250, status: 'Active', revenue: 450000 },
    { id: 2, name: 'Metro Health Center', location: 'Los Angeles', admins: 2, patients: 3180, status: 'Active', revenue: 380000 },
    { id: 3, name: 'Central Medical Institute', location: 'Chicago', admins: 4, patients: 5620, status: 'Active', revenue: 520000 },
    { id: 4, name: 'Westside Clinic', location: 'Houston', admins: 2, patients: 2340, status: 'Inactive', revenue: 200000 }
  ]

  const systemHealth = [
    { name: 'API Servers', status: 'Healthy', uptime: '99.99%', response: '45ms' },
    { name: 'Database', status: 'Healthy', uptime: '99.99%', response: '12ms' },
    { name: 'CDN', status: 'Healthy', uptime: '100%', response: '5ms' },
    { name: 'Email Service', status: 'Warning', uptime: '99.85%', response: '150ms' }
  ]

  const recentActivities = [
    { id: 1, type: 'Hospital Added', description: 'Riverside Medical Center onboarded', timestamp: '2 hours ago', icon: Building2, color: 'bg-blue-100 text-blue-700' },
    { id: 2, type: 'Admin Alert', description: 'Unusual activity detected in City General Hospital', timestamp: '4 hours ago', icon: AlertTriangle, color: 'bg-red-100 text-red-700' },
    { id: 3, type: 'System Update', description: 'Database backup completed successfully', timestamp: '6 hours ago', icon: Database, color: 'bg-green-100 text-green-700' },
    { id: 4, type: 'Billing Alert', description: 'Payment processing delay for Metro Health Center', timestamp: '1 day ago', icon: TrendingUp, color: 'bg-yellow-100 text-yellow-700' }
  ]

  const subscriptionPlans = [
    { name: 'Basic', hospitals: 5, price: '₹9,999/mo', users: 'Unlimited', features: ['Up to 5 hospitals', 'Basic support'] },
    { name: 'Professional', hospitals: 25, price: '₹29,999/mo', users: 'Unlimited', features: ['Up to 25 hospitals', 'Priority support', 'Advanced analytics'] },
    { name: 'Enterprise', hospitals: 100, price: 'Custom', users: 'Unlimited', features: ['Unlimited hospitals', '24/7 support', 'Custom integrations'] }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="text-xl font-bold text-foreground">MediConnect - Super Admin</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-foreground hover:text-primary transition">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">8</span>
            </button>
            <button className="flex items-center space-x-2 text-foreground hover:text-primary transition">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">System Settings</span>
            </button>
            <button className="text-muted-foreground hover:text-destructive transition">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Global system management, multi-hospital oversight, and enterprise configuration</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-secondary">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'hospitals' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Hospital Management
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'system' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            System Health
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'billing' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Billing & Plans
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">Recent Activities</h2>
              </div>
              <div className="divide-y divide-border">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                    Onboard Hospital
                  </button>
                  <button className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                    System Configuration
                  </button>
                  <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/5 transition text-sm">
                    View Audit Logs
                  </button>
                  <button className="w-full border-2 border-secondary text-secondary py-2 rounded-lg font-medium hover:bg-secondary/5 transition text-sm">
                    Billing Dashboard
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Alerts & Warnings</h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                    <p className="text-xs font-medium text-red-900">Critical Issue</p>
                    <p className="text-xs text-red-700 mt-1">Email service degradation detected</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                    <p className="text-xs font-medium text-yellow-900">Warning</p>
                    <p className="text-xs text-yellow-700 mt-1">Database disk space at 85%</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                    <p className="text-xs font-medium text-blue-900">Maintenance</p>
                    <p className="text-xs text-blue-700 mt-1">Backup scheduled for tonight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hospital Management Tab */}
        {activeTab === 'hospitals' && (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Hospital Management</h2>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition">
                + Onboard Hospital
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hospital Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Admins</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Patients</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {hospitalsList.map((hospital) => (
                    <tr key={hospital.id} className="hover:bg-muted/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{hospital.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{hospital.location}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{hospital.admins}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{hospital.patients.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">₹{hospital.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${hospital.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {hospital.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-primary/80 transition text-sm font-medium">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">System Components Health</h2>
              </div>
              <div className="divide-y divide-border">
                {systemHealth.map((service, index) => (
                  <div key={index} className="p-6 hover:bg-muted/30 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${service.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                        <p className="text-lg font-bold text-foreground">{service.uptime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Response Time</p>
                        <p className="text-lg font-bold text-foreground">{service.response}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Backup Status</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Last Backup</span>
                      <span className="text-sm font-medium">2 hours ago</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-full bg-green-500"></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Next scheduled backup: 10:00 PM IST</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Storage Usage</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-blue-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Files & Media</span>
                      <span className="text-sm font-medium">38%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-purple-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing & Plans Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <div key={index} className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition">
                  <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold text-primary">{plan.price}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground">HOSPITALS</p>
                        <p className="text-lg font-bold text-foreground">{plan.hospitals}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">USERS</p>
                        <p className="text-lg font-bold text-foreground">{plan.users}</p>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-medium text-muted-foreground mb-3">FEATURES</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-sm text-foreground">✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">City General Hospital - Monthly Subscription</p>
                    <p className="text-sm text-muted-foreground">Invoice #INV-2026-0542</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+₹29,999</p>
                    <p className="text-xs text-muted-foreground">Paid 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Metro Health Center - Monthly Subscription</p>
                    <p className="text-sm text-muted-foreground">Invoice #INV-2026-0541</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+₹9,999</p>
                    <p className="text-xs text-muted-foreground">Paid 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
