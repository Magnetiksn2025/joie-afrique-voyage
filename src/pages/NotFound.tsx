import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, MapPin, Camera, Phone } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const quickLinks = [
    {
      label: 'Nos destinations',
      href: '/destinations',
      icon: MapPin,
      description: 'Découvrez nos voyages'
    },
    {
      label: 'Galerie photos',
      href: '/galerie',
      icon: Camera,
      description: 'Inspirez-vous'
    },
    {
      label: 'Nous contacter',
      href: '/contact',
      icon: Phone,
      description: 'Besoin d\'aide ?'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Illustration 404 */}
        <div className="mb-12">
          <div className="relative">
            <h1 className="text-[8rem] md:text-[12rem] font-bold text-gray-200 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Message principal */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Page introuvable
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Désolé, la page que vous cherchez semble s'être envolée vers une destination inconnue...
          </p>
          <p className="text-gray-500">
            Mais ne vous inquiétez pas, nous avons plein d'autres merveilles à vous faire découvrir !
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Page précédente</span>
          </button>
        </div>

        {/* Liens rapides */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Ou explorez nos services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {link.label}
                </h4>
                <p className="text-gray-600 text-sm">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact d'urgence */}
        <div className="mt-12 p-6 bg-gray-100 rounded-xl">
          <p className="text-gray-600">
            Toujours perdu ? Contactez-nous directement au{' '}
            <a 
              href="tel:+33123456789" 
              className="font-semibold text-primary hover:underline"
            >
              +33 (0)1 XX XX XX XX
            </a>
            {' '}ou par email à{' '}
            <a 
              href="mailto:contact@lrad-tours.com" 
              className="font-semibold text-primary hover:underline"
            >
              contact@lrad-tours.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;