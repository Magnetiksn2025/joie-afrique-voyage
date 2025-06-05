import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { sendContactEmail } from '@/services/emailjs';
import { ContactFormData } from '@/types/contact';

type DepartureType = {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  price: number;
  duration?: number;
  totalSeats?: number;
};

const departures: Record<string, DepartureType[]> = {
  "Senegal": [
    { id: 1, destination: "Sénégal", departureDate: "2025-06-15", returnDate: "2025-06-22", availableSeats: 12, price: 865, duration: 7, totalSeats: 20 },
    { id: 2, destination: "Sénégal", departureDate: "2025-07-12", returnDate: "2025-07-19", availableSeats: 8, price: 865, duration: 7, totalSeats: 20 },
    { id: 3, destination: "Sénégal", departureDate: "2025-08-19", returnDate: "2025-08-26", availableSeats: 15, price: 865, duration: 7, totalSeats: 20 },
  ],
  "CapVert": [
    { id: 4, destination: "Cap Vert", departureDate: "2025-06-30", returnDate: "2025-07-04", availableSeats: 10, price: 785, duration: 5, totalSeats: 15 },
    { id: 5, destination: "Cap Vert", departureDate: "2025-07-27", returnDate: "2025-08-04", availableSeats: 6, price: 785, duration: 5, totalSeats: 15 },
    { id: 6, destination: "Cap Vert", departureDate: "2025-08-30", returnDate: "2025-09-03", availableSeats: 14, price: 785, duration: 5, totalSeats: 15 },
  ],
  "Benin": [
    { id: 7, destination: "Bénin", departureDate: "2025-07-10", returnDate: "2025-07-16", availableSeats: 12, price: 925, duration: 6, totalSeats: 18 },
    { id: 8, destination: "Bénin", departureDate: "2025-08-17", returnDate: "2025-08-23", availableSeats: 8, price: 925, duration: 6, totalSeats: 18 },
    { id: 9, destination: "Bénin", departureDate: "2025-09-14", returnDate: "2025-09-20", availableSeats: 15, price: 925, duration: 6, totalSeats: 18 },
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

const formatPrice = (priceInEur: number) => {
  const EUR_TO_XOF = 655.957;
  const priceInXOF = priceInEur * EUR_TO_XOF;
  return {
    eur: `${priceInEur}€`,
    xof: `${Math.round(priceInXOF).toLocaleString('fr-FR')} FCFA`
  };
};

// Composant de formulaire de réservation simplifié pour la page d'accueil
const BookingFormHome = ({ departure, onClose }: { departure: DepartureType; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    numberOfPeople: 1,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const remainingSeats = departure.availableSeats;
  const totalPrice = departure.price * formData.numberOfPeople;

  const handleEmailBooking = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const emailData: ContactFormData = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        subject: `Réservation - ${departure.destination} - ${formatDate(departure.departureDate)}`,
        destination: departure.destination,
        message: `Bonjour LRAD Tourisme,

Je souhaite faire une réservation :

📍 Destination : ${departure.destination}
📅 Départ : ${formatDate(departure.departureDate)}
📅 Retour : ${formatDate(departure.returnDate)}
👥 Nombre de personnes : ${formData.numberOfPeople}

👤 Informations du client :
- Nom : ${formData.lastName}
- Prénom : ${formData.firstName}
- Email : ${formData.email}
- Téléphone : ${formData.phone}

💰 Prix total : ${formatPrice(totalPrice).eur} / ${formatPrice(totalPrice).xof}

${formData.specialRequests ? `📝 Demandes spéciales : ${formData.specialRequests}` : ''}

Merci !`
      };

      await sendContactEmail(emailData);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const message = `Bonjour LRAD Tourisme,
    
Je souhaite faire une réservation :

📍 Destination : ${departure.destination}
📅 Départ : ${formatDate(departure.departureDate)}
📅 Retour : ${formatDate(departure.returnDate)}
👥 Nombre de personnes : ${formData.numberOfPeople}

👤 Informations du client :
- Nom : ${formData.lastName}
- Prénom : ${formData.firstName}
- Email : ${formData.email}
- Téléphone : ${formData.phone}

💰 Prix total : ${formatPrice(totalPrice).eur} / ${formatPrice(totalPrice).xof}

${formData.specialRequests ? `📝 Demandes spéciales : ${formData.specialRequests}` : ''}

Merci !`;

    window.open(`https://wa.me/221783083535?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Réservation - {departure.destination}
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Messages de statut */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800">Votre demande a été envoyée avec succès ! Nous vous contactons sous 24h.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800">Erreur lors de l'envoi. Veuillez réessayer ou utiliser WhatsApp.</p>
              </div>
            </div>
          )}

          {/* Résumé du voyage */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Résumé du voyage</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Départ :</strong> {formatDate(departure.departureDate)}</p>
                <p><strong>Retour :</strong> {formatDate(departure.returnDate)}</p>
              </div>
              <div>
                <p><strong>Durée :</strong> {departure.duration} jours</p>
                <p><strong>Prix de base :</strong> {formatPrice(departure.price).eur}</p>
              </div>
            </div>
          </div>

          {/* Formulaire de réservation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prénom *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nom *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Téléphone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre de personnes</label>
            <select
              value={formData.numberOfPeople}
              onChange={(e) => setFormData({...formData, numberOfPeople: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-md"
            >
              {[...Array(Math.min(remainingSeats, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} personne{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Demandes spéciales</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              className="w-full p-2 border rounded-md h-20"
              placeholder="Régime alimentaire, besoins spéciaux..."
            />
          </div>

          {/* Prix total */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Prix total :</span>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{formatPrice(totalPrice).eur}</div>
                <div className="text-sm text-gray-600">{formatPrice(totalPrice).xof}</div>
              </div>
            </div>
          </div>

          {/* Boutons de réservation */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleEmailBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Envoi...</span>
                </div>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Réserver par Email
                </>
              )}
            </Button>
            <Button
              onClick={handleWhatsAppBooking}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!isFormValid}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Réserver via WhatsApp
            </Button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Notre équipe vous contactera sous 24h pour confirmer votre réservation
          </p>
        </CardContent>
      </Card>
    </div>
  );
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  
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
    <>
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
              <p className="text-sm text-gray-500">Disponibilité</p>
              {departure.availableSeats <= 5 ? (
                <p className="font-bold text-orange-500">
                  Plus que {departure.availableSeats} places !
                </p>
              ) : (
                <p className="font-bold text-green-600">
                  Places disponibles
                </p>
              )}
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500">À partir de</p>
              <p className="font-bold text-lg mb-2">{departure.price}€</p>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowBookingForm(true)}
              >
                Réserver
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showBookingForm && (
        <BookingFormHome
          departure={departure}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
};

export default DepartureCalendar;