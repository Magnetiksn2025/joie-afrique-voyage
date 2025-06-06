import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages existantes
import Index from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import DestinationPage from "./pages/Destination";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Nouvelle page de confirmation
import BookingConfirmationPage from "./pages/BookingConfirmation";

// Composants de layout
import NavBar from "@/components/NavBar"; // Utilisez le composant existant
import Footer from "@/components/Footer"; // Utilisez le composant existant
import ScrollToTop from "@/components/common/ScrollToTop";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const queryClient = new QueryClient();

// Composants temporaires pour les pages manquantes
const GalleryPlaceholder = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <div className="container mx-auto px-4 py-32 text-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Galerie</h1>
      <p className="text-gray-600">Page en cours de développement...</p>
    </div>
    <Footer />
  </div>
);

const QuotePlaceholder = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <div className="container mx-auto px-4 py-32 text-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Devis personnalisé</h1>
      <p className="text-gray-600">Page en cours de développement...</p>
    </div>
    <Footer />
  </div>
);

const LegalPlaceholder = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <div className="container mx-auto px-4 py-32 text-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales</h1>
      <p className="text-gray-600">Page en cours de développement...</p>
    </div>
    <Footer />
  </div>
);

// Composant pour les routes avec layout
const AppWithLayout = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Scroll to top on route change */}
        <ScrollToTop />
        
        {/* Main content avec les routes */}
        <Routes location={location} key={location.pathname}>
          {/* Page d'accueil */}
          <Route path="/" element={<Index />} />
          
          {/* Calendrier/Réservations */}
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reservations" element={<CalendarPage />} />
          
          {/* Page de confirmation de réservation */}
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          
          {/* Destinations */}
          <Route path="/destinations" element={<DestinationPage />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route path="/destinations/:slug" element={<DestinationPage />} />
          
          {/* Autres pages */}
          <Route path="/about" element={<About />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Nouvelles routes placeholder */}
          <Route path="/galerie" element={<GalleryPlaceholder />} />
          <Route path="/devis" element={<QuotePlaceholder />} />
          <Route path="/mentions-legales" element={<LegalPlaceholder />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithLayout />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;