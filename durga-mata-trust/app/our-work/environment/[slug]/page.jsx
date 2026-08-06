"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
export default function EnvironmentActivityPage({ params }) {
  return <ActivityDetailPage categorySlug="environment" activitySlug={params.slug} />;
}