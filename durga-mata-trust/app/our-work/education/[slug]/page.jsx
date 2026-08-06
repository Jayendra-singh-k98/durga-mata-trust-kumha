"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
import {use} from 'react';
export default function EducationActivityPage({ params }) {
  const { slug } = use(params);
  return <ActivityDetailPage categorySlug="education" activitySlug={slug} />;
}