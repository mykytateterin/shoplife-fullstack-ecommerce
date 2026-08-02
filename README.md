# ShopLife Monorepo

## A full-stack e-commerce monorepo platform featuring a Clean Architecture (DDD/Hexagonal) Express backend, React 19 SSR frontend, end-to-end type safety via shared Zod contracts, and pnpm workspace tooling.

---

## 1. ShopLife Server (`apps/server`)
### A high-performance RESTful API backend built with Express 5, Prisma 7, PostgreSQL, and Clean Architecture principles.

**Technologies Used:**
- TypeScript
- Express 5
- Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg`)
- PostgreSQL (`pg`)
- Jose (JWT Authentication & Session Tokens)
- Bcrypt (Password Hashing)
- Vitest (Unit & Integration Testing)
- Cookie Parser & CORS

**Architectural Patterns & Approaches Used:**
- **Clean Architecture / Ports & Adapters:** Complete decoupling of Controllers, Use Cases, Domain Models, Repository Ports, and Infrastructure Data Mappers.
- **Domain-Driven Design (DDD):** Isolated domain entities and business logic independent of frameworks or databases.
- **Database Migrations & Partial Indexes:** Scalable PostgreSQL schema with Prisma ORM, utilizing partial unique indexes for category hierarchy rules.
- **Secure Authentication Flow:** HTTP-only cookies with JWT verification and Role-Based Access Control (`USER`, `MANAGER`, `ADMIN`).
- **Centralized Exception Handling:** Domain and application exceptions mapped to standardized HTTP response payloads.

**Features:**
- User registration, authentication, and session control.
- Hierarchical category management (nested tree structures, parent-child relations, position ordering, and publishing status).
- Unique slug enforcement for root and child categories via PostgreSQL partial indexes.
- Strict payload validation powered by `@shoplife/contracts`.

---

## 2. ShopLife Client (`apps/client`)
### A modern, server-side rendered (SSR) e-commerce frontend built with React 19, React Router v8, and Zustand.

**Technologies Used:**
- React 19
- React Router v8 (SSR & File-system routing)
- Zustand (Global State Management)
- SCSS / SASS Modules (Scoped Styling)
- Motion (Framer Motion for micro-animations)
- Normalize.css
- Vite

**Architectural Patterns & Approaches Used:**
- **Feature-Driven Architecture:** Modular organization by feature domains (`auth`, `categories`) and reusable UI components.
- **Server-Side Rendering (SSR):** React Router 8 file-system routes (`flatRoutes`) optimized for initial load speed and SEO.
- **Type-Safe API Consumption:** Direct usage of `@shoplife/contracts` for request payloads and store state updates.
- **Modular SCSS Styling:** Component-level SCSS modules providing clean separation of styles without global class name pollution.

**Features:**
- User authentication interface (login/registration modals, active user session persistence).
- Dynamic navigation header featuring live category tree navigation.
- Interactive user profile and admin panel layouts.
- Dynamic page animations and responsive layout design.

---

## 3. Shared Contracts (`packages/contracts`)
### A shared package acting as the single source of truth for API contracts, DTOs, and runtime validation schemas.

**Technologies Used:**
- TypeScript
- Zod

**Architectural Patterns & Approaches Used:**
- **End-to-End Type Safety:** Uniform payload validation across both frontend and backend using shared Zod schemas.
- **DTO Type Inference:** Automatic TypeScript type generation (`z.infer`) from runtime schemas to eliminate redundant interface declarations.

**Features:**
- Zod request schemas for authentication (login, registration) and category operations (create, update, fetch).
- Standardized API response contracts ensuring consistent error and success handling across client and server.

---

## 4. Shared Tooling & Infrastructure (`packages/eslint-config`, `packages/tsconfig`)
### Centralized code quality enforcement, linting standards, and compiler configurations across all monorepo packages.

**Technologies Used:**
- ESLint 10 (Flat Config)
- TypeScript 6
- Prettier
- Husky & lint-staged

**Architectural Patterns & Approaches Used:**
- **Centralized Workspaces:** Shared ESLint flat configurations with plugins for React Hooks, TypeScript, Perfectionist sorting, and JSON formatting.
- **Unified TypeScript Configs:** Extensible base and Node-specific `tsconfig` packages.
- **Automated Pre-Commit Hooks:** Husky and lint-staged integration executing ESLint auto-fixes, Prettier formatting, and Prisma schema validation on git commits.

---

## 🛠️ Project Setup & Installation

### Prerequisites
- Node.js (v20+ recommended)
- pnpm (v9+ recommended)
- PostgreSQL database instance

### Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/mykytateterin/shoplife-fullstack-ecommerce.git
   cd shoplife
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables in `apps/server/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/shoplife?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

4. Run Prisma database migrations:
   ```bash
   pnpm --filter @shoplife/server exec prisma migrate dev
   ```

### Available Scripts

- **Development (Client & Server):**
  ```bash
  pnpm dev:client   # Start React Router SSR dev server
  pnpm dev:server   # Start Express backend with tsx watcher
  ```

- **Testing:**
  ```bash
  pnpm test:server  # Run server unit tests with Vitest
  ```

- **Code Quality & Formatting:**
  ```bash
  pnpm lint:all        # Run ESLint across all workspace apps & packages
  pnpm lint:fix:all    # Fix linting errors across workspace
  pnpm typecheck:all   # Run TypeScript type check across workspace
  pnpm format:all      # Format all files with Prettier
  ```
