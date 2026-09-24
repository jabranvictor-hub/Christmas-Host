import React, { useState } from 'react';
import { Megaphone, Send, Sparkles, Pin, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Announcement } from '../types';
import { sound } from '../utils/audio';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Omit<Announcement, 'id' | 'timestamp'>) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
  onAddAnnouncement,
  onDeleteAnnouncement,
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'General' | 'Urgent' | 'Activity' | 'Greeting'>('Greeting');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sound.playChime();
    onAddAnnouncement({
      title: title.trim(),
      message: message.trim(),
      category,
      author: 'Elijah Victor (Host)',
    });

    setTitle('');
    setMessage('');
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  const handleQuickTemplate = (tplTitle: string, tplMsg: string, cat: 'General' | 'Urgent' | 'Activity' | 'Greeting') => {
    setTitle(tplTitle);
    setMessage(tplMsg);
    setCategory(cat);
    sound.playTick();
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Megaphone className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            📢 Host Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Create and send live announcements to the auditorium display, hosting screen, and parent mobile devices.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start md:self-center">
          Active Broadcasts: <strong className="text-white">{announcements.length}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Announcement Composer Form (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>✍️</span> Compose Stage Announcement
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono">Live Broadcast</span>
          </div>

          {/* Quick presets */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
              Quick One-Click Templates:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    '🎄 Welcome to Christmas School!',
                    "Welcome everyone to Victor's Christmas School 2026! We have an exciting night of songs, games, and celebration.",
                    'Greeting'
                  )
                }
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                🎄 Welcome Greeting
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    '🎮 Christmas Games are Starting!',
                    'Please gather near the front stage! Christmas Quiz and character challenges are about to begin.',
                    'Activity'
                  )
                }
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                🎮 Games Starting
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    '🎁 Gift Sharing Time is Coming Up!',
                    'Santa gifts and personalized wrapped packages will be distributed at 7:50 PM!',
                    'Activity'
                  )
                }
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                🎁 Gift Reminder
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 🎄 Welcome to Christmas School!"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Category
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Greeting', 'Activity', 'General', 'Urgent'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer border transition-colors ${
                      category === cat
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Message Content
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Type the message to be displayed on stage monitors..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            {successNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Announcement broadcasted successfully to Hosting Screen!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>BROADCAST ANNOUNCEMENT 📢</span>
            </button>
          </form>
        </div>

        {/* Live Broadcast Feed (7 Columns) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Current Stage Announcements Feed</span>
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">Real-time Stream</span>
          </div>

          <div className="space-y-3">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📢</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="text-emerald-400 font-semibold">{item.category}</span>
                        <span>·</span>
                        <span>{item.timestamp}</span>
                        <span>·</span>
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        sound.playTick();
                        onDeleteAnnouncement(item.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
