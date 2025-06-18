# Artisanal Moroccan Market - E-commerce Platform

## � Project Team

### **Developed by:**

- **ANOU Oussama**
- **HADIFI Chahid**

### **Supervised by:**

- **Mr. YANN BEN MAISSA**

---

## 📋 Project Overview

**Artisanal Moroccan Market** is a comprehensive full-stack e-commerce platform dedicated to authentic Moroccan artisanal products. The platform connects local artisans with customers worldwide, showcasing handmade traditional crafts including pottery, textiles, leather goods, metalwork, and more.

### 🎯 Mission
To preserve and promote Moroccan craftsmanship by providing artisans with a modern digital marketplace while offering customers access to authentic, high-quality handmade products.

## 🏗️ Architecture Overview

### Backend (Node.js + Express + Prisma)
- **Location**: `node-app/`
- **Technology Stack**: Node.js, Express.js, Prisma ORM, PostgreSQL
- **Port**: 5000

### Frontend (Next.js 15)
- **Location**: `next-app-v3/`
- **Technology Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Port**: 3000

## 🚀 Technology Stack

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "PostgreSQL",
  "orm": "Prisma",
  "authentication": "JWT + bcrypt",
  "validation": "express-validator",
  "security": "helmet, cors"
}
```

### Frontend
```json
{
  "framework": "Next.js 15",
  "ui_library": "React 19",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "icons": "Lucide React",
  "http_client": "Axios",
  "notifications": "react-hot-toast",
  "forms": "react-hook-form"
}
```

## 🗄️ Database Schema

### Core Entities
- **Products**: Artisanal items with categories, pricing, and artisan info
- **Categories**: Product classification (Pottery, Textiles, Leather, etc.)
- **Artisans**: Craftspeople with profiles and specialties
- **Customers**: End users with order history
- **Orders & OrderItems**: Purchase transactions
- **Reviews**: Product feedback system

### Entity Relationships
```
Artisan (1:N) Products (N:1) Category
Product (1:N) Reviews (N:1) Customer
Customer (1:N) Orders (1:N) OrderItems (N:1) Product
```

## 🎨 Frontend Architecture

### 📁 Project Structure
```
next-app-v3/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Route groups
│   │   │   ├── about/         # About page
│   │   │   ├── account/       # User dashboards
│   │   │   ├── auth/          # Authentication
│   │   │   ├── cart/          # Shopping cart
│   │   │   ├── categories/    # Product categories
│   │   │   ├── contact/       # Contact page
│   │   │   ├── products/      # Product listings/details
│   │   │   └── search/        # Search functionality
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── common/           # Shared components
│   │   ├── layout/           # Layout components
│   │   └── products/         # Product-specific components
│   ├── lib/                  # Utilities and contexts
│   │   ├── api/             # API utilities
│   │   ├── auth/            # Authentication context
│   │   ├── cart/            # Shopping cart context
│   │   ├── search/          # Search context
│   │   └── wishlist/        # Wishlist context
│   ├── types/               # TypeScript definitions
│   └── data/                # Mock data
└── public/                  # Static assets
```

### 🧩 Component Architecture

#### Layout Components
- **Header**: Navigation, user menu, cart/wishlist indicators
- **Footer**: Links, contact info, social media
- **SearchModal**: Global search interface
- **Navigation**: Main menu with responsive design

#### Product Components
- **ProductCard**: Product display with actions
- **ProductActions**: Add to cart/wishlist buttons
- **FilterBar**: Search, sort, and category filters
- **NoProductsFound**: Empty state with helpful actions
- **LoadingSpinner**: Loading indicators

#### Authentication Components
- **ProtectedRoute**: Route guards for authenticated users
- **LoginForm**: User authentication
- **SignupForm**: User registration

### 📄 Pages Architecture

#### Public Pages
- **Home** (`/`): Hero section, featured products, categories
- **Products** (`/products`): Product listings with filters
- **Categories** (`/categories`): Category browser
- **Product Details** (`/products/[slug]`): Individual product pages
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form and information

#### Protected Pages
- **Customer Dashboard** (`/account/dashboard`): Order history, profile
- **Artisan Dashboard** (`/account/artisan/dashboard`): Product management
- **Admin Dashboard** (`/account/admin/dashboard`): Platform management
- **Cart** (`/cart`): Shopping cart management
- **Checkout** (`/checkout`): Purchase flow
- **Wishlist** (`/account/wishlist`): Saved products

## 🔄 State Management

### Context API Implementation
The application uses React Context API for centralized state management:

#### 1. AuthContext (`/lib/auth/AuthContext.tsx`)
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
}
```

