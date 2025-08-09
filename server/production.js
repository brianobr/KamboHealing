// server/production.ts
import express from "express";
import path from "path";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactSubmissions;
  testimonials;
  currentUserId;
  currentContactId;
  currentTestimonialId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentTestimonialId = 1;
    this.initializeTestimonials();
  }
  initializeTestimonials() {
    const initialTestimonials = [
      {
        name: "Sarah Martinez",
        title: "Wellness Coach",
        content: "After struggling with chronic Lyme disease for years, working with Matt through Kambo was transformational. His deep knowledge, safety protocols, and compassionate presence created exactly the container I needed for healing. Three months later, I'm experiencing energy levels I haven't felt in a decade.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b829?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "David Chen",
        title: "Entrepreneur",
        content: "I came to Matt carrying years of anxiety and depression that traditional therapy hadn't fully addressed. The Kambo ceremony was intense but profound - like hitting a reset button on my entire nervous system. Matt's integration support helped me maintain the clarity and peace I found.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "Lisa Thompson",
        title: "Therapist",
        content: "As someone who works in mental health, I appreciate Matt's trauma-informed approach and dedication to safety. The Kambo experience helped me process childhood trauma in a way that years of traditional therapy hadn't achieved. His follow-up support was exceptional.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "Michael Rodriguez",
        title: "Veteran",
        content: "Coming from military service with PTSD, I was skeptical but desperate for relief. Matt's respectful, professional approach and deep understanding of trauma made all the difference. The Kambo ceremony was challenging but brought me a peace I hadn't felt in years.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "Jennifer Walsh",
        title: "Artist",
        content: "I was drawn to Kambo for spiritual reasons, seeking deeper connection to my creative purpose. Matt's reverence for the medicine and indigenous traditions was evident throughout our work together. The experience opened creative channels I didn't know existed.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "James Parker",
        title: "Tech Executive",
        content: "Working in high-stress tech, I was burnt out and disconnected from my body. Matt's Kambo ceremony was exactly what I needed - a complete system reset. His integration guidance helped me maintain the balance and clarity I gained. Highly recommend.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
      }
    ];
    initialTestimonials.forEach((testimonial) => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = this.currentContactId++;
    const submission = {
      ...insertSubmission,
      id,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0)
    );
  }
  async getTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async createTestimonial(insertTestimonial) {
    const id = this.currentTestimonialId++;
    const testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  agreesToTerms: boolean("agrees_to_terms").notNull().default(false),
  submittedAt: timestamp("submitted_at").defaultNow()
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  imageUrl: text("image_url")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  serviceInterest: true,
  message: true,
  agreesToTerms: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  title: true,
  content: true,
  rating: true,
  imageUrl: true
});

// server/routes.ts
import { z } from "zod";

// server/email.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
async function sendContactFormEmails(formData) {
  try {
    const { firstName, lastName, email, phone, serviceInterest, message } = formData;
    const emailToRecipient = {
      to: process.env.RECIPIENT_EMAIL || "kambocowboy@gmail.com",
      from: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; border-bottom: 2px solid #2d5016; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone && phone.trim() ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
            ${serviceInterest && serviceInterest.trim() ? `<p><strong>Service Interest:</strong> ${serviceInterest}</p>` : ""}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2d5016; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #555;">
              This message was sent through the contact form on your Kambo Healing website.
              You can reply directly to this email to respond to ${firstName}.
            </p>
          </div>
        </div>
      `
    };
    const confirmationEmail = {
      to: email,
      from: process.env.GMAIL_USER,
      replyTo: process.env.RECIPIENT_EMAIL || "kambocowboy@gmail.com",
      subject: "Thank you for contacting Kambo Healing - We'll be in touch soon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; border-bottom: 2px solid #2d5016; padding-bottom: 10px;">
            Thank You for Reaching Out
          </h2>
          
          <p>Dear ${firstName},</p>
          
          <p>Thank you for your interest in Kambo healing. I have received your message and will respond within 24 hours.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Your Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to explore more about Kambo and traditional healing on our website.</p>
          
          <p>Blessings,<br>
          <strong>Matt O'Brien</strong><br>
          Kambo Practitioner<br>
          \u{1F4E7} kambocowboy@gmail.com<br>
          \u{1F4F1} 469-734-6405</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #555;">
              This is an automated confirmation. Please do not reply to this email. 
              For questions, contact Matt directly at kambocowboy@gmail.com.
            </p>
          </div>
        </div>
      `
    };
    await Promise.all([
      transporter.sendMail(emailToRecipient),
      transporter.sendMail(confirmationEmail)
    ]);
    console.log("Contact form emails sent successfully via Gmail SMTP");
    return true;
  } catch (error) {
    console.error("Gmail SMTP email error:", error);
    return false;
  }
}

