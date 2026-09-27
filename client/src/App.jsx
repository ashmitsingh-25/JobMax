import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import DeveloperDashboard from './components/DeveloperPortal/DeveloperDashboard';
import CompanyDashboard from './components/CompanyPortal/CompanyDashboard';
import DeveloperOnboardingModal from './components/DeveloperPortal/DeveloperOnboardingModal';
import { api, FALLBACK_DEMO_USERS } from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPortal, setCurrentPortal] = useState('developer'); // 'developer' | 'company'
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Quick login handler for demo accounts
  const handleQuickLogin = async (userId) => {
    try {
      const res = await api.switchDemoUser(userId);
      if (res && res.success && res.user) {
        setCurrentUser(res.user);
        setCurrentPortal(res.user.role || 'developer');
        return;
      }
    } catch (err) {
      console.warn("API switchDemoUser warning, using client fallback:", err);
    }

    // Instant local fallback
    const fallbackUser = (FALLBACK_DEMO_USERS && FALLBACK_DEMO_USERS.find(u => u.id === userId)) || FALLBACK_DEMO_USERS[0];
    setCurrentUser(fallbackUser);
    setCurrentPortal(fallbackUser.role || 'developer');
  };

  // Custom role selection & registration from landing hero
  const handleSelectRole = (role, userData) => {
    const userObj = {
      id: `user_${Date.now()}`,
      name: userData.name || (role === 'developer' ? 'Aarav Sharma' : 'Sarah Jenkins'),
      email: userData.email,
      role: role,
      track: 'fresher',
      subTrack: 'on-campus',
      college: 'Indian Institute of Technology (IIT) Delhi',
      collegeId: 'iit-delhi',
      companyName: role === 'company' ? 'Microsoft' : null,
      skills: [
        'Data Structures & Algorithms',
        'Dynamic Programming',
        'Graph Algorithms',
        'C++',
        'Java',
        'Object-Oriented Programming',
        'Operating Systems',
        'Database Management Systems',
        'PostgreSQL'
      ],
      avatar: role === 'developer' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' 
        : 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150'
    };

    setCurrentUser(userObj);
    setCurrentPortal(role);

    // If developer, prompt onboarding classification modal
    if (role === 'developer') {
      setIsOnboardingOpen(true);
    }
  };

  // Update skills in real time
  const handleUpdateUserSkills = (newSkills, metadata = null) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      skills: newSkills,
      ...(metadata?.detectedCgpa && { cgpa: metadata.detectedCgpa }),
      ...(metadata?.detectedYoE && { yearsOfExperience: metadata.detectedYoE })
    };
    setCurrentUser(updated);
  };

  // Save classification from onboarding modal
  const handleSaveClassification = ({ track, subTrack }) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      track,
      subTrack
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans selection:bg-brand-green selection:text-black">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        currentPortal={currentPortal}
        setCurrentPortal={setCurrentPortal}
        onSwitchUser={(user) => {
          setCurrentUser(user);
          setCurrentPortal(user.role);
        }}
        onLogout={handleLogout}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentUser ? (
          <LandingHero
            onSelectRole={handleSelectRole}
            onQuickLogin={handleQuickLogin}
          />
        ) : currentPortal === 'developer' ? (
          <DeveloperDashboard
            currentUser={currentUser}
            onUpdateUserSkills={handleUpdateUserSkills}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        ) : (
          <CompanyDashboard
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Developer Onboarding / Classification Modal */}
      {isOnboardingOpen && (
        <DeveloperOnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onSaveClassification={handleSaveClassification}
          initialTrack={currentUser?.track || 'fresher'}
          initialSubTrack={currentUser?.subTrack || 'on-campus'}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-dark-700/80 bg-dark-900/90 py-6 mt-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span className="text-slate-300 font-bold">JobMax</span>
            <span>— AI Skill-Gap Analyzer Platform</span>
          </div>
          <p>Model calibrated on HackerRank UI design system & Tier-1 Recruitment data</p>
        </div>
      </footer>

    </div>
  );
}
