"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, RefreshCw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getActivity, getActivityImages, getCategory } from '@/lib/ourWorkData';

const THEMES = {
  religious:        { bg: 'from-orange-600 to-red-600',    border: 'border-orange-500', badge: 'bg-orange-100 text-orange-700' },
  health:           { bg: 'from-red-600 to-pink-600',      border: 'border-red-500',    badge: 'bg-red-100 text-red-700' },
  education:        { bg: 'from-blue-600 to-indigo-600',   border: 'border-blue-500',   badge: 'bg-blue-100 text-blue-700' },
  'social-welfare': { bg: 'from-green-600 to-teal-600',    border: 'border-green-500',  badge: 'bg-green-100 text-green-700' },
  environment:      { bg: 'from-teal-600 to-emerald-600',  border: 'border-teal-500',   badge: 'bg-teal-100 text-teal-700' },
};

export default function ActivityDetailPage({ categorySlug, activitySlug }) {
  const router = useRouter();
  const [activity, setActivity] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState(null); // index of open image

  const theme = THEMES[categorySlug] || THEMES.religious;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [act, imgs, cat] = await Promise.all([
          getActivity(activitySlug),
          getActivityImages(activitySlug),
          getCategory(categorySlug),
        ]);
        if (!act) { setError('Activity not found'); return; }
        setActivity(act);
        setImages(imgs);
        setCategory(cat);
      } catch {
        setError('Failed to load. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [categorySlug, activitySlug]);

  // Lightbox keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (lightbox === null) return;
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(i + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setLightbox(i => Math.max(i - 1, 0));
      if (e.key === 'Escape') setLightbox(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, images.length]);

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
        <button
          onClick={() => router.push(`/our-work/${categorySlug}`)}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className={`bg-linear-to-r ${theme.bg} text-white py-16`}>
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => router.push(`/our-work/${categorySlug}`)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {category?.name || 'Activities'}
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{activity.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {activity.date && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                <Calendar className="w-3 h-3" /> {activity.date}
              </span>
            )}
            {category && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {category.icon} {category.name}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* Cover image */}
        {activity.coverImage && (
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={activity.coverImage}
              alt={activity.title}
              className="w-full max-h-96 object-cover"
              onError={e => e.target.style.display = 'none'}
            />
          </div>
        )}

        {/* Full Description */}
        <section className={`bg-white rounded-2xl shadow-lg p-8 border-l-4 ${theme.border}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Activity</h2>
          <div className="text-gray-700 leading-relaxed text-lg space-y-4">
            {activity.fullDescription
              ? activity.fullDescription.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              : <p>{activity.shortDescription || 'Details about this activity will be updated soon.'}</p>
            }
          </div>
        </section>

        {/* Photo Gallery */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📸 Photos
            {images.length > 0 && (
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${theme.badge}`}>
                {images.length} photos
              </span>
            )}
          </h2>

          {images.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-5xl mb-4">📷</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Photos Coming Soon</h3>
              <p className="text-gray-500">
                Photos of this activity will be uploaded shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-gray-200"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.caption || `Photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => e.target.parentElement.style.display = 'none'}
                  />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Back button */}
        <div className="text-center pb-4">
          <button
            onClick={() => router.push(`/our-work/${categorySlug}`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-600 transition font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {category?.name || 'Activities'}
          </button>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(i => i - 1); }}
              className="absolute left-4 text-white/70 hover:text-white"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightbox].imageUrl}
            alt={images[lightbox].caption || ''}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(i => i + 1); }}
              className="absolute right-4 text-white/70 hover:text-white"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Caption + counter */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            {images[lightbox].caption && (
              <p className="text-white text-sm mb-1">{images[lightbox].caption}</p>
            )}
            <p className="text-white/50 text-xs">{lightbox + 1} / {images.length}</p>
          </div>
        </div>
      )}

    </div>
  );
}