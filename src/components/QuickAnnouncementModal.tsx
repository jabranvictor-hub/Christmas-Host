import React, { useState } from 'react';
import { Megaphone, X, Send, Sparkles } from 'lucide-react';
import { Announcement } from '../types';
import { sound } from '../utils/audio';

interface QuickAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcast: (announcement: Omit<Announcement, 'id' | 'timestamp'>) => void;
}

export const QuickAnnouncementModal: React.FC<QuickAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onBroadcast,
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'General' | 'Urgent' | 'Activity' | 'Greeting'>('Activity');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sound.playChime();
    onBroadcast({
      title: title.trim(),
      message: message.trim(),
      category,
      author: 'Elijah Victor (Host)',
    });

    setTitle('');
    setMessage('');
    onClose();
  };

  const handleTemplate = (t: string, m: string) => {
    setTitle(t);
    setMessage(m);
    sound.playTick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 text-amber-300">
              📢
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Broadcast Stage Announcement</h2>
              <p className="text-[11px] text-slate-400">Instantly appears on Hosting Screen & monitor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick templates */}
        <div>
          <div className="text-[11px] text-slate-400 font-semibold mb-1.5">
            One-Click Stage Cues:
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() =>
                handleTemplate(
                  '🎄 Welcome to Christmas School!',
                  'Welcome everyone! Let us begin our Christmas 2026 celebration together!'
                )
              }
              className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              🎄 Welcome
            </button>
            <button
              type="button"
              onClick={() =>
                handleTemplate(
                  '🎁 Gift Sharing Commencing!',
                  'Arnan, Eliab, and Balaj please gather by the Christmas tree for gifts!'
                )
              }
              className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              🎁 Gift Sharing
            </button>
            <button
              type="button"
              onClick={() =>
                handleTemplate(
                  '📸 Stage Photos in 5 Minutes!',
                  'Get ready with Santa hats and Christmas sweaters for class portraits!'
                )
              }
              className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              📸 Photos Alert
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🎄 Welcome to Christmas School!"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
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
                  className={`py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer border ${
                    category === cat
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Message Text
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Type stage announcement to display live..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
