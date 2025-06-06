import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Users, Euro, Phone, Mail, User, Home, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Interface pour les données de réservation
interface BookingData {
  departure: {
    id: number;
    destination: string;
    departureDate: string;
    returnDate: string;
    duration: number;
    price: number;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfPeople: number;
    specialRequests?: string;
  };
  selectedOptions?: Array<{
    id: string;
    name: string;
    priceEUR: number;
    duration: string;
  }>;
  totalPrice: number;
}

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

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData as BookingData;

  // Redirection si pas de données
  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-xl font-bold mb-4">Aucune réservation trouvée</h1>
              <p className="text-gray-600 mb-6">Il semble qu'il n'y ait pas de données de réservation disponibles.</p>
              <Button asChild>
                <Link to="/" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const totalBasePrice = bookingData.departure.price * bookingData.customer.numberOfPeople;
  const totalOptionsPrice = (bookingData.selectedOptions || []).reduce((sum, option) => sum + option.priceEUR, 0) * bookingData.customer.numberOfPeople;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* En-tête de confirmation */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Demande envoyée avec succès !
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre demande de réservation a bien été transmise à notre équipe. 
              Nous vous contacterons dans les plus brefs délais pour confirmer votre voyage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Récapitulatif du voyage */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                <CardTitle className="flex items-center text-2xl">
                  <MapPin className="w-6 h-6 mr-3" />
                  Récapitulatif de votre voyage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">Destination</h3>
                        <p className="text-gray-600">{bookingData.departure.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">Dates</h3>
                        <p className="text-gray-600">
                          Du {formatDate(bookingData.departure.departureDate)}
                        </p>
                        <p className="text-gray-600">
                          au {formatDate(bookingData.departure.returnDate)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {bookingData.departure.duration} jours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">Voyageurs</h3>
                        <p className="text-gray-600">
                          {bookingData.customer.numberOfPeople} personne{bookingData.customer.numberOfPeople > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Options sélectionnées */}
                    {bookingData.selectedOptions && bookingData.selectedOptions.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-3">Options sélectionnées</h3>
                        <div className="space-y-3">
                          {bookingData.selectedOptions.map(option => (
                            <div key={option.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{option.name}</p>
                                <p className="text-sm text-gray-500">{option.duration}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-primary">{formatPrice(option.priceEUR).eur}</p>
                                <p className="text-xs text-gray-500">{formatPrice(option.priceEUR).xof}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Demandes spéciales */}
                    {bookingData.customer.specialRequests && (
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">Demandes spéciales</h3>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {bookingData.customer.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations client */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <User className="w-5 h-5 mr-3 text-primary" />
                  Vos informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Nom complet</h4>
                      <p className="text-gray-600">{bookingData.customer.firstName} {bookingData.customer.lastName}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">{bookingData.customer.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Téléphone</h4>
                      <p className="text-gray-600">{bookingData.customer.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Récapitulatif des prix */}
            <Card className="shadow-lg border-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center text-xl">
                  <Euro className="w-5 h-5 mr-3 text-primary" />
                  Récapitulatif des prix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Prix de base ({bookingData.customer.numberOfPeople} pers. × {formatPrice(bookingData.departure.price).eur})</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(totalBasePrice).eur}</div>
                      <div className="text-sm text-gray-500">{formatPrice(totalBasePrice).xof}</div>
                    </div>
                  </div>

                  {totalOptionsPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Options supplémentaires</span>
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(totalOptionsPrice).eur}</div>
                        <div className="text-sm text-gray-500">{formatPrice(totalOptionsPrice).xof}</div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{formatPrice(bookingData.totalPrice).eur}</div>
                        <div className="text-lg text-gray-600">{formatPrice(bookingData.totalPrice).xof}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prochaines étapes */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary to-green-600 text-white">
                <CardTitle className="text-xl">Prochaines étapes</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Confirmation de réception</h4>
                      <p className="text-gray-600">Nous confirmons la réception de votre demande par email dans les prochaines minutes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Contact de notre équipe</h4>
                      <p className="text-gray-600">Un de nos conseillers vous contactera sous 24h pour finaliser votre réservation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Préparation de votre voyage</h4>
                      <p className="text-gray-600">Nous vous accompagnons dans la préparation de votre voyage jusqu'au départ.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/5" asChild>
                <Link to="/calendar">
                  <Calendar className="w-4 h-4 mr-2" />
                  Voir d'autres départs
                </Link>
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <a href="https://wa.me/221783083535" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nous contacter
                </a>
              </Button>
            </div>

            {/* Contact d'urgence */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Une question ? Besoin d'aide ?</h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe est disponible pour répondre à toutes vos questions
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a href="tel:+221783083535" className="flex items-center text-primary hover:text-primary/80">
                    <Phone className="w-4 h-4 mr-2" />
                    +221 78 308 35 35
                  </a>
                  <a href="mailto:lrad.ccia101@gmail.com" className="flex items-center text-primary hover:text-primary/80">
                    <Mail className="w-4 h-4 mr-2" />
                    lrad.ccia101@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;