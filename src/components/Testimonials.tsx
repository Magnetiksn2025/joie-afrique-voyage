
import { Card, CardContent } from "@/components/ui/card";

type TestimonialProps = {
  quote: string;
  author: string;
  destination: string;
  rating: number;
};

const TestimonialCard = ({ quote, author, destination, rating }: TestimonialProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow flex flex-col">
        <div className="mb-4">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <blockquote className="text-gray-700 italic mb-6 flex-grow">"{quote}"</blockquote>
        <footer className="mt-auto">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">Voyage au {destination}</p>
        </footer>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Un séjour inoubliable! LRAD Tourisme nous a fait découvrir le Sénégal authentique avec des guides passionnés et une organisation parfaite.",
      author: "Marie et Pierre L.",
      destination: "Sénégal",
      rating: 5
    },
    {
      quote: "Les paysages du Cap Vert sont à couper le souffle, et grâce à LRAD Tourisme, nous avons pu explorer l'île en toute sérénité. Un voyage que je recommande!",
      author: "Thomas D.",
      destination: "Cap Vert",
      rating: 5
    },
    {
      quote: "La découverte du Bénin restera gravée dans nos mémoires. Merci à toute l'équipe pour leur professionnalisme et leur connaissance approfondie des lieux.",
      author: "Sandrine M.",
      destination: "Bénin",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos voyageurs qui ont vécu l'expérience LRAD Tourisme.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              destination={testimonial.destination}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
