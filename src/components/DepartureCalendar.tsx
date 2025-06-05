import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

type DepartureType = {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  price: number;
};

const departures: Record<string, DepartureType[]> = {
  "Senegal": [
    { id: 1, destination: "Sénégal", departureDate: "2025-01-15", returnDate: "2025-01-22", availableSeats: 12, price: 865 },
    { id: 2, destination: "Sénégal", departureDate: "2025-02-12", returnDate: "2025-02-19", availableSeats: 8, price: 865 },
    { id: 3, destination: "Sénégal", departureDate: "2025-03-19", returnDate: "2025-03-26", availableSeats: 15, price: 865 },
  ],
  "CapVert": [
    { id: 4, destination: "Cap Vert", departureDate: "2025-01-30", returnDate: "2025-02-04", availableSeats: 10, price: 785 },
    { id: 5, destination: "Cap Vert", departureDate: "2025-02-27", returnDate: "2025-03-04", availableSeats: 6, price: 785 },
    { id: 6, destination: "Cap Vert", departureDate: "2025-05-30", returnDate: "2025-06-03", availableSeats: 14, price: 785 },
  ],
  "Benin": [
    { id: 7, destination: "Bénin", departureDate: "2025-04-10", returnDate: "2025-04-16", availableSeats: 12, price: 925 },
    { id: 8, destination: "Bénin", departureDate: "2025-07-17", returnDate: "2025-07-23", availableSeats: 8, price: 925 },
    { id: 9, destination: "Bénin", departureDate: "2025-09-04", returnDate: "2025-09-10", availableSeats: 15, price: 925 },
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

const DepartureCalendar = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Senegal");

  const getDestinationParam = (dest: string) => {
    switch(dest) {
      case 'Senegal':
        return 'Senegal';
      case 'CapVert':
        return 'CapVert';
      case 'Benin':
        return 'Benin';
      default:
        return dest;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calendrier des départs garantis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Consultez notre calendrier de départs garantis pour 2025 et réservez votre aventure dès maintenant.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="Senegal" onValueChange={setSelectedTab} value={selectedTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="Senegal">Sénégal</TabsTrigger>
                <TabsTrigger value="CapVert">Cap Vert</TabsTrigger>
                <TabsTrigger value="Benin">Bénin</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="Senegal">
              <div className="grid gap-4">
                {departures.Senegal.map((departure) => (
                  <DepartureCard key={departure.id} departure={departure} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="CapVert">
              <div className="grid gap-4">
                {departures.CapVert.map((departure) => (
                  <DepartureCard key={departure.id} departure={departure} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="Benin">
              <div className="grid gap-4">
                {departures.Benin.map((departure) => (
                  <DepartureCard key={departure.id} departure={departure} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/calendar">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Voir le calendrier complet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const DepartureCard = ({ departure }: { departure: DepartureType }) => {
  const getDestinationParam = (destination: string) => {
    switch(destination) {
      case 'Sénégal':
        return 'Senegal';
      case 'Cap Vert':
        return 'CapVert';
      case 'Bénin':
        return 'Benin';
      default:
        return destination;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 py-3">
        <h3 className="text-xl font-bold">{departure.destination}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x">
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">Date de départ</p>
            <p className="font-medium">{formatDate(departure.departureDate)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">Date de retour</p>
            <p className="font-medium">{formatDate(departure.returnDate)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">Places disponibles</p>
            <p className={`font-bold ${departure.availableSeats <= 5 ? 'text-primary' : ''}`}>
              {departure.availableSeats}
            </p>
          </div>
          <div className="p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">À partir de</p>
            <p className="font-bold text-lg mb-2">{departure.price}€</p>
            <Link to={`/calendar?destination=${getDestinationParam(departure.destination)}`}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Réserver
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartureCalendar;