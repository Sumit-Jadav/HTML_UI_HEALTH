'use client'

import { Clock, Users, Calendar, FileText, Video, Settings, LogOut, Bell, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('appointments')

  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'City General Hospital',
    experience: '12 years',
    image: '/doctor-avatar-1.png',
    rating: 4.8,
    consultationFee: 500
  }

  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      patientAge: 45,
      appointmentTime: '10:00 AM',
      date: 'Today',
      status: 'Confirmed',
      type: 'In-Clinic',
      complaint: 'Chest pain'
    },
    {
      id: 2,
      patientName: 'Emma Wilson',
      patientAge: 32,
      appointmentTime: '11:30 AM',
      date: 'Today',
      status: 'Confirmed',
      type: 'Video Call',
      complaint: 'Regular Checkup'
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      patientAge: 55,
      appointmentTime: '2:00 PM',
      date: 'Tomorrow',
      status: 'Pending',
      type: 'In-Clinic',
      complaint: 'Blood pressure monitoring'
    }
  ]

  const statistics = [
    { label: 'Total Appointments', value: '234', change: '+12%', icon: Calendar },
    { label: 'Patients Seen Today', value: '8', change: 'Active', icon: Users },
    { label: 'Pending Consultations', value: '3', change: 'Urgent', icon: AlertCircle },
    { label: 'Completed This Month', value: '89', change: '+5%', icon: CheckCircle }
  ]

  const recentPatients = [
    { id: 1, name: 'John Doe', lastVisit: '2 days ago', status: 'Stable' },
    { id: 2, name: 'Emma Wilson', lastVisit: '1 week ago', status: 'Recovering' },
    { id: 3, name: 'Michael Brown', lastVisit: '3 weeks ago', status: 'Under Treatment' }
  ]

  const availabilitySlots = [
    { day: 'Monday', slots: '9:00-5:00 PM', patients: 12 },
    { day: 'Tuesday', slots: '9:00-5:00 PM', patients: 10 },
    { day: 'Wednesday', slots: '10:00-4:00 PM', patients: 8 },
    { day: 'Thursday', slots: '9:00-5:00 PM', patients: 14 },
    { day: 'Friday', slots: '9:00-5:00 PM', patients: 11 }
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
            <span className="text-xl font-bold text-foreground">MediConnect</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-foreground hover:text-primary transition">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{doctorInfo.name}</p>
                <p className="text-xs text-muted-foreground">{doctorInfo.specialty}</p>
              </div>
              <Image
                src={doctorInfo.image}
                alt={doctorInfo.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {doctorInfo.name}</h1>
          <p className="text-muted-foreground">Manage your appointments, patients, and schedule</p>
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
                  <span className="text-xs font-medium text-secondary">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-4 px-4 font-medium transition border-b-2 ${activeTab === 'appointments' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Today's Appointments
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`pb-4 px-4 font-medium transition border-b-2 ${activeTab === 'patients' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            My Patients
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`pb-4 px-4 font-medium transition border-b-2 ${activeTab === 'availability' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Manage Availability
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Today's Appointments */}
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Today's Schedule</h2>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Slot
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">Age: {appointment.patientAge}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>{appointment.appointmentTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Video className="w-4 h-4 text-secondary" />
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Chief Complaint: {appointment.complaint}</p>
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition">
                          View Patient Records
                        </button>
                        {appointment.type === 'Video Call' && (
                          <button className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition">
                            Start Video Call
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Patients */}
            {activeTab === 'patients' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">Recent Patients</h2>
                </div>
                <div className="divide-y divide-border">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">Last Visit: {patient.lastVisit}</p>
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {patient.status}
                          </span>
                        </div>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition">
                          View Records
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manage Availability */}
            {activeTab === 'availability' && (
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">Weekly Availability</h2>
                </div>
                <div className="divide-y divide-border">
                  {availabilitySlots.map((slot, index) => (
                    <div key={index} className="p-6 hover:bg-muted/30 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{slot.day}</h3>
                          <p className="text-sm text-muted-foreground">{slot.slots}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{slot.patients}</p>
                          <p className="text-xs text-muted-foreground">Patients Booked</p>
                        </div>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:shadow-lg transition">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="px-6 py-4">
                <div className="flex justify-center -mt-16 mb-4">
                  <Image
                    src={doctorInfo.image}
                    alt={doctorInfo.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-center text-foreground">{doctorInfo.name}</h3>
                <p className="text-sm text-center text-secondary mb-2">{doctorInfo.specialty}</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < 4 ? 'text-accent' : 'text-muted'}`}>★</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">({doctorInfo.rating})</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{doctorInfo.hospital}</p>
                  <p>{doctorInfo.experience} Experience</p>
                  <p>₹{doctorInfo.consultationFee} per session</p>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:shadow-lg transition mt-4">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Add Medical Notes</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="font-medium">View Consultations</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition text-foreground text-left">
                  <Settings className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Settings</span>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Notifications</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">New appointment request</p>
                  <p className="text-xs text-blue-700 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900">Appointment confirmed</p>
                  <p className="text-xs text-green-700 mt-1">5 hours ago</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">Patient feedback received</p>
                  <p className="text-xs text-yellow-700 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
