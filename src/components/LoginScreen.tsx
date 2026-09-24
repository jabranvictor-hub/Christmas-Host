import React, { useState } from 'react';
import { Lock, Sparkles, LogIn, User } from 'lucide-react';
import { sound } from '../utils/audio';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [hostId, setHostId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (hostId.trim().toUpperCase() === 'HOST001' && password.trim() === 'christmas2026') {
      setIsLoading(true);
      sound.playJingle();
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 350);
    } else {
      sound.playBuzzer();
      setError('Invalid Host ID or Password. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-radial from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
      {/* Background festive glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Christmas corner accents */}
      <div className="absolute top-4 left-4 text-emerald-400/40 text-2xl select-none" aria-hidden="true">
        🎄 ❄️ ⭐
      </div>
      <div className="absolute bottom-4 right-4 text-red-400/40 text-2xl select-none" aria-hidden="true">
        🎁 🎅 🔔
      </div>

      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Host branding banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-emerald-700 text-white shadow-lg mb-3">
            <span className="text-3xl">🎤</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Host Portal Login
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Punjab, HMC, Street Number 1, Pakistan 🇵🇰
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Host ID</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                placeholder="Enter your Host ID"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 text-center animate-shake">
              {error}
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Signing in...' : 'Sign In to Host Portal'}</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Host Elijah Victor · Victor's Christmas School 2026
          </p>
        </div>
      </div>
    </div>
  );
};
