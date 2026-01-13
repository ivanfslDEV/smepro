# SME Pro - Appointment Management Platform for Small Business Owners

A modern and efficient platform for small business owners to manage their appointments and services, built with the latest web technologies.

🌐 [Live Demo](https://smepro-lime.vercel.app/)

## 🚀 Technologies

This project is built with the following technologies:

- [Next.js 14](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- [NextAuth.js](https://next-auth.js.org/) for authentication (including Google OAuth)
- [TailwindCSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- [Zod](https://zod.dev/) for data validation
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## ✨ Features

- 📅 Real-time appointment scheduling system
- 👥 User authentication with Google
- 💼 Service and schedule management
- 📱 Responsive design
- 🔒 Secure validations with Zod

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- Google Account (for OAuth setup)
- Stripe CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ivanfslDEV/smepro.git
cd smepro
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Set up your database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

6. Start the Stripe CLI:

```bash
npm run stripe:listen
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

## 🗄️ Project Structure & System Design

The project follows a clean and modular architecture, with clear separation of concerns:

```
src/
   ├── app/                    # Next.js App Router
   │   ├── (panel)/           # Protected Routes (Auth Required)
   │   │   ├── dashboard/     # Business Dashboard
   │   │   │   ├── _actions/  # Server Actions
   │   │   │   ├── _components/ # Route-specific Components
   │   │   │   ├── _data-access/ # Data Fetching Logic
   │   │   │   └── page.tsx   # Dashboard View
   │   │   ├── plans/         # Subscription Plans
   │   │   ├── profile/       # User Profile Management
   │   │   └── services/      # Service Management
   │   ├── (public)/          # Public Routes
   │   │   ├── _components/   # Public Components
   │   │   ├── business/      # Business Public Profile
   │   │   └── page.tsx       # Landing Page
   │   ├── not-found.tsx      # Custom 404 Not Found Page
   │   └── api/               # API Routes
   │       ├── auth/          # Authentication Endpoints
   │       ├── business/      # Business Management
   │       └── schedule/      # Scheduling Endpoints
  │
  ├── components/            # Shared Components
  │   ├── ui/               # UI Components (shadcn/ui)
  │   └── session-auth.tsx  # Authentication Component
  │
  ├── lib/                  # Core Configurations
  │   ├── auth.ts          # NextAuth Configuration
  │   ├── prisma.ts        # Prisma Client Instance
  │   └── utils.ts         # Utility Functions
  │
  ├── providers/            # React Context Providers
  │   └── queryClient.tsx  # React Query Provider
  │
  ├── types/               # TypeScript Definitions
  │   └── next-auth.d.ts  # Auth Type Extensions
  │
  └── utils/               # Utility Functions
      ├── permissions/     # Permission Checks
      ├── plans/          # Subscription Logic
      └── stripe/         # Payment Integration
```

### System Design Overview

#### Authentication Flow

- Uses NextAuth.js for secure authentication
- Google OAuth integration for easy sign-in
- Session-based authentication with JWT tokens
- Role-based access control for different user types

#### Data Flow Architecture

1. **Client Layer**

   - React components in `app/` and `components/`
   - React Query for client-state management
   - Server Components for initial data loading

2. **API Layer**

   - Route Handlers in `api/`
   - Server Actions in `_actions/` for form submissions
   - Data validation using Zod schemas

3. **Service Layer**

   - Business logic in `utils/` and `lib/`
   - Permission checks and subscription management
   - Integration with external services (Stripe)

4. **Data Layer**
   - Prisma ORM for database operations
   - PostgreSQL database
   - Type-safe database queries

#### Key Design Patterns

- Feature-first folder organization
- Colocation of related code
- Separation of UI and business logic
- Server-side rendering for better SEO
- Middleware for auth protection
- Modular component architecture

## 🧪 Testing with Cypress

This project includes end-to-end tests using Cypress.

### Running Cypress Tests

1. **Interactive Mode** (Cypress Test Runner):

```bash
npx cypress open
```

This opens the Cypress GUI where you can select and run tests interactively.

2. **Headless Mode** (CI/CD):

```bash
npm run cypress:run
```

Runs all tests in headless mode, suitable for automated pipelines.

### Test Structure

Tests are located in the `cypress/` directory:

```
cypress/
├── e2e/                          # End-to-End Tests
│   ├── appointment.cy.ts        # Appointment Management Tests
│   ├── dashboard.cy.ts          # Dashboard Functionality Tests
│   ├── service.cy.ts            # Service Management Tests
│   └── spec.cy.ts               # General Specification Tests
├── fixtures/                     # Test Data
│   └── example.json
└── support/                      # Cypress Configuration & Commands
    ├── commands.ts              # Custom Cypress Commands
    ├── e2e.ts                   # E2E Configuration
    └── index.d.ts               # Type Definitions
```

### Test Coverage

- **Appointment Tests**: Scheduling, modification, and cancellation flows
- **Dashboard Tests**: User interface and functionality verification
- **Service Tests**: Service creation and management operations
- **General Tests**: Overall application behavior and workflows

### Best Practices

- Tests are written in TypeScript for type safety
- Use data fixtures for consistent test data
- Custom commands in `support/commands.ts` for reusable test utilities
- Tests run against a live development server

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## 🤝 Contributing

Contributions are always welcome! Please read the [contribution guide](CONTRIBUTING.md) first.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
