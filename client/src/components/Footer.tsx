import { Leaf, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-dark-olive text-warm-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-golden-amber text-2xl" />
              <span className="font-playfair text-2xl font-bold">Matt O'Brien</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Certified Kambo Practitioner serving Northern California with sacred Amazonian frog medicine in a safe, trauma-informed container.
            </p>
            <div className="flex space-x-4">
              <button className="text-golden-amber hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-golden-amber hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-golden-amber hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-lora text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors"
                >
                  About Matt
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('kambo-info')}
                  className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors"
                >
                  What is Kambo?
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors"
                >
                  Book Session
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-lora text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors">Preparation Guide</button></li>
              <li><button className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors">Integration Support</button></li>
              <li><button className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors">Safety Information</button></li>
              <li><button className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors">Scientific Research</button></li>
              <li><button className="opacity-80 hover:opacity-100 hover:text-golden-amber transition-colors">Contact & FAQ</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-tan/30 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2024 Matt O'Brien Kambo Practice. All rights reserved. | 
            <span className="text-xs"> Disclaimer: These statements have not been evaluated by the FDA. Kambo is not intended to diagnose, treat, cure, or prevent any disease.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
