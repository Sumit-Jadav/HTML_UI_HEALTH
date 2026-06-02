'use client'

import { Calendar, Clock, MapPin, FileText, Upload, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('in-person')
  const [reason, setReason] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const selectedDoctor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    fee: 500,
    image: '/doctor-avatar-1.png'
  }

  const availableTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM']

  const getDates = () => {
    const dates = []
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map(f => f.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const handleConfirmBooking = () => {
    setBookingConfirmed(true)
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-border p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your appointment has been successfully booked. You&apos;ll receive a confirmation email shortly.
          </p>
          
          <div className="bg-muted/20 rounded-lg p-4 mb-6 text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Doctor:</span>
              <span className="font-medium text-foreground">{selectedDoctor.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{selectedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{selectedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground capitalize">{appointmentType}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
              View My Appointments
            </button>
            <Link href="/" className="block w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Confirmation number: <span className="font-mono font-bold text-foreground">APT-2024-001234</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/doctors" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition mb-4">
            <ChevronLeft className="w-5 h-5" /> Back to Doctors
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    s <= step
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition ${
                      s < step ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-muted'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Select Date & Time</span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>Appointment Type</span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Reason & Details</span>
            <span className={`text-sm font-medium ${step >= 4 ? 'text-foreground' : 'text-muted-foreground'}`}>Confirm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Card */}
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <Image
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">{selectedDoctor.name}</h3>
                <p className="text-secondary font-medium mb-4">{selectedDoctor.specialty}</p>
                
                <div className="space-y-3 border-t border-b border-border py-4 my-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Consultation Fee:</span>
                    <span className="font-bold text-foreground">₹{selectedDoctor.fee}</span>
                  </div>
                  {selectedDate && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-foreground">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium text-foreground">{selectedTime || 'Not selected'}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Note:</span> Your appointment will be confirmed after payment processing.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Form Content */}
          <main className="lg:col-span-2">
            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div className="bg-white rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Select Date & Time</h2>
                  <p className="text-muted-foreground">Choose your preferred appointment date and time</p>
                </div>

                {/* Calendar */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Appointment Date</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {getDates().map((date, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))}
                        className={`p-3 rounded-lg border-2 transition text-center ${
                          selectedDate === date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            ? 'border-primary bg-primary/10 font-semibold text-primary'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="text-xs text-muted-foreground">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="font-semibold">{date.getDate()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-4">Select Time Slot</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                            selectedTime === time
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-8 py-3 rounded-lg font-semibold transition ${
                      selectedDate && selectedTime
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Appointment Type */}
            {step === 2 && (
              <div className="bg-white rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Type</h2>
                  <p className="text-muted-foreground">Choose how you&apos;d like to meet with the doctor</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'in-person', title: 'In-Person Visit', description: 'Visit the hospital clinic in person' },
                    { id: 'telemedicine', title: 'Telemedicine', description: 'Video consultation from home' }
                  ].map(type => (
                    <label key={type.id} className="border-2 border-border rounded-lg p-4 cursor-pointer hover:border-primary transition"
                      style={{ borderColor: appointmentType === type.id ? 'var(--color-primary)' : 'var(--color-border)' }}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="type"
                          value={type.id}
                          checked={appointmentType === type.id}
                          onChange={(e) => setAppointmentType(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between gap-4 pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Reason & Details */}
            {step === 3 && (
              <div className="bg-white rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Reason & Details</h2>
                  <p className="text-muted-foreground">Tell us about your health concern</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Chief Complaint/Reason for Visit</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe your symptoms or reason for the appointment..."
                    className="w-full p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-2">{reason.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Upload Medical Documents</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Reports, prescriptions, or test results</p>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-4 pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Review & Confirm
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="bg-white rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Confirm Your Appointment</h2>
                  <p className="text-muted-foreground">Review your appointment details before booking</p>
                </div>

                <div className="space-y-4 bg-muted/20 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-foreground font-medium">Doctor:</span>
                    <span className="text-foreground font-semibold">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-foreground font-medium">Specialty:</span>
                    <span className="text-foreground font-semibold">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-foreground font-medium">Date & Time:</span>
                    <span className="text-foreground font-semibold">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-foreground font-medium">Type:</span>
                    <span className="text-foreground font-semibold capitalize">{appointmentType}</span>
                  </div>
                  <div className="flex justify-between items-start pt-4 border-t border-border">
                    <span className="text-foreground font-medium">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-primary">₹{selectedDoctor.fee}</span>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    By confirming, you agree to proceed with payment. A confirmation email will be sent to your registered email address.
                  </p>
                </div>

                <div className="flex justify-between gap-4 pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
