import React, { useState, useEffect } from 'react';
import {
  Mic2,
  Radio,
  Clock,
  Users,
  Megaphone,
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  HostInfo,
  TimetableItem,
  Student,
  Announcement,
  ClassStatus,
} from '../types';
import { sound } from '../utils/audio';

interface HostingScreenViewProps {
  host: HostInfo;
  currentActivity: TimetableItem;
  timetable: TimetableItem[];
  students: Student[];
  announcements: Announcement[];
  classStatus: ClassStatus;
  onSetClassStatus: (status: ClassStatus) => void;
  onSelectActivity: (activity: TimetableItem) => void;
}

export const HostingScreenView: React.FC<HostingScreenViewProps> = ({
  host,
  currentActivity,
  timetable,
  students,
  announcements,
  classStatus,
  onSetClassStatus,
  onSelectActivity,
}) => {
  // Timer state (seconds)
  const initialDuration = (currentActivity.durationMinutes || 15) * 60;
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isStageLive, setIsStageLive] = useState(classStatus === 'LIVE');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync timer when activity changes
  useEffect(() => {
    setTimeLeft((currentActivity.durationMinutes || 15) * 60);
    setTimerRunning(false);
  }, [currentActivity]);

  // Sync stage live state with classStatus
  useEffect(() => {
    setIsStageLive(classStatus === 'LIVE');
  }, [classStatus]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            sound.playBuzzer();
            setTimerRunning(false);
            return 0;
          }
          if (prev <= 6) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    sound.playTick();
    setTimerRunning(!timerRunning);
  };

  const handleResetTimer = () => {
    sound.playTick();
    setTimerRunning(false);
    setTimeLeft((currentActivity.durationMinutes || 15) * 60);
  };

  const handleAddMinutes = (mins: number) => {
    sound.playTick();
    setTimeLeft((prev) => prev + mins * 60);
  };

  const handleHostLiveClick = () => {
    sound.playJingle();
    if (!isStageLive) {
      setIsStageLive(true);
      onSetClassStatus('LIVE');
    } else {
      setIsStageLive(false);
      onSetClassStatus('PAUSED');
    }
  };

  // Find next activity
  const currentIndex = timetable.findIndex((t) => t.id === currentActivity.id);
  const nextActivity =
    currentIndex >= 0 && currentIndex < timetable.length - 1
      ? timetable[currentIndex + 1]
      : timetable[0];

  const presentStudents = students.filter((s) => s.status === 'present');

  return (
    <div
      className={`space-y-6 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-6 md:p-10'
          : ''
      }`}
    >
      {/* Giant Stage Header: 🎄 VICTOR'S CHRISTMAS SCHOOL & 🎤 Host: Elijah Victor */}
      <div className="relative rounded-3xl bg-radial from-red-950/90 via-slate-950 to-emerald-950 border-2 border-red-800/60 p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
        {/* Stage lighting bokeh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-400/20 to-transparent blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Christmas 2026 · Stage View</span>
          </div>

          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              sound.playTick();
            }}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title="Toggle Stage Projector Mode"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Exit Stage Mode</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Stage Projector Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Large Required Title */}
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-emerald-200 tracking-tight font-serif-christmas drop-shadow-md">
            🎄 VICTOR'S CHRISTMAS SCHOOL
          </h1>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-300 text-sm sm:text-lg font-bold shadow-md">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600/30 border border-emerald-400 flex items-center justify-center text-base select-none">
              🎤
            </span>
            <span>Host: {host.name}</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Punjab, HMC, Street Number 1, Pakistan 🇵🇰
          </p>
        </div>

        {/* Big HOST LIVE Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleHostLiveClick}
            className={`group relative px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-2xl tracking-wider transition-all duration-300 shadow-2xl cursor-pointer active:scale-95 ${
              isStageLive
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-emerald-500/40 ring-4 ring-emerald-400/40 animate-pulse'
                : 'bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white hover:brightness-110 shadow-red-600/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🎤</span>
              <span className="font-extrabold">
                {isStageLive ? 'HOSTING LIVE 🟢' : 'HOST LIVE'}
              </span>
              <Radio
                className={`w-6 h-6 ${
                  isStageLive ? 'text-white animate-spin' : 'text-white'
                }`}
              />
            </div>
            <div className="text-[11px] font-normal tracking-normal text-white/80 mt-0.5">
              {isStageLive
                ? 'Stage is LIVE · Click to Pause / Take Intermission'
                : 'Click to Broadcast Live on Main Auditorium Screen'}
            </div>
          </button>
        </div>
      </div>

      {/* Main Grid: Current Activity + Countdown Timer (Left) & Next Activity + Students + Announcements (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Current Activity & Big Countdown (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Current Activity Box */}
          <div className="bg-slate-900/90 border-2 border-emerald-600/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Current Activity · Stage Active
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                Scheduled: {currentActivity.time}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl sm:text-5xl p-4 rounded-2xl bg-red-950/70 border border-red-800/50 shrink-0">
                {currentActivity.icon}
              </div>
              <div className="space-y-1.5 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {currentActivity.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentActivity.description}
                </p>
                {currentActivity.cueNotes && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed flex items-start gap-2">
                    <span className="text-sm">💡</span>
                    <div>
                      <strong className="text-amber-300">Host Cue:</strong> {currentActivity.cueNotes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Countdown Timer Display */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ACTIVITY COUNTDOWN TIMER</span>
              </span>
              <span>{timerRunning ? 'TICKING 🟢' : 'PAUSED ⏸️'}</span>
            </div>

            {/* Giant Clock Digits */}
            <div className="py-4">
              <div
                className={`font-mono text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight tabular-nums select-none ${
                  timeLeft <= 60
                    ? 'text-red-400 animate-pulse'
                    : timeLeft <= 300
                    ? 'text-amber-300'
                    : 'text-white'
                }`}
              >
                {formatTimer(timeLeft)}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {timeLeft === 0 ? 'Time is up! Switch to next activity.' : 'Remaining in this timetable segment'}
              </p>
            </div>

            {/* Timer Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleToggleTimer}
                className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all ${
                  timerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {timerRunning ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{timerRunning ? 'PAUSE TIMER' : 'START TIMER'}</span>
              </button>

              <button
                onClick={handleResetTimer}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Reset to segment default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => handleAddMinutes(1)}
                className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold cursor-pointer transition-colors"
              >
                +1 Min
              </button>

              <button
                onClick={() => handleAddMinutes(5)}
                className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold cursor-pointer transition-colors"
              >
                +5 Min
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Present Students + Announcements + Next Activity (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Next Activity Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="uppercase tracking-wider">Next Activity</span>
              <span>{nextActivity.time}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{nextActivity.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{nextActivity.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {nextActivity.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectActivity(nextActivity);
                  sound.playTick();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold cursor-pointer shrink-0 transition-colors"
              >
                Switch Now
              </button>
            </div>
          </div>

          {/* Present Students Spotlight */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  🟢 Present Students ({presentStudents.length})
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Active in Hall</span>
            </div>

            <div className="space-y-2">
              {presentStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${s.avatarColor} text-white font-bold text-xs flex items-center justify-center`}
                    >
                      {s.avatarInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{s.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded">
                          {s.grade}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{s.notes}</div>
                    </div>
                  </div>
                  <div className="text-xs text-amber-400 font-mono flex items-center gap-1">
                    <span>⭐</span>
                    <span className="font-bold">{s.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Announcements Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  📢 Stage Announcements
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {announcements.length} Active
              </span>
            </div>

            <div className="space-y-2">
              {announcements.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{a.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{a.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
