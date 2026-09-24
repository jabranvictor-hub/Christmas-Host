import React from 'react';
import {
  Mic2,
  Users,
  Calendar,
  Megaphone,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Radio,
  Play,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import {
  HostInfo,
  Student,
  TimetableItem,
  SchoolEvent,
  Announcement,
  ClassStatus,
  NavigationTab,
  SchoolPortal,
} from '../types';
import { SCHOOL_PORTALS } from '../data/initialData';
import { sound } from '../utils/audio';

interface DashboardViewProps {
  host: HostInfo;
  students: Student[];
  timetable: TimetableItem[];
  events: SchoolEvent[];
  announcements: Announcement[];
  classStatus: ClassStatus;
  onTabChange: (tab: NavigationTab) => void;
  onStartClass: () => void;
  onOpenPortalsModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  host,
  students,
  timetable,
  events,
  announcements,
  classStatus,
  onTabChange,
  onStartClass,
  onOpenPortalsModal,
}) => {
  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const currentItem = timetable.find((t) => t.status === 'current') || timetable[0];
  const nextItem = timetable.find((t) => t.status === 'upcoming') || timetable[1];
  const upcomingEventsCount = events.length;

  return (
    <div className="space-y-6">
      {/* Welcome & Host Status Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-emerald-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none text-9xl">
          🎄
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <button
              onClick={() => onTabChange('profile')}
              title="View Host Profile (Elijah Victor)"
              className="relative shrink-0 group cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-600 via-emerald-700 to-slate-900 border-2 border-emerald-400/80 shadow-lg flex flex-col items-center justify-center text-white group-hover:scale-105 transition-transform">
                <span className="text-2xl sm:text-3xl select-none">🎤</span>
                <span className="text-[10px] font-black tracking-wider text-emerald-200">HOST</span>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider shadow">
                READY
              </span>
            </button>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>{host.school} · {host.program}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Welcome, Elijah!</span>
                <span className="inline-block animate-bounce">🎤🎄</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                You are hosting Victor's Christmas School 2026 live from Punjab, Pakistan 🇵🇰. Manage your stage timetable, lead interactive games, broadcast holiday announcements, and inspire students tonight!
              </p>
            </div>
          </div>

          {/* Quick Status and CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <span className="text-xl">🎤</span>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Host Status</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Ready to Host</span>
                </div>
              </div>
            </div>

            {classStatus === 'LIVE' ? (
              <button
                onClick={() => {
                  sound.playJingle();
                  onTabChange('hosting');
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap animate-pulse"
              >
                <Radio className="w-4 h-4" />
                <span>OPEN HOSTING SCREEN</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onStartClass();
                  onTabChange('controls');
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START CLASS & HOST</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Total Students */}
        <div
          onClick={() => {
            sound.playTick();
            onTabChange('attendance');
          }}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <span>👨‍🎓</span> Students
            </span>
            <Users className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {students.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Enrolled in Christmas 2026</span>
          </div>
        </div>

        {/* Metric 2: Present Students */}
        <div
          onClick={() => {
            sound.playTick();
            onTabChange('attendance');
          }}
          className="bg-slate-900/80 border border-emerald-900/30 rounded-xl p-4 hover:border-emerald-800/60 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Present Students</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300 tabular-nums">
            🟢 {presentCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            {students.filter(s => s.status === 'present').map(s => s.name).join(', ')}
          </div>
        </div>

        {/* Metric 3: Absent Students */}
        <div
          onClick={() => {
            sound.playTick();
            onTabChange('attendance');
          }}
          className="bg-slate-900/80 border border-red-900/30 rounded-xl p-4 hover:border-red-800/60 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-red-400 mb-2">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>Absent Students</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-300 tabular-nums">
            🔴 {absentCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            {students.filter(s => s.status === 'absent').map(s => s.name).join(', ')} (Online)
          </div>
        </div>

        {/* Metric 4: Upcoming Events */}
        <div
          onClick={() => {
            sound.playTick();
            onTabChange('events');
          }}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <span>🎉</span> Upcoming Events
            </span>
            <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {upcomingEventsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Program scheduled tonight
          </div>
        </div>
      </div>

      {/* Current Class/Event Tracker & Live Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Class/Event Card (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                ⏰ Current Class / Event
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Status:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  classStatus === 'LIVE'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : classStatus === 'PAUSED'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : classStatus === 'ENDED'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {classStatus === 'LIVE'
                  ? 'LIVE 🟢'
                  : classStatus === 'PAUSED'
                  ? 'PAUSED ⏸️'
                  : classStatus === 'ENDED'
                  ? 'ENDED 🔴'
                  : 'Class Status: Not Started'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl p-2 rounded-xl bg-red-950/60 border border-red-800/40">
                {currentItem.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold">
                    NOW ON STAGE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{currentItem.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  {currentItem.description}
                </p>
                {currentItem.cueNotes && (
                  <p className="text-[11px] text-amber-300/90 mt-2 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    Host Cue: {currentItem.cueNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playJingle();
                  onTabChange('hosting');
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Host View</span>
              </button>
              <button
                onClick={() => {
                  sound.playTick();
                  onTabChange('timetable');
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Change Activity</span>
              </button>
            </div>
          </div>

          {/* Next upcoming activity preview */}
          {nextItem && (
            <div className="flex items-center justify-between text-xs px-3 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono">Next Up:</span>
                <span className="font-semibold text-slate-200">{nextItem.title}</span>
                <span className="text-slate-500 font-mono">({nextItem.time})</span>
              </div>
              <button
                onClick={() => {
                  sound.playTick();
                  onTabChange('timetable');
                }}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Announcements Side Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  📢 Announcements
                </h2>
              </div>
              <button
                onClick={() => {
                  sound.playTick();
                  onTabChange('announcements');
                }}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                View All ({announcements.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {announcements.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate">{item.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                sound.playTick();
                onTabChange('announcements');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Broadcast New Announcement</span>
            </button>
          </div>
        </div>
      </div>

      {/* School Portals Quick Switch Cards */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">👑</span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              School Portals Directory
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playTick();
              onOpenPortalsModal();
            }}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Explore All Portals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SCHOOL_PORTALS.map((portal) =>
            portal.isCurrentPortal ? (
              <div
                key={portal.id}
                onClick={() => {
                  sound.playTick();
                  onTabChange('hosting');
                }}
                className="p-3.5 rounded-xl bg-gradient-to-br from-red-950/80 to-slate-900 border-2 border-emerald-500 text-left relative overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                title="Host Portal (Active)"
              >
                <span className="absolute top-1.5 right-1.5 px-1 py-0.2 text-[8px] bg-emerald-500 text-slate-950 font-black rounded uppercase">
                  ACTIVE
                </span>
                <div className="text-2xl mb-1">{portal.icon}</div>
                <div className="text-xs font-bold text-white truncate">{portal.title}</div>
                <div className="text-[10px] text-emerald-400 truncate">{portal.person}</div>
                <div className="text-[9px] text-emerald-300/80 font-mono mt-1">Host Screen</div>
              </div>
            ) : (
              <a
                key={portal.id}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTick()}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 transition-all text-left group flex flex-col justify-between"
                title={`Open ${portal.title} (${portal.url})`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{portal.icon}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {portal.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{portal.person}</div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-emerald-400 font-mono">
                  <span>Open Portal</span>
                  <span>↗</span>
                </div>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};
