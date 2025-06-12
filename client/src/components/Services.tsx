import { User, Users, MessageCircle, Check } from "lucide-react";

export default function Services() {
  const handleBooking = () => {
    // Open waiver in new tab first
    window.open('https://waiver.smartwaiver.com/w/a9cbmzgy6sqiquayahen8n/web/', '_blank');
    
    // Then scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 bg-forest-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Sacred Services
          </h2>
          <p className="font-lora text-xl max-w-3xl mx-auto opacity-90">
            Choose the healing journey that resonates with your current needs and intentions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Individual Session */}
          <div className="service-card bg-white text-dark-olive p-8 rounded-xl shadow-xl fade-in">
            <div className="text-center mb-6">
              <User className="text-golden-amber text-5xl mb-4 mx-auto h-12 w-12" />
              <h3 className="font-lora text-2xl font-semibold text-forest-green mb-2">Individual Session</h3>
              <p className="text-earth-brown">One-on-one sacred ceremony</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Personalized preparation consultation</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>3-4 hour ceremonial session</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Full safety monitoring & support</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Integration guidance & resources</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Follow-up integration call</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-green mb-4">$250</div>
              <button 
                onClick={handleBooking}
                className="bg-forest-green text-white px-6 py-3 rounded-full hover:bg-earth-brown transition-colors inline-block"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Group Ceremony */}
          <div className="service-card bg-white text-dark-olive p-8 rounded-xl shadow-xl fade-in">
            <div className="text-center mb-6">
              <Users className="text-golden-amber text-5xl mb-4 mx-auto h-12 w-12" />
              <h3 className="font-lora text-2xl font-semibold text-forest-green mb-2">Group Ceremony</h3>
              <p className="text-earth-brown">Sacred circle with community</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Small group (4-6 participants)</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Group preparation circle</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Full day ceremonial experience</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Sharing & integration circle</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Light ceremonial meal included</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-green mb-4">$180</div>
              <button 
                onClick={handleBooking}
                className="bg-forest-green text-white px-6 py-3 rounded-full hover:bg-earth-brown transition-colors inline-block"
              >
                Join Circle
              </button>
            </div>
          </div>

          {/* Consultation */}
          <div className="service-card bg-white text-dark-olive p-8 rounded-xl shadow-xl fade-in">
            <div className="text-center mb-6">
              <MessageCircle className="text-golden-amber text-5xl mb-4 mx-auto h-12 w-12" />
              <h3 className="font-lora text-2xl font-semibold text-forest-green mb-2">Consultation</h3>
              <p className="text-earth-brown">Guidance & preparation support</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>60-minute video/phone call</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Personalized assessment</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Preparation recommendations</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Integration planning</span>
              </div>
              <div className="flex items-start">
                <Check className="text-golden-amber mr-3 mt-1 h-4 w-4" />
                <span>Resource & referral guidance</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-green mb-4">$75</div>
              <button 
                onClick={scrollToContact}
                className="bg-forest-green text-white px-6 py-3 rounded-full hover:bg-earth-brown transition-colors inline-block"
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="font-lora text-2xl font-semibold mb-4">Preparing for Your Journey</h3>
            <p className="text-lg opacity-90 mb-4">
              Proper preparation is essential for a safe and transformative Kambo experience. All participants receive detailed preparation guidelines, dietary recommendations, and integration support materials.
            </p>
            <div className="bg-golden-amber/20 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold">
                <strong>Important:</strong> All ceremony participants must complete a liability waiver before booking. The waiver will open automatically when you click "Book Now" or "Join Circle" above.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">72 Hours Before</h4>
                <p className="opacity-80">Specific dietary guidelines and substance restrictions</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Day of Ceremony</h4>
                <p className="opacity-80">Fasting requirements and mental preparation</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Integration</h4>
                <p className="opacity-80">Post-ceremony care and ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
