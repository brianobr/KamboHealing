import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormEmails } from "./email";
import { v4 as uuidv4 } from 'uuid';

export async function registerRoutes(app: Express): Promise<Server> {
  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create contact submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
      const emailSent = await sendContactFormEmails(validatedData);
      
      if (emailSent) {
        res.status(201).json({ 
          message: "Thank you for your message! Matt will respond within 24 hours.",
          submission: { id: submission.id }
        });
      } else {
        // Still return success to user, but log the email failure
        console.error('Failed to send contact form email, but submission was saved');
        res.status(201).json({ 
          message: "Thank you for your message! Matt will respond within 24 hours.",
          submission: { id: submission.id }
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Please check your form data",
          errors: error.errors 
        });
      } else {
        console.error('Contact form submission error:', error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Chatbot endpoints
  const COPILOT_STUDIO_URL = "https://default569ac018c71d4f5098a77a9e9e6765.f9.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/contoso_kambobot/conversations";
  const API_VERSION = "2022-03-01-preview";

  // Start chatbot conversation
  app.post("/api/chatbot/start", async (req, res) => {
    try {
      const conversationId = uuidv4();
      
      // Initialize conversation with Copilot Studio
      const response = await fetch(`${COPILOT_STUDIO_URL}?api-version=${API_VERSION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversationId,
          locale: 'en-US'
        })
      });

      if (response.ok) {
        res.json({ conversationId });
      } else {
        // Return a fallback conversation ID if Copilot Studio is unavailable
        res.json({ conversationId });
      }
    } catch (error) {
      console.error('Chatbot initialization error:', error);
      // Always return a conversation ID even if external service fails
      res.json({ conversationId: uuidv4() });
    }
  });

  // Send message to chatbot
  app.post("/api/chatbot/message", async (req, res) => {
    try {
      const { message, conversationId } = req.body;
      
      if (!message || !conversationId) {
        return res.status(400).json({ error: 'Message and conversationId are required' });
      }

      // Send message to Copilot Studio
      const response = await fetch(`${COPILOT_STUDIO_URL}/${conversationId}/activities?api-version=${API_VERSION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'message',
          text: message,
          from: {
            id: 'user',
            name: 'User'
          }
        })
      });

      if (response.ok) {
        // Get bot response
        const botResponse = await fetch(`${COPILOT_STUDIO_URL}/${conversationId}/activities?api-version=${API_VERSION}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (botResponse.ok) {
          const data = await botResponse.json();
          const lastMessage = data.activities?.[data.activities.length - 1];
          res.json({ response: lastMessage?.text || getFallbackResponse(message) });
        } else {
          res.json({ response: getFallbackResponse(message) });
        }
      } else {
        res.json({ response: getFallbackResponse(message) });
      }
    } catch (error) {
      console.error('Chatbot message error:', error);
      res.json({ response: getFallbackResponse(req.body.message || '') });
    }
  });

  // Fallback responses for when Copilot Studio is unavailable
  function getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('matt') || lowerMessage.includes('practitioner') || lowerMessage.includes('who is') || lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return "Matt O'Brien is a dedicated Kambo practitioner serving the Dallas area. Known as the 'Kambo Cowboy,' Matt combines deep respect for traditional Amazonian wisdom with a modern, safety-first approach. He's committed to authentic healing practices and provides personalized care for each client's unique journey. Contact him at 469-734-6405 or kambocowboy@gmail.com";
    }
    
    if (lowerMessage.includes('kambo') || lowerMessage.includes('what is')) {
      return "Kambo is a traditional Amazonian medicine derived from the waxy secretions of the Phyllomedusa bicolor tree frog. Matt works with this sacred medicine to support physical and spiritual cleansing, honoring indigenous traditions while ensuring client safety. Each session is tailored to your individual healing needs.";
    }
    
    if (lowerMessage.includes('session') || lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      return "Matt offers personalized Kambo sessions in a safe, supportive environment. To book your session, please fill out the contact form below or call him directly at 469-734-6405. He'll discuss your healing goals and ensure Kambo is right for you during a thorough consultation.";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return "Matt believes healing should be accessible and prices sessions fairly based on individual circumstances. Investment varies by session type and personal needs. Contact Matt at 469-734-6405 to discuss pricing and what's included in your complete healing experience.";
    }
    
    if (lowerMessage.includes('safe') || lowerMessage.includes('danger') || lowerMessage.includes('risk')) {
      return "Safety is Matt's highest priority. As an experienced practitioner, he conducts thorough health screenings, follows strict safety protocols, and creates a supportive environment for your healing journey. He'll discuss your medical history and any concerns during your consultation to ensure Kambo is appropriate for you.";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('dallas')) {
      return "Matt serves the Dallas, Texas area with private, comfortable healing spaces. Known throughout North Texas for his authentic approach and dedication to client safety, he provides exact location details when you book your session to maintain privacy and security.";
    }
    
    if (lowerMessage.includes('benefits') || lowerMessage.includes('help') || lowerMessage.includes('healing')) {
      return "Matt works with clients seeking physical detoxification, mental clarity, spiritual renewal, and emotional release. Kambo supports the body's natural healing processes and can help with various wellness goals. During your consultation, Matt will discuss how Kambo might support your specific healing intentions.";
    }
    
    return "I'm here to help with questions about Matt's Kambo healing practice. For detailed information about his approach, experience, and to book a session, please contact Matt directly through the form below or at kambocowboy@gmail.com. He's passionate about supporting your healing journey.";
  }

  const httpServer = createServer(app);
  return httpServer;
}
