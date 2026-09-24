import React, { useState } from 'react';
import { ExternalLink, X, Check, Copy } from 'lucide-react';
import { SCHOOL_PORTALS } from '../data/initialData';
import { sound } from '../utils/audio';

interface SchoolPortalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHostPortal: () => void;
}

export const SchoolPortalsModal: React.FC<SchoolPortalsModalProps> = ({
  isOpen,
  onClose,
  onSelectHostPortal,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, url: string) => {
    sound.playTick();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span>👑</span>
              <span>Victor's Christmas School 2026 Ecosystem</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              School Portals Directory
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Direct access navigation across Principal, Admin, Teacher, Parent & Guardian, Attendance, and Host systems.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Directory Quick Link Bar */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔗</span> Direct Portal URLs
            </span>
            <span className="text-[10px] text-slate-500 font-mono">5 External Netlify Portals + 1 Host Portal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SCHOOL_PORTALS.filter((p) => p.url).map((portal) => (
              <a
                key={`quick-${portal.id}`}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTick()}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 transition-all text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">{portal.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {portal.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {portal.url?.replace('https://', '')}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Portals Cards Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCHOOL_PORTALS.map((portal) => (
            <div
              key={portal.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 relative overflow-hidden ${
                portal.isCurrentPortal
                  ? 'bg-gradient-to-br from-red-950/70 via-slate-900 to-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {portal.isCurrentPortal && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950 uppercase tracking-wider font-mono">
                  CURRENT ACTIVE
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0 shadow-inner">
                    {portal.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">
                        {portal.title}
                      </h3>
                      {portal.badge && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {portal.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-amber-300 font-semibold mt-0.5">
                      {portal.person}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {portal.roleDescription}
                </p>

                {portal.url && (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-cyan-300">
                    <span className="truncate" title={portal.url}>
                      {portal.url}
                    </span>
                    <button
                      onClick={() => handleCopy(portal.id, portal.url!)}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                      title="Copy URL"
                    >
                      {copiedId === portal.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-mono">
                  Status: <strong className="text-emerald-400">{portal.status}</strong>
                </span>

                {portal.isCurrentPortal ? (
                  <button
                    onClick={() => {
                      sound.playTick();
                      onSelectHostPortal();
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-md"
                  >
                    Active Screen
                  </button>
                ) : portal.url ? (
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTick()}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/50"
                  >
                    <span>Open {portal.title}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      sound.playTick();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">
            Click any portal button to launch in a new window.
          </span>
          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
