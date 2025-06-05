import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle, XCircle, AlertCircle, Phone, MessageCircle, Plus, Minus, Info, Mail } from 'lucide-react';
import { sendContactEmail } from '@/services/emailjs';
import { ContactFormData } from '@/types/contact';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

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
  totalSeats: number;
  bookedSeats: number;
  price: number;
  duration: number;
  description?: string;
};

// Données mises à jour pour 2025 avec places restantes
const departures2025: Record<string, DepartureType[]> = {
  "Senegal": [
    // Janvier
    { id: 1, destination: "Sénégal", departureDate: "2025-01-09", returnDate: "2025-01-15", totalSeats: 20, bookedSeats: 8, price: 865, duration: 7 },
    { id: 2, destination: "Sénégal", departureDate: "2025-01-23", returnDate: "2025-01-29", totalSeats: 20, bookedSeats: 12, price: 865, duration: 7 },
    
    // Février
    { id: 3, destination: "Sénégal", departureDate: "2025-02-06", returnDate: "2025-02-12", totalSeats: 20, bookedSeats: 5, price: 865, duration: 7 },
    { id: 4, destination: "Sénégal", departureDate: "2025-02-20", returnDate: "2025-02-26", totalSeats: 20, bookedSeats: 17, price: 865, duration: 7 },
    
    // Mars
    { id: 5, destination: "Sénégal", departureDate: "2025-03-06", returnDate: "2025-03-12", totalSeats: 20, bookedSeats: 0, price: 865, duration: 7 },
    { id: 6, destination: "Sénégal", departureDate: "2025-03-20", returnDate: "2025-03-26", totalSeats: 20, bookedSeats: 2, price: 865, duration: 7 },
    
    // Avril
    { id: 7, destination: "Sénégal", departureDate: "2025-04-03", returnDate: "2025-04-09", totalSeats: 20, bookedSeats: 6, price: 865, duration: 7 },
    { id: 8, destination: "Sénégal", departureDate: "2025-04-17", returnDate: "2025-04-23", totalSeats: 20, bookedSeats: 14, price: 865, duration: 7 },
    
    // Mai
    { id: 9, destination: "Sénégal", departureDate: "2025-05-08", returnDate: "2025-05-14", totalSeats: 20, bookedSeats: 8, price: 865, duration: 7 },
    { id: 10, destination: "Sénégal", departureDate: "2025-05-22", returnDate: "2025-05-28", totalSeats: 20, bookedSeats: 11, price: 865, duration: 7 },
    
    // Juin
    { id: 11, destination: "Sénégal", departureDate: "2025-06-05", returnDate: "2025-06-11", totalSeats: 20, bookedSeats: 4, price: 865, duration: 7 },
    { id: 12, destination: "Sénégal", departureDate: "2025-06-19", returnDate: "2025-06-25", totalSeats: 20, bookedSeats: 9, price: 865, duration: 7 },
    
    // Juillet
    { id: 13, destination: "Sénégal", departureDate: "2025-07-03", returnDate: "2025-07-09", totalSeats: 20, bookedSeats: 13, price: 865, duration: 7 },
    { id: 14, destination: "Sénégal", departureDate: "2025-07-17", returnDate: "2025-07-23", totalSeats: 20, bookedSeats: 16, price: 865, duration: 7 },
    
    // Août
    { id: 15, destination: "Sénégal", departureDate: "2025-08-07", returnDate: "2025-08-13", totalSeats: 20, bookedSeats: 7, price: 865, duration: 7 },
    { id: 16, destination: "Sénégal", departureDate: "2025-08-21", returnDate: "2025-08-27", totalSeats: 20, bookedSeats: 12, price: 865, duration: 7 },
    
    // Septembre
    { id: 17, destination: "Sénégal", departureDate: "2025-09-04", returnDate: "2025-09-10", totalSeats: 20, bookedSeats: 5, price: 865, duration: 7 },
    { id: 18, destination: "Sénégal", departureDate: "2025-09-18", returnDate: "2025-09-24", totalSeats: 20, bookedSeats: 10, price: 865, duration: 7 },
    
    // Octobre
    { id: 19, destination: "Sénégal", departureDate: "2025-10-02", returnDate: "2025-10-08", totalSeats: 20, bookedSeats: 8, price: 865, duration: 7 },
    { id: 20, destination: "Sénégal", departureDate: "2025-10-16", returnDate: "2025-10-22", totalSeats: 20, bookedSeats: 15, price: 865, duration: 7 },
    
    // Novembre
    { id: 21, destination: "Sénégal", departureDate: "2025-11-06", returnDate: "2025-11-12", totalSeats: 20, bookedSeats: 2, price: 865, duration: 7 },
    { id: 22, destination: "Sénégal", departureDate: "2025-11-20", returnDate: "2025-11-26", totalSeats: 20, bookedSeats: 6, price: 865, duration: 7 },
    
    // Décembre
    { id: 23, destination: "Sénégal", departureDate: "2025-12-04", returnDate: "2025-12-10", totalSeats: 20, bookedSeats: 11, price: 865, duration: 7 },
    { id: 24, destination: "Sénégal", departureDate: "2025-12-22", returnDate: "2025-12-28", totalSeats: 20, bookedSeats: 18, price: 865, duration: 7 },
    { id: 25, destination: "Sénégal", departureDate: "2025-12-30", returnDate: "2026-01-05", totalSeats: 20, bookedSeats: 14, price: 865, duration: 7 },
  ],
  
  "CapVert": [
    // Avril
    { id: 26, destination: "Cap Vert", departureDate: "2025-04-25", returnDate: "2025-04-29", totalSeats: 15, bookedSeats: 5, price: 785, duration: 5 },
    { id: 27, destination: "Cap Vert", departureDate: "2025-04-16", returnDate: "2025-04-20", totalSeats: 15, bookedSeats: 9, price: 785, duration: 5 },
    
    // Mai
    { id: 28, destination: "Cap Vert", departureDate: "2025-05-30", returnDate: "2025-06-03", totalSeats: 15, bookedSeats: 1, price: 785, duration: 5 },
    
    // Juillet
    { id: 29, destination: "Cap Vert", departureDate: "2025-07-11", returnDate: "2025-07-15", totalSeats: 15, bookedSeats: 11, price: 785, duration: 5 },
    { id: 30, destination: "Cap Vert", departureDate: "2025-07-25", returnDate: "2025-07-29", totalSeats: 15, bookedSeats: 13, price: 785, duration: 5 },
    
    // Août
    { id: 31, destination: "Cap Vert", departureDate: "2025-08-03", returnDate: "2025-08-08", totalSeats: 15, bookedSeats: 7, price: 785, duration: 5 },
    { id: 32, destination: "Cap Vert", departureDate: "2025-08-15", returnDate: "2025-08-19", totalSeats: 15, bookedSeats: 3, price: 785, duration: 5 },
    { id: 33, destination: "Cap Vert", departureDate: "2025-08-29", returnDate: "2025-09-02", totalSeats: 15, bookedSeats: 8, price: 785, duration: 5 },
    
    // Septembre
    { id: 34, destination: "Cap Vert", departureDate: "2025-09-12", returnDate: "2025-09-16", totalSeats: 15, bookedSeats: 6, price: 785, duration: 5 },
    { id: 35, destination: "Cap Vert", departureDate: "2025-09-26", returnDate: "2025-09-30", totalSeats: 15, bookedSeats: 12, price: 785, duration: 5 },
    
    // Octobre
    { id: 36, destination: "Cap Vert", departureDate: "2025-10-10", returnDate: "2025-10-14", totalSeats: 15, bookedSeats: 4, price: 785, duration: 5 },
    { id: 37, destination: "Cap Vert", departureDate: "2025-10-24", returnDate: "2025-10-28", totalSeats: 15, bookedSeats: 10, price: 785, duration: 5 },
    
    // Novembre
    { id: 38, destination: "Cap Vert", departureDate: "2025-11-14", returnDate: "2025-11-18", totalSeats: 15, bookedSeats: 2, price: 785, duration: 5 },
    { id: 39, destination: "Cap Vert", departureDate: "2025-11-28", returnDate: "2025-12-02", totalSeats: 15, bookedSeats: 7, price: 785, duration: 5 },
    
    // Décembre
    { id: 40, destination: "Cap Vert", departureDate: "2025-12-12", returnDate: "2025-12-16", totalSeats: 15, bookedSeats: 9, price: 785, duration: 5 },
    
    // Janvier 2026
    { id: 41, destination: "Cap Vert", departureDate: "2026-01-16", returnDate: "2026-01-20", totalSeats: 15, bookedSeats: 5, price: 785, duration: 5 },
    { id: 42, destination: "Cap Vert", departureDate: "2026-01-30", returnDate: "2026-02-03", totalSeats: 15, bookedSeats: 8, price: 785, duration: 5 },
  ],
  
  "Benin": [
    // Mars (1er au 10 mars)
    { id: 43, destination: "Bénin", departureDate: "2025-03-01", returnDate: "2025-03-10", totalSeats: 18, bookedSeats: 6, price: 925, duration: 9 },
    
    // Août (22 au 31 août)  
    { id: 44, destination: "Bénin", departureDate: "2025-08-22", returnDate: "2025-08-31", totalSeats: 18, bookedSeats: 10, price: 925, duration: 9 },
    
    // Novembre (1er au 10 novembre)
    { id: 45, destination: "Bénin", departureDate: "2025-11-01", returnDate: "2025-11-10", totalSeats: 18, bookedSeats: 3, price: 925, duration: 9 },
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

// Composant de formulaire de réservation
const BookingForm = ({ departure, selectedOptions, onClose }: { departure: DepartureType; selectedOptions: any[]; onClose: () => void }) => {
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

  const remainingSeats = departure.totalSeats - departure.bookedSeats;
  const totalBasePrice = departure.price * formData.numberOfPeople;
  const totalOptionsPrice = selectedOptions.reduce((sum, option) => sum + option.priceEUR, 0) * formData.numberOfPeople;
  const totalPrice = totalBasePrice + totalOptionsPrice;

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

${selectedOptions.length > 0 ? `🎯 Options sélectionnées :
${selectedOptions.map(opt => `- ${opt.name} : ${formatPrice(opt.priceEUR).eur}`).join('\n')}` : ''}

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

${selectedOptions.length > 0 ? `🎯 Options sélectionnées :
${selectedOptions.map(opt => `- ${opt.name} : ${formatPrice(opt.priceEUR).eur}`).join('\n')}` : ''}

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

// Composant de sélection d'options
const OptionsSelector = ({ destination, selectedOptions, onOptionsChange }: { destination: string; selectedOptions: any[]; onOptionsChange: (options: any[]) => void }) => {
  if (destination !== "Sénégal") return null;

  const toggleOption = (option: any) => {
    const isSelected = selectedOptions.some(opt => opt.id === option.id);
    if (isSelected) {
      onOptionsChange(selectedOptions.filter(opt => opt.id !== option.id));
    } else {
      onOptionsChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Options supplémentaires</h3>
      <div className="space-y-4">
        {senegalOptions.map(option => {
          const isSelected = selectedOptions.some(opt => opt.id === option.id);
          return (
            <Card key={option.id} className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOption(option)}
                        className={`p-1 ${isSelected ? 'text-primary' : 'text-gray-400'}`}
                      >
                        {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </Button>
                      <h4 className="font-semibold">{option.name}</h4>
                      <Badge variant="outline">{option.duration}</Badge>
                    </div>
                    
                    <div className="ml-8">
                      <div className="mb-3">
                        <h5 className="font-medium text-sm mb-1">Inclus :</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {option.includes.map((item, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm mb-1">Activités :</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {option.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="font-bold text-primary">{formatPrice(option.priceEUR).eur}</div>
                    <div className="text-sm text-gray-600">{formatPrice(option.priceEUR).xof}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const CalendarPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");
  
  // Gérer le filtre par destination depuis l'URL
  useEffect(() => {
    const destination = searchParams.get('destination');
    if (destination && destinations.includes(destination)) {
      setSelectedTab(destination);
    }
  }, [searchParams]);
  
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

  // Statistiques pour le dashboard
  const stats = useMemo(() => {
    const availableCount = allDepartures.filter(d => !isDatePast(d.departureDate) && (d.totalSeats - d.bookedSeats) > 0).length;
    const fullCount = allDepartures.filter(d => !isDatePast(d.departureDate) && (d.totalSeats - d.bookedSeats) === 0).length;
    const pastCount = allDepartures.filter(d => isDatePast(d.departureDate)).length;
    
    return { available: availableCount, full: fullCount, past: pastCount };
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
              Prix affichés en euros et francs CFA.
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
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Besoin d'une date personnalisée?</h3>
                <p className="text-gray-600 mb-4">
                  Vous ne trouvez pas de date qui vous convient? Nous pouvons organiser un voyage privé adapté à vos disponibilités.
                  Contactez-nous pour discuter de vos besoins et nous vous proposerons une solution sur mesure.
                </p>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate('/contact')}
                >
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const isPast = isDatePast(departure.departureDate);
  const remainingSeats = departure.totalSeats - departure.bookedSeats;
  const availabilityPercentage = (remainingSeats / departure.totalSeats) * 100;
  const isLowAvailability = remainingSeats > 0 && remainingSeats <= 5;
  const isSoldOut = remainingSeats === 0;
  
  const basePrice = formatPrice(departure.price);
  const totalOptionsPrice = selectedOptions.reduce((sum, option) => sum + option.priceEUR, 0);
  const totalPrice = departure.price + totalOptionsPrice;
  
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

  const handleDetailsClick = () => {
    const destinationSlug = departure.destination.toLowerCase().replace('é', 'e').replace('cap vert', 'capvert');
    navigate(`/destinations/${destinationSlug}`);
  };
  
  return (
    <>
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
              <p className="text-sm text-gray-500 mb-1">Places restantes</p>
              {isPast ? (
                <p className="font-bold text-gray-500">Voyage terminé</p>
              ) : isSoldOut ? (
                <p className="font-bold text-red-500">Aucune place disponible</p>
              ) : (
                <>
                  <p className={`font-bold ${isLowAvailability ? 'text-orange-500' : 'text-green-600'}`}>
                    {remainingSeats} places restantes
                  </p>
                  <div className="mt-2">
                    <Progress 
                      value={availabilityPercentage} 
                      className="h-2"
                    />
                  </div>
                  {isLowAvailability && (
                    <p className="text-orange-500 text-xs font-medium mt-1">
                      Plus que {remainingSeats} places !
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="p-4 md:col-span-2 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-1">À partir de</p>
              <div className="text-center mb-2">
                <p className={`font-bold text-lg ${isPast ? 'text-gray-500' : 'text-primary'}`}>
                  {basePrice.eur}
                </p>
                <p className="text-sm text-gray-600">{basePrice.xof}</p>
              </div>
              
              {totalOptionsPrice > 0 && !isPast && (
                <div className="text-center mb-2 p-2 bg-primary/5 rounded">
                  <p className="text-xs text-gray-500">Total avec options</p>
                  <p className="font-bold text-primary">{formatPrice(totalPrice).eur}</p>
                  <p className="text-xs text-gray-600">{formatPrice(totalPrice).xof}</p>
                </div>
              )}
              
              <div className="flex gap-2 w-full">
                <Button 
                  size="sm" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  disabled={isPast || isSoldOut}
                  onClick={() => setShowBookingForm(true)}
                >
                  {isPast ? 'Terminé' : isSoldOut ? 'Indisponible' : 'Réserver'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={handleDetailsClick}
                >
                  Détails
                </Button>
              </div>
              {!isPast && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Réservation par email ou WhatsApp
                </p>
              )}
            </div>
          </div>
          
          {!isPast && (
            <OptionsSelector 
              destination={departure.destination}
              selectedOptions={selectedOptions}
              onOptionsChange={setSelectedOptions}
            />
          )}
        </CardContent>
      </Card>
      
      {showBookingForm && (
        <BookingForm
          departure={departure}
          selectedOptions={selectedOptions}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
};

export default CalendarPage;