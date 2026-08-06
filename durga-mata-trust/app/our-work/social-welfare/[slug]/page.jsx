"use client";
import ActivityDetailPage from '@/components/ActivityDetailPage';
import {use} from 'react';
export default function SocialWelfareActivityPage({ params }) {
  const { slug } = use(params);
  return <ActivityDetailPage categorySlug="social-welfare" activitySlug={slug} />;
}