import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Play,
  Pause,
  Square,
  Sparkles,
  Trophy,
  HelpCircle,
  Eye,
  Award,
  Clock,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChristmasGame, Student } from '../types';
import { sound } from '../utils/audio';

interface GamesSectionProps {
  games: ChristmasGame[];
  students: Student[];
  onAwardStar: (studentId: string) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  games: initialGames,
  students,
  onAwardStar,
}) => {
  const [games, setGames] = useState<ChristmasGame[]>(initialGames);
  const [selectedGameId, setSelectedGameId] = useState<string>(initialGames[0].id);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const activeGame = games.find((g) => g.id === selectedGameId) || games[0];

  // Active game countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeGame.status === 'running' && activeGame.timerSeconds > 0) {
      interval = setInterval(() => {
        setGames((prev) =>
          prev.map((g) => {
            if (g.id === activeGame.id) {
              if (g.timerSeconds <= 1) {
                sound.playBuzzer();
                return { ...g, timerSeconds: 0, status: 'paused' };
              }
              if (g.timerSeconds <= 5) {
                sound.playTick();
              }
              return { ...g, timerSeconds: g.timerSeconds - 1 };
            }
            return g;
          })
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeGame.status, activeGame.timerSeconds, activeGame.id]);

  const handleStartGame = (gameId: string) => {
    sound.playJingle();
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === gameId) {
          return {
            ...g,
            status: 'running',
            timerSeconds: g.timerSeconds > 0 ? g.timerSeconds : g.initialTimerSeconds,
          };
        }
        return g;
      })
    );
  };

  const handlePauseGame = (gameId: string) => {
    sound.playBuzzer();
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, status: 'paused' } : g))
    );
  };

  const handleEndGame = (gameId: string) => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#10b981', '#f59e0b', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
    setGames((prev) =>
      prev.map((g) =>
        g.id === gameId
          ? {
              ...g,
              status: 'ended',
              timerSeconds: g.initialTimerSeconds,
            }
          : g
      )
    );
  };

  const handleNextRound = () => {
    sound.playTick();
    setShowAnswer(false);
    setShowClue(false);
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === activeGame.id) {
          const nextR = g.currentRound < g.totalRounds ? g.currentRound + 1 : 1;
          return {
            ...g,
            currentRound: nextR,
            timerSeconds: g.initialTimerSeconds,
            status: 'running',
          };
        }
        return g;
      })
    );
  };

  const handleAwardPoints = (studentId: string, pts: number) => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#ef4444'],
      });
    } catch {
      // safe fallback
    }
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === activeGame.id) {
          const currentPts = g.scores[studentId] || 0;
          return {
            ...g,
            scores: { ...g.scores, [studentId]: currentPts + pts },
          };
        }
        return g;
      })
    );
    onAwardStar(studentId);
  };

  const currentQuestion =
    activeGame.questions[activeGame.currentRound - 1] || activeGame.questions[0];

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            🎮 Christmas Games
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Host high-energy festive games on stage for Arnan, Eliab, and Balaj. Manage questions, timer, clues, and live scoreboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>5 Holiday Games Ready</span>
          </div>
        </div>
      </div>

      {/* 5 Games Quick Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {games.map((g) => {
          const isSelected = g.id === activeGame.id;
          return (
            <div
              key={g.id}
              onClick={() => {
                setSelectedGameId(g.id);
                sound.playTick();
                setShowAnswer(false);
                setShowClue(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-red-950/90 to-slate-900 border-red-500 shadow-lg ring-1 ring-red-500/50'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{g.icon}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                      g.status === 'running'
                        ? 'bg-emerald-500/20 text-emerald-300 animate-pulse'
                        : g.status === 'paused'
                        ? 'bg-amber-500/20 text-amber-300'
                        : g.status === 'ended'
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {g.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1 line-clamp-1">
                  {g.title}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">
                  {g.category}
                </p>
              </div>

              {/* Mini button controls per card */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">
                  Round {g.currentRound}/{g.totalRounds}
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {g.timerSeconds}s
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Stage Box for Selected Game */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Game Title, Status, and 3 Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-red-950/60 rounded-2xl border border-red-800/40">
              {activeGame.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  {activeGame.category}
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  Round {activeGame.currentRound} of {activeGame.totalRounds}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeGame.title}
              </h2>
            </div>
          </div>

          {/* Three Mandatory Buttons: ▶️ START GAME, ⏸️ PAUSE GAME, 🔴 END GAME */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleStartGame(activeGame.id)}
              disabled={activeGame.status === 'running'}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>▶️ START GAME</span>
            </button>

            <button
              onClick={() => handlePauseGame(activeGame.id)}
              disabled={activeGame.status !== 'running'}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>⏸️ PAUSE GAME</span>
            </button>

            <button
              onClick={() => handleEndGame(activeGame.id)}
              disabled={activeGame.status === 'ended'}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>🔴 END GAME</span>
            </button>
          </div>
        </div>

        {/* Question & Prompt Stage Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>QUESTION / CHALLENGE PROMPT</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xl font-bold text-emerald-400 tabular-nums">
                {activeGame.timerSeconds}s
              </span>
            </div>
          </div>

          <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
            {currentQuestion?.question}
          </div>

          {/* Multiple choice options if available */}
          {currentQuestion?.options && currentQuestion.options.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQuestion.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-3 font-medium"
                >
                  <span className="w-6 h-6 rounded-lg bg-red-950/80 text-red-300 font-bold text-xs flex items-center justify-center border border-red-800/40">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          )}

          {/* Host Reveal Bar: Clue & Answer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {currentQuestion?.clue && (
                <button
                  onClick={() => {
                    setShowClue(!showClue);
                    sound.playTick();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs text-amber-300 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showClue ? 'Hide Clue' : '💡 Reveal Clue'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowAnswer(!showAnswer);
                  sound.playSuccess();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs text-emerald-300 font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Hide Answer' : '✨ Reveal Answer'}</span>
              </button>
            </div>

            <button
              onClick={handleNextRound}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Next Round ({activeGame.currentRound}/{activeGame.totalRounds})</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Revealed Clue Card */}
          {showClue && currentQuestion?.clue && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 animate-fade-in flex items-start gap-2">
              <span className="text-base">💡</span>
              <div>
                <strong className="text-amber-300">Host Clue for Students:</strong>{' '}
                {currentQuestion.clue}
              </div>
            </div>
          )}

          {/* Revealed Answer Card */}
          {showAnswer && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 animate-fade-in flex items-start gap-2">
              <span className="text-base">🎉</span>
              <div>
                <strong className="text-emerald-300">Correct Answer:</strong>{' '}
                {currentQuestion?.answer}
              </div>
            </div>
          )}
        </div>

        {/* Live Student Scoreboard & Points Awarding */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Student Scoreboard & Rewards (Tonight's Game)</span>
            </h3>
            <span className="text-[10px] text-slate-400">Award points directly on stage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {students.map((student) => {
              const score = activeGame.scores[student.id] || 0;
              return (
                <div
                  key={student.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full ${student.avatarColor} text-white font-bold text-xs flex items-center justify-center`}
                      >
                        {student.avatarInitials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{student.name}</div>
                        <div className="text-[10px] text-slate-400">{student.grade}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-mono font-bold text-amber-300">
                        {score} pts
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => handleAwardPoints(student.id, 5)}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-[11px] font-bold cursor-pointer transition-colors"
                    >
                      +5 Pts ⭐
                    </button>
                    <button
                      onClick={() => handleAwardPoints(student.id, 10)}
                      className="flex-1 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white text-[11px] font-bold cursor-pointer transition-colors"
                    >
                      +10 Pts 🎁
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
