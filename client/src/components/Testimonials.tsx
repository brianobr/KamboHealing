import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-green mb-6">
            Voices of Transformation
          </h2>
          <p className="font-lora text-xl text-earth-brown max-w-3xl mx-auto">
            Read about the profound healing journeys experienced by those who have worked with Matt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-forest-green/20 flex items-center justify-center mr-4">
                  <span className="text-forest-green font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-lora font-semibold text-forest-green">{testimonial.name}</h4>
                  <p className="text-earth-brown text-sm">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-dark-olive italic mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex text-golden-amber">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}