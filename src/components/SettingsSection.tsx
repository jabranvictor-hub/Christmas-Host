import React from 'react';
import { Settings, Snowflake, Volume2, Monitor, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface SettingsSectionProps {
  snowEnabled: boolean;
  onToggleSnow: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetData: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  snowEnabled,
  onToggleSnow,
  soundEnabled,
  onToggleSound,
  onResetData,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Settings className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ⚙️ Host Portal Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Configure visual stage display preferences, ambient winter snowfall, audio feedback, and demo data presets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual & Atmosphere */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Atmosphere & Stage Visuals</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <Snowflake className="w-5 h-5 text-sky-400" />
                <div>
                  <div className="text-xs font-bold text-white">Gentle Snowfall Canvas</div>
                  <div className="text-[10px] text-slate-400">
                    Ambient animated winter snow effect across all screens
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playTick();
                  onToggleSnow();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  snowEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    snowEnabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Audio & Sound Cues</div>
                  <div className="text-[10px] text-slate-400">
                    Web Audio bells, announcements ding, buzzer, and stage fanfares
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playTick();
                  onToggleSound();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    soundEnabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Demo Management & Diagnostics */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>Host Environment Information</span>
          </h2>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Assigned Host:</span>
              <span className="text-white font-semibold">Elijah Victor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">School:</span>
              <span className="text-white">Victor's Christmas School</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-300">Punjab, Pakistan 🇵🇰</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Host Account ID:</span>
              <span className="text-amber-300 font-mono">HOST001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Storage Mode:</span>
              <span className="text-emerald-400 font-mono">Browser Local Storage</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playBuzzer();
                if (window.confirm('Reset timetable, scores, and announcements back to initial state?')) {
                  onResetData();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-red-600/30 hover:border-red-500/50 border border-slate-700 text-slate-300 hover:text-red-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Portal Data to Initial Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
