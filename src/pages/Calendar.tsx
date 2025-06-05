import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Fonction utilitaire pour vérifier si une date est passée
const isDatePast = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

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

// Données mises à jour pour 2025 basées sur les images fournies
const departures2025: Record<string, DepartureType[]> = {
  "Senegal": [
    // Janvier
    { id: 1, destination: "Sénégal", departureDate: "2025-01-09", returnDate: "2025-01-15", availableSeats: 12, totalSeats: 20, price: 865, duration: 7 },
    { id: 2, destination: "Sénégal", departureDate: "2025-01-23", returnDate: "2025-01-29", availableSeats: 8, totalSeats: 20, price: 865, duration: 7 },
    
    // Février
    { id: 3, destination: "Sénégal", departureDate: "2025-02-06", returnDate: "2025-02-12", availableSeats: 15, totalSeats: 20, price: 865, duration: 7 },
    { id: 4, destination: "Sénégal", departureDate: "2025-02-20", returnDate: "2025-02-26", availableSeats: 3, totalSeats: 20, price: 865, duration: 7 },
    
    // Mars
    { id: 5, destination: "Sénégal", departureDate: "2025-03-06", returnDate: "2025-03-12", availableSeats: 20, totalSeats: 20, price: 865, duration: 7 },
    { id: 6, destination: "Sénégal", departureDate: "2025-03-20", returnDate: "2025-03-26", availableSeats: 18, totalSeats: 20, price: 865, duration: 7 },
    
    // Avril
    { id: 7, destination: "Sénégal", departureDate: "2025-04-03", returnDate: "2025-04-09", availableSeats: 14, totalSeats: 20, price: 865, duration: 7 },
    { id: 8, destination: "Sénégal", departureDate: "2025-04-17", returnDate: "2025-04-23", availableSeats: 6, totalSeats: 20, price: 865, duration: 7 },
    
    // Mai
    { id: 9, destination: "Sénégal", departureDate: "2025-05-08", returnDate: "2025-05-14", availableSeats: 12, totalSeats: 20, price: 865, duration: 7 },
    { id: 10, destination: "Sénégal", departureDate: "2025-05-22", returnDate: "2025-05-28", availableSeats: 9, totalSeats: 20, price: 865, duration: 7 },
    
    // Juin
    { id: 11, destination: "Sénégal", departureDate: "2025-06-05", returnDate: "2025-06-11", availableSeats: 16, totalSeats: 20, price: 865, duration: 7 },
    { id: 12, destination: "Sénégal", departureDate: "2025-06-19", returnDate: "2025-06-25", availableSeats: 11, totalSeats: 20, price: 865, duration: 7 },
    
    // Juillet
    { id: 13, destination: "Sénégal", departureDate: "2025-07-03", returnDate: "2025-07-09", availableSeats: 7, totalSeats: 20, price: 865, duration: 7 },
    { id: 14, destination: "Sénégal", departureDate: "2025-07-17", returnDate: "2025-07-23", availableSeats: 4, totalSeats: 20, price: 865, duration: 7 },
    
    // Août
    { id: 15, destination: "Sénégal", departureDate: "2025-08-07", returnDate: "2025-08-13", availableSeats: 13, totalSeats: 20, price: 865, duration: 7 },
    { id: 16, destination: "Sénégal", departureDate: "2025-08-21", returnDate: "2025-08-27", availableSeats: 8, totalSeats: 20, price: 865, duration: 7 },
    
    // Septembre
    { id: 17, destination: "Sénégal", departureDate: "2025-09-04", returnDate: "2025-09-10", availableSeats: 15, totalSeats: 20, price: 865, duration: 7 },
    { id: 18, destination: "Sénégal", departureDate: "2025-09-18", returnDate: "2025-09-24", availableSeats: 10, totalSeats: 20, price: 865, duration: 7 },
    
    // Octobre
    { id: 19, destination: "Sénégal", departureDate: "2025-10-02", returnDate: "2025-10-08", availableSeats: 12, totalSeats: 20, price: 865, duration: 7 },
    { id: 20, destination: "Sénégal", departureDate: "2025-10-16", returnDate: "2025-10-22", availableSeats: 5, totalSeats: 20, price: 865, duration: 7 },
    
    // Novembre
    { id: 21, destination: "Sénégal", departureDate: "2025-11-06", returnDate: "2025-11-12", availableSeats: 18, totalSeats: 20, price: 865, duration: 7 },
    { id: 22, destination: "Sénégal", departureDate: "2025-11-20", returnDate: "2025-11-26", availableSeats: 14, totalSeats: 20, price: 865, duration: 7 },
    
    // Décembre
    { id: 23, destination: "Sénégal", departureDate: "2025-12-04", returnDate: "2025-12-10", availableSeats: 9, totalSeats: 20, price: 865, duration: 7 },
    { id: 24, destination: "Sénégal", departureDate: "2025-12-22", returnDate: "2025-12-28", availableSeats: 2, totalSeats: 20, price: 865, duration: 7 },
    { id: 25, destination: "Sénégal", departureDate: "2025-12-30", returnDate: "2026-01-05", availableSeats: 6, totalSeats: 20, price: 865, duration: 7 },
  ],
  
  "CapVert": [
    // Avril
    { id: 26, destination: "Cap Vert", departureDate: "2025-04-25", returnDate: "2025-04-29", availableSeats: 10, totalSeats: 15, price: 785, duration: 5 },
    { id: 27, destination: "Cap Vert", departureDate: "2025-04-16", returnDate: "2025-04-20", availableSeats: 6, totalSeats: 15, price: 785, duration: 5 },
    
    // Mai
    { id: 28, destination: "Cap Vert", departureDate: "2025-05-30", returnDate: "2025-06-03", availableSeats: 14, totalSeats: 15, price: 785, duration: 5 },
    
    // Juillet
    { id: 29, destination: "Cap Vert", departureDate: "2025-07-11", returnDate: "2025-07-15", availableSeats: 4, totalSeats: 15, price: 785, duration: 5 },
    { id: 30, destination: "Cap Vert", departureDate: "2025-07-25", returnDate: "2025-07-29", availableSeats: 2, totalSeats: 15, price: 785, duration: 5 },
    
    // Août
    { id: 31, destination: "Cap Vert", departureDate: "2025-08-03", returnDate: "2025-08-08", availableSeats: 8, totalSeats: 15, price: 785, duration: 5 },
    { id: 32, destination: "Cap Vert", departureDate: "2025-08-15", returnDate: "2025-08-19", availableSeats: 12, totalSeats: 15, price: 785, duration: 5 },
    { id: 33, destination: "Cap Vert", departureDate: "2025-08-29", returnDate: "2025-09-02", availableSeats: 7, totalSeats: 15, price: 785, duration: 5 },
    
    // Septembre
    { id: 34, destination: "Cap Vert", departureDate: "2025-09-12", returnDate: "2025-09-16", availableSeats: 9, totalSeats: 15, price: 785, duration: 5 },
    { id: 35, destination: "Cap Vert", departureDate: "2025-09-26", returnDate: "2025-09-30", availableSeats: 3, totalSeats: 15, price: 785, duration: 5 },
    
    // Octobre
    { id: 36, destination: "Cap Vert", departureDate: "2025-10-10", returnDate: "2025-10-14", availableSeats: 11, totalSeats: 15, price: 785, duration: 5 },
    { id: 37, destination: "Cap Vert", departureDate: "2025-10-24", returnDate: "2025-10-28", availableSeats: 5, totalSeats: 15, price: 785, duration: 5 },
    
    // Novembre
    { id: 38, destination: "Cap Vert", departureDate: "2025-11-14", returnDate: "2025-11-18", availableSeats: 13, totalSeats: 15, price: 785, duration: 5 },
    { id: 39, destination: "Cap Vert", departureDate: "2025-11-28", returnDate: "2025-12-02", availableSeats: 8, totalSeats: 15, price: 785, duration: 5 },
    
    // Décembre
    { id: 40, destination: "Cap Vert", departureDate: "2025-12-12", returnDate: "2025-12-16", availableSeats: 6, totalSeats: 15, price: 785, duration: 5 },
    
    // Janvier 2026
    { id: 41, destination: "Cap Vert", departureDate: "2026-01-16", returnDate: "2026-01-20", availableSeats: 10, totalSeats: 15, price: 785, duration: 5 },
    { id: 42, destination: "Cap Vert", departureDate: "2026-01-30", returnDate: "2026-02-03", availableSeats: 7, totalSeats: 15, price: 785, duration: 5 },
  ],
  
  "Benin": [
    // Mars (1er au 10 mars)
    { id: 43, destination: "Bénin", departureDate: "2025-03-01", returnDate: "2025-03-10", availableSeats: 12, totalSeats: 18, price: 925, duration: 9 },
    
    // Août (22 au 31 août)  
    { id: 44, destination: "Bénin", departureDate: "2025-08-22", returnDate: "2025-08-31", availableSeats: 8, totalSeats: 18, price: 925, duration: 9 },
    
    // Novembre (1er au 10 novembre)
    { id: 45, destination: "Bénin", departureDate: "2025-11-01", returnDate: "2025-11-10", availableSeats: 15, totalSeats: 18, price: 925, duration: 9 },
  ]
};

