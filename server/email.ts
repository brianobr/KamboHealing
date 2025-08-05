import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  message: string;
  agreesToTerms?: boolean;
}

export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const { firstName, lastName, email, phone, serviceInterest, message } = formData;
    
    // Email to Matt
    const emailToMatt = {
      to: 'kambocowboy@gmail.com',
      from: 'noreply@kambohealing.com', // This should be a verified sender in SendGrid
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
            ${phone && phone.trim() ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            ${serviceInterest && serviceInterest.trim() ? `<p><strong>Service Interest:</strong> ${serviceInterest}</p>` : ''}
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
      `,
    };

    // Confirmation email to the person who submitted the form
    const confirmationEmail = {
      to: email,
      from: 'noreply@kambohealing.com',
      replyTo: 'kambocowboy@gmail.com',
      subject: 'Thank you for contacting Kambo Healing - We\'ll be in touch soon',
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
          📧 kambocowboy@gmail.com<br>
          📱 469-734-6405</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #555;">
              This is an automated confirmation. Please do not reply to this email. 
              For questions, contact Matt directly at kambocowboy@gmail.com.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      mailService.send(emailToMatt),
      mailService.send(confirmationEmail)
    ]);

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}