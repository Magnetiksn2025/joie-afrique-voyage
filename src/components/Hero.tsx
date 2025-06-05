import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-black/40 z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>
      
      {/* Content */}
      <div className="container relative z-20 text-white text-center px-4">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Découvrez l'Afrique de l'Ouest</h1>
          <p className="text-xl md:text-2xl mb-8">Des expériences authentiques au Sénégal, Cap Vert et Bénin</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/destinations">
              <Button className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8 w-full sm:w-auto">
                Découvrir nos voyages
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white/20 text-lg py-6 px-8 w-full sm:w-auto">
                Voir le calendrier
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/30 flex flex-wrap justify-center gap-x-12 gap-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold">3+</h3>
              <p className="text-white/80">Destinations</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">25+</h3>
              <p className="text-white/80">Départs garantis</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">5000+</h3>
              <p className="text-white/80">Clients satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;