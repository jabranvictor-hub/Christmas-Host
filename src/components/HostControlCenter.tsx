import React, { useState } from 'react';
import {
  Play,
  Pause,
  Square,
  Megaphone,
  Radio,
  Volume2,
  Mic,
  Clock,
  Sparkles,
  Bell,
  ThumbsUp,
  CheckCircle,
} from 'lucide-react';
import { ClassStatus, TimetableItem, NavigationTab } from '../types';
import { sound } from '../utils/audio';

interface HostControlCenterProps {
  classStatus: ClassStatus;
  onSetClassStatus: (status: ClassStatus) => void;
  onOpenAnnouncementModal: () => void;
  onTabChange: (tab: NavigationTab) => void;
  currentActivity: TimetableItem;
  onSelectActivity: (activity: TimetableItem) => void;
  timetable: TimetableItem[];
}

export const HostControlCenter: React.FC<HostControlCenterProps> = ({
  classStatus,
  onSetClassStatus,
  onOpenAnnouncementModal,
  onTabChange,
  currentActivity,
  onSelectActivity,
  timetable,
}) => {
  const [micActive, setMicActive] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleStartClass = () => {
    onSetClassStatus('LIVE');
    sound.playJingle();
    showFeedback('🟢 Class started! Class Status is now LIVE 🟢');
  };

  const handlePauseClass = () => {
    onSetClassStatus('PAUSED');
    sound.playBuzzer();
    showFeedback('⏸️ Class paused. Take a quick intermission.');
  };

  const handleResumeClass = () => {
    onSetClassStatus('LIVE');
    sound.playJingle();
    showFeedback('▶️ Class resumed! Class Status is LIVE 🟢');
  };

  const handleEndClass = () => {
    onSetClassStatus('ENDED');
    sound.playBuzzer();
    showFeedback('🔴 Class ended. Great job hosting tonight, Elijah!');
  };

  const handleStartHosting = () => {
    if (classStatus !== 'LIVE') {
      onSetClassStatus('LIVE');
    }
    sound.playJingle();
    onTabChange('hosting');
  };

  const getStatusDisplay = () => {
    switch (classStatus) {
      case 'LIVE':
        return 'Class Status: LIVE 🟢';
      case 'PAUSED':
        return 'Class Status: PAUSED ⏸️';
      case 'ENDED':
        return 'Class Status: ENDED 🔴';
      default:
        return 'Class Status: Not Started';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Status Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Mic className="w-4 h-4" />
              <span>Victor's Christmas School 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Host Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Official command desk for Elijah Victor. Control live classroom status, broadcast stage announcements, and manage stage flow.
            </p>
          </div>

          {/* Current Class Status Display Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0 min-w-[260px]">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Live Monitor Status
            </div>
            <div
              className={`text-lg sm:text-xl font-extrabold tracking-wide font-mono px-3 py-1.5 rounded-lg border text-center ${
                classStatus === 'LIVE'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 animate-pulse'
                  : classStatus === 'PAUSED'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                  : classStatus === 'ENDED'
                  ? 'bg-red-500/10 text-red-300 border-red-500/40'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              {getStatusDisplay()}
            </div>
          </div>
        </div>

        {feedbackMessage && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Main Live Host Controls Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
            🎬 Live Host Action Controls
          </h2>
          <p className="text-xs text-slate-400">
            Click any button below to trigger immediate classroom audio cues, update the hosting screen, and notify connected devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Button 1: START CLASS */}
          <button
            onClick={handleStartClass}
            disabled={classStatus === 'LIVE'}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🟢</span>
              <div className="text-left">
                <div>START CLASS</div>
                <div className="text-[11px] font-normal text-emerald-200">
                  {classStatus === 'LIVE' ? 'Currently Live' : 'Open session & ring bells'}
                </div>
              </div>
            </div>
            <Play className="w-5 h-5 fill-white group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Button 2: PAUSE CLASS */}
          <button
            onClick={handlePauseClass}
            disabled={classStatus !== 'LIVE'}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏸️</span>
              <div className="text-left">
                <div>PAUSE CLASS</div>
                <div className="text-[11px] font-normal text-amber-200">
                  Take a break / intermission
                </div>
              </div>
            </div>
            <Pause className="w-5 h-5 fill-white" />
          </button>

          {/* Button 3: RESUME CLASS */}
          <button
            onClick={handleResumeClass}
            disabled={classStatus !== 'PAUSED'}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">▶️</span>
              <div className="text-left">
                <div>RESUME CLASS</div>
                <div className="text-[11px] font-normal text-teal-200">
                  Continue live presentation
                </div>
              </div>
            </div>
            <Play className="w-5 h-5 fill-white group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Button 4: END CLASS */}
          <button
            onClick={handleEndClass}
            disabled={classStatus === 'ENDED' || classStatus === 'Not Started'}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔴</span>
              <div className="text-left">
                <div>END CLASS</div>
                <div className="text-[11px] font-normal text-red-200">
                  Conclude today's program
                </div>
              </div>
            </div>
            <Square className="w-5 h-5 fill-white" />
          </button>

          {/* Button 5: SEND ANNOUNCEMENT */}
          <button
            onClick={() => {
              sound.playChime();
              onOpenAnnouncementModal();
            }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📢</span>
              <div className="text-left">
                <div>SEND ANNOUNCEMENT</div>
                <div className="text-[11px] font-normal text-blue-200">
                  Broadcast live text cue
                </div>
              </div>
            </div>
            <Megaphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Button 6: START HOSTING */}
          <button
            onClick={handleStartHosting}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all cursor-pointer group sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎤</span>
              <div className="text-left">
                <div>START HOSTING</div>
                <div className="text-[11px] font-normal text-pink-200">
                  Open Big Stage Monitor
                </div>
              </div>
            </div>
            <Radio className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stage Cue Audio Soundboard & Microphone Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Soundboard cues */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                🔔 Live Stage Soundboard
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Web Audio FX</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                sound.playJingle();
                showFeedback('🔔 Played Christmas Bells chime on stage');
              }}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>🔔</span>
              <span>Christmas Bells</span>
            </button>

            <button
              onClick={() => {
                sound.playChime();
                showFeedback('📢 Played Announcement Bell on stage');
              }}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>📢</span>
              <span>Announcement Ding</span>
            </button>

            <button
              onClick={() => {
                sound.playSuccess();
                showFeedback('⭐ Played Fanfare cue on stage');
              }}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>⭐</span>
              <span>Victory Fanfare</span>
            </button>

            <button
              onClick={() => {
                sound.playBuzzer();
                showFeedback('⏱️ Played Time-Up buzzer on stage');
              }}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:bg-slate-850 text-xs font-medium text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>⏱️</span>
              <span>Timer Buzzer</span>
            </button>
          </div>
        </div>

        {/* Microphone & Stage Visualizer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                🎤 Host Microphone Monitor
              </h3>
            </div>
            <button
              onClick={() => {
                setMicActive(!micActive);
                sound.playTick();
              }}
              className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                micActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {micActive ? 'MIC ON' : 'MUTED'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Wireless Stage Mic 1:</span>
              <span className="font-semibold text-emerald-400 font-mono">
                {micActive ? 'CONNECTED (Elijah)' : 'MUTED'}
              </span>
            </div>

            {/* Simulated audio level meter */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Signal Strength</span>
                <span>-6 dB (Optimal)</span>
              </div>
              <div className="flex gap-1 h-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all duration-300 ${
                      !micActive
                        ? 'bg-slate-800'
                        : i < 11
                        ? 'bg-emerald-500 animate-pulse'
                        : i < 14
                        ? 'bg-amber-400'
                        : 'bg-red-500'
                    }`}
                    style={{
                      opacity: micActive ? Math.min(1, 0.4 + (i / 16) * 0.6) : 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stage Activity Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Select Active Timetable Activity
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Current: {currentActivity.title} ({currentActivity.time})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {timetable.map((item) => {
            const isSelected = item.id === currentActivity.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectActivity(item);
                  sound.playTick();
                  showFeedback(`Now hosting: ${item.title}`);
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-950/80 border-red-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                </div>
                <div className="text-xs font-bold truncate">{item.title}</div>
                {isSelected && (
                  <div className="text-[10px] text-emerald-400 font-medium mt-1">
                    ● Selected Active
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
