
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Image, Info, Mail, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/a810b088-1f1d-451c-b255-ec667d990cc6.png" 
            alt="LRAD Tourisme" 
            className="h-12 md:h-16" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium">
            <Home size={18} />
            <span>Accueil</span>
          </Link>
          <Link to="/destinations" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium">
            <Image size={18} />
            <span>Destinations</span>
          </Link>
          <Link to="/calendar" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium">
            <Calendar size={18} />
            <span>Calendrier</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium">
            <Info size={18} />
            <span>À Propos</span>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center">
            <Mail className="mr-2 h-4 w-4" /> Contact
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Accueil</span>
            </Link>
            <Link 
              to="/destinations" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image size={18} />
              <span>Destinations</span>
            </Link>
            <Link 
              to="/calendar" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={18} />
              <span>Calendrier</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} />
              <span>À Propos</span>
            </Link>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white flex items-center w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail className="mr-2 h-4 w-4" /> Contact
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
