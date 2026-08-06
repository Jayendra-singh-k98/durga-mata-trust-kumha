"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
export default function ReligiousActivityPage({ params }) {
  return <ActivityDetailPage categorySlug="religious" activitySlug={params.slug} />;
}