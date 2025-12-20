# eTuitionBd - Client Application

<div align="center">
  <h3>🎓 A Modern Tuition Management Platform for Bangladesh</h3>
  <p>Connecting students with qualified, verified tutors across Bangladesh</p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://etuitionbd-client-production.up.railway.app/)
  [![Server Repo](https://img.shields.io/badge/Server-Repository-blue?style=for-the-badge)](https://github.com/Pankaj72885/eTuitionBd-server)
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [User Roles & Permissions](#user-roles--permissions)
- [Design System](#design-system)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**eTuitionBd** is a full-stack tuition management platform designed to streamline the process of connecting students with qualified tutors in Bangladesh. The platform provides a transparent, secure, and efficient way to post tuition requirements, browse opportunities, manage applications, and handle payments.

### Key Highlights

- 🔐 **Secure Authentication** - Firebase Authentication with Google Sign-In support
- 💳 **Integrated Payments** - Stripe payment integration for secure transactions
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark mode support
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - React Query for efficient data fetching and caching
- 🔍 **Advanced Search** - Filter and search tuitions by subject, location, and more

---

## ✨ Features

### For Students

- ✅ Post tuition requirements with detailed specifications
- ✅ Review and manage tutor applications
- ✅ Secure payment processing via Stripe
- ✅ Track ongoing tuitions and payment history
- ✅ Bookmark favorite tutors
- ✅ Rate and review tutors after completion

### For Tutors

- ✅ Browse available tuition opportunities
- ✅ Apply to tuitions with qualifications and expected salary
- ✅ Manage application status
- ✅ Track ongoing tuitions and revenue
- ✅ Build and showcase public tutor profile
- ✅ View earnings analytics and history

### For Admins

- ✅ Comprehensive user management
- ✅ Approve/reject tuition posts
- ✅ Monitor platform analytics and earnings
- ✅ Manage user roles and verification status
- ✅ View transaction reports and statistics

---

## 🛠 Tech Stack

### Core Technologies

- **React 19** - Latest React with modern features
- **Vite 7** - Next-generation frontend tooling
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Bun** - Fast JavaScript runtime and package manager

### UI Libraries & Components

- **DaisyUI** - Tailwind CSS component library
- **Shadcn UI** - Re-usable component collection
- **Framer Motion** - Animation library
- **Headless UI** - Unstyled, accessible UI components
- **Radix UI** - Low-level UI primitives
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Lucide React** - Icon library

### State Management & Data Fetching

- **TanStack Query (React Query)** - Powerful data synchronization
- **Axios** - HTTP client for API requests
- **React Hook Form** - Performant form validation

### Authentication & Payments

- **Firebase** - Authentication and user management
- **Stripe** - Payment processing (via backend)

### Charts & Visualization

- **Recharts** - Composable charting library

### Utilities

- **date-fns** - Modern JavaScript date utility library
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind CSS classes

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (v1.3.5 or higher) - [Install Bun](https://bun.sh)
- **Node.js** (v18 or higher) - Alternative to Bun
- **Git** - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pankaj72885/eTuitionBd-client.git
   cd eTuitionBd-client
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api

   # Stripe (Public Key)
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Start the development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
eTuitionBd-client/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service layer
│   │   ├── auth.api.js
│   │   ├── tuitions.api.js
│   │   ├── applications.api.js
│   │   ├── payments.api.js
│   │   └── users.api.js
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   │   ├── common/       # Shared components (Navbar, Footer, etc.)
│   │   ├── dashboard/    # Dashboard-specific components
│   │   └── ui/           # UI primitives (Button, Card, etc.)
│   ├── config/           # Configuration files
│   │   └── firebase.js
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── FirebaseAuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useTheme.js
│   │   └── useUser.js
│   ├── layouts/          # Layout components
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── lib/              # Utility libraries
│   │   └── utils.js
│   ├── pages/            # Page components
│   │   ├── home/
│   │   ├── auth/
│   │   ├── Tuitions/
│   │   ├── Tutors/
│   │   ├── About/
│   │   ├── Contact/
│   │   └── Error/
│   ├── pages-dashboard/  # Dashboard pages
│   │   ├── student/
│   │   ├── tutor/
│   │   └── admin/
│   ├── routes/           # Route configuration
│   │   ├── appRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── RoleRoute.jsx
│   ├── utils/            # Utility functions
│   ├── index.css         # Global styles & Tailwind config
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── .gitignore
├── bun.lock
├── components.json       # Shadcn UI configuration
├── index.html
├── jsconfig.json
├── package.json
├── README.md
└── vite.config.js        # Vite configuration
```

---

## 🔐 Environment Variables

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key             | Yes      |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | Yes      |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID          | Yes      |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | Yes      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes      |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID              | Yes      |
| `VITE_API_BASE_URL`                 | Backend API base URL         | Yes      |
| `VITE_STRIPE_PUBLIC_KEY`            | Stripe publishable key       | Yes      |

---

## 📜 Available Scripts

```bash
# Development
bun run dev          # Start development server with Vite
npm run dev          # Alternative with npm

# Build
bun run build        # Build for production
npm run build        # Alternative with npm

# Preview
bun run preview      # Preview production build locally
npm run preview      # Alternative with npm

# Linting
bun run lint         # Run ESLint
npm run lint         # Alternative with npm

# Production (for deployment)
bun run start        # Serve production build
npm run start        # Alternative with npm
```

---

## 👥 User Roles & Permissions

### Student

- Post and manage tuition requests
- Review tutor applications
- Approve tutors via payment
- Track ongoing tuitions
- Manage bookmarks and reviews

### Tutor

- Browse available tuitions
- Apply to tuitions
- Manage applications
- Track ongoing tuitions
- View revenue analytics

### Admin

- Manage all users
- Approve/reject tuition posts
- View platform analytics
- Monitor transactions
- Manage user roles and verification

---

## 🎨 Design System

### Color Palette

#### Light Mode

- **Primary**: `#4F46E5` (Indigo-600)
- **Primary Dark**: `#3730A3`
- **Primary Light**: `#E0E7FF`
- **Background**: `#F9FAFB`
- **Surface**: `#FFFFFF`
- **Text Primary**: `#111827`
- **Text Secondary**: `#4B5563`

#### Dark Mode

- **Primary**: `#818CF8` (Indigo-400)
- **Background**: `#030712` (Gray-950)
- **Surface**: `#1F2937` (Gray-800)
- **Text Primary**: `#F9FAFB`
- **Text Secondary**: `#D1D5DB`

### Typography

- **Font Family**: Inter, Manrope, sans-serif
- **Base Size**: 16px
- **Headings**: Bold, responsive sizing
- **Body**: Regular weight, optimized line height

### Components

- **Buttons**: Primary, Outline, Ghost variants
- **Cards**: Elevated with hover effects
- **Forms**: Clean, accessible inputs
- **Badges**: Status indicators with semantic colors
- **Modals**: Centered, backdrop blur

---

## 📸 Screenshots

### Home Page

![Home Page](./screenshots/home.png)

### Tuitions Listing

![Tuitions](./screenshots/tuitions.png)

### Student Dashboard

![Student Dashboard](./screenshots/student-dashboard.png)

### Tutor Dashboard

![Tutor Dashboard](./screenshots/tutor-dashboard.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 🔗 Related Links

- **Live Application**: [https://etuitionbd-client-production.up.railway.app/](https://etuitionbd-client-production.up.railway.app/)
- **Server Repository**: [https://github.com/Pankaj72885/eTuitionBd-server](https://github.com/Pankaj72885/eTuitionBd-server)
- **Client Repository**: [https://github.com/Pankaj72885/eTuitionBd-client](https://github.com/Pankaj72885/eTuitionBd-client)

---

## 🧪 Test Credentials

### Admin Account

- **Email**: admin@etuitionbd.com
- **Password**: Admin@123

### Student Account (Demo)

- **Email**: student@demo.com
- **Password**: Student@123

### Tutor Account (Demo)

- **Email**: tutor@demo.com
- **Password**: Tutor@123

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pankaj Kumar**

- GitHub: [@Pankaj72885](https://github.com/Pankaj72885)
- Email: contact@etuitionbd.com

---

## 🙏 Acknowledgments

- Firebase for authentication services
- Stripe for payment processing
- Tailwind CSS for the amazing utility-first framework
- React team for the incredible library
- All open-source contributors

---

<div align="center">
  <p>Made with ❤️ for the education community in Bangladesh</p>
  <p>© 2025 eTuitionBd. All rights reserved.</p>
</div>
