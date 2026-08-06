"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, RefreshCw, ImageOff } from 'lucide-react';
import { getCategory, getActivities } from '@/lib/ourWorkData';

// Category color themes
const THEMES = {
  religious:     { bg: 'from-orange-600 to-red-600',    badge: 'bg-orange-100 text-orange-700',   border: 'border-orange-500', btn: 'bg-orange-600 hover:bg-orange-700' },
  health:        { bg: 'from-red-600 to-pink-600',      badge: 'bg-red-100 text-red-700',         border: 'border-red-500',    btn: 'bg-red-600 hover:bg-red-700' },
  education:     { bg: 'from-blue-600 to-indigo-600',   badge: 'bg-blue-100 text-blue-700',       border: 'border-blue-500',   btn: 'bg-blue-600 hover:bg-blue-700' },
  'social-welfare': { bg: 'from-green-600 to-teal-600', badge: 'bg-green-100 text-green-700',     border: 'border-green-500',  btn: 'bg-green-600 hover:bg-green-700' },
  environment:   { bg: 'from-teal-600 to-emerald-600',  badge: 'bg-teal-100 text-teal-700',       border: 'border-teal-500',   btn: 'bg-teal-600 hover:bg-teal-700' },
};

const DEFAULT_THEME = { bg: 'from-orange-600 to-red-600', badge: 'bg-orange-100 text-orange-700', border: 'border-orange-500', btn: 'bg-orange-600 hover:bg-orange-700' };

export default function CategoryPage({ slug }) {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = THEMES[slug] || DEFAULT_THEME;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [cat, acts] = await Promise.all([
          getCategory(slug),
          getActivities(slug),
        ]);
        if (!cat) { setError('Category not found'); return; }
        setCategory(cat);
        setActivities(acts);
      } catch {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Header */}
      <section className={`bg-linear-to-r ${theme.bg} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{category.name}</h1>
            {category.nameHindi && (
              <p className="text-xl opacity-90 mb-2">{category.nameHindi}</p>
            )}
            <p className="text-sm opacity-75">
              Maa Durga Charitable Trust Kumha · माँ दुर्गा चैरिटेबल ट्रस्ट
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Category Description */}
        <section className={`bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 ${theme.border}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About Our {category.name} Work
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {category.description || `Our trust is actively working in the field of ${category.name.toLowerCase()} for the benefit of the community. We are committed to making a positive impact through dedicated efforts and community participation.`}
          </p>
        </section>

        {/* Activities Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our Activities</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${theme.badge}`}>
              {activities.length} {activities.length === 1 ? 'Activity' : 'Activities'}
            </span>
          </div>

          {/* No activities yet */}
          {activities.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                Activities Coming Soon
              </h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                We are actively working on {category.name.toLowerCase()} initiatives.
                Photos and details of our activities will be updated here shortly.
              </p>
              <div className={`mt-6 inline-block px-6 py-2 rounded-full text-sm font-semibold ${theme.badge}`}>
                Check back soon 🙏
              </div>
            </div>
          )}

          {/* Activity Cards Grid */}
          {activities.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, i) => (
                <ActivityCard
                  key={activity.slug || i}
                  activity={activity}
                  theme={theme}
                  onClick={() => router.push(`/our-work/${slug}/${activity.slug}`)}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

/* ── Activity Card ── */
function ActivityCard({ activity, theme, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* Cover Image */}
      <div className={`h-48 bg-linear-to-r ${theme.bg} relative overflow-hidden`}>
        {activity.coverImage && !imgError ? (
          <img
            src={activity.coverImage}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-white/50" />
          </div>
        )}
        {/* Date badge */}
        {activity.date && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {activity.date}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          {activity.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {activity.shortDescription || 'Click to view details and photos of this activity.'}
        </p>
        <div className={`inline-flex items-center gap-1 text-sm font-semibold text-white px-4 py-2 rounded-lg ${theme.btn} transition`}>
          View Details →
        </div>
      </div>
    </div>
  );
}