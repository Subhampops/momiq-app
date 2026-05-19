import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeatureHighlight } from "./components/FeatureHighlight";
import { PricingSection } from "./components/PricingSection";
import { TeamSection } from "./components/TeamSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CommunitySection } from "./components/CommunitySection";
import { ServicesSection } from "./components/ServicesSection";
import { AboutSection } from "./components/AboutSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { PregnancyTracker } from "./components/PregnancyTracker";
import { BabyDevelopment } from "./components/BabyDevelopment";
import { HealthMonitoring } from "./components/HealthMonitoring";
import { SmartReminders } from "./components/SmartReminders";
import { AIDoctorChat } from "./components/AIDoctorChat";
import { ExpertArticles } from "./components/ExpertArticles";
import { PersonalizedMusic } from "./components/PersonalizedMusic";
import { SupportGroupsDashboard } from "./components/SupportGroupsDashboard";
import { MenstrualCycleTracker } from "./components/MenstrualCycleTracker";
import { AuthModal } from "./components/AuthModal";
import { MainDashboard } from "./components/MainDashboard";
import { SmartCalendar } from "./components/SmartCalendar";
import { ProfileScreen } from "./components/ProfileScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { FloatingAIButton } from "./components/FloatingAIButton";
import { EmergencyButton } from "./components/EmergencyButton";
import { SmoothScroll } from "./components/SmoothScroll";
import { Reveal } from "./components/ui/Reveal";
import { DashboardLayout } from "./components/DashboardLayout";

