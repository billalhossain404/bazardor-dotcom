<div align="center">

# 🛒 বাজার দর — BazarDor

### Know today's market prices. Shop with confidence.

**A Bengali-first grocery price tracking web application for Bangladesh.**  
Explore everyday essentials, follow price changes, and compare prices across local markets in one place.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-UI-149ECA?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-242424?style=for-the-badge)

**[🎨 Figma Design](https://www.figma.com/design/gTG4sGDQCDvb4EWBEekXPa/Bazardor-_-Assignment-07?node-id=0-1&t=zMAzEQBuFTqqcWDK-1)** · **Live Demo:** _Add your deployed URL_ · **GitHub:** _Add your repository URL_

</div>

---

## 📖 Overview

**BazarDor (বাজার দর)** is a modern, API-driven market price information website built with **Next.js App Router**. It helps users explore essential products—such as rice, lentils, vegetables, fish, meat, and cooking oil—without visiting multiple sources to check prices.

Visitors can browse products and categories freely. To view an individual product's detailed price breakdown and market-by-market comparison, users are asked to sign in. The application also provides account management through Better Auth.

> **Note:** Displayed prices are informational and may vary by market, location, and time.

## ✨ Key Features

- **📦 Product catalog:** Browse daily-essential products with Bengali names, category icons, units, and current prices.
- **🧭 Category-based browsing:** Navigate between product categories using dynamic `[slug]` routes.
- **📈 Price movement indicators:** Identify products with increasing or decreasing prices using directional arrows and percentage changes.
- **🏠 Market dashboard:** Explore all products, price increases, price decreases, and a scrolling price ticker.
- **🔎 Detailed product insights:** View today's price, minimum price, maximum price, average price, and a market-wise comparison table.
- **🔐 Protected product routes:** Product details are restricted to authenticated users; signed-out visitors are redirected to the sign-in page.
- **👤 Authentication:** Sign up, sign in, and sign out with Better Auth, including email/password and social authentication options where configured.
- **⚙️ Profile management:** View account information and update the user's display name.
- **🌐 Bengali-friendly interface:** Bangla product information, prices, and consistent visual styling inspired by the Figma design.
- **📱 Responsive UI patterns:** Tailwind CSS layouts designed to adapt across different screen sizes.

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | **Next.js** (App Router) |
| UI | **React** and **JavaScript (JSX)** |
| Styling | **Tailwind CSS** |
| Component library | **HeroUI** |
| Authentication | **Better Auth** |
| Database | **MongoDB** (authentication/user data) |
| Icons | **React Icons** |
| Notifications | **React Toastify** |
| Data source | **BazarDor REST API** |
| Design reference | **Figma — BazarDor Assignment 07** |

## 🧭 Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Homepage, product overview, and price highlights |
| `/[slug]` | Public | Products filtered by category |
| `/[slug]/[productId]` | **Private** | Selected product's detailed market price information |
| `/sign-in` | Public | User login |
| `/sign-up` | Public | New user registration |
| `/profile` | Authenticated | Account/profile management |

### 🔒 How the Private Route Works

1. A visitor clicks a product card on the homepage or a category page.
2. Next.js opens the product's dynamic details route: `/[slug]/[productId]`.
3. The nested `layout.jsx` validates the user's Better Auth session.
4. If no valid session is found, the visitor is redirected to `/sign-in` with a `callbackURL` pointing to the requested product.
5. After successful authentication, the visitor can return to the requested product details page.
6. Signing out ends the session and takes the user back to the homepage.

> Protecting the page prevents unauthenticated users from accessing that page. If product data itself must be private, its API/server endpoint must also enforce authorization.

## 📁 Project Structure

```text
app/
├── (auth)/
│   ├── profile/             # Profile and account features
│   ├── sign-in/             # Sign-in page
│   └── sign-up/             # Registration page
├── [slug]/
│   ├── [productId]/
│   │   ├── layout.jsx       # Private-route session guard
│   │   └── page.jsx         # Product details and market table
│   └── page.jsx             # Category products
├── api/                     # API routes (including auth handling)
├── globals.css
├── layout.js
└── page.js                  # Homepage

components/
├── products/
│   ├── AllProducts.jsx
│   ├── DecreasePrice.jsx
│   └── IncreasePrice.jsx
├── Banner.jsx
├── Footer.jsx
├── Header.jsx
├── Marquee.jsx
└── Navbar.jsx

lib/                         # Authentication configuration and helpers
```

## 🔌 API Integration

Product and category information is retrieved from the assignment's BazarDor API.

**Primary API base URL:**

```text
https://api.api-store.workers.dev/api/bazardor
```

**Alternative API base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

Common endpoints:

| Endpoint | Description |
| --- | --- |
| `GET /products` | Retrieve all products |
| `GET /products?category=chal` | Retrieve products for a selected category |
| `GET /products/:id` | Retrieve an individual product |
| `GET /categories` | Retrieve available categories |
| `GET /categories/:slug` | Retrieve a specific category |

The product details view uses the selected product's data to display price summaries and market-level minimum, maximum, and average prices.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Access to a MongoDB database for authentication data
- OAuth credentials if Google/GitHub sign-in is enabled

### 1. Clone your repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create an `.env` file in the project root and provide the values expected by your Better Auth/database configuration.

Typical settings may include the following (**confirm the exact variable names in your project's `lib` configuration**):

```dotenv
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

# If social sign-in is configured:
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> **Security:** Never commit `.env`, `.env.local`, database connection strings, client secrets, or other credentials to GitHub. Ensure your environment files are ignored by Git.

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

## ☁️ Deployment

You can deploy the Next.js application to **Vercel** or another compatible hosting provider.

Before deploying:

1. Add the same required authentication/database environment variables to the hosting platform.
2. Set your application's production URL in the Better Auth configuration and any OAuth provider settings.
3. Verify sign-in, sign-out, profile updates, and protected product routes on the deployed site.
4. Test direct navigation and browser refresh on dynamic category and product URLs.

## 🎨 UI/UX Reference

The interface is inspired by the **[BazarDor — Assignment 07 Figma design](https://www.figma.com/design/gTG4sGDQCDvb4EWBEekXPa/Bazardor-_-Assignment-07?node-id=0-1&t=zMAzEQBuFTqqcWDK-1)** and uses a light, green-accented visual language with Bengali content and compact product cards.

## 📌 Project Context

This project was developed as a **frontend/full-stack learning assignment**, focusing on dynamic routing, reusable UI components, REST API integration, authentication, protected pages, and practical account management in Next.js.

---

<div align="center">

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

*Built with Next.js, React, Tailwind CSS, and Better Auth.*

</div>