#### 2. CartContext (`/lib/cart/CartContext.tsx`)
```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

#### 3. WishlistContext (`/lib/wishlist/WishlistContext.tsx`)
```typescript
interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}
```

#### 4. SearchContext (`/lib/search/SearchContext.tsx`)
- Global search state management
- Search history and suggestions
- Quick search functionality

### State Persistence
- **localStorage** for cart, wishlist, and authentication tokens
- **Session management** with JWT tokens
- **Optimistic updates** for better UX

## 🌐 API Integration

### HTTP Client Configuration
```typescript
// Using Axios for HTTP requests
const API_BASE_URL = 'http://localhost:5000/api';

// Example API call
const response = await axios.get(`${API_BASE_URL}/products`);
```

### API Endpoints
```
Authentication:
POST   /api/auth/login     # User login
POST   /api/auth/register  # User registration

Products:
GET    /api/products       # Get all products
GET    /api/products/:id   # Get product by ID
POST   /api/products       # Create product (authenticated)
PUT    /api/products/:id   # Update product (authenticated)
DELETE /api/products/:id   # Delete product (authenticated)

Categories:
GET    /api/categories     # Get all categories

Orders:
GET    /api/orders         # Get user orders (authenticated)
POST   /api/orders         # Create order (authenticated)
PUT    /api/orders/:id     # Update order status (authenticated)

Reviews:
GET    /api/reviews        # Get product reviews
POST   /api/reviews        # Create review (authenticated)
```

### JWT Token Management
```typescript
// Token storage and retrieval
const token = localStorage.getItem('morocco_craft_token');

// Axios interceptors (future implementation)
axios.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🔐 Authentication & Authorization

### Authentication Flow
1. **Login/Signup**: User credentials validated against database
2. **JWT Generation**: Server creates signed JWT token
3. **Token Storage**: Client stores token in localStorage
4. **Protected Routes**: Routes check authentication status
5. **Role-based Access**: Different dashboards for customers, artisans, admins

### Security Features
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Route Protection**: Role-based access control
- **Input Validation**: express-validator middleware
- **CORS Configuration**: Secure cross-origin requests

### User Roles
```typescript
type UserRole = 'customer' | 'artisan' | 'admin';

// Role-based routing
- Customer: /account/dashboard, /account/orders, /account/wishlist
- Artisan: /account/artisan/dashboard, /account/artisan/products
- Admin: /account/admin/dashboard, /account/admin/users
```

## 🛒 E-commerce Features

### 1. Product Search & Filtering
- **Search Bar**: Text-based product search
- **Category Filters**: Filter by product categories
- **Sort Options**: Price, name, date, featured status
- **Advanced Filters**: Price range, artisan, materials
- **Search Results**: Highlighted matching terms

### 2. Shopping Cart
- **Add to Cart**: Product quantity selection
- **Cart Management**: Update quantities, remove items
- **Cart Persistence**: localStorage for session continuity
- **Cart Indicators**: Header cart count badge
- **Cart Totals**: Subtotal and tax calculations

### 3. Wishlist
- **Save Products**: Heart icon for wishlist management
- **Wishlist Page**: Dedicated wishlist interface
- **Move to Cart**: Convert wishlist items to cart
- **Wishlist Sharing**: Export/share functionality (planned)

### 4. Product Reviews
- **Rating System**: 5-star rating interface
- **Review Comments**: Text-based product feedback
- **Review Display**: Average ratings and review lists
- **Review Validation**: Authenticated user reviews only

### 5. Order Management
- **Order Creation**: Cart to order conversion
- **Order Tracking**: Status updates (pending, shipped, delivered)
- **Order History**: Customer order timeline
- **Order Details**: Itemized order information

### 6. Payment Integration (Planned)
- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Credit cards, PayPal
- **Payment Validation**: Secure transaction handling
- **Receipt Generation**: Order confirmation emails

## 🎨 User Interface Design

### Design System
- **Color Palette**: Amber/gold theme reflecting Moroccan aesthetics
- **Typography**: Modern fonts with good readability
- **Spacing**: Consistent padding and margin system
- **Responsive Design**: Mobile-first approach

### Component Design Patterns
```typescript
// Consistent button styling
className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"

// Card components
className="bg-white rounded-lg shadow-md p-6"

// Form inputs
className="border border-gray-300 rounded-md p-2 focus:ring-amber-500"
```

### Accessibility Features
- **Semantic HTML**: Proper heading structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab index management
- **Color Contrast**: WCAG compliance
- **Alt Text**: Image descriptions

## 🔧 Development Setup

### Prerequisites
```bash
Node.js >= 18.0.0
PostgreSQL >= 13.0
npm or yarn
```

