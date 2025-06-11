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
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover object-center"
            />
          </div>
          <div className="fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
              Meet Matt O'Brien
            </h2>
            <p className="font-lora text-xl text-earth-brown mb-6">
              Certified Kambo Practitioner & Sacred Medicine Guide
            </p>
            <div className="space-y-4 text-dark-olive">
              <p>
                With over 8 years of dedicated study and practice, Matt brings a unique blend of Western safety protocols and indigenous wisdom to the sacred art of Kambo medicine. Trained directly by master practitioners from the Matsés and Katukina tribes, he holds deep reverence for the traditional roots of this powerful healing modality.
              </p>
              <p>
                Matt's approach emphasizes safety, preparation, and integration - ensuring each participant receives not just the medicine, but the complete ceremonial experience needed for lasting transformation. His background in trauma-informed care and breathwork creates a container of trust and healing.
              </p>
              <div className="mt-8">
                <h3 className="font-lora text-lg font-semibold mb-4 text-forest-green">Certifications & Training:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>International Association of Kambo Practitioners (IAKP) Certified</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Trauma-Informed Care Specialist</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Wilderness First Aid & CPR Certified</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-golden-amber mr-3 h-5 w-5" />
                    <span>Traditional Training with Matsés & Katukina Elders</span>
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