type ViewType =
  | "home"
  | "dashboard"
  | "calendar"
  | "health"
  | "baby"
  | "profile"
  | "settings"
  | "terms"
  | "tracker"
  | "babyDevelopment"
  | "healthMonitoring"
  | "smartReminders"
  | "aiDoctorChat"
  | "expertArticles"
  | "personalizedMusic"
  | "supportGroups"
  | "menstrualCycle";

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("home");
  const [navigationHistory, setNavigationHistory] = useState<
    ViewType[]
  >([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">(
    "login",
  );
  const [authAutoFocus, setAuthAutoFocus] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Auto-navigate to dashboard when user logs in if they are on the home page
      if (currentUser && currentView === 'home') {
        setCurrentView('dashboard');
      }
    });
    return () => unsubscribe();
  }, [currentView]);

  // Smooth scroll to top with animation
  useEffect(() => {
    // Lenis handles smooth scroll, but we might want to manually scroll to top on view change if Lenis doesn't auto-handle SPA nav
    if (currentView !== "home") {
      setIsTransitioning(true);
      window.scrollTo(0, 0); // Let Lenis handle standard scrolling behavior or use lenis instance if needed, but window.scrollTo works with native behavior too if lenis is binding to window

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // ... rest of helper functions ...

  const navigateTo = (view: ViewType) => {
    setNavigationHistory((prev) => [...prev, currentView]);
    setCurrentView(view);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const previousView =
        navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setCurrentView(previousView);
      window.scrollTo(0, 0);
    } else {
      setCurrentView(isLoggedIn ? "dashboard" : "home");
    }
  };

  const handleOpenAuth = (
    view: "login" | "signup",
    autoFocus: boolean = false,
  ) => {
    setAuthView(view);
    setAuthAutoFocus(autoFocus);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setCurrentView("dashboard");
  };

  // Bottom nav handler
  const handleBottomNavigation = (tab: 'dashboard' | 'calendar' | 'health' | 'baby' | 'profile') => {
    if (!isLoggedIn) {
      handleOpenAuth('login', false);
      return;
    }
    setNavigationHistory([]);
    setCurrentView(tab);
  };

  // Main dashboard navigation handler
  const handleDashboardNavigation = (destination: string) => {
    if (!isLoggedIn) {
      handleOpenAuth('login', false);
      return;
    }
    const viewMap: Record<string, ViewType> = {
      dashboard: 'dashboard',
      calendar: 'calendar',
      baby: 'babyDevelopment',
      health: 'healthMonitoring',
      aiDoctorChat: 'aiDoctorChat',
      smartReminders: 'smartReminders',
      supportGroups: 'supportGroups',
      expertArticles: 'expertArticles',
      personalizedMusic: 'personalizedMusic',
      menstrualCycle: 'menstrualCycle',
      settings: 'settings',
      profile: 'profile',
      terms: 'terms',
    };

    const view = viewMap[destination];
    if (view) {
      navigateTo(view);
    }
  };

  // Wrapper component for page transitions
  const PageTransition = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div
      className={`page-transition ${isTransitioning ? "page-entering" : "page-entered"}`}
      style={{
        animation: isTransitioning
          ? "slideDown 0.6s ease-out"
          : "none",
      }}
    >
      {children}
    </div>
  );

  // Guest login handler - allows access to dashboard without authentication (disabled via Civic Auth)
  const handleGuestLogin = () => {
    setAuthModalOpen(false);
    setCurrentView("dashboard");
  };

  // Logout handler - clears auth state and returns to landing page
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
    setCurrentView("home");
    setNavigationHistory([]);
    window.scrollTo(0, 0);
  };

  // Handle navigation that requires auth
  const handleProtectedNavigation = (view: ViewType) => {
    if (!isLoggedIn) {
      handleOpenAuth('login', false);
    } else {
      navigateTo(view);
    }
  };

  // Helper to wrap protected routes
  const renderProtected = (children: React.ReactNode) => (
    <DashboardLayout currentView={currentView} onNavigate={handleDashboardNavigation} onLogout={handleLogout}>
      <PageTransition>
        {children}
      </PageTransition>
    </DashboardLayout>
  );

  if (currentView === "dashboard" && isLoggedIn) {
    return renderProtected(<MainDashboard onNavigate={handleDashboardNavigation} />);
  }

  if (currentView === "calendar" && isLoggedIn) {
    return renderProtected(<SmartCalendar onBack={navigateBack} />);
  }

  if (currentView === "health" && isLoggedIn) {
    return renderProtected(<HealthMonitoring onBack={navigateBack} />);
  }

  if (currentView === "baby" && isLoggedIn) {
    return renderProtected(<BabyDevelopment onBack={navigateBack} />);
  }

  if (currentView === "profile" && isLoggedIn) {
    return renderProtected(<ProfileScreen />);
  }

  if (currentView === "tracker") {
    // Tracker might be standalone or protected, assuming strictly protected for consistency with DashboardLayout request "every page except landing page"
    return renderProtected(<PregnancyTracker onBack={navigateBack} />);
  }

  if (currentView === "babyDevelopment") {
    return renderProtected(<BabyDevelopment onBack={navigateBack} />);
  }

  if (currentView === "healthMonitoring") {
    return renderProtected(<HealthMonitoring onBack={navigateBack} />);
  }

  if (currentView === "smartReminders") {
    return renderProtected(<SmartReminders onBack={navigateBack} />);
  }

  if (currentView === "aiDoctorChat") {
    return renderProtected(<AIDoctorChat onBack={navigateBack} />);
  }

  if (currentView === "expertArticles") {
    return renderProtected(<ExpertArticles onBack={navigateBack} />);
  }

  if (currentView === "personalizedMusic") {
    return renderProtected(<PersonalizedMusic onBack={navigateBack} />);
  }

  if (currentView === "supportGroups") {
    return renderProtected(<SupportGroupsDashboard onBack={navigateBack} />);
  }

  if (currentView === "menstrualCycle") {
    return renderProtected(<MenstrualCycleTracker onBack={navigateBack} />);
  }

  if (currentView === "settings" && isLoggedIn) {
    return renderProtected(<SettingsScreen onBack={navigateBack} />);
  }

  if (currentView === "terms") {
    return <TermsAndConditions onBack={navigateBack} />;
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Header
          onOpenTracker={() => navigateTo("tracker")}
          onOpenAuth={handleOpenAuth}
          onGuestLogin={handleGuestLogin}
          onDashboardNavigate={() => handleProtectedNavigation("dashboard")}
          showAuthButtons={true}
        />
        <main>
          <section id="home">
            <Reveal width="100%">
              <HeroSection
                onOpenTracker={() => handleProtectedNavigation("tracker")}
                onGetStarted={() => handleOpenAuth("signup", true)}
                onDashboardNavigate={() => handleProtectedNavigation("dashboard")}
              />
            </Reveal>
          </section>
          <section id="features">
            <Reveal width="100%">
              <FeatureHighlight />
            </Reveal>
          </section>
          <Reveal width="100%"><PricingSection /></Reveal>
          <Reveal width="100%"><TeamSection /></Reveal>
          <Reveal width="100%"><TestimonialsSection /></Reveal>
          <section id="community">
            <Reveal width="100%">
              <CommunitySection />
            </Reveal>
          </section>
          <section id="services">
            <Reveal width="100%">
              <ServicesSection
                onOpenTracker={() => handleProtectedNavigation("tracker")}
                onOpenBabyDevelopment={() => handleProtectedNavigation("babyDevelopment")}
                onOpenHealthMonitoring={() => handleProtectedNavigation("healthMonitoring")}
                onOpenSmartReminders={() => handleProtectedNavigation("smartReminders")}
                onOpenAIDoctorChat={() => handleProtectedNavigation("aiDoctorChat")}
                onOpenExpertArticles={() => handleProtectedNavigation("expertArticles")}
                onOpenPersonalizedMusic={() => handleProtectedNavigation("personalizedMusic")}
                onOpenSupportGroups={() => handleProtectedNavigation("supportGroups")}
                onOpenMenstrualCycle={() => handleProtectedNavigation("menstrualCycle")}
              />
            </Reveal>
          </section>
          <section id="about">
            <Reveal width="100%">
              <AboutSection />
            </Reveal>
          </section>
          <section id="faq">
            <Reveal width="100%">
              <FAQSection />
            </Reveal>
          </section>
        </main>
        <Footer onNavigateTerms={() => navigateTo('terms')} />
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          defaultView={authView}
          autoFocus={authAutoFocus}
          onSuccess={handleAuthSuccess}
        />
        <FloatingAIButton onClick={() => handleProtectedNavigation("aiDoctorChat")} />
        <EmergencyButton />
      </div>
    </SmoothScroll>
  );
}