import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="text-forest-green text-2xl" />
            <span className="font-playfair text-xl font-bold text-forest-green">Matt O'Brien</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-forest-green transition-colors font-semibold"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-forest-green transition-colors font-semibold"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-forest-green transition-colors font-semibold"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('kambo-info')}
                className="text-gray-700 hover:text-forest-green transition-colors font-semibold"
              >
                Kambo Info
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-forest-green transition-colors font-semibold"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-forest-green text-white px-6 py-2 rounded-full hover:bg-earth-brown transition-colors shadow-md"
              >
                Book Session
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-forest-green text-xl"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-forest-green font-semibold"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-forest-green font-semibold"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-forest-green font-semibold"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('kambo-info')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-forest-green font-semibold"
            >
              Kambo Info
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-forest-green font-semibold"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 bg-forest-green text-white rounded-lg mx-3 font-semibold"
            >
              Book Session
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
