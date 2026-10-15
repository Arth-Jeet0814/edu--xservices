# Education eXcellence Services

A clean, modern, and institutional multi-page website for **Education eXcellence Services** — a private B2B institutional platform equipping selected African schools with structured pathways to selective universities worldwide.

---

## 🏛️ Brand & Institutional Identity
- **Exact Brand Name:** `Education eXcellence Services` (capital X in "eXcellence")
- **Visual Aesthetic:** Modern, authoritative, and institutional with generous whitespace and alternating midnight navy (`#070E1E`), slate-50 (`#F8FAFC`), and refined champagne gold accents (`#C5A046`).
- **Typography:** Executive modern display font (*Plus Jakarta Sans*) for headings, and high-readability sans-serif (*Inter*) for body text.
- **Zero Splash/Preloader:** Loads directly into the high-impact hero.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + Vite (JavaScript, fast HMR)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Vanilla Tailwind CSS with custom institutional color palette and subtle card shadows
- **Icons:** `lucide-react` (exclusively, no heavy animation libraries)
- **Transitions:** Lightweight native CSS transitions and custom `IntersectionObserver` reveal hook respecting `prefers-reduced-motion`

---

## 📁 Project Architecture

```
d:/2026 Projects/GWA/
├── public/
│   ├── favicon.svg                       # Bespoke institutional SVG seal favicon
│   └── founder.png                       # Founder leadership portrait
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx                # Accessible button supporting gold, navy, outline & router Link
│   │   │   ├── Card.jsx                  # Rounded cards with hover lift
│   │   │   ├── Section.jsx               # Light/dark alternating section wrapper with scroll reveal
│   │   │   └── ScrollToTop.jsx           # Route transition scroll reset
│   │   ├── home/
│   │   │   ├── HeroSection.jsx           # Navy gradient hero with static SVG network illustration
│   │   │   ├── BeyondRecruitmentSection.jsx # Narrative + styled institutional console mockup
│   │   │   ├── PartnerLogosSection.jsx   # Static responsive grid of partner universities
│   │   │   ├── CourseDirectorySection.jsx # Program search + lead-gate notice modal & portal login
│   │   │   ├── InstitutionalClaritySection.jsx # 3 embedded pathways department cards
│   │   │   ├── ElitePositioningSection.jsx # 6 feature tiles
│   │   │   ├── DestinationsGridSection.jsx # 24 countries with flagcdn.com flags
│   │   │   ├── VisionSection.jsx         # Founder card & static institutional stats
│   │   │   ├── FoundersLetterSection.jsx # Editorial column with pull quote
│   │   │   ├── InstitutionalPartnershipSection.jsx # 4 steps & Phase 1 pre-screening form
│   │   │   ├── GlobalPathwaysSection.jsx # Country cards & focus areas
│   │   │   ├── MobilityGlanceSection.jsx # 3 static stat cards & mandate
│   │   │   ├── GovernanceSection.jsx     # 6 governance cards & 3 activation phases
│   │   │   └── FinalCtaSection.jsx       # Call to action with university & briefing buttons
│   │   └── layout/
│   │       ├── Navbar.jsx                # Sticky navbar, institutional top bar, portal link, slide menu
│   │       └── Footer.jsx                # Brand info, contact desk, hours, portal link, legal
│   ├── data/
│   │   └── content.js                    # SINGLE CENTRALIZED DATA FILE for all copy & config
│   ├── hooks/
│   │   ├── useDocumentTitle.js           # Dynamic document title & SEO
│   │   └── useIntersectionObserver.js   # Native reveal animation with reduced-motion check
│   ├── pages/
│   │   ├── HomePage.jsx                  # All 15 sections assembled in exact order
│   │   ├── AboutUsPage.jsx               # Mission, pillars, stats, and executive letter
│   │   ├── DestinationsPage.jsx          # 24 countries with interactive region filters & search
│   │   ├── UniversityPartnershipsPage.jsx# University benefits & partnership inquiry form
│   │   ├── BookDemoPage.jsx              # Briefing booking form & Calendly embed placeholder
│   │   ├── PrivacyPolicyPage.jsx         # Institutional data protection terms
│   │   └── TermsConditionsPage.jsx       # Institutional governance agreement
│   ├── App.jsx                           # Route declarations
│   ├── index.css                         # Tailwind directives & CSS utilities
│   └── main.jsx                          # Root React mounting with BrowserRouter
├── index.html                            # HTML5 head, Google Fonts, and favicon
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ✏️ How to Edit Content & Configuration

All website text, contact parameters, and copy are located in a single file:
👉 **`src/data/content.js`**

At the top of the file, you can edit institutional parameters:
```javascript
export const siteConfig = {
  brandName: "Education eXcellence Services",
  brandShort: "eXcellence",
  tagline: "The international department your school does not yet have",
  founderName: "Mrs. Konate Djenabou Diawara",
  founderTitle: "African Student Mobility Expert & Institutional Founder",
  founderImage: "/founder.png",
  address: "Av Malick Sy, Dakar Plateau, Dakar, Senegal",
  email: "partnerships@edu-xservices.com",
  phone: "+221 33 848 38 12",
  portalUrl: "https://portal.edu-xservices.com/",
  portalText: "portal.edu-xservices.com",
  officeHours: "Mon - Sat: 9:00 AM - 6:00 PM (GMT)",
  copyrightYear: 2026,
};
```
Modifying these values will automatically update them across the entire website (Navbar, Hero, Vision, Founder's Letter, Footer, and Legal pages).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔗 Backend Form Integration (TODOs)
The pre-screening form (`#partnerFormMain`), university accord form, and briefing booking forms include interactive React state validation. When you are ready to connect to a backend service, refer to the inline `TODO` comments inside:
- [src/components/home/InstitutionalPartnershipSection.jsx](file:///d:/2026%20Projects/GWA/src/components/home/InstitutionalPartnershipSection.jsx)
- [src/pages/UniversityPartnershipsPage.jsx](file:///d:/2026%20Projects/GWA/src/pages/UniversityPartnershipsPage.jsx)
- [src/pages/BookDemoPage.jsx](file:///d:/2026%20Projects/GWA/src/pages/BookDemoPage.jsx)
You can connect them to services like **EmailJS**, **Formspree**, or your custom API endpoint.
