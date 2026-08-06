"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
import {use} from 'react';
export default function HealthActivityPage({ params }) {
  const { slug } = use(params);
  return <ActivityDetailPage categorySlug="health" activitySlug={slug} />;
}