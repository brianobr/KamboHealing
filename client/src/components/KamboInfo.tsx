import { Dna, Shield, Leaf, Heart, Brain, Eye } from "lucide-react";

export default function KamboInfo() {
  return (
    <section id="kambo-info" className="py-20 bg-gradient-to-br from-warm-beige to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
            What is Kambo?
          </h2>
          <p className="font-lora text-xl text-earth-brown max-w-3xl mx-auto">
            Discover the ancient wisdom of Amazonian frog medicine and its profound healing properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            {/* Phyllomedusa bicolor frog in natural rainforest habitat */}
            <img 
              src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Phyllomedusa bicolor frog in Amazon rainforest" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="fade-in">
            <h3 className="font-lora text-2xl font-semibold text-forest-green mb-4">
              Ancient Medicine, Modern Understanding
            </h3>
            <p className="text-dark-olive mb-4">
              Kambo is the secretion of the Giant Monkey Frog (Phyllomedusa bicolor), used for centuries by indigenous Amazonian tribes for physical and spiritual purification. This powerful medicine contains over 16 bioactive peptides that have been scientifically studied for their remarkable healing properties.
            </p>
            <p className="text-dark-olive mb-6">
              Unlike synthetic pharmaceuticals, Kambo works with your body's natural healing mechanisms, helping to reset immune function, clear toxins, and restore balance to multiple body systems.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Dna className="text-golden-amber mr-3 mt-1 h-5 w-5" />
                <span><strong>Bioactive Peptides:</strong> Natural compounds that support cellular healing</span>
              </div>
              <div className="flex items-start">
                <Shield className="text-golden-amber mr-3 mt-1 h-5 w-5" />
                <span><strong>Immune Modulation:</strong> Helps regulate and strengthen immune response</span>
              </div>
              <div className="flex items-start">
                <Leaf className="text-golden-amber mr-3 mt-1 h-5 w-5" />
                <span><strong>Natural Detox:</strong> Supports the body's natural cleansing processes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg fade-in">
            <div className="text-center mb-6">
              <Heart className="text-golden-amber text-4xl mb-4 mx-auto h-10 w-10" />
              <h4 className="font-lora text-xl font-semibold text-forest-green">Physical Benefits</h4>
            </div>
            <ul className="space-y-2 text-dark-olive">
              <li>• Immune system strengthening</li>
              <li>• Anti-inflammatory effects</li>
              <li>• Cardiovascular support</li>
              <li>• Digestive system reset</li>
              <li>• Chronic pain relief</li>
              <li>• Infection fighting properties</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg fade-in">
            <div className="text-center mb-6">
              <Brain className="text-golden-amber text-4xl mb-4 mx-auto h-10 w-10" />
              <h4 className="font-lora text-xl font-semibold text-forest-green">Mental & Emotional</h4>
            </div>
            <ul className="space-y-2 text-dark-olive">
              <li>• Depression & anxiety relief</li>
              <li>• Mental clarity enhancement</li>
              <li>• Trauma processing support</li>
              <li>• Emotional blockage release</li>
              <li>• Stress reduction</li>
              <li>• Cognitive function improvement</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg fade-in">
            <div className="text-center mb-6">
              <Eye className="text-golden-amber text-4xl mb-4 mx-auto h-10 w-10" />
              <h4 className="font-lora text-xl font-semibold text-forest-green">Spiritual Benefits</h4>
            </div>
            <ul className="space-y-2 text-dark-olive">
              <li>• Deep spiritual cleansing</li>
              <li>• Connection to inner wisdom</li>
              <li>• Energetic field clearing</li>
              <li>• Life purpose clarity</li>
              <li>• Breaking negative patterns</li>
              <li>• Enhanced intuition</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
