import React from 'react';
import { Volume2, VolumeX, Snowflake, LogOut, Radio, User } from 'lucide-react';
import { ClassStatus, NavigationTab, HostInfo } from '../types';
import { sound } from '../utils/audio';

interface TopNavbarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  classStatus: ClassStatus;
  snowEnabled: boolean;
  onToggleSnow: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
  unreadCount: number;
  host: HostInfo;
  onOpenPortalsModal?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTab,
  onTabChange,
  classStatus,
  snowEnabled,
  onToggleSnow,
  soundEnabled,
  onToggleSound,
  onLogout,
  onOpenMobileMenu,
  unreadCount,
  host,
  onOpenPortalsModal,
}) => {
  const getStatusColor = () => {
    switch (classStatus) {
      case 'LIVE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse';
      case 'PAUSED':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'ENDED':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button
          onClick={() => {
            onTabChange('dashboard');
            sound.playTick();
          }}
          className="text-left font-serif-christmas font-bold tracking-tight text-lg text-white hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>🎄</span>
          <span className="truncate">Victor's Christmas School</span>
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => {
            onTabChange('dashboard');
            sound.playTick();
          }}
          className={`hover:text-white transition-colors cursor-pointer py-1 ${
            currentTab === 'dashboard' ? 'text-white font-semibold border-b-2 border-red-500' : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            onTabChange('controls');
            sound.playTick();
          }}
          className={`hover:text-white transition-colors cursor-pointer py-1 ${
            currentTab === 'controls' ? 'text-white font-semibold border-b-2 border-red-500' : ''
          }`}
        >
          Control Center
        </button>
        <button
          onClick={() => {
            onTabChange('hosting');
            sound.playJingle();
          }}
          className={`hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1 ${
            currentTab === 'hosting' ? 'text-white font-semibold border-b-2 border-emerald-500' : ''
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Live Hosting</span>
        </button>
        <button
          onClick={() => {
            onTabChange('timetable');
            sound.playTick();
          }}
          className={`hover:text-white transition-colors cursor-pointer py-1 ${
            currentTab === 'timetable' ? 'text-white font-semibold border-b-2 border-red-500' : ''
          }`}
        >
          Timetable
        </button>
        <button
          onClick={() => {
            onTabChange('games');
            sound.playTick();
          }}
          className={`hover:text-white transition-colors cursor-pointer py-1 ${
            currentTab === 'games' ? 'text-white font-semibold border-b-2 border-red-500' : ''
          }`}
        >
          Games
        </button>
        {onOpenPortalsModal && (
          <button
            onClick={() => {
              onOpenPortalsModal();
              sound.playTick();
            }}
            className="hover:text-amber-300 text-amber-400 font-semibold transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            title="School Portals Directory"
          >
            <span>👑</span>
            <span>Directory</span>
          </button>
        )}
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Class status badge */}
        <div
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              classStatus === 'LIVE'
                ? 'bg-emerald-400 animate-ping'
                : classStatus === 'PAUSED'
                ? 'bg-amber-400'
                : classStatus === 'ENDED'
                ? 'bg-red-400'
                : 'bg-slate-500'
            }`}
          />
          <span className="whitespace-nowrap font-mono">
            {classStatus === 'LIVE'
              ? 'LIVE 🟢'
              : classStatus === 'PAUSED'
              ? 'PAUSED ⏸️'
              : classStatus === 'ENDED'
              ? 'ENDED 🔴'
              : 'Not Started'}
          </span>
        </div>

        {/* Snowfall Toggle */}
        <button
          onClick={() => {
            onToggleSnow();
            sound.playTick();
          }}
          className={`p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
            snowEnabled
              ? 'bg-slate-800 text-sky-300 border-sky-500/40'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
          title={snowEnabled ? 'Snowfall ON (Click to toggle)' : 'Snowfall OFF'}
          aria-label="Toggle festive snowfall"
        >
          <Snowflake className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleSound();
            sound.playTick();
          }}
          className={`p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
            soundEnabled
              ? 'bg-slate-800 text-amber-300 border-amber-500/40'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Audio Sound Effects ON' : 'Audio Sound Effects MUTED'}
          aria-label="Toggle audio effects"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Profile button */}
        <button
          onClick={() => {
            onTabChange('profile');
            sound.playTick();
          }}
          className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs transition-colors cursor-pointer group"
          title="Host Profile (Elijah Victor)"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-[10px] border border-emerald-500 shadow-sm shrink-0">
            🎤
          </div>
          <span className="hidden lg:inline font-medium group-hover:text-emerald-400 transition-colors">
            {host.name}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-xs transition-colors cursor-pointer"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
