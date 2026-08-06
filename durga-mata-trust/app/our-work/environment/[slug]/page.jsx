"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
import {use} from 'react';
export default function EnvironmentActivityPage({ params }) {
  const { slug } = use(params);
  return <ActivityDetailPage categorySlug="environment" activitySlug={slug} />;
}