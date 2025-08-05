# Kambo Healing Website - Matt O'Brien

## Project Overview
A comprehensive Kambo practitioner website for Matt O'Brien's authentic healing practice in Dallas, Texas. The website provides an immersive digital experience about traditional Amazonian medicine and holistic wellness, featuring professional design with Amazon rainforest imagery, detailed bioactive peptide information, and secure booking integration.

## Key Technologies
- React.js frontend with TypeScript
- Express.js backend
- Tailwind CSS with custom color scheme
- Drizzle ORM with in-memory storage
- TanStack React Query for data fetching
- Responsive design with mobile optimization

## Recent Changes

### August 5, 2025 - Azure Deployment Fix & Email Integration
- **Vite Import Issue**: Resolved "Cannot find package 'vite'" error in Azure production deployment
- **Production Server**: Created separate `server/production.ts` entry point without vite dependencies for production builds
- **Build Process**: Modified GitHub Actions workflow to use production-specific server bundle
- **Manual Deployment**: Enhanced workflow dispatcher with custom reason input and deployment logging
- **Email Functionality**: Implemented SendGrid integration for contact form submissions
  - Contact form now sends email notifications to Matt (kambocowboy@gmail.com)
  - Users receive automatic confirmation emails with Matt's contact details
  - Professional HTML email templates with Kambo branding
- **Architecture**: Maintained development/production separation - `index.ts` for dev with vite, `production.ts` for production static serving

### January 25, 2025 - Image Updates
- **Matt O'Brien Photo**: Updated practitioner headshot with new professional image showing authentic styling with hat, vest, and boots
- **Community Photo**: Added group ceremonial photo to KamboInfo section, replacing AI-generated content with authentic community gathering
- **Visual Enhancement**: Both images strengthen authenticity and human connection in traditional healing context
- **Accessibility**: Updated alt text descriptions for improved SEO and screen reader accessibility

### December 25, 2024 - Security Update
- **Critical Security Fix**: Updated Vite from vulnerable 5.4.14 to secure 5.4.19
- **Vulnerability Patched**: CVE-2025-30208 arbitrary file read vulnerability resolved
- **Impact**: Eliminated risk of sensitive file exposure through malicious URL crafting
- **SEO Fix**: Fixed broken Open Graph image by creating static og-image.jpg in public directory
- **Social Media**: Open Graph and Twitter Card images now properly display Amazon rainforest hero image
- **Routing Fix**: Added static file serving middleware for development and production compatibility

### December 25, 2024
- **SEO Implementation**: Added comprehensive SEO metadata to client/index.html including:
  - Optimized title tags with location and service keywords
  - Meta descriptions highlighting Dallas Kambo practice
  - Open Graph and Twitter Card optimization
  - Geographic targeting for Dallas/North Texas area
  - Structured data (JSON-LD) for local business listing
  - Canonical URLs and theme colors

### Earlier Updates
- **Waiver Integration**: Moved waiver from automatic popup to dedicated button in Services section
- **Testimonials Fix**: Resolved visibility issues by replacing gradient backgrounds with solid white cards
- **Navigation Enhancement**: Improved visibility against bright hero backgrounds
- **Image Assets**: Replaced external images with local assets for Azure deployment compatibility
- **Contact Information**: Updated with real details (phone: 469-734-6405, email: kambocowboy@gmail.com)

## Project Architecture
- **Frontend**: Client directory with React components, pages, and UI library
- **Backend**: Server directory with Express routes and storage interface
- **Shared**: Common schemas and types using Drizzle and Zod
- **Styling**: Custom Tailwind configuration with earth-tone color palette
- **Assets**: Local image storage in attached_assets directory

## User Preferences
- Professional aesthetic honoring indigenous wisdom
- Science-backed approach to traditional medicine
- Clear, accessible waiver process for legal compliance
- Local asset usage for deployment reliability
- Dallas/North Texas geographic focus

## Deployment Notes
- Configured for Azure App Services deployment
- HTTPS-ready with security headers
- Local assets prevent broken links in production
- SmartWaiver integration for legal compliance