import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from '@/lib/CurrencyContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import Home from '@/pages/Home';
import VisaApplication from '@/pages/VisaApplication';
import NationalityApplication from '@/pages/NationalityApplication';
import Checkout from '@/pages/Checkout';
import Dashboard from '@/pages/Dashboard';
import EligibilityTest from '@/pages/EligibilityTest';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import GuideVisa from '@/pages/GuideVisa';
import FAQ from '@/pages/FAQ';
import Profile from '@/pages/Profile';
import Assurance from '@/pages/Assurance';
import MesDemandes from '@/pages/MesDemandes';
import CoffreFort from '@/pages/CoffreFort';
import Messagerie from '@/pages/Messagerie';
import Parametres from '@/pages/Parametres';
import Alertes from '@/pages/Alertes';
import Contact from '@/pages/Contact';
import ServicesPage from '@/pages/Services';
import SmartVisaChecker from '@/pages/SmartVisaChecker';
import AdminVisaRules from '@/pages/AdminVisaRules';
import TrackApplication from '@/pages/TrackApplication';
import PricingCalculator from '@/pages/PricingCalculator';
import VisaComparison from '@/pages/VisaComparison';
import CountryProfiles from '@/pages/CountryProfiles';
import ApplicationHistory from '@/pages/ApplicationHistory';
import PaymentHistory from '@/pages/PaymentHistory';
import DocumentLibrary from '@/pages/DocumentLibrary';
import Referrals from '@/pages/Referrals';
import VisaKnowledgeBase from '@/pages/VisaKnowledgeBase';
import AgentDashboard from '@/pages/AgentDashboard';
import ServiceStatus from '@/pages/ServiceStatus';
import EmbassyDirectory from '@/pages/EmbassyDirectory';
import TravelChecklist from '@/pages/TravelChecklist';
import Tracker from '@/pages/Tracker';
import TravelCalculator from '@/pages/TravelCalculator';
import Consultation from '@/pages/Consultation';
import Notifications from '@/pages/Notifications';
import CountryInsights from '@/pages/CountryInsights';
import MyDocuments from '@/pages/MyDocuments';
import HowItWorks from '@/pages/HowItWorks';
import VIPServices from '@/pages/VIPServices';
import TermsOfService from '@/pages/TermsOfService';
import Testimonials from '@/pages/Testimonials';
import PartnerPrograms from '@/pages/PartnerPrograms';
import SuccessStories from '@/pages/SuccessStories';
import TravelInsurance from '@/pages/TravelInsurance';
import News from '@/pages/News';
import VisaFAQ from '@/pages/VisaFAQ';
import IdentityVerification from '@/pages/IdentityVerification';
import PremiumPackages from '@/pages/PremiumPackages';
import TravelBlog from '@/pages/TravelBlog';
import CurrencySettings from '@/pages/CurrencySettings';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ProtectedRoute from '@/components/ProtectedRoute';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <CurrencyProvider>
      <LanguageProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/eligibility-test" element={<EligibilityTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/guide-visa" element={<GuideVisa />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/visa-faq" element={<VisaFAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/smart-checker" element={<SmartVisaChecker />} />
          <Route path="/visa-guide" element={<VisaKnowledgeBase />} />
          <Route path="/visa-comparison" element={<VisaComparison />} />
          <Route path="/country-profiles" element={<CountryProfiles />} />
          <Route path="/country-insights" element={<CountryInsights />} />
          <Route path="/pricing-calculator" element={<PricingCalculator />} />
          <Route path="/travel-calculator" element={<TravelCalculator />} />
          <Route path="/embassy-directory" element={<EmbassyDirectory />} />
          <Route path="/travel-checklist" element={<TravelChecklist />} />
          <Route path="/service-status" element={<ServiceStatus />} />
          <Route path="/track-application" element={<TrackApplication />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/vip-services" element={<VIPServices />} />
          <Route path="/premium-packages" element={<PremiumPackages />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/partners" element={<PartnerPrograms />} />
          <Route path="/travel-insurance" element={<TravelInsurance />} />
          <Route path="/news" element={<News />} />
          <Route path="/travel-blog" element={<TravelBlog />} />
          <Route path="/document-library" element={<DocumentLibrary />} />

          {/* Protected — login required */}
          <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
            <Route path="/visa-application" element={<VisaApplication />} />
            <Route path="/nationality-application" element={<NationalityApplication />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/assurance" element={<Assurance />} />
            <Route path="/mes-demandes" element={<MesDemandes />} />
            <Route path="/coffre-fort" element={<CoffreFort />} />
            <Route path="/messagerie" element={<Messagerie />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/settings" element={<Parametres />} />
            <Route path="/alertes" element={<Alertes />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-documents" element={<MyDocuments />} />
            <Route path="/identity-verification" element={<IdentityVerification />} />
            <Route path="/currency-settings" element={<CurrencySettings />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/application-history" element={<ApplicationHistory />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/admin/visa-rules" element={<AdminVisaRules />} />
            <Route path="/admin-dashboard" element={<AgentDashboard />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LanguageProvider>
    </CurrencyProvider>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App