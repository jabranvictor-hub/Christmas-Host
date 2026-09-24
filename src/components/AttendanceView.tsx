import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, ShieldAlert, Award, Star, ExternalLink } from 'lucide-react';
import { Student } from '../types';
import { sound } from '../utils/audio';

interface AttendanceViewProps {
  students: Student[];
  onOpenPortalsModal: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  onOpenPortalsModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');

  const presentList = students.filter((s) => s.status === 'present');
  const absentList = students.filter((s) => s.status === 'absent');

  const displayedStudents =
    filter === 'all'
      ? students
      : filter === 'present'
      ? presentList
      : absentList;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Users className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            👥 Attendance View
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Live student attendance roster for tonight's Christmas program. Host Elijah can inspect attendance status in real-time.
          </p>
        </div>

        {/* View Only Policy notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 max-w-sm">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300">View-Only Host Mode:</strong> Attendance changes should be managed through the official{' '}
            <a
              href="https://christmasatendance.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="text-amber-300 underline font-semibold cursor-pointer hover:text-white inline-flex items-center gap-0.5"
            >
              <span>Attendance Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            {' '}(or browse via{' '}
            <button
              onClick={() => {
                sound.playTick();
                onOpenPortalsModal();
              }}
              className="text-amber-300 underline font-semibold cursor-pointer hover:text-white"
            >
              Directory
            </button>
            ).
          </div>
        </div>
      </div>

      {/* Summary KPI Badges & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFilter('all');
              sound.playTick();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              filter === 'all'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <span>👨‍🎓 All Students</span>
            <span className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-[10px]">
              {students.length}
            </span>
          </button>

          <button
            onClick={() => {
              setFilter('present');
              sound.playTick();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              filter === 'present'
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <span>🟢 Present Students</span>
            <span className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-emerald-400">
              {presentList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setFilter('absent');
              sound.playTick();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              filter === 'absent'
                ? 'bg-red-600/30 text-red-300 border-red-500/50'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <span>🔴 Absent Students</span>
            <span className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-red-400">
              {absentList.length}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono self-end sm:self-center">
          Turnout: <strong className="text-emerald-400">{Math.round((presentList.length / students.length) * 100)}%</strong>
        </div>
      </div>

      {/* Student Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedStudents.map((student) => {
          const isPresent = student.status === 'present';
          return (
            <div
              key={student.id}
              className={`p-5 rounded-2xl border transition-all ${
                isPresent
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-900/40 hover:border-emerald-700/60'
                  : 'bg-gradient-to-b from-slate-900 to-slate-950 border-red-900/40 hover:border-red-700/60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${student.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shadow-md`}
                  >
                    {student.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{student.name}</h3>
                    <span className="text-xs text-slate-400 font-mono">{student.grade}</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono flex items-center gap-1 border ${
                    isPresent
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}
                >
                  {isPresent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Present 🟢</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      <span>Absent 🔴</span>
                    </>
                  )}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">
                    Host Activity Notes:
                  </span>
                  {student.notes}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 text-[11px]">Holiday Participation:</span>
                  <div className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{student.stars} Stars</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
