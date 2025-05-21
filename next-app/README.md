# 🧵 Artisanal Moroccan Market – Full Project Documentation

## 📚 Table of Contents
- [Project Overview](#project-overview)
- [Functional Requirements](#functional-requirements)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Components](#components-overview)
- [Context API](#context-api)
- [Custom Hooks](#custom-hooks)
- [Pages](#pages)
- [Cultural Adaptations](#cultural-adaptations)
- [User Journey Maps](#user-journey-maps)
- [SEO Requirements](#seo-requirements)
- [Integration Requirements](#integration-requirements)
- [Analytics & Reporting](#analytics--reporting)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)

---

## 📦 Project Overview

The **Artisanal Moroccan Market** is a full-stack e-commerce platform dedicated to promoting and selling traditional Moroccan handcrafted products. It delivers an immersive shopping experience with:

- Multilingual support (English, French, Arabic)
- Product listings and categories
- Detailed product pages with artisan background
- Cart and checkout functionality
- International shipping and regional payment options

---

## ✅ Functional Requirements

### 👥 User Roles
- **Guest** – Browse, view products, and add to cart
- **Registered User** – Place orders, manage profile, wishlist
- **Admin** – Manage inventory, orders, and users
- **(Optional)** Artisans – Submit and manage their own products

### 🧭 Key Features
- Product filtering by region, material, and artisan
- Responsive and mobile-first design
- Multilingual UI (EN, FR, AR)
- Currency conversion (MAD default)
- Cultural storytelling and artisan profiles
- Wishlist, "Notify Me", product reviews
- Promotions: coupons, bundles, seasonal offers

### 💳 Checkout & Payment
- Guest checkout
- CMI (Morocco), PayPal, Cards, Apple Pay (optional)
- Address validation and tax/shipping calculators
- Email notifications

### 🔐 User Account
- Order history and tracking
- Address book
- Saved payment methods
- Wishlist and review management

### 📈 Analytics & SEO
- Behavior tracking, cart abandonment
- SEO-friendly URLs, schema markup
- Sitemap, breadcrumbs, canonical URLs

---

## 🧰 Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Package Manager**: npm
- **Linting**: ESLint

---

## 🗂️ Project Structure

```bash
components/
  ├── cart/         # Cart items, summary, checkout
  ├── home/         # Landing page elements
  ├── layout/       # Header, footer, page wrappers
  ├── products/     # Product listings, filters, details
  └── ui/           # Generic UI elements (buttons, inputs)

context/
  └── CartContext.tsx   # Global cart state management

hooks/
  ├── use-mobile.tsx    # Mobile responsiveness
  └── use-toast.ts      # Toast notifications

pages/
  ├── index.tsx         # Home
  ├── product/[id].tsx  # Product details
  ├── cart.tsx          # Cart & checkout
  └── 404.tsx           # Not Found
```

---

## ⚙️ Setup and Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/artisanal-market.git

# 2. Navigate to the project directory
cd artisanal-market

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🧩 Components Overview

* **Cart Components** – Handle cart logic, quantity control, pricing
* **Home Components** – Featured products, categories, hero sections
* **Layout Components** – Navigation, footer, layout wrappers
* **Product Components** – Listings, cards, filters, detail views
* **UI Components** – Reusable elements like buttons, forms, modals

---

## 🧠 Context API

* `CartContext.tsx`: Provides shared cart state

  * Add/remove items
  * Update quantities
  * Calculate totals
  * Accessible across all pages

---

## 🧪 Custom Hooks

* **`use-mobile.tsx`** – Detect screen size for responsive behavior
* **`use-toast.ts`** – Show success/error notifications

---

## 📄 Pages

* **Home Page** – Displays categories and featured items
* **Product Detail Page** – In-depth info, artisan bio, images
* **Cart Page** – Editable cart, apply coupons, proceed to checkout
* **404 Page** – Custom page for broken links or missing content

---

## 🌍 Cultural Adaptations

### 🌐 Localization
- Multilingual interface:
  - 🇬🇧 English
  - 🇫🇷 French
  - 🇲🇦 Arabic (RTL support)
- Currency conversion:
  - Default: Moroccan Dirham (MAD)
  - Optional: USD, EUR
- Region-aware shipping and taxes
- Local payment integrations: CMI, Cash on Delivery (COD)

### 🧵 Moroccan Craft Context
- Artisan spotlights and biographies
- Regional craft explanations (e.g., Fez ceramics, Taznakht rugs)
- Map of Morocco highlighting craft origins
- Informative sections on:
  - Techniques (e.g., zellige, tadelakt)
  - Cultural symbolism in patterns
  - Historical roots of each craft category

---

## 🧭 User Journey Maps

### 🆕 New Customer Journey
1. Lands on homepage
2. Explores categories or uses search
3. Views product details (with cultural insights)
4. Adds items to cart
5. Registers or continues as guest
6. Enters address and selects shipping
7. Completes payment
8. Receives confirmation and tracking
9. Leaves a review or subscribes to newsletter

### 🔁 Returning Customer Journey
1. Logs in
2. Views recommended products
3. Uses saved shipping and payment info
4. Adds items to cart
5. Applies available coupons
6. Completes a faster checkout
7. Leaves product feedback or reorders

---

## 🔎 SEO Requirements

- Descriptive, localized meta titles and descriptions
- SEO-friendly slugs and URLs
  - e.g., `/products/taznakht-handwoven-rug`
- Schema markup for:
  - Products
  - Reviews
  - Breadcrumbs
- Alt tags for all product and artisan images
- Sitemap generation for search engines
- Canonical tags to avoid duplicate indexing
- Open Graph support for social sharing

---

## 🔌 Integration Requirements

- **Email Marketing**: Mailchimp, Brevo, or Klaviyo
- **Chat Support**: Intercom, Crisp, or WhatsApp Business
- **Analytics**: Google Analytics 4, Hotjar
- **Payment Gateways**: Stripe, PayPal, CMI
- **Reviews System**: Custom or integrations like Trustpilot
- **Social Media**: Facebook Pixel, Instagram Shopping

---

## 📊 Analytics & Reporting

- Track user behavior: pages viewed, clicks, time spent
- Monitor cart abandonment and checkout drop-off
- Conversion funnel insights
- Search terms and filtering analytics
- Product popularity reports
- Newsletter performance tracking (CTR, open rate)
- A/B testing capabilities for CTAs and layouts

---

## 🔁 Development Workflow

```bash
# Make changes to code
# Preview in local dev
npm run dev

# Run production build
npm run build

# Run ESLint check
npm run lint
```

---

## 🚀 Deployment

Recommended: **[Vercel](https://vercel.com/)** (best for Next.js)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables and build settings (if needed)
4. Deploy

Other options: Netlify, DigitalOcean, custom server (Node.js)

---

**📝 Notes**
> This documentation is designed to be collaborative and iterative. Feel free to expand sections or link out to other markdown files (e.g., `PRISMA_SCHEMA.md`, `DEPLOYMENT_GUIDE.md`) as development progresses.