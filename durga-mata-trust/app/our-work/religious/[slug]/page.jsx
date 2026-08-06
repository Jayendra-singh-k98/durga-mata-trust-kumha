"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
import {use} from 'react';
export default function ReligiousActivityPage({ params }) {
  const { slug } = use(params);
  return <ActivityDetailPage categorySlug="religious" activitySlug={slug} />;
}