import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import type { LOCATION } from '@/constants/site-data';

type LocationDetails = typeof LOCATION.details;

interface VenueDetailsProps {
  details: LocationDetails;
  venue: string;
  address: string;
}

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  Clock,
  MapPin,
  Users,
};

export function VenueDetails({ details, venue, address }: VenueDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Venue name */}
      <div>
        <h3
          className="font-bold text-xl mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {venue}
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {address}
        </p>
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-2 gap-3">
        {details.map((detail) => {
          const Icon = iconMap[detail.icon];
          return (
            <div
              key={detail.label}
              className="card-glass rounded-xl p-4 flex items-start gap-3"
            >
              {Icon && (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--gradient-accent-2)' }}
                >
                  <Icon size={14} className="text-white" />
                </div>
              )}
              <div>
                <p
                  className="mono text-xs uppercase tracking-wider mb-0.5"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {detail.label}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {detail.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
