"use client";
import React, { useEffect, useState } from 'react';
import { Clock, Heart, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const HomePage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);


  useEffect(() => {
    const sheetURL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSOASc9ph6UGLB3jVZGlPC0-jvzddE3kq77uc3d6nRJzRlYrtllZo4vZ8-BLtcMV9KxhfHuTqIsxzFV/pub?output=csv&t=${new Date().getTime()}`;

    Papa.parse(sheetURL, {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const parsedEvents = results.data.map((event) => {
          if (!event.date) return null;

          // Convert DD-MM-YYYY to Date object
          const formattedDate = new Date(
            event.date
          );

          return {
            name: event.name,
            date: event.date,
            description: event.description,
            parsedDate: formattedDate,
          };
        })

          .filter(
            (event) =>
              event &&
              event.parsedDate >= today
          )

          .sort(
            (a, b) =>
              a.parsedDate - b.parsedDate
          );

        setEvents(parsedEvents);

        setUpcomingEvents(
          parsedEvents.slice(0, 2)
        );
      },
    });
  }, []);


  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Temple Upcoming Events", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [["Name", "Date", "Description"]],

      body: events.map((event) => [
        event.name,
        event.date,
        event.description,
      ]),
    });

    doc.save("Temple_Events.pdf");
  };


  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-orange-600 via-red-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            माँ दुर्गा चैरिटेबल ट्रस्ट
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Shri Durga Mata
          </h2>
          <div className="bg-orange-600 bg-opacity-20 backdrop-blur-sm rounded-lg py-6 px-8 inline-block mb-6">
            <p className="text-xl md:text-2xl italic font-light mb-2">
              "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
            </p>
            <p className="text-lg md:text-xl">
              "May All Be Happy, May All Be Free From Illness"
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg">
            <MapPin className="w-5 h-5" />
            <span>Kumha, Jaipur (Rajasthan)</span>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-orange-600 mb-2">
              Welcome to Our Sacred Temple
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Maa Durga Charitable Trust is a registered religious and social organization,
              dedicated to social service, religious activities, and public welfare under
              the divine grace and guidance of Maa Durga. The trust is located in Kumha, Bharatpur, Jaipur
              (Rajasthan) and is duly registered under the Indian Trusts Act.
            </p>

            <p className="text-lg">
              The primary objectives of the trust include conducting religious activities,
              promoting social service, encouraging education, supporting the poor and
              underprivileged, organizing cultural programs, and fostering human values.
              The trust works for the welfare of all sections of society without any
              discrimination.
            </p>

          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-linear-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-orange-600">📢</span>
            Latest Announcements
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-orange-600 text-xl font-bold mt-1">•</span>
              <p className="text-gray-700">
                <strong>Chaitra Navratri 2026:</strong> Nine-day grand festivities starting
                from 19th March. Special Durga Pooja, Kanya Pooja, and cultural programs organized daily.
                All devotees are cordially invited.
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-orange-600 text-xl font-bold mt-1">•</span>
              <p className="text-gray-700">
                <strong>Free Prasad Distribution:</strong> Everyday from 7:00 PM to 8:00 PM.
                Blessed prasad will be distributed to all visiting devotees.
              </p>
            </div>
            {/* <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                <p className="text-gray-700">
                  <strong>Monthly Bhajan Sandhya:</strong> Join us for devotional bhajan and kirtan
                  every full moon night (Purnima) at 8:00 PM.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-orange-600 text-xl font-bold mt-1">•</span>
                <p className="text-gray-700">
                  <strong>Online Donation Portal:</strong> Now accepting donations through UPI,
                  Net Banking, and Cards. Contribute to temple maintenance and charitable activities.
                </p>
              </div> */}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Temple Highlights
        </h3>
        <div className="grid md:grid-cols-3 gap-8">

          {/* Pooja Timings */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border-t-4 border-orange-500">
            <div className="flex justify-center mb-4">
              <Clock className="w-16 h-16 text-orange-600" />
            </div>
            <h4 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Pooja Timings
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Morning Aarti:</span>
                <span>4:00 AM</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Evening Aarti:</span>
                <span>6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Temple Open:</span>
                <span>3:45 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Donations */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-red-600" />
            </div>
            <h4 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Donations
            </h4>
            <p className="text-gray-700 text-center mb-4">
              Your contributions help us maintain the temple, organize festivals, and serve the community through charitable activities.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 text-center mb-2">
                <strong>Quick Donate via UPI:</strong>
              </p>
              <p className="text-center font-mono text-orange-600 font-semibold">
                vyapar.176548150186@hdfcbank
              </p>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Donate Now
            </button>
          </div>

          {/* Events */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border-t-4 border-green-500">
            <div className="flex justify-center mb-4">
              <Calendar className="w-16 h-16 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Upcoming Events
            </h4>
            <div className="space-y-3 text-gray-700">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-green-50 p-3 rounded-lg"
                >
                  <p className="font-semibold text-green-800">
                    {event.name}
                  </p>

                  <p className="text-sm">
                    {event.date}
                  </p>

                </div>
              ))}
            </div>
            <button
              onClick={downloadPDF}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-orange-600 to-red-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Service and Devotion
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Be a part of our spiritual community and experience the divine blessings
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => router.push("/donations")}

              className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
              <Heart className="inline-block w-5 h-5 mr-2" />
              Donate Now
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Durga+Mata+Mandir/@27.153968,77.461795,17z/data=!4m6!3m5!1s0x3973bb766d1272b9:0xa0e9e3d0ef996f6d!8m2!3d27.153968!4d77.4617954!16s%2Fg%2F11q1q6rg7v?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
                  "_blank"
                )
              }
              className="bg-yellow-400 text-gray-800 hover:bg-yellow-300 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
              <MapPin className="inline-block w-5 h-5 mr-2" />
              Visit Temple
            </button>
            <button
              onClick={() => router.push("/events")}
              className="bg-green-500 text-white hover:bg-green-600 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Upcoming Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;