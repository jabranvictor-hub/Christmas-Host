import React from 'react';
import {
  Home,
  Mic2,
  Tv,
  Calendar,
  Gamepad2,
  Users,
  Megaphone,
  Sparkles,
  Camera,
  Bell,
  User,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { NavigationTab, HostInfo, ClassStatus } from '../types';
import { sound } from '../utils/audio';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  host: HostInfo;
  classStatus: ClassStatus;
  unreadNotifications: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  onOpenPortalsModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  host,
  classStatus,
  unreadNotifications,
  mobileOpen,
  onCloseMobile,
  onLogout,
  onOpenPortalsModal,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'controls', label: 'Host Control Center', icon: <Mic2 className="w-4 h-4" /> },
    { id: 'hosting', label: 'Live Hosting', icon: <Tv className="w-4 h-4" />, badge: classStatus === 'LIVE' ? 'LIVE' : undefined },
    { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" />, badge: '5' },
    { id: 'attendance', label: 'Attendance View', icon: <Users className="w-4 h-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'memories', label: 'Photos & Memories', icon: <Camera className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifications > 0 ? unreadNotifications : undefined },
    { id: 'profile', label: 'Host Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleSelect = (tab: NavigationTab) => {
    sound.playTick();
    onTabChange(tab);
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  const content = (
    <div className="h-full flex flex-col justify-between bg-slate-950 border-r border-slate-800 text-slate-300">
      {/* Top Header Card */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 border-2 border-emerald-500/80 shadow-md flex items-center justify-center text-xl text-white select-none">
                🎤
              </div>
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"
                title="Host Online & Ready"
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-white truncate">{host.name}</h2>
              <p className="text-[11px] text-emerald-400 font-medium truncate flex items-center gap-1">
                <span>🎤</span> {host.role}
              </p>
            </div>
          </div>
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Location & Program badge */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-[10px] text-slate-400 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Program:</span>
            <span className="font-semibold text-slate-200">Christmas 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="text-slate-300 truncate max-w-[140px]" title={host.location}>
              Punjab, Pakistan 🇵🇰
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
          Host Operations
        </div>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/90 to-red-700 text-white shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'LIVE'
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* School Portals Link Button */}
        <div className="pt-3 mt-2 border-t border-slate-800/80">
          <button
            onClick={() => {
              sound.playTick();
              onOpenPortalsModal();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-850 text-amber-300 border border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">👑</span>
              <span className="font-semibold">Portals Directory</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <button
          onClick={() => {
            sound.playBuzzer();
            onLogout();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Host Portal</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slide-right">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
