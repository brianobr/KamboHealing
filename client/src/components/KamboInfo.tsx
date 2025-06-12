import { Dna, Shield, Leaf, Heart, Brain, Eye } from "lucide-react";

export default function KamboInfo() {
  return (
    <section id="kambo-info" className="py-20 bg-gradient-to-br from-warm-beige to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
            Bioactive Peptides in Kambo
          </h2>
          <p className="font-lora text-xl text-earth-brown max-w-4xl mx-auto">
            Kambo contains a unique blend of bioactive peptides, which are naturally occurring compounds that interact with receptors in the body, influencing the immune, nervous, endocrine, and cardiovascular systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            {/* Giant Waxy Monkey Frog (Phyllomedusa bicolor) - the source of Kambo medicine */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Giant_Waxy_Monkey_Frog.jpg" 
              alt="Giant Waxy Monkey Frog (Phyllomedusa bicolor) - source of Kambo medicine" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="fade-in">
            <h3 className="font-lora text-2xl font-semibold text-forest-green mb-4">
              While research is ongoing, here are some of the most studied peptides present in Kambo:
            </h3>
            <div className="space-y-4 text-dark-olive">
              <div>
                <h4 className="font-semibold text-forest-green">Dermorphin & Deltorphin</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Bind to opiate receptors (μ and δ)</li>
                  <li>• Involved in modulating pain and stress response</li>
                  <li>• Important: These peptides do not cause euphoria or a high, and are not addictive</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Phyllocaerulein</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Stimulates smooth muscle and bile secretion</li>
                  <li>• May support digestion and gastrointestinal cleansing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Phyllokinin & Phyllomedusin</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Vasodilators that expand blood vessels</li>
                  <li>• May increase permeability and circulation, aiding detox and nutrient delivery</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Sauvagine</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Affects adrenal function and the HPA axis</li>
                  <li>• May help the body regulate stress and inflammatory response</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Adenoregulin</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Modulates the adenosine system</li>
                  <li>• Linked to energy metabolism, sleep cycles, and cellular communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional peptides section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            <h3 className="font-lora text-2xl font-semibold text-forest-green mb-4">
              Additional Bioactive Compounds
            </h3>
            <div className="space-y-4 text-dark-olive">
              <div>
                <h4 className="font-semibold text-forest-green">Tryptophyllins (T-2 and others)</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Less understood, but may play antimicrobial or regulatory roles</li>
                  <li>• Being studied for immune signaling and neuroactive potential</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Deltorphin A & B</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Selective δ-opioid receptor agonists</li>
                  <li>• Show high receptor affinity, potentially aiding pain modulation without CNS sedation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">Dermaseptins</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• A family of antimicrobial peptides</li>
                  <li>• Known to break down pathogens like bacteria, fungi, and protozoa on contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-forest-green">B2 and B3 Peptides</h4>
                <ul className="ml-6 mt-1 space-y-1 text-sm">
                  <li>• Under ongoing study for anti-cancer, antimicrobial, or metabolic effects</li>
                  <li>• Thought to enhance cellular defense mechanisms</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="fade-in">
            <h3 className="font-lora text-2xl font-semibold text-forest-green mb-4">
              Why It Matters
            </h3>
            <p className="text-dark-olive mb-4">
              Unlike pharmaceuticals that target a single system, Kambo's peptides may act synergistically, supporting a reset of the body's own regulatory processes. The secretion is absorbed through the lymphatic system, allowing a wide range of systemic effects without entering the bloodstream directly.
            </p>
            <div className="bg-forest-green/10 p-6 rounded-lg">
              <h4 className="font-semibold text-forest-green mb-2">Important Note:</h4>
              <p className="text-dark-olive text-sm">
                While research continues to explore these compounds, Kambo has been safely used by indigenous peoples for generations. Modern practitioners combine this traditional wisdom with contemporary safety protocols to provide a comprehensive healing experience.
              </p>
            </div>
          </div>
        </div>

        {/* Ceremonial elements section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            {/* Giant Monkey Frog in ceremonial setting */}
            <img 
              src="@assets/Firefly Photorealistic giant monkey leaf frog in an Amazonion Kambo ceremony 91141_1749575444807.jpg" 
              alt="Giant Monkey Frog in traditional Kambo ceremony setting" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="fade-in">
            <h3 className="font-lora text-2xl font-semibold text-forest-green mb-4">
              Honoring the Roots of Kambo
            </h3>
            <p className="text-dark-olive mb-4">
              Kambo comes from the traditions of indigenous Amazonian tribes such as the Matsés, Katukina, and Yawanawá, who have worked with the secretion of the Phyllomedusa bicolor frog for generations. While modern use has expanded beyond the rainforest, it's important to honor the origins of this practice with humility and respect.
            </p>
            <h4 className="font-semibold text-forest-green mb-2">Responsible Practice</h4>
            <p className="text-dark-olive mb-4">
              The frogs are carefully handled and released unharmed after their secretion is collected, a process done without injury, in accordance with indigenous methods. This respectful relationship ensures sustainability and preserves the integrity of the tradition.
            </p>
            <h4 className="font-semibold text-forest-green mb-2">Informed Space</h4>
            <p className="text-dark-olive">
              While this offering is rooted in indigenous practices, it's adapted to modern needs, blending traditional structure with a focus on safety, preparation, and integration. Each session is held in an intentional space that supports personal growth and deep release.
            </p>
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
