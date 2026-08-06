"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
export default function SocialWelfareActivityPage({ params }) {
  return <ActivityDetailPage categorySlug="social-welfare" activitySlug={params.slug} />;
}