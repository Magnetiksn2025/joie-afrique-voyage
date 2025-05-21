
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur nos voyages? N'hésitez pas à nous contacter, nous sommes là pour vous aider à planifier votre prochaine aventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Téléphone</h3>
                <p className="text-gray-600">+221 78 308 35 35</p>
                <p className="text-gray-600">+221 76 343 35 35</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email</h3>
                <p className="text-gray-600">lrad.ccia101@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Adresse</h3>
                <p className="text-gray-600">63 Cité Isra Hann Marinas</p>
                <p className="text-gray-600">Dakar, Sénégal</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-xl font-bold mb-3">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white rounded-full p-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white rounded-full p-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white rounded-full p-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-6">Envoyez-nous un message</h3>
            <form
  className="space-y-4"
  method="POST"
  action="/send.php"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
      <Input id="name" name="name" placeholder="Votre nom" required />
    </div>
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
    </div>
  </div>

  <div className="space-y-2">
    <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
    <Input id="subject" name="subject" placeholder="Sujet de votre message" />
  </div>

  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium">Message</label>
    <Textarea id="message" name="message" placeholder="Votre message" rows={5} required />
  </div>
<input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} />
  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
    Envoyer le message
  </Button>
</form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
