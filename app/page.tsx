'use client'

import { Star, MapPin, Clock, Shield, Users, Calendar, ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [searchSpecialty, setSearchSpecialty] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const specialties = [
    'Cardiology',
    'Orthopedics',
    'Dermatology',
    'Neurology',
    'Dentistry',
    'General Physician'
  ]

  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.8,
      consultationFee: 500,
      image: '/doctor-avatar-1.png',
      availability: 'Today'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedic Surgeon',
      experience: '10 years',
      rating: 4.9,
      consultationFee: 600,
      image: '/doctor-avatar-2.png',
      availability: 'Tomorrow'
    },
    {
      id: 3,
      name: 'Dr. Emma Wilson',
      specialty: 'General Physician',
      experience: '8 years',
      rating: 4.7,
      consultationFee: 400,
      image: '/doctor-avatar-1.png',
      availability: 'Today'
    },
    {
      id: 4,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Neurologist',
      experience: '15 years',
      rating: 4.9,
      consultationFee: 700,
      image: '/doctor-avatar-2.png',
      availability: 'Day After'
    }
  ]

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Easy Appointment Booking',
      description: 'Schedule appointments with just a few clicks. Choose your preferred date, time, and doctor.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and protected with the highest security standards.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Instant Confirmations',
      description: 'Receive immediate booking confirmation via email and SMS notifications.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Doctors',
      description: 'Access to highly qualified and experienced medical professionals.'
    }
  ]

  const benefits = [
    {
      number: '15,000+',
      label: 'Happy Patients'
    },
    {
      number: '500+',
      label: 'Qualified Doctors'
    },
    {
      number: '50+',
      label: 'Medical Specialties'
    },
    {
      number: '99.9%',
      label: 'Uptime Guarantee'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-xl font-bold text-foreground">MediConnect</span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-foreground hover:text-primary transition">Features</a>
            <a href="#doctors" className="text-foreground hover:text-primary transition">Doctors</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">Contact</a>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-foreground hover:text-primary transition">
              Login
            </Link>
            <Link href="/signup" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full">
                <span className="text-sm font-medium">✨ Now Available on Web & Mobile</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Your Healthcare, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Simplified</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Book appointments with top doctors, manage your medical records, and receive expert healthcare from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/book-appointment" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition inline-flex items-center justify-center gap-2">
                  Book an Appointment <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/doctors" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition inline-flex items-center justify-center gap-2">
                  Find Doctors
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
                <Image
                  src="/hero-healthcare.png"
                  alt="Healthcare professionals"
                  width={500}
                  height={400}
                  className="relative rounded-2xl shadow-2xl object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Find Your Doctor</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Doctor name or specialty"
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Search Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Why Choose MediConnect?</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Experience the future of healthcare with our innovative appointment system designed for your convenience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-xl border border-border bg-white hover:border-primary hover:shadow-xl transition">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section id="doctors" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Our Top Doctors</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Meet our highly qualified and experienced medical professionals ready to serve you.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDoctors.map((doctor) => (
              <div key={doctor.id} className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-sm text-secondary font-medium mb-3">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                    </div>
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">{doctor.experience}</span>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Consultation Fee</p>
                    <p className="text-2xl font-bold text-foreground mb-2">₹{doctor.consultationFee}</p>
                    <p className="text-xs text-secondary font-medium">{doctor.availability}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-medium hover:shadow-lg transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/doctors" className="inline-flex items-center space-x-2 text-primary font-semibold hover:gap-4 transition">
              <span>View All Doctors</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-secondary to-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl font-bold mb-2">{benefit.number}</div>
                <div className="text-white/80">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Medical Specialties</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Access to specialists across a wide range of medical fields.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty, index) => (
              <div key={index} className="p-6 rounded-xl border border-border bg-white text-center hover:border-primary hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">{specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Take Control of Your Health?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MediConnect for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition">
              Get Started Now
            </Link>
            <Link href="#features" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold">
                  M
                </div>
                <span className="text-lg font-bold">MediConnect</span>
              </div>
              <p className="text-white/60">Your trusted healthcare appointment platform.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition">Book Appointment</a></li>
                <li><a href="#" className="hover:text-white transition">Find Doctors</a></li>
                <li><a href="#" className="hover:text-white transition">Medical Records</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>📧 support@mediconnect.com</li>
                <li>📱 +1 (800) 123-4567</li>
                <li>📍 New York, USA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>&copy; 2026 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
