Gurudev Bakery Website - Product Requirements Document (PRD)

Document Information

Field	Details
Product Name	Gurudev Bakery Website
Version	1.0 (MVP) / 2.0 (MVP++)
Document Owner	Product Manager
Last Updated	December 23, 2025
Status	Draft → Review → Approved
Table of Contents

Executive Summary
Product Vision & Goals
Target Audience
MVP Scope
MVP++ Scope
User Stories & Acceptance Criteria
Functional Requirements
Non-Functional Requirements
Technical Architecture
Design Requirements
Content Requirements
Success Metrics
Timeline & Milestones
Risk Assessment
Future Enhancements
1. Executive Summary

1.1 Problem Statement

Gurudev Bakery currently lacks an online presence, limiting customer reach and making it difficult for potential customers to:

Discover products and pricing
Find contact information and location
Access information in their preferred language (English/Marathi)
Place inquiries or orders conveniently
1.2 Solution

A modern, bilingual (English + Marathi) website with:

MVP: Core informational website with CMS for easy content management
MVP++: Enhanced features including Hindi language, advanced animations, and marketing tools
1.3 Business Value

Increase visibility: Establish online presence for local and regional customers
Reduce friction: Easy access to product information and contact details
Expand reach: Serve Marathi-speaking customers in their native language
Scalability: Foundation for future e-commerce capabilities
Brand building: Professional digital identity
1.4 Success Criteria

MVP: Launch within 4 weeks, achieve 100+ daily visitors within first month
MVP++: Add enhanced features within 7 weeks, achieve 500+ daily visitors by month 3
2. Product Vision & Goals

2.1 Vision Statement

"To create an accessible, beautiful, and efficient digital presence for Gurudev Bakery that serves customers in their preferred language and provides a seamless path from discovery to purchase."

2.2 Product Goals

Goal	MVP	MVP++
Language Support	English + Marathi	English + Hindi + Marathi
User Experience	Clean, responsive, fast	Rich animations, enhanced interactions
Content Management	Simple CMS for staff	Advanced CMS with workflows
Mobile Experience	Responsive website	PWA with offline support
Discovery	Basic SEO	Advanced SEO + social integration
Performance	Lighthouse 80+	Lighthouse 95+
2.3 Key Principles

Accessibility First: Support for Devanagari script with proper font rendering
Mobile-First: Majority of users will access via mobile devices
Performance: Fast load times even on slow connections
Simplicity: Easy for non-technical staff to manage content
Scalability: Architecture supports future e-commerce integration
3. Target Audience

3.1 Primary Users

Customer Persona 1: Local Family Shopper

Demographics: 25-45 years, family-oriented, middle income
Language: Primarily Marathi, some English
Behavior: Shops for family occasions, festivals, celebrations
Goals: Find fresh products, check prices, get directions
Pain Points: Language barriers, unclear pricing, difficult to find contact info
Customer Persona 2: Young Professional

Demographics: 22-35 years, working professional, urban
Language: English preferred, understands Marathi
Behavior: Quick purchases, values convenience
Goals: Browse menu quickly, place orders, check availability
Pain Points: Wants online ordering (future), needs fast mobile experience
Customer Persona 3: Gift Buyer

Demographics: 30-55 years, purchasing for events/gifts
Language: English or Marathi
Behavior: Occasional buyer for special occasions
Goals: View product images, understand customization options
Pain Points: Needs detailed product information, contact for custom orders
3.2 Secondary Users

Bakery Staff (CMS Users)

Role: Content managers, owners
Technical Level: Low to medium
Goals: Update products, prices, images without developer help
Pain Points: Complex interfaces, need training
4. MVP Scope

4.1 MVP Overview

Timeline: 4 weeks
Languages: English + Marathi
Budget: $6/month hosting

4.2 MVP Features

4.2.1 Core Pages

Page	Purpose	Priority
Home	Hero section, featured products, about snippet, contact info	P0
Menu/Products	Grid view of all products with categories	P0
Product Detail	Individual product information	P0
About	Bakery story, values, team	P1
Contact	Contact form, location map, hours	P0
4.2.2 Features Included

✅ Bilingual Support (English + Marathi)