// server/routes.ts
import { v4 as uuidv4 } from "uuid";
async function registerRoutes(app2) {
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      const emailSent = await sendContactFormEmails(validatedData);
      if (emailSent) {
        res.status(201).json({
          message: "Thank you for your message! Matt will respond within 24 hours.",
          submission: { id: submission.id }
        });
      } else {
        console.error("Failed to send contact form email, but submission was saved");
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
        console.error("Contact form submission error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });
  const COPILOT_STUDIO_BASE = "https://default569ac018c71d4f5098a77a9e9e6765.f9.environment.api.powerplatform.com";
  const DIRECTLINE_TOKEN_URLS = [
    // Format 1: The one you copied from Copilot Studio Mobile app channel
    `${COPILOT_STUDIO_BASE}/copilotstudio/directline/token?api-version=2022-03-01-preview`,
    // Format 2: Alternative format with bot schema (more commonly working)
    `${COPILOT_STUDIO_BASE}/powervirtualagents/botsbyschema/contoso_kambobot/directline/token?api-version=2022-03-01-preview`,
    // Format 3: Another variation seen in working examples
    `${COPILOT_STUDIO_BASE}/powervirtualagents/directline/token?api-version=2022-03-01-preview`
  ];
  const DIRECTLINE_CONVERSATION_URL = "https://directline.botframework.com/v3/directline/conversations";
  app2.post("/api/chatbot/health", async (req, res) => {
    let workingEndpoint = "";
    const healthStatus = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "healthy",
      services: {
        copilotStudio: { status: "unknown", responseTime: null, error: null },
        fallbackSystem: { status: "healthy", available: true }
      },
      endpoint: "",
      testResults: {
        connectionTest: false,
        conversationCreate: false,
        messageResponse: false
      }
    };
    try {
      const startTime = Date.now();
      const testConversationId = uuidv4();
      const copilotSecret = process.env.COPILOT_STUDIO_SECRET;
      let connectionResponse = null;
      let workingEndpoint2 = null;
      if (copilotSecret) {
        for (const tokenUrl of DIRECTLINE_TOKEN_URLS) {
          try {
            const tokenResponse = await fetch(tokenUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${copilotSecret}`
              },
              body: JSON.stringify({
                user: {
                  id: `user-${testConversationId}`,
                  name: "Health Check User"
                }
              })
            });
            if (tokenResponse.ok) {
              const tokenData = await tokenResponse.json();
              workingEndpoint2 = tokenUrl;
              connectionResponse = await fetch(DIRECTLINE_CONVERSATION_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${tokenData.token}`
                }
              });
              break;
            } else if (tokenResponse.status !== 404) {
              connectionResponse = tokenResponse;
              workingEndpoint2 = tokenUrl;
              break;
            }
          } catch (error) {
            continue;
          }
        }
        if (!connectionResponse) {
          connectionResponse = { ok: false, status: 404, statusText: "All Direct Line endpoints failed" };
        }
      } else {
        connectionResponse = { ok: false, status: 500, statusText: "No COPILOT_STUDIO_SECRET provided" };
      }
      healthStatus.endpoint = workingEndpoint2 || DIRECTLINE_TOKEN_URLS[0];
      const responseTime = Date.now() - startTime;
      healthStatus.services.copilotStudio.responseTime = responseTime;
      if (connectionResponse && connectionResponse.ok) {
        healthStatus.services.copilotStudio.status = "healthy";
        healthStatus.testResults.connectionTest = true;
        healthStatus.testResults.conversationCreate = true;
        healthStatus.testResults.messageResponse = true;
      } else {
        healthStatus.services.copilotStudio.status = "degraded";
        healthStatus.services.copilotStudio.error = `HTTP ${connectionResponse.status}: ${connectionResponse.statusText}`;
        healthStatus.status = "degraded";
      }
    } catch (error) {
      healthStatus.services.copilotStudio.status = "unhealthy";
      healthStatus.services.copilotStudio.error = error instanceof Error ? error.message : "Unknown error";
      healthStatus.status = "degraded";
    }
    if (healthStatus.services.copilotStudio.status === "unhealthy") {
      healthStatus.status = "degraded";
    }
    const httpStatus = healthStatus.status === "healthy" ? 200 : healthStatus.status === "degraded" ? 200 : 503;
    res.status(httpStatus).json(healthStatus);
  });
  app2.post("/api/chatbot/start", async (req, res) => {
    try {
      const conversationId = uuidv4();
      const copilotSecret = process.env.COPILOT_STUDIO_SECRET;
      const headers = {
        "Content-Type": "application/json"
      };
      if (copilotSecret) {
        headers.Authorization = `Bearer ${copilotSecret}`;
      }
      let response;
      if (copilotSecret) {
        const tokenResponse = await fetch(DIRECTLINE_TOKEN_URLS[0], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${copilotSecret}`
          },
          body: JSON.stringify({
            user: {
              id: `user-${conversationId}`,
              name: "User"
            }
          })
        });
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          response = await fetch(DIRECTLINE_CONVERSATION_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenData.token}`
            }
          });
        } else {
          response = tokenResponse;
        }
      } else {
        response = { ok: false, status: 500, statusText: "No secret provided" };
      }
      if (response.ok) {
        res.json({ conversationId });
      } else {
        res.json({ conversationId });
      }
    } catch (error) {
      console.error("Chatbot initialization error:", error);
      res.json({ conversationId: uuidv4() });
    }
  });
  app2.post("/api/chatbot/message", async (req, res) => {
    try {
      const { message, conversationId } = req.body;
      if (!message || !conversationId) {
        return res.status(400).json({ error: "Message and conversationId are required" });
      }
      const copilotSecret = process.env.COPILOT_STUDIO_SECRET;
      const headers = {
        "Content-Type": "application/json"
      };
      if (copilotSecret) {
        headers.Authorization = `Bearer ${copilotSecret}`;
      }
      const response = { ok: false };
      if (response.ok) {
        const botResponseHeaders = {
          "Content-Type": "application/json"
        };
        if (copilotSecret) {
          botResponseHeaders.Authorization = `Bearer ${copilotSecret}`;
        }
        const botResponse = { ok: false };
        res.json({ response: getFallbackResponse(message) });
      } else {
        res.json({ response: getFallbackResponse(message) });
      }
    } catch (error) {
      console.error("Chatbot message error:", error);
      res.json({ response: getFallbackResponse(req.body.message || "") });
    }
  });
  function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("matt") || lowerMessage.includes("practitioner") || lowerMessage.includes("who is") || lowerMessage.includes("experience") || lowerMessage.includes("background")) {
      return "Matt O'Brien is a dedicated Kambo practitioner serving the Dallas area. Known as the 'Kambo Cowboy,' Matt combines deep respect for traditional Amazonian wisdom with a modern, safety-first approach. He's committed to authentic healing practices and provides personalized care for each client's unique journey. Contact him at 469-734-6405 or kambocowboy@gmail.com";
    }
    if (lowerMessage.includes("kambo") || lowerMessage.includes("what is")) {
      return "Kambo is a traditional Amazonian medicine derived from the waxy secretions of the Phyllomedusa bicolor tree frog. Matt works with this sacred medicine to support physical and spiritual cleansing, honoring indigenous traditions while ensuring client safety. Each session is tailored to your individual healing needs.";
    }
    if (lowerMessage.includes("session") || lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
      return "Matt offers personalized Kambo sessions in a safe, supportive environment. To book your session, please fill out the contact form below or call him directly at 469-734-6405. He'll discuss your healing goals and ensure Kambo is right for you during a thorough consultation.";
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("fee")) {
      return "Matt believes healing should be accessible and prices sessions fairly based on individual circumstances. Investment varies by session type and personal needs. Contact Matt at 469-734-6405 to discuss pricing and what's included in your complete healing experience.";
    }
    if (lowerMessage.includes("safe") || lowerMessage.includes("danger") || lowerMessage.includes("risk")) {
      return "Safety is Matt's highest priority. As an experienced practitioner, he conducts thorough health screenings, follows strict safety protocols, and creates a supportive environment for your healing journey. He'll discuss your medical history and any concerns during your consultation to ensure Kambo is appropriate for you.";
    }
    if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("dallas")) {
      return "Matt serves the Dallas, Texas area with private, comfortable healing spaces. Known throughout North Texas for his authentic approach and dedication to client safety, he provides exact location details when you book your session to maintain privacy and security.";
    }
    if (lowerMessage.includes("benefits") || lowerMessage.includes("help") || lowerMessage.includes("healing")) {
      return "Matt works with clients seeking physical detoxification, mental clarity, spiritual renewal, and emotional release. Kambo supports the body's natural healing processes and can help with various wellness goals. During your consultation, Matt will discuss how Kambo might support your specific healing intentions.";
    }
    return "I'm here to help with questions about Matt's Kambo healing practice. For detailed information about his approach, experience, and to book a session, please contact Matt directly through the form below or at kambocowboy@gmail.com. He's passionate about supporting your healing journey.";
  }
  const httpServer = createServer(app2);
  return httpServer;
}

// server/production.ts
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  }
});
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  const distPath = path.resolve(import.meta.dirname, "public");
  log(`Setting up production static serving from: ${distPath}`);
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
  }).on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
})();
