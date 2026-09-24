import React, { useState } from 'react';
import { Sparkles, Calendar, Play, Radio, MapPin, Clock, CheckCircle } from 'lucide-react';
import { SchoolEvent, NavigationTab, TimetableItem, ClassStatus } from '../types';
import { sound } from '../utils/audio';

interface EventsSectionProps {
  events: SchoolEvent[];
  timetable: TimetableItem[];
  onSelectActivity: (activity: TimetableItem) => void;
  onSetClassStatus: (status: ClassStatus) => void;
  onTabChange: (tab: NavigationTab) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  timetable,
  onSelectActivity,
  onSetClassStatus,
  onTabChange,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  const handleStartHostingEvent = (event: SchoolEvent) => {
    sound.playJingle();
    onSetClassStatus('LIVE');

    // Match to timetable item
    let matchingItem = timetable[0];
    if (event.title.includes('Games')) {
      matchingItem = timetable.find((t) => t.title.includes('Games')) || timetable[4];
    } else if (event.title.includes('Gift')) {
      matchingItem = timetable.find((t) => t.title.includes('Gift')) || timetable[6];
    } else if (event.title.includes('Photos')) {
      matchingItem = timetable.find((t) => t.title.includes('Photos')) || timetable[7];
    } else if (event.title.includes('Christmas Class')) {
      matchingItem = timetable.find((t) => t.title.includes('Welcome')) || timetable[0];
    }

    onSelectActivity(matchingItem);
    onTabChange('hosting');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            🎉 School Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Official Christmas and New Year event roster for Elijah Victor. Click any event to open host details and start hosting immediately.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start md:self-center">
          Events: <strong className="text-emerald-400">5 Scheduled</strong>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-md group hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-4xl p-3 bg-slate-950 rounded-2xl border border-slate-800/80">
                  {event.icon}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {event.status === 'active' ? '● LIVE STAGE' : 'SCHEDULED'}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{event.highlight}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => handleStartHostingEvent(event)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all whitespace-nowrap"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Start Hosting</span>
              </button>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  sound.playTick();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                title="View event cue details"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedEvent.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedEvent.title}</h3>
                  <div className="text-xs text-amber-300 font-mono">{selectedEvent.time}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold mb-1">Stage Location:</span>
                <span className="text-white">{selectedEvent.highlight}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold mb-1">Event Description:</span>
                <span>{selectedEvent.description}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold mb-1">Host Protocol:</span>
                <span>
                  Host Elijah Victor leads introductions, introduces guests, coordinates with teachers and parents, and triggers celebratory cues.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ev = selectedEvent;
                  setSelectedEvent(null);
                  handleStartHostingEvent(ev);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Launch Host Screen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
