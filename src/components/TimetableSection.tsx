import React, { useState } from 'react';
import { Clock, CheckCircle2, Play, Radio, Sparkles, AlertCircle } from 'lucide-react';
import { TimetableItem, NavigationTab } from '../types';
import { sound } from '../utils/audio';

interface TimetableSectionProps {
  timetable: TimetableItem[];
  currentActivity: TimetableItem;
  onSelectActivity: (activity: TimetableItem) => void;
  onTabChange: (tab: NavigationTab) => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  timetable,
  currentActivity,
  onSelectActivity,
  onTabChange,
}) => {
  const [filter, setFilter] = useState<'all' | 'current' | 'upcoming' | 'completed'>('all');
  const [items, setItems] = useState<TimetableItem[]>(timetable);

  const handleSelect = (item: TimetableItem) => {
    sound.playJingle();
    // Update local statuses so the selected is 'current'
    const updated = items.map((t) => {
      if (t.id === item.id) return { ...t, status: 'current' as const };
      // If it was current, change to completed or upcoming based on index
      return t;
    });
    setItems(updated);
    onSelectActivity(item);
  };

  const toggleStatus = (id: string, newStatus: 'upcoming' | 'current' | 'completed') => {
    sound.playTick();
    const updated = items.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setItems(updated);
    if (newStatus === 'current') {
      const match = updated.find((t) => t.id === id);
      if (match) onSelectActivity(match);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            📅 Christmas Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Official evening program from 6:00 PM to 8:30 PM. Select any activity to broadcast it live on the host monitor and stage screen.
          </p>
        </div>

        {/* Filter segment tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs self-start md:self-center">
          <button
            onClick={() => {
              setFilter('all');
              sound.playTick();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All (10)
          </button>
          <button
            onClick={() => {
              setFilter('current');
              sound.playTick();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'current' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setFilter('upcoming');
              sound.playTick();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'upcoming' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => {
              setFilter('completed');
              sound.playTick();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'completed' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Timetable List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const isCurrent = item.id === currentActivity.id;
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border-red-500 shadow-xl ring-1 ring-red-500/50'
                  : item.status === 'completed'
                  ? 'bg-slate-950/60 border-slate-800/60 opacity-75'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      isCurrent
                        ? 'bg-red-600/30 border border-red-500/50'
                        : 'bg-slate-950 border border-slate-800'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.time}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        ({item.durationMinutes} mins)
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                          ● CURRENTLY ACTIVE
                        </span>
                      )}
                      {item.status === 'completed' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400">
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 max-w-2xl">{item.description}</p>

                    {item.cueNotes && (
                      <div className="text-[11px] text-amber-300/80 pt-1 font-mono">
                        Stage Cue: {item.cueNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handleSelect(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{isCurrent ? 'Host Live' : 'Select as Current'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleStatus(item.id, 'completed')}
                      className={`text-[10px] px-2 py-1 rounded cursor-pointer ${
                        item.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title="Mark as completed"
                    >
                      Done
                    </button>
                    <span className="text-slate-700">·</span>
                    <button
                      onClick={() => toggleStatus(item.id, 'upcoming')}
                      className={`text-[10px] px-2 py-1 rounded cursor-pointer ${
                        item.status === 'upcoming'
                          ? 'bg-slate-800 text-slate-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title="Mark as upcoming"
                    >
                      Upcoming
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
