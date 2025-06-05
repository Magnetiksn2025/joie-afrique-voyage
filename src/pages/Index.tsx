import Hero from '@/components/Hero';
import FeaturedTours from '@/components/FeaturedTours';
import FeaturesSection from '@/components/FeaturesSection';
import DepartureCalendar from '@/components/DepartureCalendar';
import Testimonials from '@/components/Testimonials';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <FeaturedTours />
      <FeaturesSection />
      <DepartureCalendar />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;