### Installation Steps
```bash
# Clone repository
git clone <repository-url>
cd artisanal-moroccan-market

# Backend setup
cd node-app
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend setup
cd ../next-app-v3
npm install
npm run dev
```

### Environment Variables
```bash
# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/moroccan_market"
JWT_SECRET="your-jwt-secret"
PORT=5000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

## 📊 Project Statistics

### Code Metrics
- **Frontend Files**: 50+ React components
- **Backend Routes**: 20+ API endpoints
- **Database Tables**: 7 main entities
- **TypeScript Coverage**: 100% frontend
- **Responsive Breakpoints**: Mobile, tablet, desktop

### Features Implemented
- ✅ User Authentication & Authorization
- ✅ Product Catalog with Search/Filter
- ✅ Shopping Cart Management
- ✅ Wishlist Functionality
- ✅ Admin Dashboard
- ✅ Artisan Portal
- ✅ Order Management
- ✅ Review System
- ✅ Responsive Design
- ✅ Role-based Access Control

### Future Enhancements
- 🔄 Payment Gateway Integration
- 🔄 Email Notifications
- 🔄 Real-time Chat Support
- 🔄 Mobile App (React Native)
- 🔄 Advanced Analytics
- 🔄 Multi-language Support
- 🔄 SEO Optimization

## 🧪 Testing Strategy

### Frontend Testing
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright (planned)
- **Type Safety**: TypeScript compilation
- **Manual Testing**: Cross-browser compatibility

### Backend Testing
- **Unit Tests**: Jest framework
- **API Testing**: Supertest
- **Database Testing**: Test database setup
- **Integration Tests**: End-to-end API flows

## 📈 Performance Optimizations

### Frontend Optimizations
- **Next.js App Router**: Improved routing performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching Strategy**: Static generation where possible

### Backend Optimizations
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Prisma connection management
- **Caching**: Redis integration (planned)
- **API Rate Limiting**: Protection against abuse

## 🔒 Security Measures

### Frontend Security
- **XSS Prevention**: React's built-in protection
- **CSRF Protection**: Token-based validation
- **Input Sanitization**: Form validation
- **Secure Storage**: HttpOnly cookies (planned)

### Backend Security
- **Password Hashing**: bcrypt implementation
- **JWT Security**: Secure token generation
- **Input Validation**: express-validator
- **SQL Injection Prevention**: Prisma ORM protection
- **Rate Limiting**: API endpoint protection

## 📱 Mobile Responsiveness

### Responsive Design Features
- **Mobile-First Approach**: Tailwind CSS breakpoints
- **Touch-Friendly Interface**: Proper touch targets
- **Optimized Images**: Responsive image sizing
- **Mobile Navigation**: Hamburger menu implementation
- **Touch Gestures**: Swipe and tap interactions

### Breakpoints
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small screens */
md: 768px   /* Medium screens */
lg: 1024px  /* Large screens */
xl: 1280px  /* Extra large screens */
```

## 🌍 Internationalization (Future)

### Planned I18n Features
- **Multi-language Support**: Arabic, French, English
- **RTL Support**: Right-to-left text direction
- **Currency Conversion**: Multiple currency options
- **Localized Content**: Region-specific products

## 📋 Deployment Strategy

### Production Deployment
```bash
# Frontend (Vercel/Netlify)
npm run build
npm run start

# Backend (Heroku/DigitalOcean)
npm run start
```

### Environment Configuration
- **Production Database**: PostgreSQL on cloud
- **File Storage**: AWS S3 for images
- **CDN**: CloudFront for static assets
- **Monitoring**: Application performance monitoring

## 👥 Team & Contribution

### Development Team
- **Full-Stack Development**: React, Node.js, TypeScript
- **UI/UX Design**: Figma mockups and prototypes
- **Database Design**: PostgreSQL schema optimization
- **Testing**: Manual and automated testing

### Code Quality Standards
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting consistency
- **TypeScript**: Type safety enforcement
- **Git Workflow**: Feature branches and pull requests

## 📞 Support & Documentation

### Technical Documentation
- **API Documentation**: Endpoint specifications
- **Component Library**: Storybook (planned)
- **Database Schema**: ERD diagrams
- **Setup Guides**: Development environment setup

### User Documentation
- **User Manual**: Platform usage guide
- **FAQ Section**: Common questions
- **Video Tutorials**: Feature demonstrations
- **Customer Support**: Contact channels

---

## �📄 License & Legal

This project is developed for educational purposes as part of the PFA (Projet de Fin d'Année) curriculum.

**Copyright © 2025 Artisanal Moroccan Market. All rights reserved.**
