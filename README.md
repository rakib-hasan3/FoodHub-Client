# 🍔 FoodHub - The Ultimate Food Delivery & Management Platform (Client)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

Welcome to the **FoodHub Client Repository**! FoodHub is a comprehensive, modern, and highly interactive food delivery and restaurant management platform. It offers dedicated portals for End Users, Food Providers (Restaurants), and Platform Administrators, all wrapped in a premium, responsive UI.

## 🔗 Important Links

- **🌍 Live Application:** [FoodHub Live](https://foodhub-client-gamma.vercel.app)
- **⚙️ Backend Repository:** [FoodHub Server](https://github.com/rakib-hasan3/FoodHub-Server)
- **👨‍💻 Developer Portfolio:** [Rakib Hasan](https://rakibhasan-dev.vercel.app)

---

## ✨ Key Features

- **Role-Based Dashboards:** Unique, secure routing and dashboards tailored for **Admins**, **Providers**, and **Users**.
- **Modern & Responsive UI:** Built with **Tailwind CSS v4** and **Shadcn UI** for a beautiful, accessible, and responsive user experience across all devices.
- **Smart AI Assistant:** Integrated AI capabilities using the Vercel AI SDK to help users discover meals and get support seamlessly.
- **Advanced Data Management:** Rich data tables with **TanStack Table** and interactive analytics charts via **Recharts**.
- **Dynamic Interactions:** Smooth page transitions and micro-animations powered by **Framer Motion**.
- **Robust State & Form Management:** Validated forms using **Zod** and robust authentication state handling.
- **Interactive Drag & Drop:** Intuitive UI elements utilizing **@dnd-kit** for advanced layout management.
- **Theming:** Full Light/Dark mode support via `next-themes`.

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js (App Router) v16+
- **Library:** React 19
- **Language:** TypeScript
- **Authentication:** Better Auth

### Styling & UI
- **CSS Framework:** Tailwind CSS v4
- **Components:** Shadcn UI, Radix UI
- **Animations:** Framer Motion, Tailwind Animate
- **Icons:** Lucide React, Tabler Icons

### Tools & Utilities
- **AI Integration:** `@ai-sdk/react`, `@ai-sdk/google`
- **Data Visualization:** Recharts
- **Tables:** `@tanstack/react-table`
- **Validation:** Zod
- **Notifications:** Sonner, React Hot Toast
- **Drag & Drop:** `@dnd-kit`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd foodhub-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure the necessary environment variables (e.g., API base URL, Auth secrets, AI SDK keys).
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   # Add other required variables
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📂 Project Structure Overview

- `src/app/`: Next.js App Router containing all pages (Admin, Provider, User routes, Auth).
- `src/components/`: Reusable UI components (Navbar, Footer, Dashboards, Shadcn UI elements).
- `src/lib/`: Utility functions and configurations.
- `src/hooks/`: Custom React hooks for state and data fetching.
- `src/types/`: TypeScript type definitions and interfaces.
- `src/context/`: React Context providers (e.g., AuthContext).

---

## 👨‍💻 Author

**Rakib Hasan**
- Portfolio: [rakibhasan-dev.vercel.app](https://rakibhasan-dev.vercel.app)
- GitHub: [@rakib-hasan3](https://github.com/rakib-hasan3)

---

> Feel free to explore the code, report issues, or submit pull requests. If you like the project, don't forget to leave a star ⭐ on the repository!
