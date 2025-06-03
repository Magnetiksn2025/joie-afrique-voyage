import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User, MessageSquare, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactFormData, contactFormSchema, FormStatus } from '@/types/contact';
import { sendContactEmail } from '@/services/emailjs';

const ContactForm: React.FC = () => {
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Contactez-nous
        </h2>
        <p className="text-gray-600">
          Partagez-nous vos envies de voyage et nous vous répondrons rapidement
        </p>
      </div>

      {/* Messages de statut */}
      {formStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800">{submitMessage}</p>
        </div>
      )}

      {formStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800">{submitMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom */}
        <div>
          <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Nom complet *
          </label>
          <input
            {...register('from_name')}
            type="text"
            id="from_name"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.from_name ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="Votre nom complet"
          />
          {errors.from_name && (
            <p className="text-red-500 text-sm mt-1">{errors.from_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email *
          </label>
          <input
            {...register('from_email')}
            type="email"
            id="from_email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.from_email ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="votre.email@exemple.com"
          />
          {errors.from_email && (
            <p className="text-red-500 text-sm mt-1">{errors.from_email.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Téléphone
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="+33 6 12 34 56 78"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Destination souhaitée
          </label>
          <select
            {...register('destination')}
            id="destination"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Sélectionnez une destination</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Sujet */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Sujet *
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.subject ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="Demande d'information sur un voyage au Sénégal"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="Décrivez-nous votre projet de voyage, vos préférences, dates souhaitées..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={!isValid || formStatus === 'loading'}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            isValid && formStatus !== 'loading'
              ? 'bg-primary text-white hover:bg-primary/90 transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {formStatus === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Envoyer le message</span>
            </>
          )}
        </button>
      </form>

      {/* Informations de contact */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Vous pouvez aussi nous contacter directement :
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <Phone className="w-4 h-4 inline mr-2" />
            +33 (0)1 XX XX XX XX
          </p>
          <p className="text-sm">
            <Mail className="w-4 h-4 inline mr-2" />
            contact@lradtourisme.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;