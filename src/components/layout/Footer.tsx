import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const destinations = [
    { label: 'Sénégal', href: '/destinations/senegal' },
    { label: 'Cap-Vert', href: '/destinations/cap-vert' },
    { label: 'Bénin', href: '/destinations/benin' },
    { label: 'Galerie', href: '/galerie' },
  ];

  const services = [
    { label: 'Devis gratuit', href: '/devis' },
    { label: 'Réservations', href: '/calendar' },
    { label: 'Voyages sur mesure', href: '/destinations' },
    { label: 'Mentions légales', href: '/mentions-legales' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/2e79573d-9350-4145-ab97-d9da6bf43e4f.png"
                alt="LRAD Tourisme"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  LRAD Tourisme
                </h3>
                <p className="text-sm text-gray-300">
                  Fournisseur de joies et de bonheur
                </p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Découvrez l'authenticité de l'Afrique de l'Ouest avec nos voyages sur mesure. 
              Une expérience unique vous attend au Sénégal, Cap-Vert et Bénin.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Liens rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Nos destinations</h4>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <Link
                    to={destination.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {destination.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Rue de l'Aventure</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a 
                  href="tel:+33123456789" 
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  +33 (0)1 XX XX XX XX
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a 
                  href="mailto:contact@lradtourisme.com" 
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  contact@lradtourisme.com
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="mt-8">
              <h5 className="font-medium text-white mb-3">Services</h5>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      to={service.href}
                      className="text-sm text-gray-300 hover:text-accent transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} LRAD Tourisme. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>pour l'Afrique de l'Ouest</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/mentions-legales" 
                className="text-gray-400 hover:text-accent transition-colors"
              >
                Mentions légales
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-400 hover:text-accent transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;