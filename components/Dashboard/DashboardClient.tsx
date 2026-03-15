'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardShell } from './DashboardShell';
import { DashStatCard } from './StatCard';
import { RegistrationsPanel } from './RegistrationsPanel';
import { CompetitionsPanel } from './CompetitionsPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { SponsorsPanel } from './SponsorsPanel';
import { TeamPanel } from './TeamPanel';
import { AnnouncementsPanel } from './AnnouncementsPanel';
import { DASHBOARD } from '@/constants/site-data';

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  );
}

export function DashboardClient() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                {DASHBOARD.welcomeMessage}
              </h2>
              <p className="mono text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Here&apos;s what&apos;s happening with {DASHBOARD.eventName}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {DASHBOARD.overviewStats.map((stat, i) => (
                <DashStatCard
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  trend={stat.trend}
                  trendUp={stat.trendUp}
                  icon={stat.icon}
                  index={i}
                />
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <SectionHeading title="Recent Registrations" subtitle="Latest sign-ups" />
                <RegistrationsPanel data={DASHBOARD.registrations} />
              </div>
              <div>
                <SectionHeading title="Competition Entries" subtitle="Capacity at a glance" />
                <CompetitionsPanel data={DASHBOARD.competitionStats} />
              </div>
            </div>
          </div>
        );

      case 'registrations':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.registrations.heading}
              subtitle={`${DASHBOARD.registrations.total} registered out of ${DASHBOARD.registrations.capacity} capacity`}
            />
            <RegistrationsPanel data={DASHBOARD.registrations} />
          </>
        );

      case 'competitions':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.competitionStats.heading}
              subtitle={DASHBOARD.competitionStats.subheading}
            />
            <CompetitionsPanel data={DASHBOARD.competitionStats} />
          </>
        );

      case 'analytics':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.analytics.heading}
              subtitle={DASHBOARD.analytics.subheading}
            />
            <AnalyticsPanel data={DASHBOARD.analytics} />
          </>
        );

      case 'sponsors':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.sponsorManagement.heading}
              subtitle={DASHBOARD.sponsorManagement.subheading}
            />
            <SponsorsPanel data={DASHBOARD.sponsorManagement} />
          </>
        );

      case 'team':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.teamPanel.heading}
              subtitle={DASHBOARD.teamPanel.subheading}
            />
            <TeamPanel data={DASHBOARD.teamPanel} />
          </>
        );

      case 'announcements':
        return (
          <>
            <SectionHeading
              title={DASHBOARD.announcements.heading}
              subtitle={DASHBOARD.announcements.subheading}
            />
            <AnnouncementsPanel data={DASHBOARD.announcements} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </DashboardShell>
  );
}
