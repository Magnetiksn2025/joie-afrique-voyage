import emailjs from '@emailjs/browser';
import { ContactFormData, EmailJSConfig, EmailJSResponse } from '@/types/contact';

// Configuration EmailJS depuis les variables d'environnement
const emailJSConfig: EmailJSConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// Vérification de la configuration
const validateConfig = (): boolean => {
  const { serviceId, templateId, publicKey } = emailJSConfig;
  
  if (!serviceId || !templateId || !publicKey) {
    console.error('Configuration EmailJS manquante. Vérifiez vos variables d\'environnement.');
    return false;
  }
  
  return true;
};

// Initialisation d'EmailJS
const initEmailJS = (): void => {
  if (validateConfig()) {
    emailjs.init(emailJSConfig.publicKey);
  }
};

// Envoi de l'email
export const extendedContactFormSchema = contactFormSchema.extend({
  contact_preference: z.enum(['email', 'phone', 'whatsapp']).optional(),
  travel_date: z.string().optional(),
  travelers: z.number().min(1).max(50).optional(),
  budget: z.string().optional(),
});

export type ExtendedContactFormData = z.infer<typeof extendedContactFormSchema>;

    // Initialisation
    initEmailJS();

    // Préparation des données pour EmailJS
    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      phone: formData.phone || 'Non renseigné',
      subject: formData.subject,
      destination: formData.destination || 'Non spécifiée',
      message: formData.message,
      to_name: 'LRAD Tourisme', // Nom de votre entreprise
      reply_to: formData.from_email,
    };

    // Envoi via EmailJS
    const response = await emailjs.send(
      emailJSConfig.serviceId,
      emailJSConfig.templateId,
      templateParams
    );

    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

// Fonction utilitaire pour vérifier la configuration
export const checkEmailJSConfig = (): boolean => {
  return validateConfig();
};