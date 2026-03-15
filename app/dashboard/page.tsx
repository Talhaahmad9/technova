import { DashboardClient } from '@/components/Dashboard/DashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "TechNova '26 — Admin Dashboard",
  description: 'Internal dashboard for TechNova event organizers.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
