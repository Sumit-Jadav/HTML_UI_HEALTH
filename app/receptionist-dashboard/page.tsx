'use client'

import { Clock, Users, CheckCircle, AlertCircle, PhoneCall, Plus, LogOut, Bell, Search, Calendar, FileText, Printer } from 'lucide-react'
import { useState } from 'react'

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState('today')
  const [searchTerm, setSearchTerm] = useState('')

  const statistics = [
    { label: "Today's Appointments", value: '24', pending: '3', icon: Calendar },
    { label: 'Check-ins Completed', value: '18', total: '24', icon: CheckCircle },
    { label: 'Walk-in Patients', value: '6', icon: Users },
    { label: 'Pending Tasks', value: '5', urgent: '2', icon: AlertCircle }
  ]

  const todayAppointments = [
    { id: 1, time: '09:00 AM', patient: 'John Doe', doctor: 'Dr. Sarah Johnson', type: 'In-Clinic', status: 'Checked In', fee: 500 },
    { id: 2, time: '09:30 AM', patient: 'Emma Wilson', doctor: 'Dr. Sarah Johnson', type: 'Video Call', status: 'Pending', fee: 500 },
    { id: 3, time: '10:00 AM', patient: 'Michael Brown', doctor: 'Dr. Michael Chen', type: 'In-Clinic', status: 'Pending', fee: 600 },
    { id: 4, time: '10:30 AM', patient: 'Sarah Taylor', doctor: 'Dr. Emma Wilson', type: 'In-Clinic', status: 'Pending', fee: 400 },
    { id: 5, time: '11:00 AM', patient: 'David Anderson', doctor: 'Dr. Rajesh Kumar', type: 'In-Clinic', status: 'Checked In', fee: 700 }
  ]

  const newPatients = [
    { id: 1, name: 'Robert Johnson', phone: '+1-555-0123', email: 'robert@email.com', insurance: 'Yes', registeredDate: 'Today' },
    { id: 2, name: 'Jennifer Lee', phone: '+1-555-0124', email: 'jennifer@email.com', insurance: 'No', registeredDate: 'Today' },
    { id: 3, name: 'Christopher Davis', phone: '+1-555-0125', email: 'chris@email.com', insurance: 'Yes', registeredDate: 'Yesterday' }
  ]

  const callLogs = [
    { id: 1, caller: 'Patient - Maria Garcia', time: '2:45 PM', duration: '8 min', status: 'Appointment Inquiry' },
    { id: 2, caller: 'Insurance Company', time: '1:30 PM', duration: '5 min', status: 'Verification' },
    { id: 3, caller: 'Patient - James Wilson', time: '12:15 PM', duration: '3 min', status: 'Reschedule Request' },
    { id: 4, caller: 'Lab - Test Results', time: '11:00 AM', duration: '2 min', status: 'Report Delivery' }
  ]

  const pendingTasks = [
    { id: 1, task: 'Process Payment - Michael Brown', priority: 'High', dueTime: 'ASAP' },
    { id: 2, task: 'Print Patient Forms - 3 copies', priority: 'High', dueTime: 'By 12:00 PM' },
    { id: 3, task: 'Update Insurance Info - Emma Wilson', priority: 'Medium', dueTime: 'By 3:00 PM' },
    { id: 4, task: 'File Medical Records - Morning Patients', priority: 'Low', dueTime: 'By EOD' }
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
            <span className="text-xl font-bold text-foreground">MediConnect - Reception</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-foreground hover:text-primary transition">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">4</span>
            </button>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Reception Staff</p>
              <p className="text-xs text-muted-foreground">Shift: Morning</p>
            </div>
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Reception Dashboard</h1>
          <p className="text-muted-foreground">Manage appointments, patient check-in, and daily operations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  {stat.pending && <span className="text-xs font-medium text-destructive">{stat.pending} Pending</span>}
                  {stat.total && <span className="text-xs font-medium text-muted-foreground">of {stat.total}</span>}
                  {stat.urgent && <span className="text-xs font-medium text-destructive">{stat.urgent} Urgent</span>}
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
            onClick={() => setActiveTab('today')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'today' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Today's Appointments
          </button>
          <button
            onClick={() => setActiveTab('newpatients')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'newpatients' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            New Patients
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'calls' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Call Logs
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-4 px-4 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'tasks' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            My Tasks
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Today's Appointments */}
            {activeTab === 'today' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Today's Schedule</h2>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Walk-in
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Patient</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Doctor</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {todayAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-muted/30 transition">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{apt.time}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{apt.patient}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{apt.doctor}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{apt.type}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Checked In' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-primary hover:text-primary/80 transition text-sm font-medium">
                              {apt.status === 'Pending' ? 'Check In' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* New Patients */}
            {activeTab === 'newpatients' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">New Patient Registrations</h2>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Register Patient
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {newPatients.map((patient) => (
                    <div key={patient.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.phone}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {patient.registeredDate}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm text-foreground">{patient.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Insurance</p>
                          <p className="text-sm text-foreground">{patient.insurance}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                          Complete Registration
                        </button>
                        <button className="flex-1 border border-border hover:bg-muted py-2 rounded-lg font-medium transition text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call Logs */}
            {activeTab === 'calls' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">Call Logs</h2>
                </div>
                <div className="divide-y divide-border">
                  {callLogs.map((log) => (
                    <div key={log.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <PhoneCall className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{log.caller}</h3>
                          <p className="text-sm text-muted-foreground">{log.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{log.time}</p>
                          <p className="text-xs text-muted-foreground">{log.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Tasks */}
            {activeTab === 'tasks' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">My Tasks</h2>
                </div>
                <div className="divide-y divide-border">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-foreground">{task.task}</h3>
                          <p className="text-sm text-muted-foreground">Due: {task.dueTime}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 transition text-sm font-medium">
                        Mark Complete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left font-medium">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Check-in Patient</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left font-medium">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>Register New Patient</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left font-medium">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span>Schedule Appointment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left font-medium">
                  <Printer className="w-5 h-5 text-secondary" />
                  <span>Print Forms</span>
                </button>
              </div>
            </div>

            {/* Waiting List */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Current Wait Time</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Average Wait</p>
                  <p className="text-2xl font-bold text-primary">15 min</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Patients Waiting</p>
                  <p className="text-2xl font-bold text-foreground">6</p>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Announcements</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <p className="text-xs font-medium text-blue-900">System Notice</p>
                  <p className="text-xs text-blue-700 mt-1">Maintenance window 9:00 PM tonight</p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="text-xs font-medium text-green-900">Update</p>
                  <p className="text-xs text-green-700 mt-1">New check-in form deployed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
