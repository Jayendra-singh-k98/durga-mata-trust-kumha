"use client";
import React from 'react';
import { Users, Award, Shield, BookOpen, Heart, User } from 'lucide-react';

const TrustMembers = () => {
  const trustees = [
    {
      name: 'Dr. Swaroop Singh',
      nameHindi: 'डॉ. स्वरूप सिंह',
      role: 'Chairman & Life Trustee',
      roleHindi: 'अध्यक्ष / मुख्य ट्रस्टी (आजीवन)',
      description: 'Founder and Life Chairman of Maa Durga Charitable Trust Kumha. Provides overall leadership and ensures all religious, charitable and social activities are conducted in accordance with the trust deed. His position is permanent, irrevocable and honorary.',
      photo: '/trustees/swaroop-singh.jpg',
      icon: Award,
      color: 'blue'
    },
    {
      name: 'Shri Satyendra Singh',
      nameHindi: 'श्री सत्येन्द्र सिंह',
      role: 'Vice President',
      roleHindi: 'उपाध्यक्ष',
      description: 'Supports the Chairman in trust administration and assists in planning and execution of religious and charitable activities of the trust.',
      photo: '/trustees/satyendra-singh.jpg',
      icon: Shield,
      color: 'indigo'
    },
    {
      name: 'Shri Parmendra Singh',
      nameHindi: 'श्री परमेन्द्र सिंह',
      role: 'Secretary',
      roleHindi: 'सचिव',
      description: 'Handles trust records, correspondence, statutory documentation and coordinates meetings and administrative functions of the trust.',
      photo: '/trustees/parmendra-singh.jpg',
      icon: BookOpen,
      color: 'green'
    },
    {
      name: 'Shri Narendra Singh',
      nameHindi: 'श्री नरेन्द्र सिंह',
      role: 'Treasurer',
      roleHindi: 'कोषाध्यक्ष',
      description: 'Responsible for managing financial affairs of the trust, maintaining accounts and ensuring transparent utilization of funds for trust objectives.',
      photo: '/trustees/narendra-singh.jpg',
      icon: Award,
      color: 'orange'
    },
    {
      name: 'Shri Arvendra Singh',
      nameHindi: 'श्री अरवेन्द्र सिंह',
      role: 'Member',
      roleHindi: 'सदस्य',
      description: 'Actively participates in trust governance and contributes to decision-making and implementation of trust objectives.',
      photo: '/trustees/arvendra-singh.jpg',
      icon: Users,
      color: 'purple'
    },
    {
      name: 'Shri Jeetendra Singh',
      nameHindi: 'श्री जीतेन्द्र सिंह',
      role: 'Member',
      roleHindi: 'सदस्य',
      description: 'Engages in planning and supervision of trust activities ensuring alignment with the trust\'s religious and social objectives.',
      photo: '/trustees/jeetendra-singh.jpg',
      icon: Heart,
      color: 'red'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 border-blue-600',
      indigo: 'from-indigo-500 to-indigo-600 border-indigo-600',
      green: 'from-green-500 to-green-600 border-green-600',
      orange: 'from-orange-500 to-orange-600 border-orange-600',
      red: 'from-red-500 to-red-600 border-red-600',
      purple: 'from-purple-500 to-purple-600 border-purple-600',
      teal: 'from-teal-500 to-teal-600 border-teal-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white">

      {/* Page Header */}
      <section className="bg-linear-to-r from-indigo-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Trust Members</h1>
          <p className="text-xl opacity-90">
            Dedicated Individuals Serving with Devotion and Integrity
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Maa Durga Charitable Trust Kumha is registered under the Rajasthan Public Trusts Act 1959
            (Reg. No. 310, Jaipur, 2025). The trust is governed by a Board of 6 trustees appointed
            as per the registered trust deed dated 26th March 2025.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            All trustees serve voluntarily without any salary or remuneration. Dr. Swaroop Singh
            is the Life Chairman and his position is permanent and irrevocable as per the trust deed.
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-lg">
            <p className="text-gray-800 text-sm">
              <strong>Note:</strong> The number of trustees may be increased by the founder Chief Trustee
              by passing a resolution. In case of any dispute regarding trust formation, the decision
              of the Chief Trustee shall be final.
            </p>
          </div>
        </section>


        {/* Trust Members Grid */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Board of Trustees
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustees.map((trustee, index) => {
              const IconComponent = trustee.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4"
                  style={{ borderTopColor: `var(--${trustee.color}-600)` }}
                >
                  <div className={`bg-linear-to-br ${getColorClasses(trustee.color)} h-52 flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={trustee.photo}
                      alt={trustee.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="absolute inset-0 items-center justify-center hidden"
                      style={{ display: 'none' }}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                        <User className="w-20 h-20 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`w-5 h-5 text-${trustee.color}-600`} />
                      <span className={`text-sm font-semibold text-${trustee.color}-600 uppercase tracking-wide`}>
                        {trustee.role}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {trustee.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{trustee.nameHindi}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {trustee.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default TrustMembers;