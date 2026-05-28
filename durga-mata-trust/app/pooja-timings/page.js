import React from 'react';
import { Clock, Sun, Sunset, Calendar, Bell, Star, AlertCircle } from 'lucide-react';

const PoojaTimings = () => {
  const dailySchedule = [
    { time: '5:30 AM', pooja: 'Temple Opening', description: 'Doors open for devotees' },
    { time: '6:00 AM', pooja: 'Mangla Aarti', description: 'Morning awakening aarti with bhajans', highlight: true },
    { time: '6:30 AM', pooja: 'Abhishek', description: 'Sacred bath ritual with milk, honey, and water' },
    { time: '7:00 AM', pooja: 'Shringar Pooja', description: 'Deity decoration and adornment' },
    { time: '8:00 AM', pooja: 'Bhog Aarti', description: 'Morning prasad offering' },
    { time: '12:00 PM', pooja: 'Madhyanha Aarti', description: 'Afternoon aarti and bhog', highlight: true },
    { time: '5:00 PM', pooja: 'Sandhya Aarti', description: 'Evening prayers and lamp lighting' },
    { time: '7:00 PM', pooja: 'Shayan Aarti', description: 'Night aarti with bhajans and kirtans', highlight: true },
    { time: '9:00 PM', pooja: 'Temple Closing', description: 'Temple closes for the day' }
  ];

  const specialPoojas = [
    {
      occasion: 'Navratri (9 Days)',
      timing: '6:00 AM - 9:00 PM',
      description: 'Special Durga Pooja, Kanya Pooja, Havan ceremonies throughout the day'
    },
    {
      occasion: 'Diwali',
      timing: '5:00 AM - 11:00 PM',
      description: 'Extended hours with Lakshmi Pooja, special aartis, and prasad distribution'
    },
    {
      occasion: 'Mahashivratri',
      timing: '24 Hours Open',
      description: 'Night-long celebrations with abhishek every hour and bhajan sandhya'
    },
    {
      occasion: 'Janmashtami',
      timing: '5:00 AM - 12:30 AM',
      description: 'Midnight celebrations, jhula ceremony, and prasad distribution'
    },
    {
      occasion: 'Ram Navami',
      timing: '6:00 AM - 10:00 PM',
      description: 'Special Ram bhajans, path, and community feast'
    },
    {
      occasion: 'Holi',
      timing: '6:00 AM - 8:00 PM',
      description: 'Morning pooja followed by Holika Dahan in evening'
    }
  ];

  const weeklySpecial = [
    { day: 'Monday', special: 'Special Abhishek for Lord Shiva devotees' },
    { day: 'Tuesday', special: 'Hanuman Chalisa recitation and special offerings' },
    { day: 'Wednesday', special: 'Ganesh Pooja and modak prasad distribution' },
    { day: 'Thursday', special: 'Guru Pooja and spiritual discourse' },
    { day: 'Friday', special: 'Santoshi Mata Vrat Katha and prasad' },
    { day: 'Saturday', special: 'Shani Dev special pooja' },
    { day: 'Sunday', special: 'Community satsang and bhajan sandhya at 5:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-yellow-50">
      
      {/* Page Header */}
      <section className="bg-linear-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Clock className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Pooja & Aarti Timings</h1>
          <p className="text-xl opacity-90">
            Daily Schedule for Divine Worship and Darshan
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At [Temple Name], we follow traditional Vedic rituals and conduct regular poojas throughout the day 
            to honor [Deity Name]. All devotees are welcome to attend the aartis and seek divine blessings.
          </p>
          <p className="text-orange-600 font-semibold text-lg">
            "नियमित पूजा से मिलती है भगवान की कृपा"
          </p>
          <p className="text-gray-600 italic">
            "Regular worship brings divine grace"
          </p>
        </section>

        {/* Daily Pooja Schedule */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-10 h-10 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-800">Daily Pooja Schedule</h2>
          </div>
          <div className="w-24 h-1 bg-orange-600 rounded-full mb-8"></div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-orange-500 to-red-500 text-white">
                  <th className="px-6 py-4 text-left text-lg font-semibold">Time</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Pooja / Aarti</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {dailySchedule.map((item, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 ${
                      item.highlight 
                        ? 'bg-orange-50 font-semibold' 
                        : index % 2 === 0 
                          ? 'bg-white' 
                          : 'bg-gray-50'
                    } hover:bg-orange-100 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${item.highlight ? 'text-orange-600' : 'text-gray-500'}`} />
                        <span className={`text-lg ${item.highlight ? 'text-orange-700 font-bold' : 'text-gray-800'}`}>
                          {item.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg ${item.highlight ? 'text-orange-700' : 'text-gray-800'}`}>
                        {item.pooja}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <p className="text-gray-700 flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-600 mt-1 shrink-0" />
              <span><strong>Main Aarti Times:</strong> Devotees are especially encouraged to attend the three main aartis 
              - Mangla Aarti (6:00 AM), Madhyanha Aarti (12:00 PM), and Shayan Aarti (7:00 PM) for complete darshan and blessings.</span>
            </p>
          </div>
        </section>

        {/* Morning and Evening Aarti Highlights */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Morning Aarti */}
          <div className="bg-linear-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-xl p-8 border-t-4 border-orange-500">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-12 h-12 text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-800">Morning Aarti</h3>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4">
              <p className="text-2xl font-bold text-orange-600 mb-2">6:00 AM</p>
              <p className="text-lg text-gray-700 font-semibold mb-3">Mangla Aarti</p>
              <p className="text-gray-600 mb-4">
                Begin your day with divine blessings. The morning aarti awakens the deity with sacred bells, 
                incense, and devotional songs. This is followed by abhishek and shringar pooja.
              </p>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-700"><strong>Duration:</strong> 30 minutes</p>
                <p className="text-sm text-gray-700"><strong>Special Offering:</strong> Fresh flowers and milk abhishek</p>
                <p className="text-sm text-gray-700"><strong>Prasad:</strong> Distributed after 8:00 AM bhog aarti</p>
              </div>
            </div>
          </div>

          {/* Evening Aarti */}
          <div className="bg-linear-to-br from-red-100 to-pink-100 rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <Sunset className="w-12 h-12 text-red-600" />
              <h3 className="text-3xl font-bold text-gray-800">Evening Aarti</h3>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4">
              <p className="text-2xl font-bold text-red-600 mb-2">7:00 PM</p>
              <p className="text-lg text-gray-700 font-semibold mb-3">Shayan Aarti</p>
              <p className="text-gray-600 mb-4">
                Experience the divine atmosphere as the temple glows with lamps and resonates with bhajans. 
                The evening aarti is a beautiful culmination of the day's worship before the deity retires for the night.
              </p>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-700"><strong>Duration:</strong> 45 minutes</p>
                <p className="text-sm text-gray-700"><strong>Special Offering:</strong> 108 lamps and camphor aarti</p>
                <p className="text-sm text-gray-700"><strong>Prasad:</strong> Distributed immediately after aarti</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Special Poojas */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-10 h-10 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-800">Weekly Special Poojas</h2>
          </div>
          <div className="w-24 h-1 bg-purple-600 rounded-full mb-8"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklySpecial.map((item, index) => (
              <div 
                key={index}
                className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-bold text-purple-700 mb-2">{item.day}</h4>
                <p className="text-gray-700">{item.special}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <p className="text-gray-700">
              <strong>Note:</strong> All weekly special poojas are conducted during regular aarti times. 
              Devotees wishing to participate in specific vrat kathas or special ceremonies should arrive 15 minutes early.
            </p>
          </div>
        </section>

        {/* Special Festival Timings */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-10 h-10 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-800">Festival & Special Day Timings</h2>
          </div>
          <div className="w-24 h-1 bg-green-600 rounded-full mb-8"></div>
          
          <div className="space-y-6">
            {specialPoojas.map((festival, index) => (
              <div 
                key={index}
                className="bg-linear-to-r from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="grow">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">{festival.occasion}</h4>
                    <p className="text-gray-600">{festival.description}</p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-lg border-2 border-green-500 text-center md:min-w-48">
                    <p className="text-sm text-gray-600 mb-1">Temple Timings</p>
                    <p className="text-lg font-bold text-green-700">{festival.timing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Auspicious Days</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Ekadashi:</strong> Extended morning aarti and special prasad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Purnima:</strong> Evening bhajan sandhya at 6:00 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Amavasya:</strong> Special prayers and diya offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Sankranti:</strong> Early morning pooja at 5:00 AM</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Personal Ceremonies</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Mundan Ceremony:</strong> By appointment, morning hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Janeu Sanskar:</strong> By appointment, 9:00 AM onwards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Naming Ceremony:</strong> By appointment, morning preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Special Havan:</strong> Contact temple office for booking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-linear-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-red-200">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="w-10 h-10 text-red-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Important Information</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-red-700 mb-2">Timing Changes During Festivals</h3>
                  <p className="mb-2">
                    Please note that temple timings are subject to change during major festivals and special occasions. 
                    Extended hours and additional poojas may be scheduled to accommodate increased devotee participation.
                  </p>
                  <p>
                    We recommend checking our website, social media, or calling the temple office one day before 
                    major festivals to confirm exact timings and any special arrangements.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-orange-700 mb-2">Devotee Guidelines</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Please arrive 10-15 minutes before aarti times for better darshan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Maintain silence during poojas and aartis to preserve sanctity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Photography is not permitted during aarti ceremonies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Mobile phones should be on silent mode inside the temple premises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Outside food and footwear are not allowed inside the main temple hall</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-700 mb-2">For Special Bookings</h3>
                  <p className="mb-2">
                    To book special poojas, abhishek, or personal ceremonies, please contact the temple office:
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-green-700">+91 [Phone Number]</p>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-green-700">pooja@[templename].org</p>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Office Hours</p>
                      <p className="font-semibold text-green-700">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Blessing */}
        <section className="bg-linear-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center text-white mt-12">
          <p className="text-2xl font-light italic mb-2">
            "भगवान की आरती से मिलती है शांति और आनंद"
          </p>
          <p className="text-xl opacity-90">
            "Peace and joy come from worshipping the divine"
          </p>
          <div className="mt-6">
            <p className="text-lg">
              May [Deity Name] bless all devotees with health, prosperity, and spiritual fulfillment
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PoojaTimings;