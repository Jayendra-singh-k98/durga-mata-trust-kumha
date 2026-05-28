"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Building2, User } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-purple-50">
      
      {/* Page Header */}
      <section className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            We're Here to Serve You
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Welcome Message */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Dear Devotees!</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We are delighted to hear from you! Whether you have questions about temple timings, wish to book 
              special poojas, need information about our charitable activities, or simply want to share your 
              thoughts, we are here to assist you.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our dedicated team is committed to responding to your queries promptly and helping you in any way 
              we can. Feel free to reach out to us through any of the methods below, or simply visit us at the 
              temple. Your presence and communication are always welcome.
            </p>
            <p className="text-orange-600 font-semibold text-xl mt-6 italic">
              "हमारे दरवाजे सदा आपके लिए खुले हैं"
            </p>
            <p className="text-gray-600 mt-2">
              "Our doors are always open for you"
            </p>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Address Card */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Temple Address</h3>
            <div className="text-gray-700 text-center space-y-1">
              <p className="font-semibold">[Temple Name]</p>
              <p>[Street Address]</p>
              <p>[Area/Locality]</p>
              <p>[City] - [PIN Code]</p>
              <p>[State], India</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Phone Numbers</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Main Office</p>
                <p className="font-bold text-green-700">+91 [XXXXX XXXXX]</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Trust Secretary</p>
                <p className="font-bold text-green-700">+91 [XXXXX XXXXX]</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Pooja Booking</p>
                <p className="font-bold text-green-700">+91 [XXXXX XXXXX]</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Email Address</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">General Inquiries</p>
                <p className="font-semibold text-purple-700 text-sm break-all">info@[templename].org</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Donations</p>
                <p className="font-semibold text-purple-700 text-sm break-all">donations@[templename].org</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Events</p>
                <p className="font-semibold text-purple-700 text-sm break-all">events@[templename].org</p>
              </div>
            </div>
          </div>

          {/* Visiting Hours Card */}
          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Visiting Hours</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1 text-center">Temple Darshan</p>
                <p className="font-bold text-orange-700 text-center">5:30 AM - 9:00 PM</p>
                <p className="text-xs text-gray-600 text-center mt-1">Daily</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1 text-center">Office Hours</p>
                <p className="font-bold text-orange-700 text-center">9:00 AM - 6:00 PM</p>
                <p className="text-xs text-gray-600 text-center mt-1">Mon - Sat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map and Contact Form Section */}
        <section className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Google Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Find Us on Map
              </h3>
            </div>
            <div className="relative">
              {/* Map Placeholder */}
              <div className="bg-linear-to-br from-gray-200 to-gray-300 h-96 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold mb-2">Google Maps Integration</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Replace this placeholder with actual Google Maps embed
                  </p>
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <p className="text-xs text-gray-500 mb-2">Embed Code:</p>
                    <code className="text-xs bg-gray-100 p-2 rounded block">
                      {`<iframe src="https://maps.google.com/..."></iframe>`}
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Get Directions Button */}
              <div className="absolute bottom-4 left-4 right-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </button>
              </div>
            </div>
            
            {/* Landmarks */}
            <div className="p-6 bg-blue-50">
              <h4 className="font-bold text-gray-800 mb-3">Nearby Landmarks:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Near [Landmark 1] - 500 meters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Opposite [Landmark 2]</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>5 minutes walk from [Metro/Bus Station]</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-linear-to-r from-orange-600 to-red-600 text-white p-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Send className="w-6 h-6" />
                Send Us a Message
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="pooja">Pooja Booking</option>
                  <option value="donation">Donation Related</option>
                  <option value="event">Event Information</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="feedback">Feedback/Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              <p className="text-center text-gray-500 text-sm">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Quick Contact Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Speak directly with our team for immediate assistance
              </p>
              <a href="tel:+91XXXXXXXXXX" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Click to Call
              </a>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Message us on WhatsApp for quick responses
              </p>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Open WhatsApp
              </a>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">✉️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Send detailed inquiries via email
              </p>
              <a href="mailto:info@templename.org" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Send Email
              </a>
            </div>
          </div>
        </section>

        {/* Office Information */}
        <section className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-indigo-200">
          <div className="flex items-start gap-4">
            <Building2 className="w-12 h-12 text-indigo-600 shrink-0 mt-1" />
            <div className="grow">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Temple Office Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Services Available</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Special Pooja Bookings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Donation Receipts and Certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Event Registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Trust Document Inquiries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>General Information</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Best Time to Visit</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>For Darshan:</strong> Early morning (6:00 AM - 8:00 AM) or evening aarti (7:00 PM) for peaceful experience
                    </p>
                    <p>
                      <strong>For Office Work:</strong> Weekday mornings (10:00 AM - 12:00 PM) when staff is readily available
                    </p>
                    <p>
                      <strong>Avoid:</strong> Festival days and weekends are usually crowded. Contact ahead for appointments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Message */}
        <section className="bg-linear-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">We Look Forward to Hearing from You!</h2>
          <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
            Whether you're seeking spiritual guidance, planning a visit, or simply want to connect with our 
            community, we are here for you. Your questions, suggestions, and participation are always valued.
          </p>
          <div className="text-2xl font-light italic mb-2">
            "आपकी सेवा में हम सदा तत्पर हैं"
          </div>
          <div className="text-lg opacity-90">
            "We are always ready to serve you"
          </div>
          <div className="mt-8">
            <p className="text-lg">
              May [Deity Name] bless you with peace and prosperity
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;