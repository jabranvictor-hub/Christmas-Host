import React, { useState } from 'react';
import { Camera, Plus, Heart, Sparkles, Play, Radio, Image as ImageIcon, Check } from 'lucide-react';
import { MemoryItem, NavigationTab, TimetableItem, ClassStatus } from '../types';
import { sound } from '../utils/audio';

interface MemoriesSectionProps {
  memories: MemoryItem[];
  timetable: TimetableItem[];
  onSelectActivity: (activity: TimetableItem) => void;
  onSetClassStatus: (status: ClassStatus) => void;
  onTabChange: (tab: NavigationTab) => void;
  onAddMemory: (memory: Omit<MemoryItem, 'id' | 'timestamp' | 'likes'>) => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  memories,
  timetable,
  onSelectActivity,
  onSetClassStatus,
  onTabChange,
  onAddMemory,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState(
    '/src/assets/images/christmas_school_hall_1790250065197.jpg'
  );
  const [tag, setTag] = useState('Celebration');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const presetImages = [
    {
      label: 'Main Christmas Hall',
      url: '/src/assets/images/christmas_school_hall_1790250065197.jpg',
    },
    {
      label: 'Students Singing Carols',
      url: '/src/assets/images/christmas_carol_students_1790250078164.jpg',
    },
    {
      label: 'Gift Sharing Packages',
      url: '/src/assets/images/christmas_gift_sharing_1790250086369.jpg',
    },
    {
      label: 'Stage & Festive Lights',
      url: '/src/assets/images/christmas_school_hall_1790250065197.jpg',
    },
  ];

  const handleStartActivity = () => {
    sound.playJingle();
    onSetClassStatus('LIVE');
    const photoActivity =
      timetable.find((t) => t.title.includes('Photos')) || timetable[7];
    onSelectActivity(photoActivity);
    onTabChange('hosting');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !caption.trim()) return;

    sound.playSuccess();
    onAddMemory({
      title: title.trim(),
      caption: caption.trim(),
      imageUrl: selectedPresetImage,
      tag,
    });

    setTitle('');
    setCaption('');
    setIsAdding(false);
  };

  const handleLike = (id: string, initialLikes: number) => {
    sound.playTick();
    setLikesMap((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialLikes;
      return { ...prev, [id]: current + 1 };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Camera className="w-4 h-4" />
            <span>Victor's Christmas School 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            📸 Photos & Memories
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Holiday scrapbook and snapshot station. Create custom photo placeholders, craft memory captions, and launch the live stage photoshoot.
          </p>
        </div>

        {/* Primary Action: Start Activity button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            onClick={handleStartActivity}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all whitespace-nowrap animate-pulse"
          >
            <Radio className="w-4 h-4" />
            <span>Start the Photos & Memories Activity</span>
          </button>

          <button
            onClick={() => {
              setIsAdding(!isAdding);
              sound.playTick();
            }}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Demo Photo</span>
          </button>
        </div>
      </div>

      {/* Add Demo Photo Placeholder Form Drawer */}
      {isAdding && (
        <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Demo Photo Placeholder & Create Caption</span>
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                1. Select Demo School Photo:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetImages.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedPresetImage(preset.url);
                      sound.playTick();
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      selectedPresetImage === preset.url
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-1.5 bg-slate-950/90 text-[10px] text-slate-200 truncate text-center">
                      {preset.label}
                    </div>
                    {selectedPresetImage === preset.url && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Stage Christmas Tree with Arnan and Eliab"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Memory Category Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Celebration">Celebration</option>
                  <option value="Students">Students</option>
                  <option value="Carols">Carols</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Decorations">Decorations</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Memory Caption (Host Commentary)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder="Write a heartwarming memory caption for the holiday scrapbook..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-md"
              >
                Save Memory to Scrapbook
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Memories Scrapbook Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memories.map((item) => {
          const currentLikes =
            likesMap[item.id] !== undefined ? likesMap[item.id] : item.likes;
          return (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" fill="%230f172a"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" fill="%2310b981" font-size="24" text-anchor="middle">🎄 Christmas School Memory</text></svg>';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                    {item.tag}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="text-amber-400">Victor's School 2026</span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Host Elijah Victor</span>
                <button
                  onClick={() => handleLike(item.id, item.likes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-rose-400 text-xs font-mono font-bold cursor-pointer transition-colors border border-slate-800 hover:border-rose-500/30"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{currentLikes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
