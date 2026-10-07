import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import LoginPage from './components/LoginPage';
import DeveloperDashboard from './components/DeveloperPortal/DeveloperDashboard';
import CompanyDashboard from './components/CompanyPortal/CompanyDashboard';
import DeveloperOnboardingModal from './components/DeveloperPortal/DeveloperOnboardingModal';
import { api, FALLBACK_DEMO_USERS } from './services/api';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

// Protected Route Component
const ProtectedRoute = ({ currentUser, allowedRole, children }) => {
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  if (currentUser.role !== allowedRole) {
    // Redirect to their proper portal if they try to access the wrong one
    return <Navigate to={`/${currentUser.role}`} replace />;
  }

  return children;
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Persist user session whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jobmax_session', JSON.stringify(currentUser));
      
      // Auto redirect to portal if logged in and on landing page
      if (location.pathname === '/') {
        navigate(`/${currentUser.role}`, { replace: true });
      }
    } else {
      localStorage.removeItem('jobmax_session');
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, [currentUser, navigate, location.pathname]);

  // Listen to Firebase Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Firebase authenticated
        const saved = localStorage.getItem('jobmax_session');
        if (saved) {
          try { 
            const parsed = JSON.parse(saved);
            if (parsed.uid === user.uid) {
              setCurrentUser(parsed);
              // Make sure we sync in background if role is already known
              api.syncFirebaseUser(user, parsed.role, parsed).catch(console.error);
            } else {
              setCurrentUser(null);
            }
          } catch (e) {
            setCurrentUser(null);
          }
        }
      } else {
        // Firebase signed out
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // Custom role selection & registration from landing hero
  const handleSelectRole = (role, userData) => {
    const userObj = {
      id: `user_${Date.now()}`,
      uid: userData.uid,
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

    // Sync to Firestore immediately upon role selection
    if (auth.currentUser && auth.currentUser.uid === userData.uid) {
      api.syncFirebaseUser(auth.currentUser, role, userObj).catch(console.error);
    }

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Firebase Signout Error:", e);
    }
    setCurrentUser(null);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-blue-600 font-medium">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={(user) => {
          setCurrentUser(user);
        }}
        onLogout={handleLogout}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              !currentUser ? (
                <LandingHero
                  onSelectRole={handleSelectRole}
                />
              ) : (
                <Navigate to={`/${currentUser.role}`} replace />
              )
            } 
          />

          <Route 
            path="/login" 
            element={
              !currentUser ? (
                <LoginPage
                  onSelectRole={handleSelectRole}
                />
              ) : (
                <Navigate to={`/${currentUser.role}`} replace />
              )
            } 
          />

          <Route 
            path="/developer/*" 
            element={
              <ProtectedRoute currentUser={currentUser} allowedRole="developer">
                <DeveloperDashboard
                  currentUser={currentUser}
                  onUpdateUserSkills={handleUpdateUserSkills}
                  onOpenOnboarding={() => setIsOnboardingOpen(true)}
                />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/company/*" 
            element={
              <ProtectedRoute currentUser={currentUser} allowedRole="company">
                <CompanyDashboard currentUser={currentUser} />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route - redirects appropriately */}
          <Route 
            path="*" 
            element={<Navigate to={currentUser ? `/${currentUser.role}` : "/"} replace />} 
          />
        </Routes>
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

    </div>
  );
}