Language switcher in header
All content available in both languages
Devanagari font support (Noto Sans Devanagari)
Language-specific URLs (/en/*, /mr/*)
✅ Responsive Design

Mobile-first approach
Breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
Touch-friendly interfaces (min 44px touch targets)
Hamburger menu on mobile
✅ Product Management

Display products with images, names, descriptions, prices
Categorization system
Featured products section on home page
Basic product search (text-based)
✅ Content Management System (CMS)

Strapi headless CMS
Content types: Products, Categories, Contact Info, Site Settings
Image upload and management
Bilingual content editing
Publish/unpublish functionality
✅ Contact Features

Contact form (name, email, phone, message)
Form validation
Email submission
Display: phone, email, address, business hours
Google Maps embed (iframe)
✅ Design & Animation

Brand colors and typography
Basic animations (hero fade-in, card hover effects)
Smooth scrolling
Loading states
✅ PWA Basics

App manifest for installability
Service worker for offline fallback
App icons (192px, 512px)
✅ SEO Basics

Meta tags (title, description) per page
Open Graph tags for social sharing
Sitemap. xml
robots.txt
Alt tags for images
4.3 MVP Out of Scope

❌ Hindi language support (moved to MVP++)
❌ Advanced animations (parallax, scroll-triggered)
❌ Blog/recipes section
❌ Online ordering/e-commerce
❌ User accounts
❌ Product reviews/ratings
❌ Advanced search filters
❌ Push notifications
❌ Instagram feed integration
❌ Newsletter signup
❌ Multi-location support

4.4 MVP User Flows

Flow 1: View Products (Guest User)

Code
1. User lands on home page (default:  English)
2. User sees hero section with CTA "View Menu"
3. User clicks CTA → navigates to /en/menu
4. User sees product grid with categories
5. User clicks on category to filter
6. User clicks on product card
7. User views product detail page
8. User clicks "Contact Us" to inquire
9. User fills contact form
10. User receives confirmation message
Flow 2: Switch Language

Code
1. User on any page (English)
2. User clicks language switcher in header
3. User selects "मराठी"
4. Page reloads with Marathi content
5. URL changes from /en/* to /mr/*
6. All UI text and content displays in Marathi
Flow 3: Bakery Staff Updates Product (CMS)

Code
1. Staff member logs into Strapi CMS
2. Navigates to "Products" collection
3. Clicks "Create new entry"
4. Fills product details in English
5. Uploads product image
6. Sets price and category
7. Saves draft
8. Switches to Marathi locale
9. Fills translated product details
10. Publishes product
11. Product appears on website in both languages
4.5 MVP Technical Requirements

Requirement	Specification
Frontend Framework	Next.js 14 (App Router)
Language	TypeScript
Styling	Tailwind CSS
Animations	Framer Motion (limited)
Internationalization	next-intl
Backend/CMS	Strapi 4.x
Database	PostgreSQL or SQLite
Image Optimization	Next.js Image component
Hosting - Frontend	Vercel (Free tier)
Hosting - Backend	Railway ($5/month)
Domain	Custom domain
4.6 MVP Content Requirements

Initial Content Needed

Content Type	Quantity	Languages
Products	20-30 items	EN + MR
Categories	5-8 categories	EN + MR
Hero Images	1-2 images	N/A
Product Images	20-30 images	N/A
About Us Text	1 page	EN + MR
Contact Info	Address, phone, hours	EN + MR
Logo	1 (SVG preferred)	N/A
Favicon	1 (multiple sizes)	N/A
Content Specifications

Product Information:

Name: max 50 characters
Description: 100-200 characters
Price: in ₹ (rupees)
Image: 800x600px min, JPG/PNG, <500KB
Category: dropdown selection
Images:

Format: JPG, PNG, WebP
Resolution: Minimum 1200px width for hero images
File size: <1MB per image
Alt text required for accessibility

5. MVP++ Scope

5.1 MVP++ Overview

Timeline: +3 weeks after MVP launch
Languages: English + Hindi + Marathi
Budget: $11-36/month

5.2 MVP++ Additional Features

5.2.1 Enhanced Language Support

✅ Hindi Language Addition

Full Hindi translation of UI and content
Hindi Devanagari font optimization
3-language switcher
hreflang tags for SEO
Language preference persistence
5.2.2 Advanced Animations & Interactions

✅ Scroll-Based Animations

Parallax scrolling effects on hero section
Fade-in animations on scroll
Stagger animations for product grids
Smooth page transitions between routes
Loading skeletons for content
✅ Micro-Interactions

Button hover effects with icons
Image zoom on hover (product cards)
Floating action buttons
Progress indicators
Animated icons
5.2.3 Enhanced Product Experience

✅ Product Detail Enhancements

Image carousel/gallery (multiple images per product)
Related products section
Nutritional information display
Allergen tags/badges
Social sharing buttons (WhatsApp, Facebook, Twitter)
✅ Advanced Search & Filtering

Search autocomplete
Filter by:
Price range
Category
Dietary preferences (vegetarian, vegan, etc.)
Allergens
Sort by: price, name, newest, popular
Grid/List view toggle
Recently viewed products
5.2.4 New Content Sections

✅ Blog/Recipes Section

Blog post creation and management
Rich text editor for content
Image galleries within posts
Tags and categories
SEO-optimized blog posts
Related recipe recommendations
✅ Testimonials

Customer review display
Star ratings
Customer photos (optional)
Featured testimonials on home page
Testimonial carousel
✅ FAQ Section

Accordion-style questions and answers
Category-based organization
Search within FAQs
Trilingual content
✅ Gallery

Photo grid showcase
Lightbox view
Category filters
Behind-the-scenes content
✅ Multiple Locations (if applicable)

Location selector
Individual pages per location
Location-specific contact info
Multiple map embeds
5.2.5 Enhanced CMS Features

✅ Advanced Content Management

Bulk import/export (CSV)
Content scheduling (publish/unpublish dates)
Draft preview URLs
Version history and rollback
Translation workflow (draft → review → publish)
Translation status tracking
✅ Media Management

Folder organization
Image tagging
Bulk image upload
Image cropping tool
Alt text management
✅ User Roles & Permissions

Admin (full access)
Editor (content only)
Translator (translation only)
Viewer (read-only)
Audit logs (who changed what, when)
✅ SEO Tools per Entry

Meta title field
Meta description field
Focus keyword
URL slug customization
Social media preview
5.2.6 Enhanced PWA Features

✅ Push Notifications

Opt-in notification prompt
Send promotional notifications
Order status updates (future)
New product announcements
Trilingual notification content
✅ Offline Experience

Offline product catalog caching
Background sync for form submissions
Offline indicator UI
Smart caching strategy
✅ App-Like Features

Custom install prompts
App shortcuts (quick access to menu, contact)
Splash screen
Pull-to-refresh
5.2.7 Marketing & Analytics

✅ Analytics Integration

Google Analytics 4
Event tracking (page views, button clicks, form submissions)
Language usage tracking
User flow analysis
Conversion tracking
✅ Social Media Integration

Instagram feed embed
Facebook page plugin
WhatsApp click-to-chat button
Social sharing buttons
Open Graph optimization
✅ Email Marketing

Newsletter signup form
Mailchimp/ConvertKit integration
Popup/modal for subscriptions
Trilingual email templates
Welcome email automation
✅ Promotional Features

Banner/announcement bar
Promotional modal on homepage
Discount codes display
Time-limited offers with countdown
Seasonal campaign support
5.2.8 Advanced SEO

✅ Technical SEO

Dynamic sitemap. xml (auto-updated)
hreflang tags for multilingual SEO
Structured data (Schema.org):
Organization
LocalBusiness
Product
BreadcrumbList
Canonical URLs
Meta robots tags
✅ Performance Optimization

CDN integration (Cloudflare)
Image optimization (Cloudinary)
Font subsetting for Devanagari
Code splitting optimization
Lazy loading for all images
Preloading critical resources
ISR (Incremental Static Regeneration)
5.2.9 Enhanced Contact Features

✅ Contact Enhancements

Multiple contact forms (general, custom orders, catering)
File upload for custom order images
Phone number click-to-call
WhatsApp direct message link
Business hours with "Open Now" indicator
Multiple contact persons/departments
5.3 MVP++ Out of Scope

❌ E-commerce/online ordering (Phase 3)
❌ Payment gateway integration
❌ User accounts/authentication
❌ Shopping cart
❌ Inventory management
❌ Order tracking
❌ Delivery integration
❌ Loyalty program
❌ Customer reviews (moderated)
❌ Live chat

5.4 MVP++ User Flows

Flow 1: Discover Content via Blog

Code
1. User lands on home page
2. User scrolls to "Latest Recipes" section
3. User clicks on recipe blog post
4. User reads recipe with images
5. User sees related products
6. User clicks on product
7. User views product detail
8. User clicks WhatsApp button to order
Flow 2: Receive Push Notification

Code
1. User has website installed as PWA
2. User opts into notifications
3. Bakery publishes new product via CMS
4. System sends push notification (trilingual)
5. User receives notification on phone
6. User taps notification
7. App opens to new product page
8. User shares product via WhatsApp
Flow 3: Advanced Product Search

Code
1. User on menu page
2. User types "chocolate" in search
3. Autocomplete shows suggestions
4. User selects filter:  "Under ₹500"
5. User adds filter:  "Vegetarian"
6. Results update in real-time
7. User sorts by:  "Price:  Low to High"
8. User toggles to list view
9. User finds desired product
10. User clicks to view details
5.5 MVP++ Technical Enhancements

Component	Enhancement
Font Loading	Font subsetting to reduce Devanagari font size by 60%
Caching	Service worker strategies: cache-first for images, network-first for API
Code Splitting	Route-based + language-based splitting
Image Optimization	WebP/AVIF formats, responsive images, lazy loading
API Optimization	ISR with 60s revalidation, SWR on client
Bundle Size	Tree-shaking, dynamic imports, vendor chunking
CDN	Cloudflare for assets and API caching
5.6 MVP++ Content Requirements

Additional Content Needed

Content Type	Quantity	Languages
Products (total)	50+ items	EN + HI + MR
Blog Posts	5-10 posts	EN + HI + MR
Testimonials	10-15 reviews	EN + HI + MR
FAQ Items	15-20 Q&As	EN + HI + MR
Gallery Images	30-50 photos	N/A
Promotional Banners	3-5 banners	EN + HI + MR
6. User Stories & Acceptance Criteria

6.1 MVP User Stories

Epic 1: Browse Products

US-001: View Products as Guest

As a customer
I want to browse available bakery products
So that I can see what's available and decide what to purchase
Acceptance Criteria:

 Products display in a grid layout (3 columns desktop, 2 tablet, 1 mobile)
 Each product card shows: image, name, price
 Products load within 2 seconds
 Clicking a product opens detail page
 Featured products appear on home page
 Empty state shown if no products available
US-002: Filter Products by Category

As a customer
I want to filter products by category
So that I can quickly find the type of product I'm looking for
Acceptance Criteria:

 Category filter bar displayed above product grid
 Clicking category filters products instantly
 "All" option shows all products
 Active category visually highlighted
 Product count updates per category
 URL updates with category parameter
US-003: View Product Details

As a customer
I want to see detailed information about a product
So that I can make an informed purchase decision
Acceptance Criteria:

 Product detail page shows: name, full description, price, large image
 Breadcrumb navigation (Home > Menu > Product Name)
 "Contact Us" or "Order Now" CTA button
 Responsive layout on all devices
 Back button returns to previous page
 Meta tags for SEO and social sharing
Epic 2: Multilingual Experience

US-004: Switch Language

As a Marathi-speaking customer
I want to switch the website to Marathi
So that I can understand content in my native language
Acceptance Criteria:

 Language switcher visible in header on all pages
 Clicking "मराठी" switches to Marathi
 All UI text translates to Marathi
 Product names and descriptions display in Marathi
 URL changes from /en/* to /mr/*
 Devanagari text renders correctly
 Language preference persists across pages
 Font changes to Noto Sans Devanagari for Marathi
US-005: Default Language Detection

As a user
I want to see the website in my browser's language (if supported)
So that I don't have to manually switch languages
Acceptance Criteria:

 Browser language detected on first visit
 If browser is set to Marathi, show /mr/ version
 If unsupported language, default to English
 User can override automatic detection
 Choice persists in future visits (localStorage)
Epic 3: Contact & Inquiry

US-006: Submit Contact Form

As a potential customer
I want to send an inquiry via contact form
So that I can ask questions or place custom orders
Acceptance Criteria:

 Contact form includes: name, email, phone, message fields
 All fields validated (email format, required fields)
 Form cannot submit if validation fails
 Error messages displayed in current language
 Success message shown after submission
 Form data sent to bakery email
 Form clears after successful submission
 Loading state shown during submission
US-007: View Contact Information

As a customer
I want to easily find contact details and location
So that I can call, visit, or find directions
Acceptance Criteria:

 Contact page displays: phone, email, address, business hours
 Google Maps embedded showing bakery location
 Phone number is clickable (tel: link)
 Email is clickable (mailto: link)
 Address formatted correctly in both languages
 Business hours show current status (Open/Closed)
 Social media links displayed
Epic 4: Content Management

US-008: Add New Product (CMS User)

As a bakery staff member
I want to add new products to the website
So that customers can see our latest offerings
Acceptance Criteria:

 Login to CMS with credentials
 Navigate to Products → Create new entry
 Fill product details in English (name, description, price)
 Upload product image (max 5MB, JPG/PNG)
 Select category from dropdown
 Switch to Marathi locale
 Fill Marathi translation
 Preview product before publishing
 Publish product
 Product appears on website within 1 minute
US-009: Update Product Price (CMS User)

As a bakery staff member
I want to update product prices quickly
So that pricing is always accurate
Acceptance Criteria:

 Navigate to existing product
 Edit price field (shared across languages)
 Save changes
 Price updates on website immediately
 No need to re-translate content
US-010: Unpublish Product (CMS User)

As a bakery staff member
I want to temporarily remove products
So that out-of-stock items don't display
Acceptance Criteria:

 Toggle "Published" switch to off
 Product immediately removed from website
 Product still accessible in CMS
 Can republish by toggling back on
 No data is deleted
Epic 5: Mobile Experience

US-011: Browse on Mobile

As a mobile user
I want to easily browse products on my phone
So that I can shop on the go
Acceptance Criteria:

 Single column product layout on mobile
 Touch-friendly buttons (min 44px height)
 Hamburger menu for navigation
 Swipeable image carousels
 Fast page loads on 3G (< 5s)
 No horizontal scrolling
 Text readable without zooming
US-012: Install as App (PWA)

As a frequent customer
I want to install the website as an app
So that I can access it quickly from my home screen
Acceptance Criteria:

 Install prompt appears after 2 visits
 "Add to Home Screen" option available
 App icon displays on home screen
 App opens without browser UI
 Splash screen shows while loading
 Offline fallback page if no connection
6.2 MVP++ User Stories

Epic 6: Enhanced Discovery

US-013: Search Products

As a customer
I want to search for products by name
So that I can quickly find what I'm looking for
Acceptance Criteria:

 Search bar in header
 Autocomplete suggestions while typing
 Search works in current language
 Results show products matching query
 Highlights matching text
 "No results" message if nothing found
 Search query persists in URL
US-014: Filter by Price Range

As a budget-conscious customer
I want to filter products by price
So that I only see items within my budget
Acceptance Criteria:

 Price range slider (₹0 - ₹2000)
 Products filter in real-time
 Product count updates
 Can combine with category filter
 Reset filters button available
 Filters persist in URL
US-015: Sort Products

As a customer
I want to sort products by different criteria
So that I can find the best option for me
Acceptance Criteria:

 Sort dropdown with options:
Price: Low to High
Price: High to Low
Name: A-Z
Newest First
Most Popular
 Sorting applies immediately
 Works with active filters
 Sort preference persists during session
Epic 7: Rich Content

US-016: Read Blog Post

As a customer interested in baking
I want to read recipes and articles
So that I can learn and engage with the brand
Acceptance Criteria:

 Blog listing page shows all posts
 Post cards show: image, title, excerpt, date
 Clicking post opens full article
 Article has: title, content, images, author
 Related posts shown at bottom
 Social sharing buttons available
 Breadcrumb navigation
 SEO-optimized URLs
US-017: View Customer Testimonials

As a potential customer
I want to read reviews from other customers
So that I can trust the quality of products
Acceptance Criteria:

 Testimonials section on home page
 Shows: customer name, review text, rating (stars)
 Customer photo (optional)
 Carousel for multiple testimonials
 "Read More" link to full testimonials page
 Displays in current language
US-018: Browse Photo Gallery

As a customer
I want to see photos of products and the bakery
So that I can get a feel for the quality and atmosphere
Acceptance Criteria:

 Gallery page with grid of photos
 Filter by category (Products, Behind the Scenes, Events)
 Clicking photo opens lightbox view
 Navigation arrows in lightbox
 Close button or ESC key closes lightbox
 Responsive masonry layout
Epic 8: Advanced Engagement

US-019: Receive Push Notification

As a regular customer with PWA installed
I want to receive notifications about new products
So that I stay updated on offerings
Acceptance Criteria:

 Permission request after first app install
 Can opt-in or decline
 Notifications arrive on device
 Notification includes: title, message, icon
 Notification in user's language preference
 Clicking notification opens relevant page
 Can unsubscribe in app settings
US-020: Subscribe to Newsletter

As a customer
I want to subscribe to email updates
So that I receive promotions and news
Acceptance Criteria:

 Newsletter signup form on homepage footer
 Requires: email, optionally name
 Email validation
 Success message after subscription
 Integrates with Mailchimp/ConvertKit
 Welcome email sent automatically
 Privacy policy link provided
US-021: Share Product on WhatsApp

As a customer
I want to share a product with friends via WhatsApp
So that I can recommend it easily
Acceptance Criteria:

 WhatsApp share button on product detail page
 Clicking opens WhatsApp with pre-filled message
 Message includes: product name, price, link
 Works on mobile and desktop (WhatsApp Web)
 Message text in current language
 Link includes UTM parameters for tracking
Epic 9: Multilingual Content (Hindi)

US-022: View Website in Hindi

As a Hindi-speaking customer
I want to view the website in Hindi
So that I can understand content in my preferred language
Acceptance Criteria:

 Language switcher includes "हिन्दी" option
 Clicking switches to Hindi
 All UI and content displays in Hindi
 URL changes to /hi/*
 Hindi Devanagari font loads correctly
 SEO tags include Hindi content
 hreflang tags link all 3 language versions
7. Functional Requirements

7.1 Frontend Requirements

FR-1: Responsive Design

Priority: P0 (MVP)
Description: Website must be fully responsive across all device sizes
Breakpoints:
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
Requirements:
Single column layout on mobile
Adaptive navigation (hamburger on mobile)
Touch-friendly interactive elements (min 44x44px)
Images scale appropriately
Text remains readable without horizontal scrolling
FR-2: Internationalization

Priority: P0 (MVP: EN+MR), P0 (MVP++: +HI)
Description: Support for multiple languages with proper text rendering
Requirements:
Language detection based on browser settings
Manual language switching via UI
Language preference persistence (localStorage)
Proper Devanagari font loading
Language-specific URLs
RTL support preparation for future languages
Fallback to English if translation missing
FR-3: Navigation

Priority: P0 (MVP)
Description: Clear, accessible navigation structure
Requirements:
Persistent header with logo and menu
Navigation items: Home, Menu, About, Contact
Active page indicator
Breadcrumb navigation on detail pages
Footer with secondary links
Mobile: hamburger menu with slide-in drawer
Keyboard accessible (tab navigation)
FR-4: Product Display

Priority: P0 (MVP)
Description: Product listing and detail views
Requirements:
Grid layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
Product card: image, name, price, hover effect
Product detail: large image, full description, price, CTA
Category filtering
Featured products on home page
Lazy loading for images
"No products" empty state
FR-5: Search & Filtering (MVP++)

Priority: P1 (MVP++)
Description: Advanced product discovery
Requirements:
Search bar with autocomplete
Debounced search (300ms delay)
Filters: category, price range, dietary, allergens
Sort options: price, name, date, popularity
Real-time results update
Clear filters option
URL state persistence
FR-6: Contact Form

Priority: P0 (MVP)
Description: Functional contact form with validation
Requirements:
Fields: name, email, phone, message
Client-side validation (required fields, email format)
Server-side validation
CAPTCHA/spam protection (optional in MVP)
Success/error messages
Loading state during submission
Email notification to bakery
Form data sanitization
FR-7: Content Sections (MVP++)

Priority: P1 (MVP++)
Description: Blog, testimonials, gallery, FAQ
Requirements:
Blog: list view, detail view, rich text rendering
Testimonials: carousel, star ratings
Gallery: grid with lightbox
FAQ: accordion-style, searchable
All sections multilingual
FR-8: PWA Features

Priority: P1 (MVP: Basic), P0 (MVP++: Advanced)
Description: Progressive Web App capabilities
MVP Requirements:
App manifest
Service worker for offline fallback
Installable on mobile devices
App icons
MVP++ Requirements:
Push notifications
Offline product catalog
Background sync
Custom install prompt
App shortcuts
7.2 Backend/CMS Requirements

FR-9: Content Management

Priority: P0 (MVP)
Description: Headless CMS for content management
Requirements:
Authentication system (email/password)
Content types: Products, Categories, Site Settings, Contact Info
WYSIWYG editor for rich text
Image upload (max 5MB, JPG/PNG/WebP)
Image preview and metadata
Publish/unpublish toggle
Draft/published states
RESTful API endpoints
API authentication token
FR-10: Multilingual Content

Priority: P0 (MVP: 2 languages), P0 (MVP++: 3 languages)
Description: Multi-language content management
Requirements:
i18n plugin enabled
Default locale: English
Locales: en, mr (MVP); en, hi, mr (MVP++)
Linked translations across locales
Locale selector in CMS UI
Translation status indicator
Shared fields (price, images) across locales
Language-specific fields (text content)
FR-11: Media Management

Priority: P1 (MVP: Basic), P0 (MVP++: Advanced)
Description: Image and file management
MVP Requirements:
Upload images via drag-and-drop or file picker
Image preview in CMS
Alt text field
File size validation
MVP++ Requirements:
Folder organization
Bulk upload
Image tagging
Search media library
Image cropping tool
Automatic image optimization
FR-12: User Roles (MVP++)

Priority: P1 (MVP++)
Description: Role-based access control
Requirements:
Roles: Admin, Editor, Translator, Viewer
Permission sets per role
Admin: full access
Editor: content CRUD, no settings
Translator: only translation fields
Viewer: read-only
Audit logs of changes
FR-13: Content Scheduling (MVP++)

Priority: P2 (MVP++)
Description: Schedule content publication
Requirements:
Publish date/time field
Unpublish date/time field
Automatic publishing via cron job
Draft preview URLs
Timezone handling
FR-14: Bulk Operations (MVP++)

Priority: P2 (MVP++)
Description: Bulk content management
Requirements:
CSV import for products
CSV export for backup
Bulk publish/unpublish
Bulk category assignment
Data validation on import
7.3 Integration Requirements

FR-15: Email Service

Priority: P0 (MVP)
Description: Email delivery for contact forms
Requirements:
SMTP configuration
Email templates (HTML)
Sender verification
Delivery confirmation
Error handling and retry logic
FR-16: Analytics (MVP++)

Priority: P1 (MVP++)
Description: Website analytics tracking
Requirements:
Google Analytics 4 integration
Event tracking: page views, clicks, form submissions
Custom events: language switches, product views
E-commerce tracking (future)
Cookie consent compliance
FR-17: Social Media (MVP++)

Priority: P2 (MVP++)
Description: Social media integrations
Requirements:
Instagram feed embed (via API or embed code)
WhatsApp click-to-chat
Facebook page plugin
Social sharing buttons (WhatsApp, Facebook, Twitter)
Open Graph meta tags
Twitter Card meta tags
FR-18: Newsletter (MVP++)

Priority: P2 (MVP++)
Description: Email newsletter integration
Requirements:
Mailchimp or ConvertKit API integration
Signup form on website
Double opt-in confirmation
Unsubscribe handling
List segmentation by language
Welcome email automation
FR-19: Push Notifications (MVP++)

Priority: P1 (MVP++)
Description: Web push notifications
Requirements:
Permission request flow
Notification service (Firebase Cloud Messaging or similar)
Trigger from CMS
Notification composer (title, body, icon, link)
Language-specific notifications
Opt-in/opt-out management
Click tracking
8. Non-Functional Requirements

8.1 Performance

NFR-1: Page Load Time

MVP: First Contentful Paint < 2s, Time to Interactive < 4s
MVP++: First Contentful Paint < 1.5s, Time to Interactive < 3s
Measurement: Lighthouse score on 4G throttled connection
Target: Lighthouse Performance score ≥ 80 (MVP), ≥ 95 (MVP++)
NFR-2: Image Optimization

Requirement: All images optimized for web
Formats: WebP with JPG/PNG fallback
Compression: Maximum 85% quality
Responsive: Multiple sizes served based on viewport
Lazy loading: Images outside viewport load on scroll
NFR-3: Bundle Size

MVP: Initial JS bundle < 200KB gzipped
MVP++: Initial JS bundle < 150KB gzipped (with code splitting)
CSS: < 50KB gzipped
Fonts: Subset Devanagari fonts, < 100KB total
NFR-4: API Response Time

Requirement: API endpoints respond within 500ms (95th percentile)
Caching: Implement ISR with 60s revalidation
CDN: Serve static assets via CDN
8.2 Accessibility

NFR-5: WCAG Compliance

Standard: WCAG 2.1 Level AA
Requirements:
Semantic HTML5 elements
ARIA labels where appropriate
Keyboard navigation support (Tab, Enter, Esc)
Focus indicators visible
Color contrast ratio ≥ 4.5:1 for text
Alt text for all images
Form labels associated with inputs
Skip to main content link
NFR-6: Screen Reader Support

Requirement: Fully navigable with screen readers
Testing: Verify with NVDA (Windows), VoiceOver (Mac/iOS)
Landmarks: Proper use of header, nav, main, footer, article
NFR-7: Language Support

Requirement: Proper lang attributes on HTML elements
Font Rendering: Devanagari fonts render correctly on all browsers
Text Direction: Support for LTR (all current languages)
8.3 Security

NFR-8: HTTPS

Requirement: All traffic over HTTPS
Certificate: Valid SSL/TLS certificate
HSTS: HTTP Strict Transport Security headers
Redirect: HTTP to HTTPS automatic redirect
NFR-9: CMS Security

Authentication: Strong password requirements (min 12 chars, mixed case, numbers, symbols)
Session Management: Secure session cookies, timeout after 30 minutes of inactivity
API Security: JWT tokens for API authentication
Rate Limiting: Max 100 requests per minute per IP
CORS: Restrict API access to frontend domain only
NFR-10: Data Protection

Requirement: GDPR-compliant data handling
User Data: No tracking without consent
Forms: Data transmitted over HTTPS
Storage: Sensitive data encrypted at rest
Backup: Daily automated backups of database
Privacy Policy: Link in footer, clearly explains data usage
NFR-11: Input Validation

Requirement: All user inputs validated and sanitized
XSS Prevention: Escape user-generated content
SQL Injection: Use parameterized queries (ORM)
File Upload: Validate file types and sizes
CAPTCHA: Consider for contact form (MVP++)
8.4 Scalability

NFR-12: Traffic Handling

MVP: Support 1,000 concurrent users
MVP++: Support 5,000 concurrent users
Auto-scaling: Hosting platform should support horizontal scaling
Database: Connection pooling, query optimization
NFR-13: Content Volume

Products: Support up to 500 products without performance degradation
Blog Posts: Support up to 200 posts
Images: Media library can handle 1,000+ images
Pagination: Lists paginated (20-50 items per page)
8.5 Reliability

NFR-14: Uptime

Target: 99.5% uptime (MVP), 99.9% uptime (MVP++)
Monitoring: Uptime monitoring service (UptimeRobot, Pingdom)
Alerts: Notify team if downtime > 5 minutes
SLA: Hosting provider SLA should meet target
NFR-15: Error Handling

Requirement: Graceful error handling, no crashes
Error Pages: Custom 404, 500 pages in all languages
Logging: Server-side error logging (Sentry or similar)
User Feedback: Friendly error messages, no stack traces visible
NFR-16: Backup & Recovery

Database Backup: Daily automated backups
Retention: 30 days of backups
Recovery: Ability to restore from backup within 1 hour
Testing: Test restore process quarterly
8.6 Usability

NFR-17: Mobile Usability

Target: Google Mobile-Friendly Test pass
Touch Targets: Minimum 44x44px
Font Size: Minimum 16px for body text
Viewport: No horizontal scrolling required
Forms: Easy to fill on mobile keyboards
NFR-18: Browser Support

Desktop: Chrome (last 2), Firefox (last 2), Safari (last 2), Edge (last 2)
Mobile: Chrome Android, Safari iOS (last 2 versions each)
Progressive Enhancement: Core functionality works without JavaScript
NFR-19: Load Times on Slow Connections

3G: Page usable within 5 seconds
Optimization: Minimize render-blocking resources
Feedback: Loading indicators for async operations
8.7 Maintainability

NFR-20: Code Quality

Linting: ESLint for JavaScript/TypeScript
Formatting: Prettier for consistent code style
TypeScript: Strict mode enabled, no any types
Comments: Complex logic documented
Git Commits: Conventional commit messages (feat, fix, docs, etc.)
NFR-21: Documentation

Code: Inline documentation for components
CMS: User guide for content management
API: API documentation (Swagger/Postman collection)
Deployment: Deployment process documented
README: Clear setup instructions for developers
NFR-22: Testing (MVP++)

Unit Tests: Critical functions covered
Integration Tests: API endpoints tested
E2E Tests: Key user flows (Playwright or Cypress)
Coverage: Minimum 60% code coverage (MVP++)
9. Technical Architecture

9.1 High-Level Architecture

Code
┌─────────────────────────────────────────────────────┐
│                   CDN (Cloudflare)                  │
│              Images, CSS, JS, Fonts                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           Frontend (Next.js 14 - Vercel)            │
│  ┌──────────────────────────────────────────────┐  │
│  │  App Router (/[locale]/*)                    │  │
│  │  - SSR/SSG Pages                             │  │
│  │  - API Routes (/api/contact, etc.)           │  │
│  │  - Middleware (locale detection)             │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Components (React + TypeScript)             │  │
│  │  - Layout: Header, Footer                    │  │
│  │  - Pages: Home, Menu, Product, Contact       │  │
│  │  - Common: Button, Card, Modal               │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Styling (Tailwind CSS)                      │  │
│  │  Animations (Framer Motion)                  │  │
│  │  i18n (next-intl)                            │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │ API Calls (HTTPS)
                     ▼
┌─────────────────────────────────────────────────────┐
│        Backend/CMS (Strapi - Railway/DO)            │
│  ┌──────────────────────────────────────────────┐  │
│  │  API Layer (REST)                            │  │
│  │  - /api/products                             │  │
│  │  - /api/categories                           │  │
│  │  - /api/site-settings                        │  │
│  │  - Authentication (JWT)                      │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Admin Panel (React)                         │  │
│  │  - Content Management UI                     │  │
│  │  - Media Library                             │  │
│  │  - i18n Plugin                               │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Plugins                                     │  │
│  │  - i18n (multilingual)                       │  │
│  │  - Upload (media)                            │  │
│  │  - Users & Permissions                       │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│          Database (PostgreSQL/SQLite)               │
│  - Products Table                                   │
│  - Categories Table                                 │
│  - Site Settings Table                              │
│  - Localizations                                    │
│  - Media Files Metadata                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              Third-Party Services                    │
│  - Email (SMTP / SendGrid)                          │
│  - Analytics (Google Analytics 4)          [MVP++]  │
│  - Push Notifications (Firebase)           [MVP++]  │
│  - Newsletter (Mailchimp)                  [MVP++]  │
│  - Image CDN (Cloudinary)                  [MVP++]  │
└─────────────────────────────────────────────────────┘
9.2 Technology Stack

Frontend

Component	Technology	Version
Framework	Next.js	14.x
Language	TypeScript	5.x
UI Library	React	18.x
Styling	Tailwind CSS	3.x
Animations	Framer Motion	11.x
i18n	next-intl	3.x
Forms	React Hook Form	7.x
Validation	Zod	3.x
HTTP Client	Axios	1.x
Icons	Lucide React	Latest
PWA	next-pwa	5.x
Backend/CMS

Component	Technology	Version
CMS	Strapi	4.x
Runtime	Node.js	18.x LTS
Database	PostgreSQL	14.x (or SQLite for MVP)
API Style	REST	-
Auth	JWT	-
File Storage	Local (MVP), Cloud (MVP++)	-
Infrastructure

Component	Provider	Tier
Frontend Hosting	Vercel	Free/Hobby (MVP), Pro (MVP++)
Backend Hosting	Railway or DigitalOcean	$5-15/month
Database	Managed Postgres	Included with hosting
CDN	Cloudflare	Free (MVP++)
Domain	Namecheap/GoDaddy	$10-15/year
Email	SendGrid or SMTP	Free tier
Image CDN	Cloudinary	Free tier (MVP++)
Development Tools

Tool	Purpose
VS Code	IDE
GitHub Copilot	AI pair programming
Git	Version control
GitHub	Code repository
Prettier	Code formatting
ESLint	Code linting
Postman/Thunder Client	API testing
9.3 Data Models

Product

TypeScript
interface Product {
  id: number;
  documentId: string; // Strapi v5
  name: {
    en: string;
    mr: string;
    hi?:  string; // MVP++
  };
  description: {
    en: string;
    mr: string;
    hi?: string; // MVP++
  };
  price: number; // in rupees
  images: Image[]; // Single in MVP, multiple in MVP++
  category:  Relation<Category>;
  featured: boolean;
  allergens?:  string[]; // MVP++
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[]; // MVP++
  nutritionalInfo?: { // MVP++
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
Category

TypeScript
interface Category {
  id: number;
  documentId: string;
  name: {
    en: string;
    mr: string;
    hi?: string; // MVP++
  };
  slug: string;
  description?:  {
    en: string;
    mr: string;
    hi?: string; // MVP++
  };
  icon?: Image;
  order:  number;
  products:  Relation<Product>[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
Contact Info

TypeScript
interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  address: {
    en: string;
    mr:  string;
    hi?: string; // MVP++
  };
  hours: {
    en: string;
    mr: string;
    hi?: string; // MVP++
  };
  mapEmbedUrl:  string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    twitter?: string;
  };
}
Site Settings

TypeScript
interface SiteSettings {
  id: number;
  siteName: {
    en: string;
    mr: string;
    hi?:  string; // MVP++
  };
  tagline: {
    en: string;
    mr: string;
    hi?: string; // MVP++
  };
  logo: Image;
  favicon: Image;
  heroSection: {
    title: {
      en: string;
      mr: string;
      hi?: string; // MVP++
    };
    subtitle: {
      en: string;
      mr: string;
      hi?: string; // MVP++
    };
    backgroundImage: Image;
    ctaText: {
      en: string;
      mr: string;
      hi?: string; // MVP++
    };
    ctaLink: string;
  };
  seo: {
    metaTitle: {
      en:  string;
      mr: string;
      hi?: string; // MVP++
    };
    metaDescription: {
      en: string;
      mr: string;
      hi?: string; // MVP++
    };
    keywords: string[];
  };
}
Blog Post (MVP++)

TypeScript
interface BlogPost {
  id:  number;
  documentId: string;
  title: {
    en: string;
    mr:  string;
    hi?: string;
  };
  slug: string;
  excerpt: {
    en: string;
    mr:  string;
    hi?: string;
  };
  content: {
    en: string; // Rich text (Markdown or HTML)
    mr: string;
    hi?: string;
  };
  featuredImage: Image;
  author: string;
  tags: string[];
  relatedProducts?:  Relation<Product>[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
Testimonial (MVP++)

TypeScript
interface Testimonial {
  id: number;
  customerName: string;
  review: {
    en: string;
    mr: string;
    hi?: string;
  };
  rating: number; // 1-5
  customerPhoto?:  Image;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}
9.4 API Endpoints

Public Endpoints (No Auth Required)

Code
GET /api/products? locale=en&populate=*
GET /api/products/: id?locale=en&populate=*
GET /api/products? locale=en&filters[category][slug][$eq]=cakes
GET /api/products?locale=en&filters[featured][$eq]=true
GET /api/products?locale=en&sort=price: asc
GET /api/products? locale=en&pagination[page]=1&pagination[pageSize]=20

GET /api/categories?locale=en&populate=*
GET /api/categories/:id?locale=en&populate=products

GET /api/site-settings? populate=*
GET /api/contact-info

POST /api/contact-form
Body: { name, email, phone, message, locale }

# MVP++ only
GET /api/blog-posts?locale=en&populate=*
GET /api/blog-posts/:slug?locale=en&populate=*
GET /api/testimonials?locale=en&filters[featured][$eq]=true
GET /api/faqs?locale=en
Protected Endpoints (Auth Required)

Code
# Admin/CMS only
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
POST /api/upload (file upload)
9.5 Deployment Architecture

MVP Deployment

Code
┌─────────────────────┐
│   GitHub Repository  │
│   (main branch)      │
└──────────┬───────────┘
           │
           │ Push triggers deploy
           │
     ┌─────▼──────┐         ┌────────────────┐
     │   Vercel    │         │    Railway     │
     │  (Frontend) │◄────────┤   (Backend)    │
     │             │  API    │                │
     │  - Next.js  │  Calls  │  - Strapi CMS  │
     │  - Auto     │         │  - PostgreSQL  │
     │    Deploy   │         │  - Auto Deploy │
     └─────────────┘         └────────────────┘
           │
           │ DNS
           │
     ┌─────▼──────┐
     │   Domain    │
     │ beakey.com  │
     └─────────────┘
MVP++ Deployment

Code
┌─────────────────────┐
│   GitHub Repository  │
│   (main branch)      │
└──────────┬───────────┘
           │
           │
     ┌─────▼──────┐         ┌────────────────┐
     │   Vercel    │         │  Railway/DO    │
     │  (Frontend) │◄────────┤   (Backend)    │
     │             │         │                │
     │  - Next.js  │         │  - Strapi CMS  │
     │  - ISR      │         │  - PostgreSQL  │
     │  - Edge     │         │                │
     └─────┬───────┘         └────────────────┘
           │                         │
           │                         │
     ┌─────▼─────────────────────────▼─────┐
     │         Cloudflare CDN               │
     │  - Image optimization                │
     │  - Caching                           │
     │  - DDoS protection                   │
     └─────┬────────────────────────────────┘
           │
     ┌─────▼──────┐
     │   Domain    │
     │ beakey.com  │
     └─────────────┘

External Services: 
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Cloudinary  │  │  Firebase FCM │  │   Mailchimp   │
│   (Images)    │  │ (Push Notifs) │  │ (Newsletter)  │
└───────────────┘  └───────────────┘  └───────────────┘
10. Design Requirements

10.1 Brand Identity

Color Palette

CSS
Primary Colors:
--primary:  #FF6B6B       /* Coral Red - CTA buttons, accents */
--secondary: #FFD93D     /* Bright Yellow - highlights, badges */
--accent: #6BCF7F        /* Fresh Green - success states */

Neutral Colors:
--background: #FFF8E7    /* Cream - page background */
--text-dark: #2C3E50     /* Dark blue-gray - body text */
--text-light:  #FFFFFF    /* White - text on dark backgrounds */
--gray-100: #F7FAFC
--gray-200: #EDF2F7
--gray-600: #718096
--gray-800: #1A202C
Typography

English/Latin Script:

Headings: Playfair Display (Serif) - elegant, bakery feel
H1: 48px/56px (desktop), 32px/40px (mobile)
H2: 36px/44px (desktop), 28px/36px (mobile)
H3: 24px/32px
H4: 20px/28px
Body: Poppins (Sans-serif) - clean, readable
Regular: 16px/24px
Medium: 18px/27px (lead text)
Small: 14px/21px (captions)
Marathi/Hindi (Devanagari Script):

Font: Noto Sans Devanagari
Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
Sizing: Same as Latin script
Line Height: Increase by 10% for better readability
Logo

Format: SVG (vector) with PNG fallback
Variations:
Full logo (text + icon)
Icon only (for mobile/app icon)