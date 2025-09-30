# Ken & Mia Wedding Website

A beautiful, responsive single-page wedding website built with Next.js, featuring an RSVP system and elegant design.

## Features

- 📱 **Mobile-First Design** - Fully responsive across all devices
- 💌 **RSVP System** - Complete form with validation and webhook integration
- 📅 **Add to Calendar** - Download ICS files for ceremony and reception
- 🗺️ **Interactive Map** - Embedded Google Maps with directions
- 🎨 **Dark Mode** - Toggle between light and dark themes
- ♿ **Accessible** - WCAG AA compliant with proper ARIA labels
- 🚀 **SEO Optimized** - Open Graph tags and JSON-LD schema
- 📸 **Photo Gallery** - Responsive gallery with lightbox view

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings) + Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd wedding-website
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
# or
npm install
\`\`\`

3. Create a `.env.local` file (optional):
\`\`\`env
# Optional: Webhook URL for RSVP submissions
# If not set, RSVPs will be logged to console in development
RSVP_WEBHOOK_URL=https://your-webhook-url.com
\`\`\`

4. Run the development server:
\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Wedding Details

Edit the content in the following files:

- **Names & Date:** `components/hero.tsx`
- **Story:** `components/our-story.tsx`
- **Schedule:** `components/schedule.tsx`
- **Venue:** `components/venue.tsx`
- **Entourage:** `components/entourage.tsx`
- **Registry:** `components/registry.tsx`

### Change Fonts

1. Update `app/layout.tsx` to import different Google Fonts
2. Update `app/globals.css` to reference the new font variables

### Modify Colors

Edit the CSS variables in `app/globals.css` under `:root` and `.dark` selectors.

### Replace Images

Add your images to the `public/images/` directory:
- `hero.jpg` - Hero section background
- `gallery-1.jpg` through `gallery-6.jpg` - Gallery images
- `og.jpg` - Social media preview image

## RSVP Webhook Setup

### Google Sheets Integration

1. Create a new Google Sheet
2. Go to Extensions > Apps Script
3. Paste this code:

\`\`\`javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.email,
    data.phone,
    data.attending,
    data.guestCount,
    data.plusOne,
    data.dietary,
    data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
\`\`\`

4. Deploy as Web App (Execute as: Me, Access: Anyone)
5. Copy the Web App URL
6. Add to your `.env.local` as `RSVP_WEBHOOK_URL`

### Airtable Integration

1. Create an Airtable base with appropriate fields
2. Use Airtable's webhook or API endpoint
3. Add the URL to `RSVP_WEBHOOK_URL`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RSVP_WEBHOOK_URL` | No | Webhook URL for RSVP submissions. If not set, RSVPs are logged to console. |

## Performance

- Lighthouse Score: 90+ on mobile
- Optimized images with Next.js Image component
- Minimal JavaScript bundle
- Fast page loads with static generation

## Accessibility

- Semantic HTML elements
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios (WCAG AA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the developers.

---

Made with ❤️ for Ken & Mia's special day
