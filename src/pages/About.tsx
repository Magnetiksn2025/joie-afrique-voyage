
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">À propos de LRAD Tourisme</h1>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-gray-700 mb-4">
              LRAD Tourisme est né d'une passion profonde pour l'Afrique de l'Ouest et d'un désir de partager ses trésors avec le monde. Fondée par des passionnés de voyages et des experts locaux, notre agence s'est donné pour mission de créer des ponts entre les cultures et d'offrir des expériences de voyage authentiques et inoubliables.
            </p>
            <p className="text-gray-700 mb-4">
              Notre aventure a commencé par l'organisation de quelques circuits personnalisés au Sénégal, puis s'est rapidement étendue au Cap Vert et au Bénin, grâce à l'enthousiasme de nos premiers voyageurs et à leur désir de découvrir davantage de cette région fascinante du monde.
            </p>
            <p className="text-gray-700">
              Aujourd'hui, LRAD Tourisme est fier d'être reconnu comme un "Fournisseur de joies et de bonheur", une signature qui reflète parfaitement notre engagement envers chaque voyageur qui nous fait confiance.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
            <p className="text-gray-700 mb-4">
              Nous croyons en un tourisme qui enrichit à la fois le voyageur et les communautés locales. Notre vision est de:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Révéler la beauté cachée</strong> de l'Afrique de l'Ouest à travers des expériences de voyage soigneusement conçues</li>
              <li><strong>Promouvoir un tourisme responsable</strong> qui respecte et valorise les cultures, les traditions et l'environnement</li>
              <li><strong>Créer des souvenirs durables</strong> pour nos clients tout en contribuant positivement à l'économie locale</li>
              <li><strong>Rendre les voyages accessibles</strong> grâce à des forfaits transparents et des options de paiement flexibles</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Notre Approche</h2>
            <p className="text-gray-700 mb-4">
              Ce qui distingue LRAD Tourisme de nombreuses autres agences, c'est notre approche profondément personnelle et authentique:
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Des Expériences Locales Authentiques</h3>
            <p className="text-gray-700 mb-4">
              Nous travaillons en étroite collaboration avec les communautés locales pour offrir des expériences qui vont au-delà du tourisme conventionnel. Nos guides sont des habitants passionnés qui partagent non seulement leur connaissance, mais aussi leur amour pour leur région.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Des Programmes Tout Compris</h3>
            <p className="text-gray-700 mb-4">
              Nous comprenons que voyager dans une nouvelle région peut être intimidant. C'est pourquoi nos forfaits incluent tout ce dont vous avez besoin: transport, hébergement, repas, visites guidées et activités de découverte. Vous pouvez vous détendre et profiter pleinement de votre aventure, sans vous soucier des détails logistiques.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Une Flexibilité Financière</h3>
            <p className="text-gray-700 mb-4">
              Nous croyons que les merveilles de l'Afrique de l'Ouest devraient être accessibles à tous. Notre système de paiement échelonné vous permet de planifier votre voyage de rêve sans contrainte financière immédiate, en répartissant le coût sur plusieurs versements jusqu'à 30 jours avant votre départ.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Des Groupes à Taille Humaine</h3>
            <p className="text-gray-700">
              Nous limitons volontairement la taille de nos groupes pour garantir une expérience personnalisée et minimiser notre impact sur l'environnement et les communautés que nous visitons. Cette approche nous permet d'offrir un service attentif et de créer une atmosphère conviviale entre les voyageurs.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Nos Destinations</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Sénégal</h3>
              <p className="text-gray-700">
                Terre de la Teranga (hospitalité), le Sénégal vous séduira par sa diversité culturelle, ses paysages contrastés et la chaleur de son peuple. De la vibrante Dakar à la mystérieuse île de Gorée, du Lac Rose aux vastes étendues de la réserve de Bandia, notre programme vous fait découvrir les multiples facettes de ce joyau ouest-africain.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Cap Vert</h3>
              <p className="text-gray-700">
                Cet archipel enchanteur vous offre un mélange unique de culture africaine et d'influences portugaises. Avec ses plages de sable fin, ses montagnes majestueuses et sa musique envoûtante, le Cap Vert est une destination qui captive tous les sens. Notre circuit vous emmène à la découverte des plus beaux paysages et des traditions locales authentiques.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Bénin</h3>
              <p className="text-gray-700">
                Berceau du vodun et ancien royaume du Dahomey, le Bénin est une destination riche en histoire et en spiritualité. Entre villages lacustres, palais royaux et réserves naturelles, notre circuit vous plonge au cœur d'une Afrique ancestrale et vibrante, où traditions et modernité coexistent harmonieusement.
              </p>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-gray-700 mb-4">
              Derrière chaque voyage réussi se cache une équipe passionnée et dévouée. LRAD Tourisme rassemble des professionnels du tourisme, des experts locaux et des amoureux de l'Afrique qui partagent tous la même passion: créer des expériences de voyage exceptionnelles.
            </p>
            <p className="text-gray-700 mb-4">
              Nos guides sont rigoureusement sélectionnés non seulement pour leur connaissance approfondie des destinations, mais aussi pour leur capacité à transmettre leur passion et à s'adapter aux besoins de chaque voyageur.
            </p>
            <p className="text-gray-700">
              Notre équipe administrative, basée à Dakar, travaille sans relâche pour assurer que chaque détail de votre voyage soit parfaitement orchestré, de votre réservation initiale jusqu'à votre retour chez vous.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Notre Engagement Responsable</h2>
            <p className="text-gray-700 mb-4">
              Chez LRAD Tourisme, nous sommes conscients de notre responsabilité envers les destinations que nous proposons. C'est pourquoi nous nous engageons à:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Soutenir l'économie locale</strong> en travaillant avec des hébergements, restaurants et prestataires locaux</li>
              <li><strong>Respecter l'environnement</strong> en limitant notre empreinte écologique et en sensibilisant nos voyageurs</li>
              <li><strong>Valoriser le patrimoine culturel</strong> en promouvant un tourisme respectueux des traditions et coutumes locales</li>
              <li><strong>Contribuer au développement communautaire</strong> en soutenant des initiatives locales d'éducation et de formation</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Rejoignez l'Aventure LRAD Tourisme</h2>
            <p className="text-gray-700 mb-4">
              Que vous soyez un voyageur expérimenté ou que vous envisagiez votre première découverte de l'Afrique, LRAD Tourisme vous invite à vivre une expérience authentique et enrichissante. Nos programmes soigneusement élaborés, notre connaissance approfondie des destinations et notre engagement envers un service personnalisé vous garantissent un voyage qui dépasse vos attentes.
            </p>
            <p className="text-gray-700 mb-8">
              N'hésitez pas à parcourir nos différentes offres et à nous contacter pour toute question. Notre équipe se fera un plaisir de vous aider à planifier votre prochaine aventure ouest-africaine.
            </p>
            <p className="text-gray-700 font-italic">
              LRAD Tourisme - Fournisseur de joies et de bonheur
            </p>
          </section>
          
          <hr className="my-10 border-gray-300" />
          
          <section>
            <div className="text-center">
              <h3 className="font-bold mb-2">LRAD Tourisme</h3>
              <p className="text-gray-700">63 Cité Isra Hann Marinas</p>
              <p className="text-gray-700 mb-4">Dakar, Sénégal</p>
              
              <h4 className="font-bold mb-2">Contact:</h4>
              <p className="text-gray-700">Tél: +221 78 308 35 35 / +221 76 343 35 35</p>
              <p className="text-gray-700">Email: contact@lrad-tours.com</p>
              <p className="text-gray-700">Web: www.lrad-tours.com</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
