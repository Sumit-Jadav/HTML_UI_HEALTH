'use client'

import { BarChart3, Users, Calendar, TrendingUp, Settings, LogOut, Bell, Download, Filter, Search } from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const statistics = [
    { label: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Appointments', value: '8,239', change: '+8%', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue', value: '₹54,200', change: '+15%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Active Doctors', value: '234', change: '+5%', icon: Users, color: 'from-orange-500 to-orange-600' }
  ]

  const recentAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2026-06-02', status: 'Completed', fee: 500 },
    { id: 2, patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', date: '2026-06-02', status: 'Confirmed', fee: 600 },
    { id: 3, patient: 'Michael Brown', doctor: 'Dr. Emma Wilson', date: '2026-06-01', status: 'Completed', fee: 400 },
    { id: 4, patient: 'Sarah Taylor', doctor: 'Dr. Rajesh Kumar', date: '2026-05-31', status: 'Cancelled', fee: 700 }
  ]

  const userManagement = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Doctor', email: 'sarah@hospital.com', status: 'Active', joinDate: '2025-01-15' },
    { id: 2, name: 'John Receptionist', role: 'Staff', email: 'john@hospital.com', status: 'Active', joinDate: '2025-02-20' },
    { id: 3, name: 'Emma Davis', role: 'Patient', email: 'emma@email.com', status: 'Active', joinDate: '2026-01-10' },
    { id: 4, name: 'Dr. Michael Chen', role: 'Doctor', email: 'michael@hospital.com', status: 'Inactive', joinDate: '2025-03-05' }
  ]

  const departmentStats = [
    { name: 'Cardiology', doctors: 12, appointments: 342, revenue: 15600 },
    { name: 'Orthopedics', doctors: 8, appointments: 289, revenue: 12400 },
    { name: 'Dermatology', doctors: 10, appointments: 267, revenue: 11200 },
    { name: 'Neurology', doctors: 6, appointments: 198, revenue: 8900 },
    { name: 'Dentistry', doctors: 9, appointments: 276, revenue: 6200 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-xl font-bold text-foreground">MediConnect - Admin</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-foreground hover:text-primary transition">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            <button className="flex items-center space-x-2 text-foreground hover:text-primary transition">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System management, reporting, and user administration</p>
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
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'departments' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'reports' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Reports
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Appointments */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Recent Appointments</h2>
                <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Doctor</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-muted/30 transition">
                        <td className="px-6 py-4 text-sm text-foreground">{apt.patient}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{apt.doctor}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{apt.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Completed' ? 'bg-green-100 text-green-700' : apt.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">₹{apt.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                    Add New Doctor
                  </button>
                  <button className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                    Add Department
                  </button>
                  <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/5 transition text-sm">
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">System Health</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-green-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Server Load</span>
                      <span className="text-sm font-medium text-yellow-600">Moderate</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-yellow-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Storage</span>
                      <span className="text-sm font-medium text-blue-600">Good</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-xl font-bold text-foreground">User Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {userManagement.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-primary/80 transition text-sm font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Department Statistics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Doctors</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Appointments</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {departmentStats.map((dept, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{dept.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{dept.doctors}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{dept.appointments}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">₹{dept.revenue.toLocaleString()}</td>
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

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Generate Reports</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition">
                  <p className="font-medium text-foreground">Appointment Report</p>
                  <p className="text-sm text-muted-foreground">View all appointments for a date range</p>
                </button>
                <button className="w-full text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition">
                  <p className="font-medium text-foreground">Revenue Report</p>
                  <p className="text-sm text-muted-foreground">Monthly and yearly revenue analysis</p>
                </button>
                <button className="w-full text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition">
                  <p className="font-medium text-foreground">Doctor Performance</p>
                  <p className="text-sm text-muted-foreground">Doctor wise appointment and rating metrics</p>
                </button>
                <button className="w-full text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition">
                  <p className="font-medium text-foreground">Patient Analytics</p>
                  <p className="text-sm text-muted-foreground">Patient demographics and trends</p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Audit Logs</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <p className="text-sm font-medium text-blue-900">User Registration</p>
                  <p className="text-xs text-blue-700">New patient Emma Davis registered - 2 hours ago</p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="text-sm font-medium text-green-900">Appointment Created</p>
                  <p className="text-xs text-green-700">New appointment scheduled by receptionist - 3 hours ago</p>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                  <p className="text-sm font-medium text-yellow-900">Doctor Status Changed</p>
                  <p className="text-xs text-yellow-700">Dr. Michael Chen marked as inactive - 1 day ago</p>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
                  <p className="text-sm font-medium text-purple-900">System Configuration</p>
                  <p className="text-xs text-purple-700">Consultation fee updated for Cardiology - 2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
