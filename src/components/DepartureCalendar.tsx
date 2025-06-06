import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, CheckCircle, XCircle, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

// Import conditionnel pour éviter les erreurs si les services ne sont pas disponibles
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

// Taux de conversion EUR/XOF
const EUR_TO_XOF = 655.957;

const formatPrice = (priceInEur: number) => {
  const priceInXOF = priceInEur * EUR_TO_XOF;
  return {
    eur: `${priceInEur}€`,
    xof: `${Math.round(priceInXOF).toLocaleString('fr-FR')} FCFA`
  };
};

// Options pour le Sénégal
const senegalOptions = [
  {
    id: 'sine-saloum',
    name: 'Option Sine Saloum',
    duration: '2 jours',
    priceXOF: 190000,
    priceEUR: Math.round(190000 / EUR_TO_XOF),
    includes: [
      '2 nuits supplémentaires',
      'Transport',
      'Petit déjeuner',
      'Déjeuner',
      'Visites'
    ],
    activities: [
      'Marche avec les lions de Fathala',
      'Balade sur le delta du Sine Saloum',
      'Visite du reposoir de Toubacouta',
      'Visite de l\'île emblématique et traditionnelle de Marlodj'
    ]
  },
  {
    id: 'casamance',
    name: 'Option Casamance',
    duration: '3 jours',
    priceXOF: 350000,
    priceEUR: Math.round(350000 / EUR_TO_XOF),
    includes: [
      'Trois nuits supplémentaires',
      'Billet d\'avion Dakar-Casamance aller-retour',
      'Petit déjeuner',
      'Déjeuner',
      'Transport',
      'Activités'
    ],
    activities: [
      'Visite du musée des traditions Diola',
      'Visite de l\'île emblématique d\'Eloubalir',
      'Visite de la case à impluvium, architecture ancestrale de la Casamance',
      'Séance d\'échange avec sa Majesté le Roi d\'Oussouye',
      'Balade en pirogue dans la mangrove sur le fleuve Casamance',
      'Tour de ville de Ziguinchor'
    ]
  },
  {
    id: 'nord',
    name: 'Option Nord',
    duration: '3 jours',
    priceXOF: 290000,
    priceEUR: Math.round(290000 / EUR_TO_XOF),
    includes: [
      'Une nuit dans le désert de Lompoul',
      'Une nuit à Saint-Louis',
      'Petit déjeuner',
      'Déjeuner',
      'Transport',
      'Activités'
    ],
    activities: [
      'Balade découverte du désert de Lompoul à dos de dromadaire',
      'Soirée feu de camp dans le désert',
      'Saint-Louis City Tour',
      'Musée de l\'histoire de Saint-Louis'
    ]
  }
];

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

