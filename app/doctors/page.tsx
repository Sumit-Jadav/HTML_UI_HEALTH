'use client'

import { Star, MapPin, Clock, Heart, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)

  const specialties = ['All', 'Cardiology', 'Orthopedics', 'Dermatology', 'Neurology', 'Dentistry', 'General Physician', 'Pediatrics']

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '12 years',
      rating: 4.8,
      reviews: 342,
      consultationFee: 500,
      image: '/doctor-avatar-1.png',
      location: 'New York, USA',
      languages: ['English', 'Spanish'],
      availability: 'Today',
      bio: 'Specialized in cardiac care and heart disease management.'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      experience: '10 years',
      rating: 4.9,
      reviews: 415,
      consultationFee: 600,
      image: '/doctor-avatar-2.png',
      location: 'San Francisco, USA',
      languages: ['English', 'Mandarin'],
      availability: 'Tomorrow',
      bio: 'Expert in joint replacement and sports medicine.'
    },
    {
      id: 3,
      name: 'Dr. Emma Wilson',
      specialty: 'Dermatology',
      experience: '8 years',
      rating: 4.7,
      reviews: 289,
      consultationFee: 400,
      image: '/doctor-avatar-1.png',
      location: 'Los Angeles, USA',
      languages: ['English'],
      availability: 'Today',
      bio: 'Dedicated to skin health and cosmetic dermatology.'
    },
    {
      id: 4,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Neurology',
      experience: '15 years',
      rating: 4.9,
      reviews: 502,
      consultationFee: 700,
      image: '/doctor-avatar-2.png',
      location: 'Chicago, USA',
      languages: ['English', 'Hindi'],
      availability: 'Day After',
      bio: 'Specialist in neurological disorders and treatments.'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'General Physician',
      experience: '9 years',
      rating: 4.6,
      reviews: 278,
      consultationFee: 400,
      image: '/doctor-avatar-1.png',
      location: 'Boston, USA',
      languages: ['English', 'French'],
      availability: 'Today',
      bio: 'General medical practitioner with comprehensive care approach.'
    },
    {
      id: 6,
      name: 'Dr. James Mitchell',
      specialty: 'Pediatrics',
      experience: '11 years',
      rating: 4.8,
      reviews: 356,
      consultationFee: 450,
      image: '/doctor-avatar-2.png',
      location: 'Seattle, USA',
      languages: ['English'],
      availability: 'Tomorrow',
      bio: 'Compassionate care for children and adolescents.'
    },
    {
      id: 7,
      name: 'Dr. Priya Sharma',
      specialty: 'Dentistry',
      experience: '7 years',
      rating: 4.7,
      reviews: 195,
      consultationFee: 350,
      image: '/doctor-avatar-1.png',
      location: 'Miami, USA',
      languages: ['English', 'Spanish'],
      availability: 'Today',
      bio: 'Expert in cosmetic and preventive dentistry.'
    },
    {
      id: 8,
      name: 'Dr. Robert Thompson',
      specialty: 'Orthopedics',
      experience: '13 years',
      rating: 4.9,
      reviews: 467,
      consultationFee: 650,
      image: '/doctor-avatar-2.png',
      location: 'Denver, USA',
      languages: ['English'],
      availability: 'Today',
      bio: 'Leading specialist in orthopedic surgery and rehabilitation.'
    }
  ]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty
    const matchesSearch = !searchQuery || doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = selectedRating === 0 || doctor.rating >= selectedRating
    return matchesSpecialty && matchesSearch && matchesRating
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Find Your Doctor</h1>
              <p className="text-muted-foreground mt-2">Search and book appointments with qualified healthcare professionals</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search doctors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Specialty Filter */}
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Specialty</h3>
                </div>
                <div className="space-y-3">
                  {specialties.map(specialty => (
                    <label key={specialty} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="specialty"
                        value={specialty}
                        checked={selectedSpecialty === specialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-4">Rating</h3>
                <div className="space-y-3">
                  {[0, 4.5, 4.7, 4.9].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">
                        {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedSpecialty || searchQuery || selectedRating > 0) && (
                <button
                  onClick={() => {
                    setSelectedSpecialty('')
                    setSearchQuery('')
                    setSelectedRating(0)
                  }}
                  className="w-full bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Doctors Grid */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredDoctors.length}</span> doctors
              </p>
              <select className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Lowest Fee</option>
                <option>Most Experienced</option>
              </select>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition flex flex-col">
                    {/* Doctor Header */}
                    <div className="p-6 flex gap-4 border-b border-border">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={120}
                        height={120}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
                        <p className="text-secondary font-medium text-sm">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                          <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-6 space-y-4 flex-1">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">About</p>
                        <p className="text-sm text-foreground">{doctor.bio}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Experience</p>
                          <p className="text-sm font-medium text-foreground">{doctor.experience}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Location</p>
                          <p className="text-sm font-medium text-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {doctor.location}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Languages</p>
                        <div className="flex gap-1 flex-wrap">
                          {doctor.languages.map(lang => (
                            <span key={lang} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Consultation Fee</p>
                          <p className="text-2xl font-bold text-foreground">₹{doctor.consultationFee}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-secondary font-medium mb-2">{doctor.availability}</p>
                          <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No doctors found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
