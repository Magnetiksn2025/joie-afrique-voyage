import Hero from '@/components/Hero';
import FeaturedTours from '@/components/FeaturedTours';
import FeaturesSection from '@/components/FeaturesSection';
import DepartureCalendar from '@/components/DepartureCalendar';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedTours />
      <FeaturesSection />
      <DepartureCalendar />
      <Testimonials />
    </div>
  );
};

export default Index;