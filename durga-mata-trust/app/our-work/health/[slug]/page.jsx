"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
export default function HealthActivityPage({ params }) {
  return <ActivityDetailPage categorySlug="health" activitySlug={params.slug} />;
}