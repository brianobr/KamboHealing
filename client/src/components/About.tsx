import { CheckCircle } from "lucide-react";
import mattHeadshot from "@assets/Matt Headshot-Enhanced_1749577277724.png";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            {/* Matt O'Brien - Professional headshot */}
            <img 
              src={mattHeadshot} 
              alt="Matt O'Brien - Certified Kambo Practitioner" 
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover object-top"
            />
          </div>
          <div className="fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
              Meet Matt O'Brien
            </h2>
            <div className="space-y-4 text-dark-olive">
              <p>
                With over six years of dedicated study and hands-on experience, Matt offers a grounded approach to the sacred practice of Kambo, blending modern safety protocols with traditional indigenous wisdom. Trained by Tribal Detox and further mentored by researcher Caitlyn Thompson, he has developed a specialized understanding of working with immune-compromised individuals. Matt has also completed training as a functional medicine health coach, deepening his ability to support clients holistically throughout their healing journey.
              </p>
              <div className="mt-8">
                <h3 className="font-lora text-lg font-semibold mb-4 text-forest-green">Certifications & Training:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Tribal Detox certified practitioner</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Lyme and Autoimmune Specialty Training from Caitlyn Thompson</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Functional Medicine Health Coach certification from FMHCA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>CPR/First Aid certification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}