"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
export default function EducationActivityPage({ params }) {
  return <ActivityDetailPage categorySlug="education" activitySlug={params.slug} />;
}