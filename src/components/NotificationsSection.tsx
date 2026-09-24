import React from 'react';
import { Bell, CheckCheck, Trash2, Radio, Sparkles } from 'lucide-react';
import { AppNotification, NavigationTab } from '../types';
import { sound } from '../utils/audio';

interface NotificationsSectionProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onTabChange: (tab: NavigationTab) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onTabChange,
}) => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleActionClick = (notif: AppNotification) => {
    sound.playTick();
    onMarkAsRead(notif.id);
    switch (notif.type) {
      case 'class':
        onTabChange('controls');
        break;
      case 'game':
        onTabChange('games');
        break;
      case 'gift':
        onTabChange('timetable');
        break;
      case 'photo':
        onTabChange('memories');
        break;
      default:
        onTabChange('dashboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Bell className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            🔔 Event Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Real-time cues and stage alerts for Host Elijah Victor. Keep track of upcoming activities, timetable readiness, and announcements.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          {unreadCount > 0 && (
            <button
              onClick={() => {
                sound.playTick();
                onMarkAllAsRead();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">All notifications cleared.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                notif.unread
                  ? 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/50 shadow-md ring-1 ring-red-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                  {notif.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-red-400" title="Unread alert" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono block pt-0.5">
                    {notif.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleActionClick(notif)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    sound.playTick();
                    onDeleteNotification(notif.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
