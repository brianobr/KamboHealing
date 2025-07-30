import { MailService } from '@sendgrid/mail';
import type { InsertContactSubmission } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email functionality disabled");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SendGrid API key not found - email not sent');
      return false;
    }
    
    if (!apiKey.startsWith('SG.')) {
      console.error('Invalid SendGrid API key format - must start with "SG."');
      return false;
    }
    
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    console.log('Email sent successfully to:', params.to);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactFormNotification(
  submission: InsertContactSubmission
): Promise<boolean> {
  const emailContent = {
    to: 'kambocowboy@gmail.com', // Matt's email
    from: 'noreply@kambohealing.com', // This needs to be verified in SendGrid
    subject: `New Contact Form Submission - ${submission.firstName} ${submission.lastName}`,
    text: `
New contact form submission received:

Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone || 'Not provided'}
Service Interest: ${submission.serviceInterest || 'Not specified'}

Message:
${submission.message}

Terms Agreement: ${submission.agreesToTerms ? 'Yes' : 'No'}

Submitted at: ${new Date().toLocaleString()}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2D5A27; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #2D5A27; margin-top: 0;">Contact Information</h3>
    <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
    <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
    <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
    <p><strong>Service Interest:</strong> ${submission.serviceInterest || 'Not specified'}</p>
  </div>
  
  <div style="background-color: #f0f7f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #2D5A27; margin-top: 0;">Message</h3>
    <p style="white-space: pre-wrap;">${submission.message}</p>
  </div>
  
  <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Terms Agreement:</strong> ${submission.agreesToTerms ? '✅ Agreed' : '❌ Not agreed'}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  </div>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
    <p>This email was automatically generated from your Kambo Healing website contact form.</p>
  </div>
</div>
    `
  };

  return await sendEmail(emailContent);
}