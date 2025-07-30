import { users, contactSubmissions, testimonials, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentContactId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with some testimonials
    this.initializeTestimonials();
  }

  private initializeTestimonials() {
    const initialTestimonials: Array<Omit<Testimonial, 'id'>> = [
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

    initialTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      submittedAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0)
    );
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
