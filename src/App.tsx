import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";

// Vos pages existantes
import Index from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import DestinationPage from "./pages/Destination";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Nouveaux composants de layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const queryClient = new QueryClient();

// Composant pour les routes avec layout
const AppWithLayout = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation */}
        <Navbar />
        
        {/* Scroll to top on route change */}
        <ScrollToTop />
        
        {/* Main content */}
        <main className="flex-1">
          <Routes location={location} key={location.pathname}>
            {/* Page d'accueil */}
            <Route path="/" element={<Index />} />
            
            {/* Calendrier/Réservations */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/reservations" element={<CalendarPage />} />
            
            {/* Destinations */}
            <Route path="/destinations" element={<DestinationPage />} />
            <Route path="/destinations/:id" element={<DestinationPage />} />
            <Route path="/destinations/:slug" element={<DestinationPage />} />
            
            {/* Autres pages */}
            <Route path="/about" element={<About />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Nouvelles routes à ajouter */}
            <Route path="/galerie" element={<GalleryPlaceholder />} />
            <Route path="/devis" element={<QuotePlaceholder />} />
            <Route path="/mentions-legales" element={<LegalPlaceholder />} />
            <Route path="/devis" element={<QuoteRequestPage />} />
            
            {/* Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

// Composants temporaires pour les pages manquantes
const GalleryPlaceholder = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Galerie</h1>
    <p className="text-gray-600">Page en cours de développement...</p>
  </div>
);

import QuoteRequestPage from './pages/QuoteRequest';

const LegalPlaceholder = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales</h1>
    <p className="text-gray-600">Page en cours de développement...</p>
  </div>
);

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