import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

const MATT_EMAIL = 'matt@kambowithmatt.com';
const FROM_EMAIL = 'noreply@kambowithmatt.com'; // This should be a verified sender in SendGrid

export async function sendContactNotification(formData: ContactFormData): Promise<boolean> {
  try {
    // Email to Matt (notification)
    const notificationEmail = {
      to: MATT_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission - ${formData.firstName} ${formData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d5016; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2d5016; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            ${formData.serviceInterest ? `<p><strong>Service Interest:</strong> ${formData.serviceInterest}</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #2d5016; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #2d5016;">
              <strong>Reminder:</strong> Please respond within 24 hours as promised on the website.
            </p>
          </div>
        </div>
      `,
    };

    // Confirmation email to visitor
    const confirmationEmail = {
      to: formData.email,
      from: FROM_EMAIL,
      subject: 'Thank you for your interest in Kambo healing - Matt O\'Brien',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d5016; margin-bottom: 20px;">Thank You for Your Message</h2>
          
          <p>Dear ${formData.firstName},</p>
          
          <p>Thank you for reaching out about Kambo healing. I have received your message and will respond within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Your Message Summary</h3>
            ${formData.serviceInterest ? `<p><strong>Service Interest:</strong> ${formData.serviceInterest}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6; font-style: italic;">${formData.message}</p>
          </div>
          
          <p>In the meantime, please:</p>
          <ul>
            <li>Review the safety information on our website</li>
            <li>Consider any medications or health conditions that may affect your participation</li>
            <li>Prepare any additional questions you may have</li>
          </ul>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
            <h3 style="color: #2d5016; margin-top: 0;">Important Reminder</h3>
            <p style="margin: 0; font-size: 14px;">
              Kambo is a powerful traditional medicine. Please consult with your healthcare provider before participating, especially if you have any medical conditions or take medications.
            </p>
          </div>
          
          <p style="margin-top: 30px;">
            Blessings,<br>
            <strong>Matt O'Brien</strong><br>
            Kambo Practitioner<br>
            <a href="mailto:${MATT_EMAIL}" style="color: #2d5016;">${MATT_EMAIL}</a>
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(notificationEmail),
      sgMail.send(confirmationEmail)
    ]);

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}