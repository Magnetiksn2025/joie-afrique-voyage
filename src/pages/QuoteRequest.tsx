import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  Home, 
  Car, 
  Heart, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Euro,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { sendContactEmail } from '@/services/emailjs';
import { ContactFormData } from '@/types/contact';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  accommodationType: string;
  budgetRange: string;
  activities: string[];
  specificNeeds: string;
  additionalInfo: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const QuoteRequestPage = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 2,
    accommodationType: '',
    budgetRange: '',
    activities: [],
    specificNeeds: '',
    additionalInfo: ''
  });

  const destinations = [
    { value: 'senegal', label: 'Sénégal', popular: true },
    { value: 'capvert', label: 'Cap-Vert', popular: true },
    { value: 'benin', label: 'Bénin', popular: true },
    { value: 'autre', label: 'Autre destination' }
  ];

  const accommodationTypes = [
    { value: 'hotel-luxe', label: 'Hôtel de luxe (4-5 étoiles)', icon: Star },
    { value: 'hotel-confort', label: 'Hôtel confort (3 étoiles)', icon: Home },
    { value: 'lodge', label: 'Lodge / Écolodge', icon: Heart },
    { value: 'mixte', label: 'Hébergement mixte', icon: Star },
    { value: 'autre', label: 'Autre (préciser)', icon: Home }
  ];

  const budgetRanges = [
    { value: '500-1000', label: '500€ - 1000€ par personne' },
    { value: '1000-1500', label: '1000€ - 1500€ par personne' },
    { value: '1500-2500', label: '1500€ - 2500€ par personne' },
    { value: '2500+', label: 'Plus de 2500€ par personne' },
    { value: 'flexible', label: 'Budget flexible' }
  ];

  const availableActivities = [
    'Découverte culturelle',
    'Safari / Observation animalière',
    'Plages et détente',
    'Randonnée / Trekking',
    'Visites historiques',
    'Gastronomie locale',
    'Artisanat et shopping',
    'Rencontres avec les communautés',
    'Photographie',
    'Musique et danse traditionnelle'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'Le prénom doit faire au moins 2 caractères';
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Le nom doit faire au moins 2 caractères';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.destination) {
      newErrors.destination = 'Veuillez sélectionner une destination';
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Date de départ requise';
    }

    if (!formData.returnDate) {
      newErrors.returnDate = 'Date de retour requise';
    }

    if (!formData.accommodationType) {
      newErrors.accommodationType = 'Type d\'hébergement requis';
    }

    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Fourchette de budget requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleActivityToggle = (activity: string) => {
    const updatedActivities = formData.activities.includes(activity)
      ? formData.activities.filter(a => a !== activity)
      : [...formData.activities, activity];
    
    handleInputChange('activities', updatedActivities);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormStatus('loading');
    setSubmitMessage('');

    try {
      const emailData: ContactFormData = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        subject: `Demande de devis personnalisé - ${formData.destination}`,
        destination: formData.destination,
        message: `Bonjour LRAD Tourisme,

Je souhaite recevoir un devis personnalisé pour un voyage avec les informations suivantes :

👤 INFORMATIONS PERSONNELLES
- Nom : ${formData.lastName}
- Prénom : ${formData.firstName}  
- Email : ${formData.email}
- Téléphone : ${formData.phone}

🌍 DÉTAILS DU VOYAGE
- Destination : ${formData.destination}
- Date de départ : ${formData.departureDate}
- Date de retour : ${formData.returnDate}
- Nombre de voyageurs : ${formData.travelers} personne(s)
- Budget approximatif : ${formData.budgetRange}

🏨 HÉBERGEMENT SOUHAITÉ
- Type d'hébergement : ${formData.accommodationType}

${formData.activities.length > 0 ? `🎯 ACTIVITÉS D'INTÉRÊT
${formData.activities.map(activity => `- ${activity}`).join('\n')}` : ''}

${formData.specificNeeds ? `⚠️ BESOINS SPÉCIFIQUES
${formData.specificNeeds}` : ''}

${formData.additionalInfo ? `📝 INFORMATIONS COMPLÉMENTAIRES
${formData.additionalInfo}` : ''}

Merci de me faire parvenir une proposition détaillée.

Cordialement,
${formData.firstName} ${formData.lastName}`
      };

      await sendContactEmail(emailData);
      
      setFormStatus('success');
      setSubmitMessage('Votre demande de devis a été envoyée avec succès ! Notre équipe vous contactera sous 24h avec une proposition personnalisée.');
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        travelers: 2,
        accommodationType: '',
        budgetRange: '',
        activities: [],
        specificNeeds: '',
        additionalInfo: ''
      });
    } catch (error) {
      setFormStatus('error');
      setSubmitMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
      console.error('Erreur envoi devis:', error);
    }
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.destination && 
           formData.departureDate && 
           formData.returnDate && 
           formData.accommodationType && 
           formData.budgetRange;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Euro className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Demande de Devis Personnalisé
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partagez-nous vos envies de voyage et recevez une proposition sur mesure 
              adaptée à vos souhaits et votre budget
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Remplissez le formulaire</h3>
                  <p className="text-sm text-gray-600">Détaillez vos souhaits</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-600">Étude personnalisée</h3>
                  <p className="text-sm text-gray-500">Sous 24h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-600">Proposition détaillée</h3>
                  <p className="text-sm text-gray-500">Par email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {formStatus === 'success' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Demande envoyée avec succès !</h3>
                    <p className="text-green-700">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Erreur d'envoi</h3>
                    <p className="text-red-700">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-3 text-red-600" />
                    Informations personnelles
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.firstName ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.lastName ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.email ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-red-600" />
                    Votre voyage de rêve
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Destination *
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.destination ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                      >
                        <option value="">Choisissez votre destination</option>
                        {destinations.map((dest) => (
                          <option key={dest.value} value={dest.value}>
                            {dest.label} {dest.popular && '⭐'}
                          </option>
                        ))}
                      </select>
                      {errors.destination && (
                        <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Date de départ *
                      </label>
                      <input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange('departureDate', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.departureDate ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                      />
                      {errors.departureDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Date de retour *
                      </label>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.returnDate ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                      />
                      {errors.returnDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Nombre de voyageurs *
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-colors"
                      >
                        {[...Array(20)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? 'personne' : 'personnes'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Budget approximatif par personne *
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.budgetRange ? 'border-red-400' : 'border-gray-200 focus:border-red-600'
                        }`}
                      >
                        <option value="">Sélectionnez votre fourchette de budget</option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange && (
                        <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Home className="w-6 h-6 mr-3 text-red-600" />
                    Type d'hébergement souhaité
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accommodationTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label
                          key={type.value}
                          className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            formData.accommodationType === type.value
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            value={type.value}
                            checked={formData.accommodationType === type.value}
                            onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-gray-900">
                              {type.label}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {errors.accommodationType && (
                    <p className="text-red-500 text-sm mt-2">{errors.accommodationType}</p>
                  )}
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-red-600" />
                    Activités qui vous intéressent
                  </h2>
                  <p className="text-gray-600 mb-6">Sélectionnez toutes les activités qui vous attirent (optionnel)</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableActivities.map((activity) => (
                      <label
                        key={activity}
                        className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.activities.includes(activity)
                            ? 'border-red-600 bg-red-50 text-red-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.activities.includes(activity)}
                          onChange={() => handleActivityToggle(activity)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3 text-red-600" />
                    Vos besoins spécifiques
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Contraintes particulières ou besoins d'accessibilité
                      </label>
                      <textarea
                        rows={3}
                        value={formData.specificNeeds}
                        onChange={(e) => handleInputChange('specificNeeds', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-colors resize-none"
                        placeholder="Régimes alimentaires spéciaux, problèmes de mobilité, allergies..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Informations complémentaires
                      </label>
                      <textarea
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-600 transition-colors resize-none"
                        placeholder="Partagez-nous tout ce qui vous semble important pour organiser votre voyage parfait : vos attentes, vos craintes, vos rêves..."
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid() || formStatus === 'loading'}
                    className={`group relative px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                      isFormValid() && formStatus !== 'loading'
                        ? 'bg-gradient-to-r from-red-600 to-green-600 text-white hover:scale-105 hover:shadow-2xl shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {formStatus === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          <span>Envoyer ma demande de devis</span>
                        </>
                      )}
                    </div>
                    
                    {isFormValid() && formStatus !== 'loading' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl transform -skew-x-12" />
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * Champs obligatoires - Réponse personnalisée sous 24h
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 md:px-12 py-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Clock className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Réponse rapide</h4>
                    <p className="text-sm text-gray-600">Proposition détaillée sous 24h</p>
                  </div>
                  <div>
                    <User className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Conseiller dédié</h4>
                    <p className="text-sm text-gray-600">Expert de votre destination</p>
                  </div>
                  <div>
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Sur mesure</h4>
                    <p className="text-sm text-gray-600">100% personnalisé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuoteRequestPage;