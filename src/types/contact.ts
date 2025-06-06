import { z } from 'zod';

// Schema de validation Zod
export const contactFormSchema = z.object({
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
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), {
      message: 'Numéro de téléphone invalide'
    }),
  
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

// Type TypeScript dérivé du schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// États du formulaire
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Interface pour la réponse EmailJS
export interface EmailJSResponse {
  status: number;
  text: string;
}

// Configuration EmailJS
export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}
export const extendedContactFormSchema = contactFormSchema.extend({
  contact_preference: z.enum(['email', 'phone', 'whatsapp']).optional(),
  travel_date: z.string().optional(),
  travelers: z.number().min(1).max(50).optional(),
  budget: z.string().optional(),
});

export type ExtendedContactFormData = z.infer<typeof extendedContactFormSchema>;