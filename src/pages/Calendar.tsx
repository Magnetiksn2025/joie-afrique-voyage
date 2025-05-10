
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

type DepartureType = {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
  duration: number;
  description?: string;
};

const destinations = ["Senegal", "CapVert", "Benin", "Tous"];

const departures: Record<string, DepartureType[]> = {
  "Senegal": [
    { id: 1, destination: "Sénégal", departureDate: "2025-01-15", returnDate: "2025-01-22", availableSeats: 12, totalSeats: 20, price: 865, duration: 7 },
    { id: 2, destination: "Sénégal", departureDate: "2025-02-12", returnDate: "2025-02-19", availableSeats: 8, totalSeats: 20, price: 865, duration: 7 },
    { id: 3, destination: "Sénégal", departureDate: "2025-03-19", returnDate: "2025-03-26", availableSeats: 15, totalSeats: 20, price: 865, duration: 7 },
    { id: 10, destination: "Sénégal", departureDate: "2025-04-16", returnDate: "2025-04-23", availableSeats: 3, totalSeats: 20, price: 865, duration: 7 },
    { id: 11, destination: "Sénégal", departureDate: "2025-05-21", returnDate: "2025-05-28", availableSeats: 20, totalSeats: 20, price: 865, duration: 7 },
    { id: 12, destination: "Sénégal", departureDate: "2025-06-18", returnDate: "2025-06-25", availableSeats: 18, totalSeats: 20, price: 865, duration: 7 },
  ],
  "CapVert": [
    { id: 4, destination: "Cap Vert", departureDate: "2025-01-30", returnDate: "2025-02-04", availableSeats: 10, totalSeats: 15, price: 785, duration: 5 },
    { id: 5, destination: "Cap Vert", departureDate: "2025-02-27", returnDate: "2025-03-04", availableSeats: 6, totalSeats: 15, price: 785, duration: 5 },
    { id: 6, destination: "Cap Vert", departureDate: "2025-05-30", returnDate: "2025-06-03", availableSeats: 14, totalSeats: 15, price: 785, duration: 5 },
    { id: 13, destination: "Cap Vert", departureDate: "2025-07-31", returnDate: "2025-08-05", availableSeats: 4, totalSeats: 15, price: 785, duration: 5 },
    { id: 14, destination: "Cap Vert", departureDate: "2025-09-25", returnDate: "2025-09-30", availableSeats: 2, totalSeats: 15, price: 785, duration: 5 },
  ],
  "Benin": [
    { id: 7, destination: "Bénin", departureDate: "2025-04-10", returnDate: "2025-04-16", availableSeats: 12, totalSeats: 18, price: 925, duration: 6 },
    { id: 8, destination: "Bénin", departureDate: "2025-07-17", returnDate: "2025-07-23", availableSeats: 8, totalSeats: 18, price: 925, duration: 6 },
    { id: 9, destination: "Bénin", departureDate: "2025-09-04", returnDate: "2025-09-10", availableSeats: 0, totalSeats: 18, price: 925, duration: 6 },
    { id: 15, destination: "Bénin", departureDate: "2025-10-16", returnDate: "2025-10-22", availableSeats: 15, totalSeats: 18, price: 925, duration: 6 },
  ]
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

const Calendar = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");
  
  const allDepartures = destinations.slice(0, 3).flatMap(dest => departures[dest]);
  
  const getFilteredDepartures = () => {
    let filtered = selectedTab === "Tous" 
      ? allDepartures 
      : departures[selectedTab];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dep => 
        dep.destination.toLowerCase().includes(query)
      );
    }
    
    // Filter by month
    if (monthFilter) {
      filtered = filtered.filter(dep => {
        const departureMonth = new Date(dep.departureDate).getMonth() + 1;
        return departureMonth === parseInt(monthFilter);
      });
    }
    
    // Sort by departure date
    return [...filtered].sort((a, b) => 
      new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
    );
  };
  
  const filteredDepartures = getFilteredDepartures();
  
  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) return "bg-red-500";
    if (percentage <= 25) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Calendrier des Départs</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Consultez notre calendrier complet de départs garantis pour 2025 et réservez votre aventure dès maintenant.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Rechercher par destination..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="md:w-1/4">
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Mois de départ</label>
                <select
                  id="month"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  <option value="">Tous les mois</option>
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Août</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>
            </div>
            
            <Tabs defaultValue="Tous" onValueChange={setSelectedTab} value={selectedTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  {destinations.map((dest) => (
                    <TabsTrigger key={dest} value={dest}>{dest === "CapVert" ? "Cap Vert" : dest}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {destinations.map((dest) => (
                <TabsContent key={dest} value={dest}>
                  <div className="space-y-4">
                    {dest === "Tous" ? (
                      filteredDepartures.length > 0 ? (
                        filteredDepartures.map((departure) => (
                          <DepartureCard key={departure.id} departure={departure} />
                        ))
                      ) : (
                        <p className="text-center py-8 text-gray-500">Aucun départ ne correspond à vos critères.</p>
                      )
                    ) : (
                      filteredDepartures.length > 0 ? (
                        filteredDepartures.map((departure) => (
                          <DepartureCard key={departure.id} departure={departure} />
                        ))
                      ) : (
                        <p className="text-center py-8 text-gray-500">Aucun départ ne correspond à vos critères.</p>
                      )
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Besoin d'une date personnalisée?</h3>
                <p className="text-gray-600 mb-4">
                  Vous ne trouvez pas de date qui vous convient? Nous pouvons organiser un voyage privé adapté à vos disponibilités.
                  Contactez-nous pour discuter de vos besoins et nous vous proposerons une solution sur mesure.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Demander un devis personnalisé
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const DepartureCard = ({ departure }: { departure: DepartureType }) => {
  const availabilityPercentage = (departure.availableSeats / departure.totalSeats) * 100;
  const isLowAvailability = departure.availableSeats > 0 && departure.availableSeats <= 5;
  const isSoldOut = departure.availableSeats === 0;
  
  return (
    <Card className="overflow-hidden border-gray-200">
      <CardHeader className="bg-gray-50 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{departure.destination} - {departure.duration} jours</h3>
          {isSoldOut && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Complet
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x">
          <div className="p-4 md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Dates du voyage</p>
            <p className="font-medium">
              Du {formatDate(departure.departureDate)} au {formatDate(departure.returnDate)}
            </p>
          </div>
          <div className="p-4 md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Places disponibles</p>
            {isSoldOut ? (
              <p className="font-bold text-red-500">Aucune place disponible</p>
            ) : (
              <>
                <p className={`font-bold ${isLowAvailability ? 'text-orange-500' : ''}`}>
                  {departure.availableSeats} sur {departure.totalSeats}
                </p>
                <div className="mt-1">
                  <Progress 
                    value={availabilityPercentage} 
                    className="h-2 bg-gray-200" 
                  />
                </div>
                {isLowAvailability && (
                  <p className="text-orange-500 text-xs font-medium mt-1">
                    Plus que {departure.availableSeats} places !
                  </p>
                )}
              </>
            )}
          </div>
          <div className="p-4 md:col-span-2 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 mb-1">À partir de</p>
            <p className="font-bold text-lg mb-2">{departure.price}€</p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white"
                disabled={isSoldOut}
              >
                {isSoldOut ? 'Indisponible' : 'Réserver'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5"
              >
                En savoir plus
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Paiement en plusieurs fois disponible
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