const destinations = ["Tous", "Senegal", "CapVert", "Benin"];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

const CalendarPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");
  
  const allDepartures = useMemo(() => {
    return Object.values(departures2025).flat();
  }, []);
  
  const getFilteredDepartures = () => {
    let filtered = selectedTab === "Tous" 
      ? allDepartures 
      : departures2025[selectedTab] || [];
    
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

  // Statistiques pour le dashboard
  const stats = useMemo(() => {
    const available = allDepartures.filter(d => !isDatePast(d.departureDate) && d.availableSeats > 0).length;
    const full = allDepartures.filter(d => !isDatePast(d.departureDate) && d.availableSeats === 0).length;
    const past = allDepartures.filter(d => isDatePast(d.departureDate)).length;
    
    return { available, full, past };
  }, [allDepartures]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Calendrier des Départs 2025</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Consultez notre calendrier complet de départs garantis pour 2025 et réservez votre aventure dès maintenant.
            </p>
          </div>

          {/* Dashboard de statistiques */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Départs disponibles</h3>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.available}</div>
                <p className="text-sm text-gray-500">Places encore libres</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Départs complets</h3>
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.full}</div>
                <p className="text-sm text-gray-500">Plus de places</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Départs effectués</h3>
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.past}</div>
                <p className="text-sm text-gray-500">Voyages terminés</p>
              </CardContent>
            </Card>
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
                    <TabsTrigger key={dest} value={dest}>
                      {dest === "CapVert" ? "Cap Vert" : dest === "Benin" ? "Bénin" : dest}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {destinations.map((dest) => (
                <TabsContent key={dest} value={dest}>
                  <div className="space-y-4">
                    {filteredDepartures.length > 0 ? (
                      filteredDepartures.map((departure) => (
                        <DepartureCard key={departure.id} departure={departure} />
                      ))
                    ) : (
                      <p className="text-center py-8 text-gray-500">Aucun départ ne correspond à vos critères.</p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CalendarIcon className="h-6 w-6 text-primary" />
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
  const isPast = isDatePast(departure.departureDate);
  const availabilityPercentage = (departure.availableSeats / departure.totalSeats) * 100;
  const isLowAvailability = departure.availableSeats > 0 && departure.availableSeats <= 5;
  const isSoldOut = departure.availableSeats === 0;
  
  const getStatusBadge = () => {
    if (isPast) {
      return (
        <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Effectué
        </span>
      );
    }
    
    if (isSoldOut) {
      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Complet
        </span>
      );
    }
    
    if (isLowAvailability) {
      return (
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Dernières places
        </span>
      );
    }
    
    return (
      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Disponible
      </span>
    );
  };
  
  return (
    <Card className={`overflow-hidden border-gray-200 transition-all hover:shadow-md ${isPast ? 'opacity-75 bg-gray-50' : ''}`}>
      <CardHeader className="bg-gray-50 py-4">
        <div className="flex justify-between items-center">
          <h3 className={`text-xl font-bold ${isPast ? 'line-through text-gray-500' : ''}`}>
            {departure.destination} - {departure.duration} jours
          </h3>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x">
          <div className="p-4 md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Dates du voyage</p>
            <p className={`font-medium ${isPast ? 'text-gray-500' : ''}`}>
              Du {formatDate(departure.departureDate)}
            </p>
            <p className={`font-medium ${isPast ? 'text-gray-500' : ''}`}>
              au {formatDate(departure.returnDate)}
            </p>
          </div>
          <div className="p-4 md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Places disponibles</p>
            {isPast ? (
              <p className="font-bold text-gray-500">Voyage terminé</p>
            ) : isSoldOut ? (
              <p className="font-bold text-red-500">Aucune place disponible</p>
            ) : (
              <>
                <p className={`font-bold ${isLowAvailability ? 'text-orange-500' : 'text-green-600'}`}>
                  {departure.availableSeats} sur {departure.totalSeats}
                </p>
                <div className="mt-2">
                  <Progress 
                    value={availabilityPercentage} 
                    className="h-2"
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
            <p className={`font-bold text-2xl mb-3 ${isPast ? 'text-gray-500' : 'text-primary'}`}>
              {departure.price}€
            </p>
            <div className="flex gap-2 w-full">
              <Button 
                size="sm" 
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
                disabled={isPast || isSoldOut}
              >
                {isPast ? 'Terminé' : isSoldOut ? 'Indisponible' : 'Réserver'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5"
                disabled={isPast}
              >
                Détails
              </Button>
            </div>
            {!isPast && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Paiement en plusieurs fois disponible
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarPage;