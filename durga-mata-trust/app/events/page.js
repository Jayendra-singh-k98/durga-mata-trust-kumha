"use client"
import React, { useState } from 'react';
import { Calendar, Star, Sparkles, Users, Gift, Music, Heart, Clock, MapPin, ChevronRight } from 'lucide-react';

const EventsFestivals = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      title: 'Navratri Mahotsav 2024',
      date: 'October 15-24, 2024',
      time: '6:00 AM - 9:00 PM Daily',
      description: 'Nine days of grand celebrations honoring Maa Durga with daily poojas, cultural programs, garba nights, and prasad distribution. Special Kanya Pooja on the 8th day.',
      highlights: ['Daily Durga Pooja', 'Garba & Dandiya', 'Kanya Pooja', 'Free Prasad', 'Cultural Programs'],
      color: 'orange',
      icon: Star
    },
    {
      title: 'Diwali Celebration',
      date: 'November 1, 2024',
      time: '5:00 AM - 11:00 PM',
      description: 'Celebrate the festival of lights with special Lakshmi Pooja, thousands of diyas illuminating the temple, rangoli competition, and community feast.',
      highlights: ['Lakshmi Pooja', 'Diya Lighting', 'Rangoli Competition', 'Community Feast', 'Fireworks Display'],
      color: 'yellow',
      icon: Sparkles
    },
  ];

  const pastEvents = [
    {
      title: 'Ganesh Chaturthi Celebration',
      date: 'September 7-17, 2024',
      description: 'Successfully celebrated 11-day Ganesh festival with 10,000+ devotees participating. Daily aartis, modak distribution, and grand visarjan procession.',
      attendance: '10,000+ devotees',
      image: '🎭'
    },
  ];

  const majorFestivals = [
    {
      name: 'Navratri',
      description: 'Nine nights dedicated to Goddess Durga with daily poojas, cultural programs, and community celebrations',
      significance: 'Victory of good over evil, worship of divine feminine power',
      activities: ['Durga Pooja', 'Garba Nights', 'Kanya Pooja', 'Havan', 'Cultural Programs'],
      color: 'orange'
    },
    {
      name: 'Ganesh Chaturthi',
      description: 'Ten-day celebration of Lord Ganesha\'s birth with daily rituals and grand visarjan',
      significance: 'Remover of obstacles, beginning of new ventures',
      activities: ['Daily Pooja', 'Modak Offerings', 'Cultural Programs', 'Visarjan Procession'],
      color: 'red'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      pink: 'bg-pink-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color] || colors.orange;
  };

  const getBgColorClasses = (color) => {
    const colors = {
      orange: 'from-orange-50 to-orange-100 border-orange-500',
      yellow: 'from-yellow-50 to-yellow-100 border-yellow-500',
      green: 'from-green-50 to-green-100 border-green-500',
      purple: 'from-purple-50 to-purple-100 border-purple-500',
      blue: 'from-blue-50 to-blue-100 border-blue-500',
      pink: 'from-pink-50 to-pink-100 border-pink-500',
      red: 'from-red-50 to-red-100 border-red-500',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-500'
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-orange-50 to-yellow-50">
      
      {/* Page Header */}
      <section className="bg-linear-to-r from-pink-600 via-orange-600 to-yellow-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Events & Festivals</h1>
          <p className="text-xl opacity-90">
            Celebrate Divine Joy and Community Spirit Together
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Invitation Message */}
        <section className="bg-linear-to-r from-orange-100 to-pink-100 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-orange-300">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">You Are Cordially Invited!</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-6"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <p className="text-lg">
                Dear Devotees and Community Members, we warmly welcome you to participate in the vibrant celebrations 
                at [Temple Name]. Our festivals and events are more than religious observances; they are joyous occasions 
                that bring our community together in devotion, celebration, and service.
              </p>
              <p className="text-lg">
                Whether you come alone or with family, as a regular devotee or a first-time visitor, you will find a 
                welcoming atmosphere filled with divine energy, cultural richness, and the warmth of community spirit. 
                All our events are open to everyone, regardless of background, and participation is completely free.
              </p>
              <p className="text-xl font-semibold text-orange-700 mt-6">
                "सबका स्वागत है, सबको आशीर्वाद है"
              </p>
              <p className="text-lg italic text-gray-600">
                "Everyone is Welcome, Everyone is Blessed"
              </p>
            </div>
          </div>
        </section>

        {/* Tabs for Upcoming and Past Events */}
        <section className="mb-12">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                activeTab === 'past'
                  ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="inline-block w-5 h-5 mr-2" />
              Past Events
            </button>
          </div>

          {/* Upcoming Events */}
          {activeTab === 'upcoming' && (
            <div className="space-y-8">
              {upcomingEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-linear-to-br ${getBgColorClasses(event.color)} rounded-2xl shadow-xl p-8 border-l-8 hover:shadow-2xl transition-all`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <div className={`w-24 h-24 ${getColorClasses(event.color)} rounded-full flex items-center justify-center`}>
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="grow">
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">{event.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-5 h-5" />
                            <span className="font-semibold">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">{event.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                          {event.description}
                        </p>
                        
                        <div className="bg-white bg-opacity-60 rounded-lg p-4">
                          <h4 className="font-bold text-gray-800 mb-2">Event Highlights:</h4>
                          <div className="flex flex-wrap gap-2">
                            {event.highlights.map((highlight, idx) => (
                              <span 
                                key={idx}
                                className={`${getColorClasses(event.color)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Past Events */}
          {activeTab === 'past' && (
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="bg-linear-to-r from-purple-500 to-indigo-500 text-white p-6 text-center">
                    <div className="text-6xl mb-2">{event.image}</div>
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">{event.date}</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
                      <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <Users className="w-5 h-5" />
                        <span>{event.attendance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Major Festivals */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Major Hindu Festivals We Celebrate</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Throughout the year, our temple celebrates all major Hindu festivals with traditional rituals, 
              community participation, and joyous festivities. Each celebration is an opportunity to connect 
              with divine blessings and strengthen our spiritual community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {majorFestivals.map((festival, index) => (
              <div 
                key={index}
                className={`bg-linear-to-br ${getBgColorClasses(festival.color)} rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${getColorClasses(festival.color)} rounded-full flex items-center justify-center`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{festival.name}</h3>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {festival.description}
                </p>
                
                <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-600 mb-1"><strong>Spiritual Significance:</strong></p>
                  <p className="text-gray-700">{festival.significance}</p>
                </div>
                
                <div className="bg-white bg-opacity-60 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-2"><strong>Festival Activities:</strong></p>
                  <div className="flex flex-wrap gap-2">
                    {festival.activities.map((activity, idx) => (
                      <span 
                        key={idx}
                        className="bg-white text-gray-700 px-2 py-1 rounded text-sm border border-gray-300"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regular Community Events */}
        <section className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Regular Community Events</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-3 text-center">📖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Weekly Satsang</h3>
              <p className="text-gray-600 text-center mb-2"><strong>Every Sunday, 5:00 PM</strong></p>
              <p className="text-gray-700 text-sm">
                Spiritual discourse, bhajan singing, and community gathering for devotees of all ages.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-3 text-center">🎵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Monthly Bhajan Night</h3>
              <p className="text-gray-600 text-center mb-2"><strong>Every Purnima, 7:00 PM</strong></p>
              <p className="text-gray-700 text-sm">
                Full moon devotional singing with traditional instruments and prasad distribution.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-3 text-center">🍲</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Annadaan Program</h3>
              <p className="text-gray-600 text-center mb-2"><strong>2nd Sunday, 12:00 PM</strong></p>
              <p className="text-gray-700 text-sm">
                Free community lunch serving traditional vegetarian meals to all visitors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsFestivals;