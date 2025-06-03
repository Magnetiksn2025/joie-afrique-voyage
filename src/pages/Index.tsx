import Hero from '@/components/Hero';
import FeaturedTours from '@/components/FeaturedTours';
import FeaturesSection from '@/components/FeaturesSection';
import DepartureCalendar from '@/components/DepartureCalendar';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* NavBar et Footer sont maintenant gérés par le layout dans App.tsx */}
      <Hero />
      <FeaturedTours />
      <FeaturesSection />
      <DepartureCalendar />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default Index;