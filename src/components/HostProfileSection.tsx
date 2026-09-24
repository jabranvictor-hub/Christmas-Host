import React, { useState } from 'react';
import { Mic2, MapPin, Sparkles, Edit3, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HostInfo } from '../types';
import { sound } from '../utils/audio';

interface HostProfileSectionProps {
  host: HostInfo;
  onUpdateHost: (updated: HostInfo) => void;
}

export const HostProfileSection: React.FC<HostProfileSectionProps> = ({
  host,
  onUpdateHost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<HostInfo>(host);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    onUpdateHost(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Mic2 className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            👤 Host Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Official credentials and stage bio for Host Elijah Victor.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              sound.playTick();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Edit3 className="w-4 h-4 text-emerald-400" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800 pb-6">
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-red-600 via-emerald-700 to-slate-900 border-4 border-emerald-500/80 shadow-2xl flex flex-col items-center justify-center text-white select-none">
              <span className="text-4xl sm:text-5xl">🎤</span>
              <span className="text-[10px] font-black tracking-widest text-emerald-200 mt-1.5 uppercase">
                OFFICIAL HOST
              </span>
            </div>
            <div
              className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-emerald-500 text-slate-950 shadow-md border-2 border-slate-900"
              title="Verified Host"
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold">
                <span>🎤</span>
                <span>{host.role}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Host Account</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {host.name}
            </h2>

            <div className="text-sm font-semibold text-emerald-400">
              {host.school}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono pt-1">
              <span>Program: <strong className="text-white">{host.program}</strong></span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{host.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Fields Grid or Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Host Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Program Year
                </label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Host Stage Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Welcome Quote
              </label>
              <input
                type="text"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFormData(host);
                  setIsEditing(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-md"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>📖</span>
                <span>Host Biography</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {host.bio}
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Elijah's Host Motto</span>
              </div>
              <p className="text-xs italic text-emerald-200/90 leading-relaxed font-serif-christmas">
                {host.quote}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Host ID</div>
                <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                  {host.hostId}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Stage Wireless Mic</div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                  ● Channel 1 Synced
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Auditorium Status</div>
                <div className="text-sm font-bold text-sky-400 font-mono mt-0.5">
                  Ready & Calibrated
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
