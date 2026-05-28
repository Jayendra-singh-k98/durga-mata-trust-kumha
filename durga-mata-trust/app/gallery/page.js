"use client";
import React, { useState } from 'react';
import { Image, Video, Camera, Building2, Sparkles, Users, Sun, Info } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Media', icon: Image, color: 'purple' },
    { id: 'architecture', name: 'Temple Architecture', icon: Building2, color: 'blue' },
    { id: 'festivals', name: 'Festivals', icon: Sparkles, color: 'orange' },
    { id: 'aarti', name: 'Daily Aarti', icon: Sun, color: 'yellow' },
    { id: 'community', name: 'Community Activities', icon: Users, color: 'green' }
  ];

  const galleryItems = [
    // Temple Architecture
    { category: 'architecture', type: 'image', title: 'Main Temple Entrance', description: 'Grand entrance with traditional architecture' },
    { category: 'architecture', type: 'image', title: 'Sanctum Sanctorum', description: 'Sacred altar and deity chamber' },
    { category: 'architecture', type: 'image', title: 'Temple Shikhara', description: 'Magnificent temple spire reaching skyward' },
    { category: 'architecture', type: 'video', title: 'Temple Walk-through', description: 'Virtual tour of temple premises' },
    { category: 'architecture', type: 'image', title: 'Prayer Hall', description: 'Spacious hall for devotees' },
    { category: 'architecture', type: 'image', title: 'Temple at Night', description: 'Illuminated beauty in evening lights' },
    
    // Festivals
    { category: 'festivals', type: 'image', title: 'Navratri Celebration', description: 'Nine nights of divine festivities' },
    { category: 'festivals', type: 'image', title: 'Diwali Decorations', description: 'Temple adorned with thousands of diyas' },
    { category: 'festivals', type: 'video', title: 'Ganesh Visarjan', description: 'Grand immersion procession' },
    { category: 'festivals', type: 'image', title: 'Holi Celebrations', description: 'Colors of joy and devotion' },
    { category: 'festivals', type: 'image', title: 'Janmashtami', description: 'Krishna birth celebration midnight ceremony' },
    { category: 'festivals', type: 'image', title: 'Ram Navami', description: 'Lord Rama birth celebrations' },
    
    // Daily Aarti
    { category: 'aarti', type: 'image', title: 'Morning Aarti', description: 'Peaceful dawn prayers and worship' },
    { category: 'aarti', type: 'video', title: 'Evening Aarti', description: 'Divine lamp ceremony with bhajans' },
    { category: 'aarti', type: 'image', title: 'Abhishek Ceremony', description: 'Sacred bathing ritual of deity' },
    { category: 'aarti', type: 'image', title: 'Bhog Offering', description: 'Traditional prasad preparation and offering' },
    { category: 'aarti', type: 'image', title: 'Devotees in Prayer', description: 'Spiritual moments of connection' },
    { category: 'aarti', type: 'image', title: 'Temple Bells', description: 'Sacred sounds of devotion' },
    
    // Community Activities
    { category: 'community', type: 'image', title: 'Annadaan Service', description: 'Free food distribution to community' },
    { category: 'community', type: 'image', title: 'Bhajan Sandhya', description: 'Community devotional singing' },
    { category: 'community', type: 'video', title: 'Children\'s Cultural Program', description: 'Young devotees performing' },
    { category: 'community', type: 'image', title: 'Blood Donation Camp', description: 'Serving humanity through health initiatives' },
    { category: 'community', type: 'image', title: 'Yoga Session', description: 'Community wellness program' },
    { category: 'community', type: 'image', title: 'Educational Workshop', description: 'Teaching Hindu values and scriptures' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'gray';
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-500 hover:bg-purple-600',
      blue: 'bg-blue-500 hover:bg-blue-600',
      orange: 'bg-orange-500 hover:bg-orange-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      green: 'bg-green-500 hover:bg-green-600'
    };
    return colors[color] || colors.purple;
  };

  const getBorderColor = (color) => {
    const colors = {
      purple: 'border-purple-500',
      blue: 'border-blue-500',
      orange: 'border-orange-500',
      yellow: 'border-yellow-500',
      green: 'border-green-500'
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-pink-50">
      
      {/* Page Header */}
      <section className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Camera className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Temple Gallery</h1>
          <p className="text-xl opacity-90">
            Moments of Divine Grace and Community Spirit
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
            Welcome to our sacred gallery, where we preserve and share the beautiful moments of devotion, 
            celebration, and community service at [Temple Name]. Each photograph and video captures the divine 
            energy, architectural splendor, and spiritual warmth that fills our temple throughout the year. 
            These images are windows into our living tradition, showcasing both the grandeur of festivals and 
            the serenity of daily worship.
          </p>
          <p className="text-orange-600 font-semibold text-xl italic">
            "हर तस्वीर में छुपी है भक्ति की कहानी"
          </p>
          <p className="text-gray-600 mt-2">
            "Every picture holds a story of devotion"
          </p>
        </section>

        {/* Category Filter Buttons */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg ${
                    activeCategory === category.id
                      ? `${getColorClasses(category.color)} text-white transform scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const categoryColor = getCategoryColor(item.category);
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-t-4 ${getBorderColor(categoryColor)} group cursor-pointer`}
                >
                  {/* Image/Video Placeholder */}
                  <div className="relative bg-linear-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center overflow-hidden">
                    {item.type === 'image' ? (
                      <div className="text-center">
                        <Image className="w-20 h-20 text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-gray-500 text-sm font-semibold">Image Placeholder</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Video className="w-20 h-20 text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-gray-500 text-sm font-semibold">Video Placeholder</p>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className={`absolute top-3 right-3 ${getColorClasses(categoryColor)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                      {item.type === 'video' && <Video className="w-3 h-3" />}
                      {item.type === 'image' && <Camera className="w-3 h-3" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Descriptions */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
            <Building2 className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Temple Architecture</h3>
            <p className="text-gray-700 text-sm">
              Explore the magnificent architecture, intricate carvings, and sacred spaces that make our temple 
              a masterpiece of traditional design and spiritual significance.
            </p>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
            <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Festivals</h3>
            <p className="text-gray-700 text-sm">
              Witness the vibrant celebrations of Hindu festivals, from colorful decorations to joyous 
              gatherings, capturing the essence of devotion and community celebration.
            </p>
          </div>

          <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
            <Sun className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Aarti</h3>
            <p className="text-gray-700 text-sm">
              Experience the serenity of daily worship rituals, morning prayers, and evening aartis that 
              fill the temple with divine energy and peaceful devotion.
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
            <Users className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community Activities</h3>
            <p className="text-gray-700 text-sm">
              See how our temple serves the community through charitable activities, educational programs, 
              and social initiatives that embody the spirit of seva.
            </p>
          </div>
        </section>

        {/* Video Gallery Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-10 h-10 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-800">Video Gallery</h2>
          </div>
          <div className="w-24 h-1 bg-purple-600 rounded-full mb-8"></div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">Temple Virtual Tour</p>
                <p className="text-gray-500 text-sm">Complete walkthrough of temple premises</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">Evening Aarti Live</p>
                <p className="text-gray-500 text-sm">Experience the divine atmosphere</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">Festival Highlights</p>
                <p className="text-gray-500 text-sm">Best moments from celebrations</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">Devotional Bhajans</p>
                <p className="text-gray-500 text-sm">Spiritual music and kirtan sessions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Respect and Guidelines Notice */}
        <section className="bg-linear-to-r from-orange-100 via-red-100 to-pink-100 rounded-2xl shadow-xl p-8 md:p-12 border-2 border-orange-300">
          <div className="flex items-start gap-4">
            <Info className="w-12 h-12 text-orange-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Respecting Temple Sanctity</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Dear devotees, we kindly request your cooperation in maintaining the sacred atmosphere of our temple. 
                  While we welcome you to capture beautiful memories, please be mindful of the following guidelines:
                </p>

                <div className="bg-white rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>During Aarti and Poojas:</strong> Photography and videography are not permitted during 
                    active worship ceremonies to preserve the spiritual sanctity and allow devotees to focus on prayers.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Sanctum Sanctorum:</strong> Please refrain from taking photos inside the main deity chamber. 
                    This sacred space should be experienced with reverence and without distractions.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Flash Photography:</strong> Never use flash photography as it disturbs other devotees 
                    and can be disrespectful to the divine presence.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Appropriate Attire:</strong> When visiting for photography, please ensure modest and 
                    traditional attire that reflects respect for the sacred space.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Permission for Events:</strong> For professional photography or videography during 
                    festivals or personal ceremonies, please seek prior permission from the temple office.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Social Media Sharing:</strong> When sharing temple images on social media, please use 
                    respectful captions and avoid any content that might be seen as disrespectful to Hindu traditions.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                    <p><strong>Silence and Serenity:</strong> Maintain silence while taking photographs and be mindful 
                    not to obstruct other devotees' darshan or prayers.</p>
                  </div>
                </div>

                <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-lg p-6 mt-6 border-l-4 border-orange-500">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    "मंदिर केवल फोटो खींचने की जगह नहीं, यह पूजा और प्रार्थना का पवित्र स्थान है"
                  </p>
                  <p className="text-gray-700 italic">
                    "The temple is not merely a place for taking photos, it is a sacred space for worship and prayer"
                  </p>
                </div>

                <p className="text-lg mt-6">
                  We thank you for your understanding and cooperation in helping us preserve the spiritual sanctity 
                  of this holy place. Your respectful conduct ensures that all devotees can experience peace and 
                  divine connection during their temple visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Your Moments */}
        <section className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center mt-12">
          <Camera className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Share Your Sacred Moments</h2>
          <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
            If you have captured beautiful moments at our temple and would like to share them for our gallery, 
            we would be honored to feature them. Please send your photos and videos following our guidelines.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-sm opacity-90">Email Your Photos</p>
              <p className="font-bold text-lg">gallery@[templename].org</p>
            </div>
            <div className="bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-sm opacity-90">WhatsApp</p>
              <p className="font-bold text-lg">+91 [Phone Number]</p>
            </div>
          </div>

          <p className="text-sm opacity-75">
            Note: By submitting photos, you grant permission for the temple to use them on our website and social media
          </p>
        </section>
      </div>
    </div>
  );
};

export default Gallery;