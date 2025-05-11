
import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

type DestinationData = {
  title: string;
  image: string;
  description: string;
  highlights: string[];
};

const destinationData: Record<string, DestinationData> = {
  senegal: {
    title: "Sénégal",
    image: "/lovable-uploads/5d2a585b-5656-4c15-b32c-c56adcfe6c90.png",
    description: "Découvrez la chaleur et l'hospitalité légendaire du Sénégal, où les traditions séculaires se mêlent harmonieusement au mode de vie moderne. Des plages immaculées de la Petite Côte aux paysages désertiques du nord, en passant par l'emblématique île de Gorée, le Sénégal offre une richesse culturelle et une diversité naturelle exceptionnelles.",
    highlights: [
      "Visite de l'île de Gorée, lieu de mémoire de la traite négrière",
      "Découverte du Lac Rose et ses récolteurs de sel",
      "Observation des oiseaux dans le Parc National du Djoudj",
      "Immersion dans la culture locale avec les villages traditionnels",
      "Détente sur les plages de Saly et de la Petite Côte"
    ]
  },
  capvert: {
    title: "Cap Vert",
    image: "/lovable-uploads/29d4068a-4ec1-40ae-bb4e-2433df6ad0d4.png",
    description: "L'archipel du Cap Vert vous invite à découvrir ses îles volcaniques aux paysages contrastés. Entre montagnes majestueuses, vallées fertiles et plages de sable fin, chaque île possède son propre caractère. L'influence africaine et portugaise se retrouve dans la culture capverdienne, créant une ambiance unique rythmée par la morna, musique traditionnelle reconnue par l'UNESCO.",
    highlights: [
      "Randonnée dans les montagnes spectaculaires de Santo Antão",
      "Détente sur les plages paradisiaques de Sal et Boa Vista",
      "Découverte de la culture locale à travers la musique et la danse",
      "Exploration des villages pittoresques aux maisons colorées",
      "Navigation entre les îles pour apprécier la diversité des paysages"
    ]
  },
  benin: {
    title: "Bénin",
    image: "/lovable-uploads/017e7992-7a08-4753-90d7-040aa2f7c8b7.png",
    description: "Berceau du vodun et ancien royaume puissant, le Bénin vous plonge dans une Afrique authentique riche en traditions. Des palais royaux d'Abomey aux villages lacustres de Ganvié, en passant par la Route des Esclaves à Ouidah, ce pays fascinant vous offre un voyage à travers l'histoire et les cultures vivantes de l'Afrique de l'Ouest.",
    highlights: [
      "Visite des palais royaux d'Abomey, classés au patrimoine mondial",
      "Découverte du village lacustre de Ganvié, la 'Venise de l'Afrique'",
      "Exploration de la Route des Esclaves et de la Porte du Non-Retour à Ouidah",
      "Immersion dans les cérémonies et rituels vodun",
      "Observation de la faune dans le Parc National de la Pendjari"
    ]
  }
};

const DestinationPage = () => {
  const { id } = useParams();
  const currentPage = id ? id.toLowerCase() : "destinations";
  const allDestinations = Object.keys(destinationData);
  
  // Show main destinations page if no specific destination is selected
  if (currentPage === "destinations") {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Destinations</h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Découvrez nos voyages sur mesure en Afrique de l'Ouest. Des expériences authentiques vous attendent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allDestinations.map(dest => {
                const destination = destinationData[dest];
                return (
                  <div 
                    key={dest}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">{destination.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {destination.description}
                      </p>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        asChild
                      >
                        <a href={`/destinations/${dest}`}>
                          Découvrir
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Show specific destination page
  const destination = destinationData[currentPage];
  
  if (!destination) {
    return <NotFound />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="pt-20">
        {/* Hero section with full-width image */}
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.title}</h1>
              <p className="max-w-2xl mx-auto text-xl">
                Découvrez les merveilles du {destination.title} avec LRAD Tourisme
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">À propos du {destination.title}</h2>
              <p className="text-lg mb-8">
                {destination.description}
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Points forts de la destination</h3>
              <ul className="space-y-3 mb-8">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white mr-4"
                  asChild
                >
                  <a href="/calendar">
                    Voir les départs
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  asChild
                >
                  <a href="/contact">
                    Demander un devis
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h3 className="text-xl font-bold mb-4">Réservez votre voyage</h3>
              <p className="mb-4">
                Contactez-nous pour planifier votre prochain voyage au {destination.title}.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded p-4 mb-6">
                <h4 className="font-bold text-lg mb-2">Options de paiement flexibles</h4>
                <p className="text-sm">
                  Profitez de notre système de paiement échelonné et réservez votre aventure dès maintenant.
                </p>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <a href="/contact">
                  Contactez-nous
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DestinationPage;
