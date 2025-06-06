import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User, MessageSquare, MapPin, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { ContactFormData, contactFormSchema, FormStatus } from '@/types/contact';
import { sendContactEmail } from '@/services/emailjs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ContactPage: React.FC = () => {
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
      await sendContactEmail(data);
      setFormStatus('success');
      setSubmitMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      reset(); // Réinitialise le formulaire
      
      // Scroll automatique vers le haut pour voir le message de succès
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
    } catch (error) {
      setFormStatus('error');
      setSubmitMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
      console.error('Erreur envoi formulaire:', error);
      
      // Scroll vers le haut également en cas d'erreur
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Vous avez des questions ou souhaitez planifier votre voyage ? Notre équipe d'experts est là pour vous accompagner dans la création de votre voyage sur mesure en Afrique de l'Ouest.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Informations de contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Téléphone</h3>
                      <p className="text-gray-600">+221 78 308 35 35</p>
                      <p className="text-gray-600">+221 76 343 35 35</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">lrad.ccia101@gmail.com</p>
                      <p className="text-gray-600">contact@lradtourisme.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adresse</h3>
                      <p className="text-gray-600">63 Cité Isra Hann Marinas</p>
                      <p className="text-gray-600">Dakar, Sénégal</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Horaires</h3>
                      <p className="text-gray-600">Lun - Ven : 9h - 18h</p>
                      <p className="text-gray-600">Sam : 9h - 13h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Réponse garantie</h4>
                  <p className="text-sm text-gray-600">
                    Nous nous engageons à répondre à votre demande dans les 24 heures ouvrées.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous votre demande</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div className="group">
                      <label htmlFor="from_name" className="block text-sm font-semibold text-gray-800 mb-2">
                        <User className="w-4 h-4 inline mr-2 text-primary" />
                        Nom complet *
                      </label>
                      <input
                        {...register('from_name')}
                        type="text"
                        id="from_name"
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                          errors.from_name 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-primary'
                        }`}
                        placeholder="Votre nom complet"
                      />
                      {errors.from_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.from_name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label htmlFor="from_email" className="block text-sm font-semibold text-gray-800 mb-2">
                        <Mail className="w-4 h-4 inline mr-2 text-primary" />
                        Adresse email *
                      </label>
                      <input
                        {...register('from_email')}
                        type="email"
                        id="from_email"
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                          errors.from_email 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-primary'
                        }`}
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.from_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.from_email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* Téléphone */}
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                        <Phone className="w-4 h-4 inline mr-2 text-primary" />
                        Téléphone
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                          errors.phone 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200 focus:border-primary'
                        }`}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Destination */}
                    <div className="group">
                      <label htmlFor="destination" className="block text-sm font-semibold text-gray-800 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2 text-primary" />
                        Destination souhaitée
                      </label>
                      <select
                        {...register('destination')}
                        id="destination"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all duration-300"
                      >
                        <option value="">Choisissez votre destination</option>
                        {destinations.map((dest) => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sujet */}
                  <div className="group mt-6">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                      Sujet de votre demande *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 ${
                        errors.subject 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-primary'
                      }`}
                      placeholder="Ex: Voyage de groupe au Sénégal"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="group mt-6">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2 text-primary" />
                      Votre message *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={6}
                      className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 focus:bg-white focus:outline-none transition-all duration-300 resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-primary'
                      }`}
                      placeholder="Décrivez-nous votre projet de voyage : dates souhaitées, type d'hébergement, activités préférées, budget approximatif..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Bouton d'envoi */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={!isValid || formStatus === 'loading'}
                      className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                        isValid && formStatus !== 'loading'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-lg shadow-md'
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
                    </button>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      * Champs obligatoires - Réponse garantie sous 24h
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section supplémentaire */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir LRAD Tourisme ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre expertise et notre passion pour l'Afrique de l'Ouest font de nous le partenaire idéal pour votre voyage.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Guides experts locaux</h3>
                <p className="text-gray-600 text-sm">Des guides passionnés qui connaissent parfaitement leur région</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Voyages tout compris</h3>
                <p className="text-gray-600 text-sm">Hébergement, repas, transport et activités inclus</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Support 24/7</h3>
                <p className="text-gray-600 text-sm">Une assistance disponible pendant tout votre voyage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;