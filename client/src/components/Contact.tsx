import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
    agreesToTerms: false
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message! Matt will respond within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: "",
        agreesToTerms: false
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.agreesToTerms) {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure to check the terms agreement checkbox.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-forest-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Begin Your Healing Journey
          </h1>
          <p className="font-lora text-xl max-w-3xl mx-auto opacity-90">
            Ready to experience the transformative power of Kambo? Reach out to schedule your consultation or ceremony.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fade-in">
            <h2 className="font-lora text-2xl font-semibold mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-golden-amber text-xl mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="opacity-90">Serving Dallas/North Texas area<br />Private ceremonial space</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-golden-amber text-xl mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="opacity-90">(469) 734-6405</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-golden-amber text-xl mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="opacity-90">kambocowboy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-golden-amber text-xl mr-4 mt-1 h-5 w-5" />
                <div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="opacity-90">Within 24 hours for all inquiries</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <h4 className="font-lora text-lg font-semibold mb-3">Important Notice</h4>
              <p className="text-sm opacity-90">
                All services are for educational and spiritual purposes. Statements have not been evaluated by the FDA. Kambo is not intended to diagnose, treat, cure, or prevent any disease. Please consult with your healthcare provider before participating.
              </p>
            </div>
          </div>

          <div className="fade-in">
            <form onSubmit={handleSubmit} className="bg-white text-dark-olive p-8 rounded-xl shadow-xl">
              <h2 className="font-lora text-2xl font-semibold text-forest-green mb-6">Send a Message</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name *</label>
                  <Input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="focus:border-forest-green" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name *</label>
                  <Input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="focus:border-forest-green" 
                    required 
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <Input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="focus:border-forest-green" 
                  required 
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <Input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="focus:border-forest-green" 
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Service Interest</label>
                <Select onValueChange={(value) => handleInputChange('serviceInterest', value)}>
                  <SelectTrigger className="focus:border-forest-green">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Session</SelectItem>
                    <SelectItem value="group">Group Ceremony</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <Textarea 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="focus:border-forest-green" 
                  placeholder="Please share a bit about what brings you to Kambo medicine and any specific questions you have..." 
                  required 
                />
              </div>

              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms"
                    checked={formData.agreesToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreesToTerms', !!checked)}
                    required 
                  />
                  <label htmlFor="terms" className="text-sm">
                    I understand that Kambo is not a medical treatment and I will consult with my healthcare provider before participating. I acknowledge I have read the safety information. *
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-forest-green text-white py-3 px-6 hover:bg-earth-brown"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}