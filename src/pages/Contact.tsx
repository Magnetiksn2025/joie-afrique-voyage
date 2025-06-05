import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User, MessageSquare, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { z } from 'zod';

// Schema de validation simple
const contactFormSchema = z.object({
  from_name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  
  from_email: z
    .string()
    .email('Veuillez saisir un email valide')
    .min(1, 'L\'email est requis'),
  
  phone: z
    .string()
    .optional(),
  
  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(100, 'Le sujet ne peut pas dépasser 100 caractères'),
  
  destination: z
    .string()
    .optional(),
  
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('loading');
    setSubmitMessage('');

    try {
      // Simulation d'envoi pour l'instant
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus('success');
      setSubmitMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      reset();
    } catch (error) {
      setFormStatus('error');
      setSubmitMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      console.error('Erreur envoi formulaire:', error);
    }
  };

  const destinations = [
    'Sénégal',
    'Cap-Vert', 
    'Bénin',
    'Autre destination'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* En-tête du formulaire */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Contactez-nous
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Partagez-nous vos envies de voyage et nous vous accompagnerons dans la création de votre voyage sur mesure
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Messages de statut */}
              {formStatus === 'success' && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Message envoyé !</h3>
                      <p className="text-green-700">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
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

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Colonne gauche */}
                  <div className="space-y-6">
                    {/* Nom */}
                    <div className="group">
                      <label htmlFor="from_name" className="block text-sm font-semibold text-gray-800 mb-3">
                        <User className="w-4 h-4 inline mr-2 text-primary" />
                        Nom complet *
                      </label>
                      <div className="relative">
                        <input
                          {...register('from_name')}
                          type="text"
                          id="from_name"
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                            errors.from_name 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-primary group-hover:border-gray-300'
                          }`}
                          placeholder="Votre nom complet"
                        />
                        {errors.from_name && (
                          <div className="absolute -bottom-6 left-0">
                            <p className="text-red-500 text-sm font-medium">{errors.from_name.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label htmlFor="from_email" className="block text-sm font-semibold text-gray-800 mb-3">
                        <Mail className="w-4 h-4 inline mr-2 text-primary" />
                        Adresse email *
                      </label>
                      <div className="relative">
                        <input
                          {...register('from_email')}
                          type="email"
                          id="from_email"
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                            errors.from_email 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-primary group-hover:border-gray-300'
                          }`}
                          placeholder="votre.email@exemple.com"
                        />
                        {errors.from_email && (
                          <div className="absolute -bottom-6 left-0">
                            <p className="text-red-500 text-sm font-medium">{errors.from_email.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-3">
                        <Phone className="w-4 h-4 inline mr-2 text-primary" />
                        Téléphone
                      </label>
                      <div className="relative">
                        <input
                          {...register('phone')}
                          type="tel"
                          id="phone"
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                            errors.phone 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-primary group-hover:border-gray-300'
                          }`}
                          placeholder="+33 6 12 34 56 78"
                        />
                        {errors.phone && (
                          <div className="absolute -bottom-6 left-0">
                            <p className="text-red-500 text-sm font-medium">{errors.phone.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="group">
                      <label htmlFor="destination" className="block text-sm font-semibold text-gray-800 mb-3">
                        <MapPin className="w-4 h-4 inline mr-2 text-primary" />
                        Destination souhaitée
                      </label>
                      <select
                        {...register('destination')}
                        id="destination"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all duration-300 group-hover:border-gray-300"
                      >
                        <option value="">Choisissez votre destination</option>
                        {destinations.map((dest) => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Colonne droite */}
                  <div className="space-y-6">
                    {/* Sujet */}
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-3">
                        Sujet de votre demande *
                      </label>
                      <div className="relative">
                        <input
                          {...register('subject')}
                          type="text"
                          id="subject"
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                            errors.subject 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-primary group-hover:border-gray-300'
                          }`}
                          placeholder="Ex: Voyage de groupe au Sénégal"
                        />
                        {errors.subject && (
                          <div className="absolute -bottom-6 left-0">
                            <p className="text-red-500 text-sm font-medium">{errors.subject.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-3">
                        <MessageSquare className="w-4 h-4 inline mr-2 text-primary" />
                        Votre message *
                      </label>
                      <div className="relative">
                        <textarea
                          {...register('message')}
                          id="message"
                          rows={8}
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 resize-none ${
                            errors.message 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-primary group-hover:border-gray-300'
                          }`}
                          placeholder="Décrivez-nous votre projet de voyage : dates souhaitées, type d'hébergement, activités préférées, budget approximatif..."
                        />
                        {errors.message && (
                          <div className="absolute -bottom-6 left-0">
                            <p className="text-red-500 text-sm font-medium">{errors.message.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton d'envoi */}
                <div className="mt-12 text-center">
                  <button
                    type="submit"
                    disabled={!isValid || formStatus === 'loading'}
                    className={`group relative px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                      isValid && formStatus !== 'loading'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-2xl shadow-lg'
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
                          <span>Envoyer ma demande</span>
                        </>
                      )}
                    </div>
                    
                    {/* Effet de brillance au survol */}
                    {isValid && formStatus !== 'loading' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl transform -skew-x-12" />
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * Champs obligatoires - Réponse garantie sous 24h
                  </p>
                </div>
              </form>

              {/* Footer du formulaire */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 md:px-12 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Contact direct</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        +221 78 308 35 35
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        lrad.ccia101@gmail.com
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Pourquoi nous choisir ?</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Expertise locale de l'Afrique de l'Ouest</li>
                      <li>• Voyages 100% sur mesure</li>
                      <li>• Accompagnement personnalisé</li>
                      <li>• Guides francophones expérimentés</li>
                    </ul>
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

export default Contact;