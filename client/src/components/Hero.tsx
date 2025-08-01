import { ChevronDown } from "lucide-react";
import heroImage from "@assets/Firefly_Create a website -hero image- of the Amazon rainforest 540047_1749665295173.jpg";

export default function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white">
      {/* Amazon rainforest with ceremonial elements and sacred atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 fade-in">
          Safe. Sacred. Transformational.
        </h1>
        <p className="font-lora text-xl md:text-2xl mb-4 fade-in">
          With Matt O'Brien
        </p>
        <p className="font-opensans text-lg md:text-xl mb-8 max-w-3xl mx-auto fade-in">
          Guided Kambo experiences rooted in tradition and backed by modern training.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center fade-in">
          <button 
            onClick={scrollToServices}
            className="inline-block bg-golden-amber text-forest-green px-8 py-4 rounded-full font-semibold hover:bg-warm-tan transition-colors"
          >
            Explore Services
          </button>
          <button 
            onClick={scrollToContact}
            className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-forest-green transition-colors"
          >
            Book Your Journey
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <button onClick={scrollToNext}>
          <ChevronDown className="text-white text-2xl" />
        </button>
      </div>
    </section>
  );
}
