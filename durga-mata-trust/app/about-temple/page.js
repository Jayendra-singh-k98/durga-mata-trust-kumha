import React from 'react';
import { Building2, Clock, Heart, Users, Sparkles, BookOpen } from 'lucide-react';

const AboutTemple = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      
      {/* Page Header */}
      <section className="bg-linear-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Temple</h1>
          <p className="text-xl opacity-90">
            A Sacred Heritage of Faith and Devotion
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* History Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-10 h-10 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-800">Temple History</h2>
          </div>
          <div className="w-24 h-1 bg-orange-600 rounded-full mb-8"></div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Shri [Temple Name] was established in the year [YYYY], marking the beginning of a sacred journey that has continued for over [XX] years. The foundation of this holy temple was laid by [Founder Name/Community], inspired by deep devotion and a vision to create a spiritual center for worship and community service.
            </p>
            
            <p className="text-lg">
              According to the temple's oral history and records, the site was chosen after [brief story of how location was selected - e.g., "devotees experienced divine visions" or "local saints identified this as a spiritually significant location"]. The original structure was a modest shrine, which over the decades has been expanded and renovated through the generous contributions of devoted followers.
            </p>
            
            <p className="text-lg">
              The main sanctum sanctorum houses the sacred idol of [Deity Name], which was [consecrated/installed] on [Date] with traditional Vedic rituals performed by learned priests. The temple architecture reflects [traditional Indian/regional] style, featuring [mention architectural elements like shikhara, mandapa, garbhagriha].
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Significant Milestones</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>[Year]:</strong> Temple foundation and initial construction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>[Year]:</strong> Pran Pratishtha ceremony and idol consecration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>[Year]:</strong> Major renovation and expansion of temple complex</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>[Year]:</strong> Formation of registered temple trust</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span><strong>[Year]:</strong> Addition of community hall and facilities</span>
                </li>
              </ul>
            </div>

            <p className="text-lg">
              Throughout its history, the temple has remained a steadfast beacon of spirituality, surviving through changing times while preserving ancient traditions. Today, it stands as a testament to the enduring faith of countless devotees who have contributed to its growth and maintenance.
            </p>
          </div>
        </section>

        {/* Importance for Devotees */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-10 h-10 text-red-600" />
            <h2 className="text-4xl font-bold text-gray-800">Importance for Devotees</h2>
          </div>
          <div className="w-24 h-1 bg-red-600 rounded-full mb-8"></div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              For devotees, Shri [Temple Name] is more than a place of worship; it is a spiritual home where one can find peace, solace, and divine connection. The temple serves as a sacred sanctuary where devotees come to seek blessings, offer prayers, and strengthen their faith in [Deity Name].
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  Spiritual Fulfillment
                </h3>
                <p className="text-gray-700">
                  Devotees experience inner peace and spiritual growth through daily darshan, participation in aartis, and meditation within the temple premises. The divine atmosphere helps calm the mind and uplift the soul.
                </p>
              </div>

              <div className="bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  Divine Blessings
                </h3>
                <p className="text-gray-700">
                  Many devotees have shared experiences of receiving divine grace and solutions to their problems after sincere prayers at this temple. The sacred energy of the place is believed to fulfill genuine wishes.
                </p>
              </div>

              <div className="bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Community Gathering
                </h3>
                <p className="text-gray-700">
                  The temple provides a space where devotees from diverse backgrounds unite in faith. Festival celebrations and religious ceremonies foster a sense of belonging and shared spiritual purpose.
                </p>
              </div>

              <div className="bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Religious Learning
                </h3>
                <p className="text-gray-700">
                  Through satsangs, pravachans, and religious discourses, devotees gain deeper understanding of scriptures, dharma, and spiritual practices that guide them in righteous living.
                </p>
              </div>
            </div>

            <p className="text-lg">
              Regular visitors often describe feeling a profound sense of tranquility and positive energy within the temple. Many make it a daily practice to visit for morning or evening aarti, finding that this routine brings stability and purpose to their lives. The temple has become an integral part of devotees' spiritual journey, offering guidance, comfort, and divine presence during both joyous occasions and challenging times.
            </p>
          </div>
        </section>

        {/* Spiritual Significance */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-yellow-600" />
            <h2 className="text-4xl font-bold text-gray-800">Spiritual Significance</h2>
          </div>
          <div className="w-24 h-1 bg-yellow-600 rounded-full mb-8"></div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              [Deity Name] is revered in Hindu tradition as [brief description of deity's role - e.g., "the embodiment of divine feminine power and the destroyer of evil forces"]. Worshipping [Deity Name] is believed to bestow [mention blessings - e.g., "courage, protection, prosperity, and spiritual enlightenment"] upon devotees.
            </p>

            <div className="bg-linear-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border-2 border-yellow-200 my-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Sacred Beliefs and Teachings
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-lg text-orange-600 mb-2">Divine Protection</h4>
                  <p className="text-gray-700">
                    [Deity Name] is worshipped as the supreme protector who shields devotees from negative energies, obstacles, and adversities. Devotees believe that sincere prayers invoke divine intervention in times of difficulty.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-lg text-orange-600 mb-2">Spiritual Liberation</h4>
                  <p className="text-gray-700">
                    The temple serves as a gateway to moksha (liberation). Through devotion, righteous conduct, and selfless service at the temple, devotees progress on their spiritual path toward ultimate enlightenment.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-lg text-orange-600 mb-2">Inner Transformation</h4>
                  <p className="text-gray-700">
                    Worship of [Deity Name] is believed to purify the mind and heart, removing ignorance and ego. Regular temple visits and participation in rituals help devotees cultivate virtues such as compassion, humility, and devotion.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-lg text-orange-600 mb-2">Fulfillment of Desires</h4>
                  <p className="text-gray-700">
                    With pure intention and faith, devotees approach [Deity Name] for blessings related to health, prosperity, education, marriage, and success. The deity is known to be compassionate and responsive to genuine prayers.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg">
              According to Hindu scriptures and tradition, [mention any specific scripture reference if applicable - e.g., "the Devi Mahatmya describes"], [Deity Name] represents [theological significance]. Devotees chant mantras such as [mention popular mantra if applicable] to invoke blessings and protection.
            </p>

            <p className="text-lg">
              The temple follows traditional rituals and ceremonies as prescribed in the Agamas and Vedic texts. Daily poojas, abhishekams, and offerings are conducted with devotion and adherence to sacred procedures, ensuring that the spiritual sanctity of the temple is maintained. These practices are not merely rituals but are considered powerful spiritual exercises that connect the devotee with the divine.
            </p>
          </div>
        </section>

        {/* Cultural and Religious Role */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">Cultural and Religious Role</h2>
          </div>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-8"></div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Shri [Temple Name] plays a vital role in preserving and promoting Hindu cultural traditions and religious practices within the community. The temple serves as a center for cultural education, religious guidance, and social harmony.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-blue-200">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Cultural Programs</h3>
                <p className="text-gray-700">
                  Regular bhajan sandhyas, classical music concerts, and cultural performances keep traditional arts alive.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl text-center border-2 border-green-200">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Religious Education</h3>
                <p className="text-gray-700">
                  Sunday schools, scripture classes, and spiritual discourses educate younger generations about dharma and values.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl text-center border-2 border-orange-200">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Festival Celebrations</h3>
                <p className="text-gray-700">
                  Grand celebrations of Navratri, Diwali, Holi, and other festivals bring the community together in devotion.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Community Services</h3>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl font-bold mt-1">•</span>
                <span><strong>Free Prasad Distribution:</strong> Regular distribution of sanctified food to devotees and the needy, ensuring no one leaves the temple hungry.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl font-bold mt-1">•</span>
                <span><strong>Religious Ceremonies:</strong> The temple conducts weddings, naming ceremonies, thread ceremonies, and other sanskaras according to Vedic traditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl font-bold mt-1">•</span>
                <span><strong>Spiritual Counseling:</strong> Priests and spiritual guides provide counsel on religious matters, personal problems, and life guidance based on scriptural wisdom.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl font-bold mt-1">•</span>
                <span><strong>Charitable Activities:</strong> The temple trust organizes medical camps, educational support, and assistance to underprivileged sections of society.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl font-bold mt-1">•</span>
                <span><strong>Youth Engagement:</strong> Special programs for youth encourage them to connect with their spiritual roots while pursuing modern education.</span>
              </li>
            </ul>

            <p className="text-lg mt-6">
              The temple has become a unifying force in the community, transcending social and economic boundaries. During festivals and special occasions, thousands of devotees gather, creating an atmosphere of collective devotion and celebration. The temple also maintains harmony with other religious institutions in the area, promoting the values of peace, tolerance, and mutual respect.
            </p>

            <p className="text-lg">
              Through its various activities and services, the temple continues its mission of spiritual upliftment, cultural preservation, and community welfare. It remains committed to serving as a living repository of Hindu traditions while adapting to the needs of contemporary devotees.
            </p>
          </div>
        </section>

        {/* Closing Message */}
        <section className="bg-linear-to-r from-orange-100 to-red-100 rounded-2xl p-8 text-center border-2 border-orange-300">
          <p className="text-2xl text-gray-800 italic font-light mb-4">
            "मंदिर केवल पत्थर की इमारत नहीं, बल्कि आस्था का केंद्र है"
          </p>
          <p className="text-xl text-gray-700">
            "A temple is not just a stone structure, but a center of faith"
          </p>
          <div className="mt-6">
            <p className="text-lg text-gray-700">
              We welcome all devotees to experience the divine presence and spiritual serenity of our sacred temple.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTemple;