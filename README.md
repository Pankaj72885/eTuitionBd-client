# eTuitionBd - Complete Tuition Management Platform

<div align="center">

![eTuitionBd Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=eTuitionBd+Platform)

**A Modern, Full-Stack Educational Platform Connecting Students and Tutors in Bangladesh**

[![Status](https://img.shields.io/badge/Status-Live_Demo-success)](https://etuitionbd-client-production.up.railway.app/)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](.)
[![License](https://img.shields.io/badge/License-MIT-green)](.)

[Live Demo](https://etuitionbd-client-production.up.railway.app/) • [Features](#-features-breakdown) • [Tech Stack](#-technology-stack) • [Installation](#-getting-started)

</div>

---

## 📖 Overview

**eTuitionBd** is a comprehensive tuition management ecosystem designed to bridge the gap between students seeking quality education and qualified tutors looking for opportunities.

In the traditional landscape, finding a reliable tutor or a student is often a manual, disjointed process involving varying degrees of trust issues and lack of transparency. **eTuitionBd** solves this by providing a digital, verified, and secure platform where:

- **Students** can post tuition requirements and find the perfect match.
- **Tutors** can showcase their qualifications and apply for relevant jobs.
- **Admins** oversee the ecosystem to ensure quality and safety.

Built with the latest web technologies including **React 19**, **Vite 7**, and **Tailwind CSS 4**, it delivers a blazing-fast, responsive, and seamless user experience.

---

## ✨ Features Breakdown

### 🎓 For Students

- **Smart Matching**: Post detailed tuition requests specifying subject, class, location, and budget.
- **Tutor Discovery**: Browse verified top-rated tutors with filtering capabilities.
- **Secure Hiring**: Review applications, interview candidates, and hire securely via the platform.
- **Payment Management**: Make secure payments via Stripe and track transaction history.
- **Dashboard**: Centralized hub to manage ongoing tuitions, applications, and bookmarks.

### 👨‍🏫 For Tutors

- **Professional Profile**: Build a rich profile showcasing qualifications, experience, and subject expertise.
- **Job Board**: Access a real-time feed of tuition opportunities tailored to your skills.
- **Application System**: Apply to tuitions with customized proposals and expected salary.
- **Revenue Tracking**: Visual analytics and charts to track monthly earnings and successful jobs.
- **Reputation System**: Earn ratings and reviews to boost visibility.

### 🛡️ For Admins

- **Platform Oversight**: Complete control over verified users, tuition posts, and platform activity.
- **Analytics Dashboard**: Advanced charts (Recharts) visualizing revenue, user growth, and tuition trends.
- **Financial Control**: Monitor and approve transaction flows.
- **Content Moderation**: Approve or reject tuition posts to maintain community standards.

---

## 🛠️ Technology Stack

This project leverages a modern, scalable, and type-safe stack:

### Frontend

| Tech               | Version | Role                         |
| ------------------ | ------- | ---------------------------- |
| **React**          | v19.2   | Core UI Library              |
| **Vite**           | v7.3    | Next-Gen Build Tool          |
| **React Router**   | v7.11   | Client-Side Routing          |
| **TanStack Query** | v5.90   | Async State Management       |
| **Tailwind CSS**   | v4.1    | Utility-First Styling        |
| **Framer Motion**  | v12.2   | Production-Ready Animations  |
| **Shadcn UI**      | Latest  | Accessible Component Library |

### Backend

| Tech               | Version | Role                    |
| ------------------ | ------- | ----------------------- |
| **Node.js**        | Latest  | Runtime Environment     |
| **Express.js**     | v4.21   | REST API Framework      |
| **MongoDB**        | Latest  | NoSQL Database          |
| **Mongoose**       | v8.9    | ODM & Schema Validation |
| **Firebase Admin** | v13.6   | Secure Authentication   |
| **Stripe**         | v20.1   | Payment Processing      |

---

## 🧩 Challenges Faced & Technical Solutions

During development, several complex architectural challenges were encountered. Here's how they were solved:

### 1. Synchronizing Dual Authentication Systems

**Challenge**: Integrating Firebase Auth (client-side) with a custom MongoDB backend role-based system.
**Solution**: Implemented a hybrid auth flow. The client authenticates via Firebase to get an ID token. This token is sent to the backend, verified via Firebase Admin SDK, and then exchanged for a custom **JWT** that encodes the user's role (Student/Tutor/Admin). This ensures robust security while leveraging Firebase's ease of use.

### 2. Complex Role-Based Routing

**Challenge**: Efficiently directing users to their specific dashboards (Student/Tutor/Admin) upon login and preventing unauthorized access.
**Solution**: Developed a `DashboardRedirect` component that acts as a traffic controller, checking the user's role from the JWT context and automatically routing them. Combined with `RoleRoute` wrappers, this ensures airtight route protection.

### 3. Real-Time Data & State Consistency

**Challenge**: Keeping the UI in sync when a tuition status changes (e.g., from "Pending" to "Approved") without refreshing the page.
**Solution**: Leveraged **TanStack Query** (React Query) for aggressive caching and automatic background refetching. Implemented optimistic updates for actions like "Bookmarking" to make the app feel instant.

### 4. Admin Analytics Performance

**Challenge**: Generating revenue reports from thousands of transaction records without blocking the main thread.
**Solution**: Offloaded aggregation logic to MongoDB Aggregation Pipelines to process data at the database level, returning only lightweight summary data (e.g., monthly totals) to the frontend for visualization with Recharts.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18+) or **Bun**
- **MongoDB** (Local or Atlas)
- **Firebase Project**

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Pankaj72885/eTuitionBd-client.git
    git clone https://github.com/Pankaj72885/eTuitionBd-server.git
    ```

2.  **Setup Backend**

    ```bash
    cd eTuitionBd-server
    bun install
    cp .env.example .env  # Configure MONGO_URI, STRIPE_KEY, FIREBASE_CREDS
    bun run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd eTuitionBd-client
    bun install
    cp .env.example .env
    bun run dev
    ```

### Frontend Environment Variables (`.env`)

| Variable                    | Description                                         |
| --------------------------- | --------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`     | Firebase API Key                                    |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain                                |
| `VITE_FIREBASE_PROJECT_ID`  | Firebase Project ID                                 |
| `VITE_API_BASE_URL`         | Backend API URL (e.g., `http://localhost:5000/api`) |
| `VITE_STRIPE_PUBLIC_KEY`    | Stripe Publishable Key                              |

---

## 🔐 Admin Access & Demo Accounts

Use these credentials to test the different user journeys:

| Role        | Email                  | Password      | Access Level                                      |
| ----------- | ---------------------- | ------------- | ------------------------------------------------- |
| **Admin**   | `admin@etuitionbd.com` | `Admin@123`   | Full dashboard access, analytics, user management |
| **Tutor**   | `tutor@demo.com`       | `Tutor@123`   | Apply for tuitions, view revenue                  |
| **Student** | `student@demo.com`     | `Student@123` | Post tuitions, hire tutors                        |

---

## 🏗️ Project Architecture

The project follows a modular, feature-based architecture for scalability.

```
eTuitionBd/
├── eTuitionBd-server/       # REST API
│   ├── config/              # DB & Env Config
│   ├── controllers/         # Request Handlers
│   ├── models/              # Mongoose Schemas (User, Tuition, Payment)
│   ├── routes/              # API Endpoints
│   └── middleware/          # Auth & RBAC Logic
│
└── eTuitionBd-client/       # React Frontend
    ├── src/
    │   ├── api/             # Axios API Layer
    │   ├── components/      # Shared Shadcn UI Components
    │   ├── context/         # Auth & Global State
    │   ├── hooks/           # Custom React Hooks (useAuth)
    │   ├── pages/           # Public Pages (Home, Login)
    │   ├── pages-dashboard/ # Protected Role-Based Views
    │   └── routes/          # App Routes & Guards
```

---

## 🔮 Future Roadmap

- [ ] **Real-time Chat**: WebSocket-based messaging between confirmed students and tutors.
- [ ] **Video Calling**: In-app video classrooms using WebRTC/Zoom SDK.
- [ ] **AI Recommendations**: Machine learning to recommend the best tutors based on student learning style.
- [ ] **Mobile App**: React Native version for iOS and Android.

---

<div align="center">
  <b>Developed by Pankaj Kumar</b><br>
  Built with ❤️ for the Education Community
</div>
