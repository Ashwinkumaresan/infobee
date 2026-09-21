import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import ResearchPapers from './pages/research/ResearchPapers';
import SubmitPaper from './pages/research/SubmitPaper';
import Detail from './pages/research/Detail';
import PortfolioLanding from './pages/portfolio/Portfolio';
import Hackathon from './pages/hackathon/Hackathon';
import Registration from './pages/hackathon/Registration';
import ScenarioDetails from './pages/hackathon/ScenarioDetails';
import RegisteredTeams from './pages/hackathon/RegisteredTeams';
import Footer from './components/Footer';
import { CalendarModal, JoinModal } from './components/Modals';
import AdminPortal from './components/AdminPortal';
import StudentSignup from './pages/auth/StudentSignup';
import StudentSignin from './pages/auth/StudentSignin';
import StaffSignin from './pages/auth/StaffSignin';
import StudentProfile from './pages/student/Profile';
import StaffProfile from './pages/staff/StaffProfile';
import StudentDetail from './pages/staff/StudentDetail';
import ExportData from './pages/staff/ExportData';
import ForgotPassword from './pages/auth/ForgotPassword';
import EventGallery from './pages/gallery/EventGallery';
import { JoinRequest, ContactSubmission } from './types';
import { eventsData } from './data';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.startsWith('/hackathon') ? 'hackathon' : location.pathname.startsWith('/research') ? 'research' : location.pathname.startsWith('/portfolio') ? 'portfolio' : location.pathname.startsWith('/gallery') ? 'gallery' : 'home';
  const isAuthPage = location.pathname.startsWith('/student/signin') || location.pathname.startsWith('/student/signup') || location.pathname.startsWith('/forgot-password') || location.pathname.startsWith('/staff/signin');
  const [activeSection, setActiveSection] = useState('home');
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Read auth state from cookie
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return document.cookie.includes('access_token=');
  });

  // Persistence State Managers backed by LocalStorage
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobee_registered_event_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [registrations, setRegistrations] = useState<Array<{ id: string; eventId: string; ticketCode: string; name: string; email: string; checkedIn?: boolean }>>(() => {
    const saved = localStorage.getItem('infobee_registrations');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(() => {
    const saved = localStorage.getItem('infobee_join_requests');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('infobee_contact_submissions');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Sync to localStorage on state alterations
  useEffect(() => {
    localStorage.setItem('infobee_registered_event_ids', JSON.stringify(registeredEventIds));
  }, [registeredEventIds]);

  useEffect(() => {
    localStorage.setItem('infobee_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('infobee_join_requests', JSON.stringify(joinRequests));
  }, [joinRequests]);

  useEffect(() => {
    localStorage.setItem('infobee_contact_submissions', JSON.stringify(contactSubmissions));
  }, [contactSubmissions]);

  // Scroll to top on route change instantly (no visual scrolling effect)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Sync activeSection when page changes
  useEffect(() => {
    if (currentPage === 'research' || currentPage === 'portfolio' || currentPage === 'gallery') {
      setActiveSection(currentPage);
    }
  }, [currentPage]);

  // Scroll spy to update Navbar active section marker
  useEffect(() => {
    if (currentPage !== 'home' && currentPage !== 'hackathon') return;
    const handleScroll = () => {
      const sections = currentPage === 'hackathon'
        ? ['scenarios', 'challenge', 'round1', 'round2', 'round3', 'faq', 'register']
        : ['home', 'events', 'about', 'gallery', 'programs', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleRegisterSuccess = (eventId: string, ticketCode: string) => {
    setRegisteredEventIds((prev) => [...prev, eventId]);
  };

  const handleNewRegistration = (eventId: string, ticketCode: string, name: string, email: string) => {
    const newReg = {
      id: `reg-${Date.now()}`,
      eventId,
      ticketCode,
      name,
      email,
      checkedIn: false
    };
    setRegistrations((prev) => [...prev, newReg]);
  };

  const handleNewJoinRequest = (request: JoinRequest) => {
    setJoinRequests((prev) => [request, ...prev]);
  };

  const handleNewContactSubmission = (submission: ContactSubmission) => {
    setContactSubmissions((prev) => [submission, ...prev]);
  };

  // Back-office Admin Handlers
  const handleToggleCheckIn = (regId: string) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.id === regId ? { ...reg, checkedIn: !reg.checkedIn } : reg
      )
    );
  };

  const handleUpdateJoinStatus = (requestId: string, status: 'approved' | 'rejected') => {
    setJoinRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  const handleDeleteSubmission = (submissionId: string) => {
    setContactSubmissions((prev) => prev.filter((sub) => sub.id !== submissionId));
  };

  const handleNavigatePage = (page: 'home' | 'research' | 'portfolio' | 'gallery' | 'hackathon', sectionId?: string) => {
    if ((page === 'research' || page === 'portfolio' || page === 'gallery' || page === 'hackathon') && !sectionId) {
      navigate(`/${page}`);
      setActiveSection(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'hackathon' && sectionId) {
       if (location.pathname !== '/hackathon') {
         navigate('/hackathon');
       }
    } else if (page === 'home') {
       if (location.pathname !== '/') {
         navigate('/');
       }
    }
    
    if (!sectionId || sectionId === 'home') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSection(sectionId);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const isProfilePage = location.pathname.startsWith('/student/profile') || location.pathname.startsWith('/staff/profile') || location.pathname.startsWith('/staff/student') || location.pathname.startsWith('/staff/export');
  const isPortfolioPage = location.pathname.startsWith('/portfolio');
  const isRegistrationPage = location.pathname === '/hackathon/register';

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-orange selection:text-white antialiased">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            borderRadius: '0',
            border: '2px solid #8d7166',
            background: '#ffffff',
            color: '#333',
            boxShadow: '4px 4px 0px #8d7166',
            fontWeight: 'bold',
            fontFamily: 'sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#f46b24',
              secondary: '#ffffff',
            },
          },
        }} 
      />
      
      {/* Primary Navigation Header */}
      {!isProfilePage && !isAuthPage && (
        <Header
          onJoinClick={() => setIsJoinOpen(true)}
          onAdminClick={() => setIsAdminOpen(true)}
          isAdminMode={isAdminOpen}
          isLoggedIn={isLoggedIn}
          activeSection={activeSection}
          currentPage={currentPage}
          onNavigate={handleNavigatePage}
        />
      )}

      {/* Main Structural Page Flow */}
      <main>
        <Routes>
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/hackathon/register" element={isLoggedIn ? <Registration /> : <Navigate to="/student/signin" state={{ from: "/hackathon/register" }} replace />} />
          <Route path="/hackathon/scenario/:id" element={<ScenarioDetails />} />
          <Route path="/hackathon/teams" element={<RegisteredTeams />} />
          <Route path="/" element={<Navigate to="/hackathon" replace />} />
          
          {/* 
          <Route 
            path="/" 
            element={
              <Home 
                onNewContactSubmission={handleNewContactSubmission}
                registeredEventIds={registeredEventIds}
                onRegisterSuccess={handleRegisterSuccess}
                onNewRegistration={handleNewRegistration}
                onOpenCalendar={() => setIsCalendarOpen(true)}
              />
            } 
          />
          <Route path="/research" element={<ResearchPapers />} />
          <Route path="/research/submit" element={<SubmitPaper />} />
          <Route path="/research/:paperId" element={<Detail />} />
          <Route path="/portfolio" element={<PortfolioLanding />} />
          <Route path="/gallery" element={<EventGallery />} />
          */}
          
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/signin" element={<StudentSignin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/staff/signin" element={<StaffSignin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/staff/profile/:tab?" element={<StaffProfile />} />
          <Route path="/staff/student/:rollNo" element={<StudentDetail />} />
          <Route path="/staff/export" element={<ExportData />} />

          {/* Catch-all route to redirect unknown paths to hackathon */}
          <Route path="*" element={<Navigate to="/hackathon" replace />} />
        </Routes>
      </main>

      {/* Footer Block */}
      {!isAuthPage && !isPortfolioPage && !isProfilePage && !isRegistrationPage && (
        <Footer
          onNavClick={(selector) => {
            if (selector === '#research') {
              handleNavigatePage('research');
            } else if (selector === '#gallery') {
              handleNavigatePage('gallery');
            } else {
              handleNavigatePage('home', selector.replace('#', ''));
            }
          }}
          onCalendarClick={() => setIsCalendarOpen(true)}
          onPortalClick={() => setIsAdminOpen(true)}
        />
      )}

      {/* --- ALL OVERLAY MODALS & DRAWER PORTALS --- */}

      {/* 3. Event Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        registeredEventIds={registeredEventIds}
      />

      {/* 4. Join Infobee Membership Application Drawer */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onJoinSuccess={handleNewJoinRequest}
      />

      {/* 5. Executive Back-Office Admin Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        registrations={registrations}
        joinRequests={joinRequests}
        contactSubmissions={contactSubmissions}
        events={eventsData}
        onToggleCheckIn={handleToggleCheckIn}
        onUpdateJoinStatus={handleUpdateJoinStatus}
        onDeleteSubmission={handleDeleteSubmission}
      />
    </div>
  );
}
