
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TourCardProps = {
  image: string;
  title: string;
  days: number;
  description: string;
  price: number;
  priceCouple: number;
  inclusions: string[];
  featured?: boolean;
};

const TourCard = ({ 
  image, 
  title, 
  days, 
  description, 
  price, 
  priceCouple,
  inclusions, 
  featured = false 
}: TourCardProps) => {
  return (
    <Card className={`overflow-hidden tour-card ${featured ? 'border-secondary border-2' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-secondary text-white">
            Populaire
          </Badge>
        )}
        <Badge className="absolute bottom-2 left-2 bg-primary text-white">
          {days} jours
        </Badge>
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          <p className="font-semibold">Ce qui est inclus:</p>
          <ul className="text-sm space-y-1">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-secondary mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">À partir de</p>
            <div className="flex items-end space-x-2">
              <p className="text-xl font-bold">{price}€</p>
              <span className="text-sm text-gray-500">/personne</span>
            </div>
            <div className="text-sm text-gray-500">{priceCouple}€ pour un couple</div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Réserver
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedTours = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos voyages populaires</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos séjours les plus prisés, conçus pour vous offrir des expériences 
            authentiques et mémorables en Afrique de l'Ouest.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TourCard
            image="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80"
            title="Découverte du Cap Vert"
            days={5}
            description="Un séjour de 5 jours pour explorer les merveilles naturelles et culturelles du Cap Vert."
            price={785}
            priceCouple={1450}
            inclusions={[
              "Transfert aéroport", 
              "Hôtel 5 jours / 4 nuits", 
              "Transport climatisé", 
              "Petit-déjeuners et déjeuners", 
              "Visites guidées"
            ]}
            featured={true}
          />
          <TourCard
            image="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80"
            title="Immersion au Sénégal"
            days={7}
            description="7 jours d'exploration du Sénégal, de Dakar à la réserve de Bandia en passant par l'île de Gorée."
            price={865}
            priceCouple={1450}
            inclusions={[
              "Transfert aéroport", 
              "Hôtel 7 jours / 6 nuits", 
              "Transport climatisé", 
              "Petit-déjeuners et déjeuners", 
              "Guide touristique"
            ]}
          />
          <TourCard
            image="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80"
            title="Trésors du Bénin"
            days={6}
            description="Découvrez l'histoire fascinante et les paysages uniques du Bénin lors de ce séjour de 6 jours."
            price={925}
            priceCouple={1650}
            inclusions={[
              "Transfert aéroport", 
              "Hôtel 6 jours / 5 nuits", 
              "Transport climatisé", 
              "Petit-déjeuners et déjeuners", 
              "Activités culturelles"
            ]}
          />
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Voir toutes nos destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
