import React, { useState, useEffect } from 'react';
import {
  INITIAL_HOST,
  INITIAL_STUDENTS,
  INITIAL_TIMETABLE,
  INITIAL_GAMES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_MEMORIES,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';
import {
  HostInfo,
  Student,
  TimetableItem,
  ChristmasGame,
  Announcement,
  SchoolEvent,
  MemoryItem,
  AppNotification,
  ClassStatus,
  NavigationTab,
} from './types';
import { sound } from './utils/audio';
import { Snowfall } from './components/Snowfall';
import { LoginScreen } from './components/LoginScreen';
import { TopNavbar } from './components/TopNavbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { HostControlCenter } from './components/HostControlCenter';
import { HostingScreenView } from './components/HostingScreenView';
import { TimetableSection } from './components/TimetableSection';
import { GamesSection } from './components/GamesSection';
import { AttendanceView } from './components/AttendanceView';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { EventsSection } from './components/EventsSection';
import { MemoriesSection } from './components/MemoriesSection';
import { HostProfileSection } from './components/HostProfileSection';
import { NotificationsSection } from './components/NotificationsSection';
import { SettingsSection } from './components/SettingsSection';
import { SchoolPortalsModal } from './components/SchoolPortalsModal';
import { QuickAnnouncementModal } from './components/QuickAnnouncementModal';

export default function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vcs_host_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  // App Data State
  const [host, setHost] = useState<HostInfo>(() => {
    try {
      const saved = localStorage.getItem('vcs_host_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.avatarUrl = '';
        return parsed;
      }
      return INITIAL_HOST;
    } catch {
      return INITIAL_HOST;
    }
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [timetable, setTimetable] = useState<TimetableItem[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_timetable');
      return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
    } catch {
      return INITIAL_TIMETABLE;
    }
  });

  const [currentActivity, setCurrentActivity] = useState<TimetableItem>(() => {
    return timetable.find((t) => t.status === 'current') || timetable[0];
  });

  const [games, setGames] = useState<ChristmasGame[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_games');
      return saved ? JSON.parse(saved) : INITIAL_GAMES;
    } catch {
      return INITIAL_GAMES;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [events, setEvents] = useState<SchoolEvent[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_memories');
      return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('vcs_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Host Portal Status
  const [classStatus, setClassStatus] = useState<ClassStatus>('Not Started');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsModalOpen, setPortalsModalOpen] = useState(false);
  const [quickAnnouncementOpen, setQuickAnnouncementOpen] = useState(false);

  // Festive Settings
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vcs_host_logged_in', isLoggedIn ? 'true' : 'false');
    } catch {
      // safe fallback
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('vcs_host_info', JSON.stringify(host));
    } catch {}
  }, [host]);

  useEffect(() => {
    try {
      localStorage.setItem('vcs_announcements', JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('vcs_memories', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('vcs_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClassStatus('Not Started');
  };

  const handleToggleSnow = () => {
    setSnowEnabled(!snowEnabled);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSetClassStatus = (status: ClassStatus) => {
    setClassStatus(status);
  };

  const handleSelectActivity = (activity: TimetableItem) => {
    setCurrentActivity(activity);
    setTimetable((prev) =>
      prev.map((item) => ({
        ...item,
        status: item.id === activity.id ? 'current' : item.status,
      }))
    );
  };

  const handleAddAnnouncement = (
    newAnnouncement: Omit<Announcement, 'id' | 'timestamp'>
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const fullItem: Announcement = {
      id: `a-${Date.now()}`,
      ...newAnnouncement,
      timestamp: timeStr,
    };
    setAnnouncements((prev) => [fullItem, ...prev]);

    // Also add to notifications
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: fullItem.title,
      message: fullItem.message,
      time: 'Just now',
      icon: '📢',
      unread: true,
      type: 'general',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddMemory = (
    newMemory: Omit<MemoryItem, 'id' | 'timestamp' | 'likes'>
  ) => {
    const fullMemory: MemoryItem = {
      id: `m-${Date.now()}`,
      ...newMemory,
      timestamp: 'Dec 24, 2026 · Just now',
      likes: 1,
    };
    setMemories((prev) => [fullMemory, ...prev]);
  };

  const handleAwardStar = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, stars: s.stars + 1 } : s))
    );
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetData = () => {
    setHost(INITIAL_HOST);
    setStudents(INITIAL_STUDENTS);
    setTimetable(INITIAL_TIMETABLE);
    setCurrentActivity(INITIAL_TIMETABLE[0]);
    setGames(INITIAL_GAMES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setEvents(INITIAL_EVENTS);
    setMemories(INITIAL_MEMORIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setClassStatus('Not Started');
    localStorage.clear();
    sound.playJingle();
  };

  // If not logged in, show Login Screen
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 relative">
        <Snowfall enabled={snowEnabled} />
        <LoginScreen onLogin={handleLogin} />
      </main>
    );
  }

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Ambient Winter Snowfall */}
      <Snowfall enabled={snowEnabled} />

      {/* Top Navbar */}
      <TopNavbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        classStatus={classStatus}
        snowEnabled={snowEnabled}
        onToggleSnow={handleToggleSnow}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onLogout={handleLogout}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        unreadCount={unreadCount}
        host={host}
        onOpenPortalsModal={() => setPortalsModalOpen(true)}
      />

      {/* Main Body with Sidebar + Active View */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          host={host}
          classStatus={classStatus}
          unreadNotifications={unreadCount}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
          onOpenPortalsModal={() => setPortalsModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {currentTab === 'dashboard' && (
            <DashboardView
              host={host}
              students={students}
              timetable={timetable}
              events={events}
              announcements={announcements}
              classStatus={classStatus}
              onTabChange={setCurrentTab}
              onStartClass={() => handleSetClassStatus('LIVE')}
              onOpenPortalsModal={() => setPortalsModalOpen(true)}
            />
          )}

          {currentTab === 'controls' && (
            <HostControlCenter
              classStatus={classStatus}
              onSetClassStatus={handleSetClassStatus}
              onOpenAnnouncementModal={() => setQuickAnnouncementOpen(true)}
              onTabChange={setCurrentTab}
              currentActivity={currentActivity}
              onSelectActivity={handleSelectActivity}
              timetable={timetable}
            />
          )}

          {currentTab === 'hosting' && (
            <HostingScreenView
              host={host}
              currentActivity={currentActivity}
              timetable={timetable}
              students={students}
              announcements={announcements}
              classStatus={classStatus}
              onSetClassStatus={handleSetClassStatus}
              onSelectActivity={handleSelectActivity}
            />
          )}

          {currentTab === 'timetable' && (
            <TimetableSection
              timetable={timetable}
              currentActivity={currentActivity}
              onSelectActivity={handleSelectActivity}
              onTabChange={setCurrentTab}
            />
          )}

          {currentTab === 'games' && (
            <GamesSection
              games={games}
              students={students}
              onAwardStar={handleAwardStar}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceView
              students={students}
              onOpenPortalsModal={() => setPortalsModalOpen(true)}
            />
          )}

          {currentTab === 'announcements' && (
            <AnnouncementsSection
              announcements={announcements}
              onAddAnnouncement={handleAddAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
            />
          )}

          {currentTab === 'events' && (
            <EventsSection
              events={events}
              timetable={timetable}
              onSelectActivity={handleSelectActivity}
              onSetClassStatus={handleSetClassStatus}
              onTabChange={setCurrentTab}
            />
          )}

          {currentTab === 'memories' && (
            <MemoriesSection
              memories={memories}
              timetable={timetable}
              onSelectActivity={handleSelectActivity}
              onSetClassStatus={handleSetClassStatus}
              onTabChange={setCurrentTab}
              onAddMemory={handleAddMemory}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsSection
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              onDeleteNotification={handleDeleteNotification}
              onTabChange={setCurrentTab}
            />
          )}

          {currentTab === 'profile' && (
            <HostProfileSection host={host} onUpdateHost={setHost} />
          )}

          {currentTab === 'settings' && (
            <SettingsSection
              snowEnabled={snowEnabled}
              onToggleSnow={handleToggleSnow}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* School Portals Modal */}
      <SchoolPortalsModal
        isOpen={portalsModalOpen}
        onClose={() => setPortalsModalOpen(false)}
        onSelectHostPortal={() => setCurrentTab('hosting')}
      />

      {/* Quick Announcement Broadcast Modal */}
      <QuickAnnouncementModal
        isOpen={quickAnnouncementOpen}
        onClose={() => setQuickAnnouncementOpen(false)}
        onBroadcast={handleAddAnnouncement}
      />
    </div>
  );
}
