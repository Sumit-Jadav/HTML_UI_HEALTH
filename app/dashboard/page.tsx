'use client'

import { Calendar, Clock, MapPin, Bell, FileText, Heart, Plus, ChevronRight, Download, Eye, Edit, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('appointments')

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: 'Today',
      time: '2:00 PM',
      type: 'In-Person',
      location: 'New York Medical Center',
      image: '/doctor-avatar-1.png',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      date: 'Tomorrow',
      time: '10:30 AM',
      type: 'Telemedicine',
      location: 'Video Call',
      image: '/doctor-avatar-2.png',
      status: 'confirmed'
    },
    {
      id: 3,
      doctor: 'Dr. Emma Wilson',
      specialty: 'Dermatology',
      date: 'June 10, 2026',
      time: '3:15 PM',
      type: 'In-Person',
      location: 'LA Clinic',
      image: '/doctor-avatar-1.png',
      status: 'confirmed'
    }
  ]

  const pastAppointments = [
    {
      id: 1,
      doctor: 'Dr. James Mitchell',
      specialty: 'Pediatrics',
      date: 'May 28, 2026',
      time: '2:00 PM',
      notes: 'General checkup - All healthy',
      image: '/doctor-avatar-2.png'
    },
    {
      id: 2,
      doctor: 'Dr. Lisa Anderson',
      specialty: 'General Physician',
      date: 'May 20, 2026',
      time: '11:00 AM',
      notes: 'Flu vaccination completed',
      image: '/doctor-avatar-1.png'
    }
  ]

  const medicalRecords = [
    {
      id: 1,
      title: 'Annual Health Checkup',
      date: 'May 28, 2026',
      doctor: 'Dr. James Mitchell',
      type: 'Report'
    },
    {
      id: 2,
      title: 'Flu Vaccination Certificate',
      date: 'May 20, 2026',
      doctor: 'Dr. Lisa Anderson',
      type: 'Certificate'
    },
    {
      id: 3,
      title: 'Blood Test Results',
      date: 'May 15, 2026',
      doctor: 'Lab Report',
      type: 'Lab Results'
    }
  ]

  const healthStats = [
    { label: 'Total Appointments', value: '12', icon: Calendar },
    { label: 'Medical Records', value: '8', icon: FileText },
    { label: 'Doctors Visited', value: '6', icon: Heart },
    { label: 'This Month', value: '3', icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Welcome Back, Patient!</h1>
              <p className="text-white/80 mt-2">Manage your appointments and health records</p>
            </div>
            <div className="relative">
              <Bell className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
            </div>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">{stat.label}</span>
                    <Icon className="w-5 h-5 text-white/60" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-border p-6 mb-6">
              <div className="text-center mb-6">
                <Image
                  src="/doctor-avatar-1.png"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h3 className="text-xl font-bold text-foreground">John Doe</h3>
                <p className="text-muted-foreground text-sm">john@email.com</p>
              </div>

              <div className="space-y-3 border-t border-b border-border py-4 my-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium text-foreground">32 years</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium text-foreground">Male</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Blood Type:</span>
                  <span className="font-medium text-foreground">O+</span>
                </div>
              </div>

              <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/5 transition">
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border">
                <h3 className="font-bold text-foreground">Quick Actions</h3>
              </div>
              <div className="divide-y divide-border">
                <button className="w-full px-6 py-4 text-left hover:bg-muted transition font-medium text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> New Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full px-6 py-4 text-left hover:bg-muted transition font-medium text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> View Records</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full px-6 py-4 text-left hover:bg-muted transition font-medium text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Health History</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              {['appointments', 'records', 'prescriptions'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-semibold capitalize transition border-b-2 ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {/* Upcoming */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Upcoming Appointments</h3>
                  <div className="space-y-4">
                    {upcomingAppointments.map(apt => (
                      <div key={apt.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                        <div className="p-6 flex gap-4">
                          <Image
                            src={apt.image}
                            alt={apt.doctor}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground mb-1">{apt.doctor}</h4>
                            <p className="text-sm text-secondary font-medium mb-2">{apt.specialty}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {apt.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {apt.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{apt.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> {apt.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 text-sm bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition">
                              Reschedule
                            </button>
                            <button className="px-4 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted transition">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Past */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">Past Appointments</h3>
                  <div className="space-y-4">
                    {pastAppointments.map(apt => (
                      <div key={apt.id} className="bg-white rounded-xl border border-border overflow-hidden opacity-75 hover:opacity-100 transition">
                        <div className="p-6 flex gap-4 items-center">
                          <Image
                            src={apt.image}
                            alt={apt.doctor}
                            width={80}
                            height={80}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{apt.doctor}</h4>
                            <p className="text-sm text-muted-foreground">{apt.specialty} • {apt.date}</p>
                            <p className="text-sm text-muted-foreground mt-1">{apt.notes}</p>
                          </div>
                          <button className="px-4 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted transition">
                            View Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Medical Records Tab */}
            {activeTab === 'records' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-foreground">Medical Records</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition">
                    <Plus className="w-4 h-4" /> Add Record
                  </button>
                </div>

                {medicalRecords.map(record => (
                  <div key={record.id} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{record.title}</h4>
                          <p className="text-sm text-muted-foreground">{record.date} • {record.doctor}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                          <Eye className="w-5 h-5 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                          <Download className="w-5 h-5 text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Active Prescriptions</h3>
                <div className="bg-white rounded-xl border border-border p-8 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active prescriptions at the moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">Prescriptions from your appointments will appear here.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