// Composant de sélection d'options avec fonctionnalité dépliable en 3 colonnes
const OptionsSelector = ({ destination, selectedOptions, onOptionsChange }: { destination: string; selectedOptions: any[]; onOptionsChange: (options: any[]) => void }) => {
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({});

  if (destination !== "Sénégal") return null;

  const toggleOption = (option: any) => {
    const isSelected = selectedOptions.some(opt => opt.id === option.id);
    if (isSelected) {
      onOptionsChange(selectedOptions.filter(opt => opt.id !== option.id));
    } else {
      onOptionsChange([...selectedOptions, option]);
    }
  };

  const toggleExpanded = (optionId: string) => {
    setExpandedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-bold mb-3">Options supplémentaires</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {senegalOptions.map(option => {
          const isSelected = selectedOptions.some(opt => opt.id === option.id);
          const isExpanded = expandedOptions[option.id];
          
          return (
            <Card key={option.id} className={`transition-all ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
              <CardContent className="p-3">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOption(option)}
                        className={`p-1 ${isSelected ? 'text-primary' : 'text-gray-400'}`}
                      >
                        {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </Button>
                      <Badge variant="outline" className="text-xs">{option.duration}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(option.id)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
                  </div>
                  
                  <h5 className="font-semibold text-sm mb-2">{option.name}</h5>
                  
                  <div className="text-center mb-2">
                    <div className="font-bold text-primary text-sm">{formatPrice(option.priceEUR).eur}</div>
                    <div className="text-xs text-gray-600">{formatPrice(option.priceEUR).xof}</div>
                  </div>
                  
                  {isExpanded && (
                    <div className="animate-fade-in">
                      <div className="mb-2">
                        <h6 className="font-medium text-xs mb-1">Inclus :</h6>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {option.includes.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                          {option.includes.length > 3 && (
                            <li className="text-xs text-gray-500 italic">
                              +{option.includes.length - 3} autres inclus...
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="font-medium text-xs mb-1">Activités :</h6>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {option.activities.slice(0, 2).map((activity, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-secondary rounded-full mr-2"></span>
                              {activity}
                            </li>
                          ))}
                          {option.activities.length > 2 && (
                            <li className="text-xs text-gray-500 italic">
                              +{option.activities.length - 2} autres activités...
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Composant de formulaire de réservation simplifié pour la page d'accueil
const BookingFormHome = ({ departure, selectedOptions, onClose }: { departure: DepartureType; selectedOptions: any[]; onClose: () => void }) => {
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
  const navigate = useNavigate();

  const remainingSeats = departure.availableSeats;
  const totalBasePrice = departure.price * formData.numberOfPeople;
  const totalOptionsPrice = selectedOptions.reduce((sum, option) => sum + option.priceEUR, 0) * formData.numberOfPeople;
  const totalPrice = totalBasePrice + totalOptionsPrice;

  const handleEmailBooking = async () => {
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const emailData = {
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

${selectedOptions.length > 0 ? `🎯 Options sélectionnées :
${selectedOptions.map(opt => `- ${opt.name} : ${formatPrice(opt.priceEUR).eur}`).join('\n')}` : ''}

${formData.specialRequests ? `📝 Demandes spéciales : ${formData.specialRequests}` : ''}

Merci !`
      };

      await sendContactEmail(emailData);
      setSubmitStatus('success');
      
      // Préparer les données pour la page de confirmation
      const bookingData = {
        departure: {
          id: departure.id,
          destination: departure.destination,
          departureDate: departure.departureDate,
          returnDate: departure.returnDate,
          duration: departure.duration || 7,
          price: departure.price
        },
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          numberOfPeople: formData.numberOfPeople,
          specialRequests: formData.specialRequests
        },
        selectedOptions: selectedOptions,
        totalPrice: totalPrice
      };

      // Redirection vers la page de confirmation
      setTimeout(() => {
        navigate('/booking-confirmation', { state: { bookingData } });
      }, 1500);
      
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

${selectedOptions.length > 0 ? `🎯 Options sélectionnées :
${selectedOptions.map(opt => `- ${opt.name} : ${formatPrice(opt.priceEUR).eur}`).join('\n')}` : ''}

${formData.specialRequests ? `📝 Demandes spéciales : ${formData.specialRequests}` : ''}

Merci !`;

    window.open(`https://wa.me/221783083535?text=${encodeURIComponent(message)}`, '_blank');
    
    // Préparer les données pour la page de confirmation
    const bookingData = {
      departure: {
        id: departure.id,
        destination: departure.destination,
        departureDate: departure.departureDate,
        returnDate: departure.returnDate,
        duration: departure.duration || 7,
        price: departure.price
      },
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        numberOfPeople: formData.numberOfPeople,
        specialRequests: formData.specialRequests
      },
      selectedOptions: selectedOptions,
      totalPrice: totalPrice
    };

    // Fermer le modal et rediriger vers la page de confirmation
    onClose();
    navigate('/booking-confirmation', { state: { bookingData } });
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
                <p className="text-green-800">Votre demande a été envoyée avec succès ! Redirection en cours...</p>
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
            
            {selectedOptions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Options sélectionnées :</h4>
                {selectedOptions.map(option => (
                  <div key={option.id} className="flex justify-between text-sm">
                    <span>{option.name}</span>
                    <span>{formatPrice(option.priceEUR).eur}</span>
                  </div>
                ))}
              </div>
            )}
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
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const totalOptionsPrice = selectedOptions.reduce((sum, option) => sum + option.priceEUR, 0);
  const totalPrice = departure.price + totalOptionsPrice;

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
              <div className="mb-2">
                <p className="font-bold text-lg">{departure.price}€</p>
                {totalOptionsPrice > 0 && (
                  <div className="text-center p-1 bg-primary/5 rounded text-xs">
                    <p className="text-primary font-bold">Total: {formatPrice(totalPrice).eur}</p>
                  </div>
                )}
              </div>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white w-full"
                onClick={() => setShowBookingForm(true)}
              >
                Réserver
              </Button>
            </div>
          </div>
          
          {/* Options pour le Sénégal */}
          <OptionsSelector 
            destination={departure.destination}
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
          />
        </CardContent>
      </Card>
      
      {showBookingForm && (
        <BookingFormHome
          departure={departure}
          selectedOptions={selectedOptions}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
};

export default DepartureCalendar;