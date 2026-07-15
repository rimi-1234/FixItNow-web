# FixItNow Frontend Brain

> **Primary implementation prompt for an AI coding agent**
>
> Build the complete FixItNow frontend as a production-quality, fully responsive Next.js + TypeScript application. Treat this file as the architectural, product, UI/UX, API-integration, validation, animation, accessibility, and quality source of truth. Do not reduce it to a generic dashboard template.

**Project:** FixItNow — “Your Trusted Home Service Platform”  
**Frontend:** Next.js App Router + TypeScript  
**Existing backend:** Express + PostgreSQL + Prisma  
**Backend source handoff:** The user will provide the exact local backend repository path immediately after supplying this file and `frontend-todo.md` to the coding agent.  
**Backend path placeholder:** `<FIXITNOW_BACKEND_PATH_PROVIDED_BY_USER>`

---

## 1. Agent Role and Operating Principles

Act simultaneously as:

1. A senior frontend architect experienced with large Next.js applications.
2. A senior product designer and UI/UX designer.
3. A security-aware API integration engineer.
4. An accessibility and performance specialist.
5. A pragmatic technical lead who favors clear boundaries over unnecessary abstraction.

The result must feel intentionally designed for a real home-services marketplace, not generated from a generic admin template.

### Non-negotiable behavior

- Wait for the user’s explicit local backend repository path, then inspect that source before connecting real screens.
- Treat the accessible backend source code, Prisma schema, validators, tests, and actual local API responses as the contract evidence.
- Do not invent working backend capabilities that are absent from the API.
- Do not place `fetch`, Axios, or any raw HTTP call inside pages, components, form components, or Zustand stores.
- Keep all network logic in one infrastructure/service layer.
- Keep server state in TanStack Query or Server Components, not Zustand.
- Keep access tokens out of `localStorage` and `sessionStorage`.
- Keep authorization authoritative on the backend. Frontend guards improve UX but never replace backend authorization.
- Validate untrusted API responses at runtime.
- Make every page responsive, keyboard accessible, dark-mode complete, and visually coherent.
- Implement meaningful loading, empty, error, success, disabled, and offline/retry states.
- Never hide incomplete behavior behind fake data in production mode.
- Do not use excessive cards, gradients, glassmorphism, floating blobs, pill-shaped controls, or square icon backgrounds.
- Use animation to improve hierarchy and feedback. Do not animate every element.
- Respect `prefers-reduced-motion`.

---

## 2. API Analysis Integrity and Source-of-Truth Rules

### 2.1 What is verified about the FixItNow domain

The matching FixItNow project specification defines a home-services marketplace with three fixed roles:

- **Customer:** browse services, book technicians, track bookings, pay, review, and manage profile.
- **Technician:** create a service profile, define skills/pricing/availability, receive bookings, accept or decline work, and update job status.
- **Admin:** manage users, bookings, and service categories.

The expected domain includes:

- Users
- Technician profiles
- Categories
- Services
- Availability slots
- Bookings
- Payments
- Reviews

The expected booking lifecycle is:

```text
REQUESTED
  ├── DECLINED
  └── ACCEPTED
        └── PAID
              └── IN_PROGRESS
                    └── COMPLETED
```

A customer may cancel before the booking reaches `IN_PROGRESS`, subject to the actual backend policy.

### 2.2 Local backend path handoff protocol

The user will send an explicit backend repository path after these Markdown reference files. Do not ask for or depend on an API-documentation link.

Accept paths such as:

```text
D:\Projects\FixItNow\backend
C:\Users\name\Desktop\fixitnow-server
/home/name/projects/fixitnow/backend
/Users/name/Projects/fixitnow-server
../fixitnow-backend
```

The path is usable only when the coding agent has filesystem access to that location. Resolve the path exactly as supplied and locate the repository root by identifying files such as `package.json`, `prisma/schema.prisma`, `src`, or the server entry point.

Before implementing the frontend, inspect the backend read-only unless the user separately authorizes backend changes. At minimum inspect:

```text
package.json
prisma/schema.prisma
prisma/migrations/
prisma/seed.* or seed scripts
src/server.*
src/app.*
src/index.*
src/routes/ and route-registration files
src/modules/ or feature folders
controllers
services/use-cases
validators/Zod/Joi schemas
authentication and authorization middleware
error middleware and response helpers
configuration and CORS/cookie setup
.env.example or documented environment-variable names
tests/integration tests/fixtures
README and API-related documentation
```

Do not recursively waste time reading generated or irrelevant directories such as `node_modules`, `.git`, `dist`, `build`, coverage output, logs, uploaded files, or caches.

Do not read, reproduce, commit, log, or expose secret values from `.env`, private keys, database URLs, JWT secrets, payment secrets, or provider credentials. Environment-variable **names** and `.env.example` defaults may be documented. If the local server must run, use the existing safe development/test setup without printing secrets.

The absolute backend path is machine-specific. Do not hard-code it into frontend source or commit it. It may be recorded temporarily in an ignored local note or supplied through a local-only variable such as `FIXITNOW_BACKEND_PATH`.

Contract evidence priority:

1. Successful local integration behavior and safe representative responses.
2. Registered Express routes plus request validators and authorization middleware.
3. Controllers/services/use-cases and response helpers.
4. Prisma schema, migrations, and seed data.
5. Backend integration/unit tests.
6. README or comments.

If evidence conflicts, document the discrepancy instead of guessing. Do **not** pretend that baseline endpoints are exact before the backend source has been inspected.

### 2.3 Contract audit must happen before feature wiring

Create an internal `docs/api-contract.md` or `src/contracts/api-contract.snapshot.md` while implementing. For every endpoint record:

| Field | Required information |
|---|---|
| Name | Human-readable operation |
| Method/path | Exact method and path |
| Access | Public, Customer, Technician, Admin, or shared authenticated |
| Authentication | Cookie, Bearer token, or other |
| Path params | Names and formats |
| Query params | Filters, pagination, sorting, defaults |
| Request body | Exact fields, optionality, enums |
| Success response | Status code and exact envelope |
| Error responses | Status codes and `errorDetails` shape |
| Pagination | Page/limit or cursor schema |
| Side effects | Related resources affected |
| UI consumers | Screens/hooks using it |
| Cache invalidation | Query keys to invalidate |
| Notes | Inconsistency, ambiguity, workaround |

### 2.4 Baseline endpoint inventory to reconcile against the local server source

These are expected from the project brief, but the registered backend routes, validators, authorization middleware, and verified local responses win when names or behavior differ.

#### Authentication

| Method | Baseline path | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register Customer or Technician |
| POST | `/api/auth/login` | Authenticate and return/create session |
| GET | `/api/auth/me` | Return current authenticated user |

Also check for logout, refresh-token, forgot-password, reset-password, email verification, profile update, and password change endpoints. Do not show those UI flows as functional unless endpoints exist.

#### Public discovery

| Method | Baseline path | Purpose |
|---|---|---|
| GET | `/api/services` | List/filter services |
| GET | `/api/technicians` | List/filter technicians |
| GET | `/api/technicians/:id` | Technician detail and reviews |
| GET | `/api/categories` | Service categories |

#### Bookings

| Method | Baseline path | Purpose |
|---|---|---|
| POST | `/api/bookings` | Customer creates booking |
| GET | `/api/bookings` | Current user’s bookings |
| GET | `/api/bookings/:id` | Booking detail |

Inspect the actual collection for customer cancellation, technician status updates, pagination, date filters, and admin-specific booking endpoints.

#### Payments

| Method | Baseline path | Purpose |
|---|---|---|
| POST | `/api/payments/create` | Create Stripe/SSLCommerz payment session/intent |
| POST | `/api/payments/confirm` | Verify callback/webhook result if client-facing |
| GET | `/api/payments` | Payment history |
| GET | `/api/payments/:id` | Payment detail |

Payment amounts and payment status must never be trusted from editable client state. The server must derive or verify them from the booking.

#### Technician management

| Method | Baseline path | Purpose |
|---|---|---|
| PUT | `/api/technician/profile` | Update technician profile |
| PUT | `/api/technician/availability` | Update availability |
| GET | `/api/technician/bookings` | Technician booking queue |
| PATCH | `/api/technician/bookings/:id` | Accept, decline, start, or complete |

Inspect whether services are managed through separate endpoints.

#### Reviews

| Method | Baseline path | Purpose |
|---|---|---|
| POST | `/api/reviews` | Create review after completion |

Inspect for update/delete review or public review-list endpoints.

#### Admin

| Method | Baseline path | Purpose |
|---|---|---|
| GET | `/api/admin/users` | List users |
| PATCH | `/api/admin/users/:id` | Ban/unban or status update |
| GET | `/api/admin/bookings` | List all bookings |
| GET | `/api/admin/categories` | List categories |
| POST | `/api/admin/categories` | Create category |

Inspect for category update/delete, payment administration, dashboard metrics, review moderation, and service moderation. Only expose pages/actions backed by real endpoints.

### 2.5 Required backend inspection report

Before writing feature UI, produce a concise internal report in `docs/backend-inspection.md` containing:

- repository layout and backend entry point
- Express app/router registration chain
- API base prefix and local port configuration
- authentication transport and session/token lifecycle
- role and permission middleware
- exact endpoint inventory
- validator/request schemas
- response-envelope and error-envelope helpers
- Prisma entities, relations, enums, and important uniqueness constraints
- booking and payment state transitions
- pagination/filter/sort conventions
- upload/static-file behavior
- CORS, cookies, CSRF implications, and trusted origins
- test commands and available fixtures
- unsupported frontend-desired capabilities
- backend commit hash when the repository uses Git

Do not include secret values or the user’s absolute local path in committed documentation.

### 2.6 API mismatch policy

When the API differs from the desired UI:

1. Keep backend DTOs isolated in `src/contracts/api`.
2. Normalize DTOs through mappers.
3. Expose stable frontend domain models to UI code.
4. Add a documented adapter or graceful limitation.
5. Do not scatter backend naming quirks across components.
6. Do not silently swallow missing fields.
7. Record assumptions in `docs/assumptions.md`.
8. Continue building usable screens with disabled or hidden unsupported actions rather than fabricating successful operations.

---

## 3. Product Model

### 3.1 Roles

Use uppercase internal role constants:

```ts
export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN",
} as const;
```

If the backend uses lowercase or alternative names, normalize them in a user mapper.

### 3.2 Core domain models

The exact fields must come from the inspected backend source and verified local responses, but the UI should normalize toward these concepts.

```ts
type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
type UserStatus = "ACTIVE" | "BANNED" | "SUSPENDED" | "PENDING";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  status?: UserStatus;
  address?: Address | null;
  createdAt?: string;
  updatedAt?: string;
}

interface TechnicianProfile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  skills: string[];
  experienceYears?: number;
  serviceArea?: string;
  basePrice?: number;
  currency?: string;
  averageRating?: number;
  reviewCount?: number;
  completedJobs?: number;
  isAvailable?: boolean;
  user: User;
  services?: Service[];
  availability?: AvailabilitySlot[];
}

interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  imageUrl?: string | null;
  iconName?: string | null;
  isActive?: boolean;
}

interface Service {
  id: string;
  technicianId?: string;
  categoryId: string;
  title: string;
  description?: string;
  price: number;
  pricingUnit?: "FIXED" | "HOURLY" | "STARTING_AT";
  durationMinutes?: number;
  location?: string;
  imageUrl?: string | null;
  isActive?: boolean;
  category?: Category;
  technician?: TechnicianProfile;
}

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId?: string;
  categoryId?: string;
  scheduledAt: string;
  address: Address;
  description?: string;
  status: BookingStatus;
  quotedAmount?: number;
  currency?: string;
  customer?: User;
  technician?: TechnicianProfile;
  service?: Service;
  payment?: Payment | null;
  review?: Review | null;
  createdAt: string;
  updatedAt?: string;
}

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "REFUNDED";
type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

interface Payment {
  id: string;
  bookingId: string;
  transactionId?: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt?: string | null;
  createdAt: string;
}

interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string | null;
  customer?: Pick<User, "id" | "name" | "avatarUrl">;
  createdAt: string;
}
```

### 3.3 Business policy module

Centralize UI policy helpers in `src/domain/policies`. Never duplicate status checks in JSX.

Examples:

```ts
canCustomerCancel(booking)
canCustomerPay(booking)
canCustomerReview(booking)
canTechnicianAccept(booking)
canTechnicianDecline(booking)
canTechnicianStart(booking)
canTechnicianComplete(booking)
getAllowedTechnicianTransitions(booking)
getBookingStatusPresentation(status)
```

These helpers improve consistency, but the backend response remains authoritative. A visible action can still fail with `403` or `409`; handle that gracefully.

### 3.4 Role permission matrix

| Capability | Public | Customer | Technician | Admin |
|---|---:|---:|---:|---:|
| Browse categories/services | Yes | Yes | Yes | Yes |
| View technician profiles | Yes | Yes | Yes | Yes |
| Create booking | No | Yes | No | No |
| View own bookings | No | Yes | Yes | No |
| Cancel own booking | No | Policy | No | No |
| Pay accepted booking | No | Yes | No | No |
| Review completed booking | No | Yes | No | No |
| Edit technician profile | No | No | Own | Admin only if API supports |
| Set availability | No | No | Own | No |
| Accept/decline jobs | No | No | Own | No |
| Start/complete jobs | No | No | Own | No |
| View all users | No | No | No | Yes |
| Ban/unban user | No | No | No | Yes |
| View all bookings | No | No | No | Yes |
| Manage categories | No | No | No | Yes |

---

## 4. Information Architecture and Routes

Use the App Router and route groups to separate marketing, auth, and protected dashboard compositions.

```text
/
├── services
│   ├── page
│   └── [slug-or-id]
├── technicians
│   ├── page
│   └── [id]
├── how-it-works
├── about
├── contact
├── privacy
├── terms
├── login
├── register
├── forgot-password           # only when backend supports it
├── reset-password            # only when backend supports it
├── payment
│   ├── success
│   ├── failed
│   └── cancel
└── dashboard
    ├── page                  # role-aware redirect
    ├── customer
    │   ├── page
    │   ├── bookings
    │   │   ├── page
    │   │   └── [id]
    │   ├── payments
    │   ├── reviews
    │   └── profile
    ├── technician
    │   ├── page
    │   ├── profile
    │   ├── services
    │   ├── availability
    │   ├── bookings
    │   │   ├── page
    │   │   └── [id]
    │   ├── reviews
    │   └── profile-settings
    └── admin
        ├── page
        ├── users
        │   └── [id]          # only if detail endpoint/data exists
        ├── bookings
        │   └── [id]
        ├── categories
        ├── payments          # only if API supports admin payments
        └── settings          # only if API supports platform settings
```

### Route behavior

- `/dashboard` resolves the current user and redirects to the role home.
- Authenticated users visiting `/login` or `/register` should be redirected to their dashboard unless a safe explicit sign-out flow is in progress.
- Unauthorized role paths render a purposeful `403` page or redirect to the correct role home with a non-alarming toast.
- Preserve a sanitized `returnTo` parameter for login.
- Never allow an external URL in `returnTo`.
- Public technician/service detail pages should be shareable and SEO-friendly.
- Protected dashboard pages should be `noindex`.

---

## 5. Frontend Architecture

### 5.1 Architecture style

Use a pragmatic feature-first clean architecture:

```text
Route composition
      ↓
Feature UI and feature hooks
      ↓
Application/query orchestration
      ↓
Domain services
      ↓
Single HTTP infrastructure
      ↓
Express API
```

### 5.2 Dependency rules

1. `app/` composes screens and layouts. It does not contain reusable domain logic.
2. `features/` contains feature-specific components, forms, hooks, query options, and mutation hooks.
3. `services/api/` contains pure asynchronous API functions. It imports no React code.
4. `services/http/` is the only layer allowed to use raw `fetch`.
5. `contracts/api/` contains raw DTO schemas matching backend data.
6. `domain/` contains normalized frontend models, enums, policies, and mappers’ targets.
7. `components/ui/` contains reusable design-system primitives.
8. `state/` contains small UI/workflow stores only.
9. Pages and components never call URLs directly.
10. Query hooks never manually build inconsistent URL strings; they call services.
11. Service functions never show toast messages, redirect, or mutate UI state.
12. Mappers prevent backend DTO naming from leaking into the UI.

### 5.3 Recommended project tree

```text
fixitnow-frontend/
├── public/
│   ├── brand/
│   │   ├── fixitnow-logo.svg
│   │   ├── fixitnow-mark.svg
│   │   ├── fixitnow-logo-dark.svg
│   │   ├── fixitnow-loader.json
│   │   └── favicon.svg
│   ├── images/
│   │   ├── landing/
│   │   ├── categories/
│   │   └── placeholders/
│   └── manifest.webmanifest
├── docs/
│   ├── api-contract.md
│   ├── assumptions.md
│   ├── design-decisions.md
│   └── test-matrix.md
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── services/
│   │   │   ├── technicians/
│   │   │   ├── how-it-works/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx
│   │   │       ├── loading.tsx
│   │   │       ├── error.tsx
│   │   │       ├── page.tsx
│   │   │       ├── customer/
│   │   │       ├── technician/
│   │   │       └── admin/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── session/route.ts
│   │   │   └── backend/[...path]/route.ts   # only for strict BFF mode
│   │   ├── global-error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── feedback/
│   │   ├── data-display/
│   │   ├── forms/
│   │   └── brand/
│   ├── config/
│   │   ├── env.ts
│   │   ├── routes.ts
│   │   ├── navigation.ts
│   │   └── site.ts
│   ├── contracts/
│   │   └── api/
│   │       ├── common.contract.ts
│   │       ├── auth.contract.ts
│   │       ├── user.contract.ts
│   │       ├── category.contract.ts
│   │       ├── service.contract.ts
│   │       ├── technician.contract.ts
│   │       ├── booking.contract.ts
│   │       ├── payment.contract.ts
│   │       └── review.contract.ts
│   ├── domain/
│   │   ├── models/
│   │   ├── enums/
│   │   ├── mappers/
│   │   ├── policies/
│   │   └── formatters/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── forms/
│   │   │   ├── schemas/
│   │   │   ├── queries.ts
│   │   │   ├── mutations.ts
│   │   │   └── hooks.ts
│   │   ├── categories/
│   │   ├── services/
│   │   ├── technicians/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── reviews/
│   │   ├── customer-dashboard/
│   │   ├── technician-dashboard/
│   │   └── admin-dashboard/
│   ├── services/
│   │   ├── http/
│   │   │   ├── http-client.ts
│   │   │   ├── api-error.ts
│   │   │   ├── response-normalizer.ts
│   │   │   ├── browser-client.ts
│   │   │   └── server-client.ts
│   │   └── api/
│   │       ├── auth.service.ts
│   │       ├── users.service.ts
│   │       ├── categories.service.ts
│   │       ├── services.service.ts
│   │       ├── technicians.service.ts
│   │       ├── bookings.service.ts
│   │       ├── payments.service.ts
│   │       ├── reviews.service.ts
│   │       └── admin.service.ts
│   ├── lib/
│   │   ├── auth/
│   │   ├── query/
│   │   ├── dates/
│   │   ├── validation/
│   │   ├── analytics/
│   │   ├── utils.ts
│   │   └── cn.ts
│   ├── hooks/
│   ├── state/
│   │   ├── use-dashboard-ui-store.ts
│   │   ├── use-booking-draft-store.ts
│   │   └── use-search-ui-store.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── utilities.css
│   ├── test/
│   │   ├── factories/
│   │   ├── fixtures/
│   │   ├── mocks/
│   │   └── setup.ts
│   └── proxy.ts
├── e2e/
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 5.4 Avoid barrel-file abuse

Use small public `index.ts` files only at feature boundaries. Do not create deeply recursive barrel exports that cause circular imports or poor tree-shaking.

### 5.5 TypeScript rules

- Enable strict mode.
- Avoid `any`.
- Use `unknown` for untrusted data.
- Infer form types from Zod schemas.
- Infer API DTO types from runtime schemas where practical.
- Use discriminated unions for status-dependent UI.
- Never use non-null assertions to silence API uncertainty.
- Enable no-unchecked indexed access when the codebase is ready.
- Keep enums as string unions or `as const` objects unless generated types require otherwise.

---

## 6. Recommended Technology Decisions

Use latest stable, mutually compatible releases. Avoid experimental Next.js features in production unless there is a strong documented need.

### Core

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- CSS variables and Tailwind theme variables
- pnpm

### UI foundation

- shadcn/ui as editable source components, not as a visual identity
- Radix primitives for accessible complex controls
- Lucide React for icons
- Sonner for toasts
- Recharts only for useful admin/technician analytics
- `date-fns` for date formatting
- A mature calendar/date picker compatible with the chosen shadcn version

### Data, forms, and state

- TanStack Query v5 for client-side server state
- Zustand for minimal cross-component UI/workflow state
- React Hook Form for forms
- Zod v4 for input, environment, and API response validation
- `@hookform/resolvers`

### Motion

- Motion for React (`motion/react`, formerly Framer Motion) for normal UI animation
- GSAP + ScrollTrigger only for a small number of cinematic landing-page sequences
- Lenis only on the marketing site when it provides real value
- Lottie React for the animated brand mark/loading animation

### Testing

- Vitest
- React Testing Library
- MSW for API mocks
- Playwright for end-to-end and role-flow tests
- axe or equivalent accessibility assertions
- Optional visual regression screenshots for key light/dark responsive states

### Do not add libraries without purpose

Do not install both Axios and a fetch wrapper. Use the native `fetch` API through the custom HTTP client. Do not install Redux when TanStack Query plus small Zustand stores are sufficient. Do not use multiple icon libraries.

---

## 7. Authentication, Sessions, and Role Protection

### 7.1 Preferred authentication mode

Use one of these modes based on the real backend.

#### Mode A — Backend-managed secure cookie

Use this when Express already sets an `HttpOnly`, `Secure`, appropriate `SameSite` cookie.

- Frontend requests use `credentials: "include"`.
- Backend CORS explicitly allows the frontend origin and credentials.
- The frontend never reads the token.
- CSRF protection is required for cookie-authenticated state-changing requests when deployment topology makes it necessary.

#### Mode B — Next.js backend-for-frontend session bridge

Use this when the backend returns a JWT in JSON and expects `Authorization: Bearer`.

- The login Route Handler sends credentials to Express.
- It stores the returned token in an `HttpOnly`, `Secure`, scoped cookie.
- Browser code calls same-origin Next.js API routes.
- Next.js server code attaches the Bearer token when calling Express.
- Never expose the token to Client Components.
- A catch-all BFF proxy must use a strict method/path allowlist; never create an unrestricted open proxy.
- Keep request bodies and response status codes intact.
- Strip hop-by-hop and unsafe headers.
- Apply request size limits.
- Forward backend validation details safely.
- Logout clears the cookie and cached user data.

### 7.2 Prohibited token handling

Do not store access or refresh tokens in:

- `localStorage`
- `sessionStorage`
- Zustand persistence
- React state intended to survive navigation
- query cache
- visible cookies
- URLs

### 7.3 Session resolution

Create one canonical `getSessionUser()` server utility that calls `/auth/me` or validates the session through the BFF. Cache only within the current request unless backend/session semantics support more.

### 7.4 Route protection

Use `src/proxy.ts` for fast coarse checks such as:

- unauthenticated access to `/dashboard/**`
- obvious role-path mismatch based on a signed role claim, if available

Then enforce the final role check in the protected server layout by resolving the current user. Do not rely on proxy alone.

```ts
const ROLE_HOME: Record<UserRole, string> = {
  CUSTOMER: "/dashboard/customer",
  TECHNICIAN: "/dashboard/technician",
  ADMIN: "/dashboard/admin",
};
```

### 7.5 Global auth error behavior

- `401`: clear client query cache, end local UI session, redirect to login with a safe return URL.
- `403`: show a dedicated forbidden state; do not always log the user out.
- banned/suspended account: show a calm account-status screen and support/contact route.
- token expiry during a mutation: preserve safe form values and explain that the session expired.
- never display raw JWT or internal backend stack traces.

### 7.6 Registration

- Customer and Technician can self-register if the backend supports both.
- Admin must never be a public registration option.
- Explain Technician onboarding requirements before submission.
- After registration, redirect based on actual backend behavior: direct session, login, verification, or profile completion.
- Do not assume email verification exists.

---

## 8. HTTP and API Service Layer

### 8.1 One HTTP client

The HTTP layer must handle:

- base URL
- relative path joining
- query serialization
- JSON and multipart bodies
- credentials/session headers
- request timeout with `AbortController`
- caller-provided abort signals
- content-type detection
- empty `204` responses
- structured error parsing
- request IDs if provided
- consistent `ApiError`
- optional runtime response schema
- no automatic mutation retries
- no UI side effects

### 8.2 Response envelope

The backend assignment requires errors similar to:

```json
{
  "success": false,
  "message": "Validation failed",
  "errorDetails": {}
}
```

Inspect the collection for the exact success envelope. Support a normalized internal result rather than teaching UI code every envelope variation.

```ts
export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiFailureBody {
  success?: false;
  message?: string;
  errorDetails?: unknown;
}
```

### 8.3 ApiError

```ts
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isValidationError() {
    return this.status === 400 || this.status === 422;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isConflict() {
    return this.status === 409;
  }
}
```

### 8.4 Runtime-validating request function

The exact implementation may vary, but preserve this shape:

```ts
import { z } from "zod";

type RequestOptions<TSchema extends z.ZodTypeAny | undefined> = RequestInit & {
  schema?: TSchema;
  query?: Record<string, string | number | boolean | null | undefined>;
  timeoutMs?: number;
};

export async function request<TSchema extends z.ZodTypeAny | undefined>(
  path: string,
  options: RequestOptions<TSchema> = {},
): Promise<TSchema extends z.ZodTypeAny ? z.output<TSchema> : unknown> {
  // Build URL and query.
  // Merge abort signals.
  // Perform fetch.
  // Parse JSON/text/empty body safely.
  // Throw ApiError for non-2xx or success:false.
  // Unwrap data according to the verified backend envelope.
  // Parse with schema when supplied.
  // Return normalized result.
}
```

### 8.5 Raw contracts and mappers

Example raw contract:

```ts
export const bookingDtoSchema = z.object({
  id: z.string(),
  status: z.string(),
  scheduledAt: z.string(),
  // Match the real API exactly.
});

export type BookingDto = z.infer<typeof bookingDtoSchema>;
```

Example mapper:

```ts
export function mapBookingDto(dto: BookingDto): Booking {
  return {
    id: dto.id,
    status: normalizeBookingStatus(dto.status),
    scheduledAt: normalizeIsoDate(dto.scheduledAt),
    // Map backend names once here.
  };
}
```

### 8.6 Domain services

Services are pure and framework-agnostic.

```ts
export const bookingsService = {
  async list(
    filters: BookingListFilters,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<Booking>> {
    const dto = await browserApi.get("/bookings", {
      query: filters,
      schema: bookingListResponseSchema,
      signal,
    });

    return mapBookingPageDto(dto);
  },

  async getById(id: string, signal?: AbortSignal): Promise<Booking> {
    const dto = await browserApi.get(`/bookings/${encodeURIComponent(id)}`, {
      schema: bookingResponseSchema,
      signal,
    });

    return mapBookingDto(dto);
  },

  async create(input: CreateBookingInput): Promise<Booking> {
    const dto = await browserApi.post("/bookings", {
      body: input,
      schema: bookingResponseSchema,
    });

    return mapBookingDto(dto);
  },
};
```

### 8.7 No stringly typed endpoint sprawl

Use route builders:

```ts
export const apiPaths = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    register: "/auth/register",
  },
  bookings: {
    list: "/bookings",
    detail: (id: string) => `/bookings/${encodeURIComponent(id)}`,
  },
};
```

### 8.8 File uploads

If avatars/category images/service images exist:

- validate type and size before upload
- accept only documented MIME types
- show preview and progress where feasible
- never convert large files to base64 in global state
- use `FormData`
- preserve server validation errors
- use a safe placeholder on broken images

---

## 9. TanStack Query and Caching Strategy

### 9.1 Server state ownership

TanStack Query owns remote lists, details, current-user data used in interactive Client Components, and mutation state.

Zustand must not store:

- user lists
- bookings
- technicians
- payments
- category lists
- server-derived dashboard metrics

### 9.2 Query key factories

Keep keys colocated with each feature and structured from broad to specific.

```ts
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (filters: BookingListFilters) =>
    [...bookingKeys.lists(), normalizeBookingFilters(filters)] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
};
```

### 9.3 Suggested cache defaults

Tune after observing the real product.

| Data | Suggested `staleTime` | Notes |
|---|---:|---|
| Current user | 2–5 minutes | Invalidate after profile/status changes |
| Categories | 15–30 minutes | Invalidate after admin mutation |
| Public services | 2–5 minutes | Key by filters/page |
| Technician lists | 2–5 minutes | Key by filters/page |
| Technician detail | 2 minutes | Reviews/rating may change |
| Booking lists | 15–30 seconds | More active data |
| Booking detail | 10–20 seconds | Poll only while status is active if needed |
| Payments | 15–30 seconds | Poll pending payment only |
| Admin metrics | 30–60 seconds | Avoid unnecessary load |
| Static marketing content | Server-render/cache | Do not force into Query |

Set sensible `gcTime`; do not persist sensitive query data to browser storage.

### 9.4 Mutation behavior

- Disable repeated submit while pending.
- Use `mutateAsync` inside form submissions.
- Invalidate targeted keys after success.
- Update the exact detail cache when the mutation response includes the full updated entity.
- Use optimistic updates only for reversible, low-risk actions.
- Do not optimistically mark payment completed.
- Do not optimistically complete a job unless rollback and conflict handling are correct.
- Respect `409 Conflict` for stale status transitions.
- Avoid automatic retries for payments, booking creation, and status-changing mutations unless an idempotency mechanism exists.

### 9.5 Example booking mutation

```ts
export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.create,
    onSuccess: (booking) => {
      queryClient.setQueryData(bookingKeys.detail(booking.id), booking);
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}
```

### 9.6 SSR and hydration

- Use Server Components for public initial data when it improves SEO and first render.
- Use TanStack Query hydration when a page needs the same data to become interactive without duplicate loading.
- Do not prefetch every dashboard query on the server.
- Place hydration boundaries near features, not blindly around the entire app.
- Prefer request waterfalls only when later requests truly depend on earlier data.
- Pass serializable normalized data to Client Components.

### 9.7 Polling

If the backend does not provide WebSocket/SSE updates:

- poll only active booking details
- poll only pending payments
- stop polling on terminal status
- pause/refetch responsibly in background tabs
- show “Last updated” where useful
- allow manual refresh
- never poll every dashboard table globally

---

## 10. Zustand State Strategy

Use Zustand for small client-only state such as:

- dashboard sidebar collapsed state
- mobile navigation drawer state
- booking wizard draft
- unsaved filter drawer state
- compare/favorite UI only if backend does not persist it and the product intentionally supports local-only behavior
- dismissible onboarding hints

### Persistence rules

May persist:

- theme is handled by `next-themes`
- sidebar preference
- non-sensitive booking wizard draft without payment data
- preferred list density
- recently used search filters

Never persist:

- JWTs
- passwords
- complete user objects
- payment details
- admin data
- API error bodies containing sensitive data
- remote entity collections as an alternative to Query

Use the Zustand slices pattern only if a store becomes large. Apply middleware at the combined store level.

---

## 11. Validation Architecture

Validation must exist at multiple trust boundaries.

### 11.1 Layers

1. **Native input affordances:** type, input mode, autocomplete, min/max, required.
2. **React Hook Form + Zod:** immediate, accessible client feedback.
3. **Service input types:** prevent malformed calls from application code.
4. **API response schemas:** protect the UI from unexpected backend data.
5. **Backend validation:** final authority.
6. **Business policies:** status transitions and role-specific conditions.

Client validation improves UX; it does not replace backend validation.

### 11.2 Shared validation conventions

- Trim text inputs unless whitespace is meaningful.
- Normalize email to lowercase if backend semantics allow.
- Normalize phone numbers consistently; preserve country code.
- Use clear field messages, not “Invalid input.”
- Associate errors with inputs using `aria-describedby`.
- Move focus to the first invalid field after submit.
- Provide a summary for long forms.
- Show server field errors at the correct fields.
- Keep unexpected server errors in a form-level alert.
- Do not erase user input after a failed request.
- Clear a server field error when the field is edited.
- Prevent duplicate submissions.

### 11.3 Environment validation

```ts
const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_API_BASE_URL: z.url().optional(),
  API_BASE_URL: z.url(),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.string().default("BDT"),
  NEXT_PUBLIC_DEFAULT_TIMEZONE: z.string().default("Asia/Dhaka"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  NEXT_PUBLIC_DEFAULT_CURRENCY:
    process.env.NEXT_PUBLIC_DEFAULT_CURRENCY,
  NEXT_PUBLIC_DEFAULT_TIMEZONE:
    process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE,
});
```

Only expose values with `NEXT_PUBLIC_` when they are genuinely safe for the browser.

### 11.4 Registration validation

Verify exact backend constraints, then implement at least:

- name: trimmed, meaningful length
- email: valid format
- phone: valid documented format if required
- password: backend minimum and maximum
- confirm password matches
- role: Customer or Technician only
- terms acceptance if terms are displayed
- no Admin option
- no client-only password policy stricter than backend without explaining it

### 11.5 Login validation

- valid email
- non-empty password
- preserve email after authentication error
- generic credential error to avoid account enumeration
- password visibility button with accessible label
- proper autocomplete attributes

### 11.6 Technician profile validation

Based on actual fields:

- headline and bio length limits
- experience years: integer, reasonable non-negative range
- price: finite non-negative number
- at least one skill/category when required
- service area required if marketplace is location-based
- image MIME/size validation
- no duplicate skills
- safe URLs if portfolio links exist

### 11.7 Availability validation

- start < end
- future slots only when appropriate
- no overlapping intervals
- no exact duplicates
- timezone displayed explicitly
- preserve backend timestamp format
- recurring schedule UI only if backend supports recurrence
- warn before replacing all slots if the endpoint is a full `PUT`

### 11.8 Booking validation

- service and technician required
- selected time belongs to current availability if the API exposes slots
- scheduled time is in the future
- address is complete enough for service
- description length limit
- phone/contact requirement verified
- no editable payment amount
- prevent booking self as technician if roles/data allow such edge case
- revalidate availability on submit and handle `409`

Use a multi-step wizard only when the information volume justifies it:

1. service
2. technician/time
3. address/details
4. review and confirm

Keep the draft across steps. Do not create the booking until final confirmation unless the backend defines a draft state.

### 11.9 Review validation

- rating integer 1–5
- comment optional or required based on API
- comment length
- only completed, unreviewed bookings
- one review per booking
- trim abusive whitespace; do not implement unsupported moderation claims

### 11.10 Category validation

- name required
- normalized slug only if API expects one
- unique conflict displayed from backend
- description/image constraints
- active status if supported
- confirmation for destructive delete
- prefer archive/deactivate if backend supports it

### 11.11 Server error mapping

Create one mapper that understands `errorDetails` variants.

```ts
type FieldErrorMap = Record<string, string | string[]>;

function extractFieldErrors(details: unknown): FieldErrorMap {
  // Validate supported backend structures.
  // Return a safe empty object for unknown shapes.
}
```

Do not write custom error parsing separately in every form.

---

## 12. Date, Time, Money, and Localization

### Time

- Treat API timestamps as ISO strings.
- Store/transport UTC when backend does.
- Display in the product timezone, defaulting to `Asia/Dhaka` only if that matches product requirements.
- Show timezone in booking and availability flows.
- Avoid parsing date-only values as UTC accidentally.
- Use one date utility module.
- Use absolute dates in critical booking details; relative labels may supplement them.

### Money

- Format with `Intl.NumberFormat`.
- Use backend currency when provided.
- Default to BDT only as configuration, not a hard-coded string in components.
- Never use floating-point arithmetic to determine charge totals.
- Display “Starting at” or “Per hour” only when pricing semantics are known.
- Do not let the client decide the final payable amount.

### Text/localization readiness

Even if the first version is English-only:

- centralize site copy that is reused
- avoid concatenating translated sentence fragments
- support long names and labels
- do not bake text into the Lottie logo
- use logical CSS properties where practical
- keep Radix RTL compatibility intact for a future Bengali/RTL-adjacent localization strategy, though Bengali itself is LTR

---

## 13. UI/UX Design Direction

### 13.1 Brand personality

FixItNow should feel:

- trustworthy
- fast
- skilled
- human
- organized
- safe
- local
- premium but approachable

Avoid visual language that feels like:

- crypto/fintech
- neon gaming
- generic AI SaaS
- over-glassy futuristic dashboards
- a clone of a food delivery app
- a bootstrap admin panel

### 13.2 Visual concept

Use a modern editorial marketplace aesthetic:

- generous whitespace
- strong typographic hierarchy
- real service photography
- clean line icons
- restrained use of color
- asymmetric but balanced landing layouts
- clear status and action hierarchy
- subtle borders and shadows
- rounded geometry without turning every object into a capsule

### 13.3 Default brand palette

Implement semantic tokens so the palette can be replaced in one place. A suitable initial direction is:

- reliable cobalt/blue as the primary brand
- fresh teal as a secondary accent
- warm amber only for highlights and attention
- cool off-white backgrounds
- deep navy-charcoal dark mode
- restrained green/red status colors

Do not use raw palette values throughout components.

### 13.4 Shape language

- Buttons: 10–12px radius.
- Inputs: 10–12px radius.
- Standard panels/cards: 14–18px radius.
- Hero media containers: up to 24px when the composition benefits.
- Pills/full radius: statuses, compact filters, tags, segmented controls, avatars.
- Avoid circles or squares behind every icon.
- Use border radius consistently, not randomly.

### 13.5 “Not too many boxes” rule

Prefer:

- open sections
- subtle dividers
- split layouts
- list rows
- grouped typography
- full-width media
- data tables
- timeline layouts
- inline actions

Use cards when the item is a real discrete object, such as:

- technician result
- service option
- booking summary
- dashboard metric
- payment receipt

Do not wrap a card inside another card unless there is a strong interaction reason.

### 13.6 Icon rules

Use Lucide line icons.

- Default stroke width around 1.75–2.
- Use icons inline with text or as standalone semantic cues.
- No decorative square background behind every icon.
- A subtle circle may be used for a rare primary action or avatar placeholder.
- Icon-only buttons require an accessible name and tooltip when meaning is not universally obvious.
- Do not mix filled, duotone, and outline icon systems.

### 13.7 Buttons

Hierarchy:

1. Primary filled brand button.
2. Secondary subtle surface/outline button.
3. Tertiary text button.
4. Destructive action with clear danger treatment.
5. Icon-only compact action.

Rules:

- Minimum 44px touch target on mobile.
- Do not make all buttons pill-shaped.
- Show pending state without changing width drastically.
- Disable only when necessary; explain unavailable workflow actions.
- Use action-specific copy: “Confirm booking,” not “Submit.”
- One primary action per visual region.

### 13.8 Typography

Use a clean variable sans font through `next/font`. Choose a professional family with strong UI legibility and distinctive headings. Examples include Geist, Inter, Manrope, or Plus Jakarta Sans; select one coherent family or a carefully paired display/UI combination.

- Body: 16px default, comfortable line height.
- Avoid tiny 12px text for important data.
- Hero heading: responsive with `clamp`.
- Dashboard headings: compact but clear.
- Use tabular numerals for money and metrics.
- Limit long paragraph width to roughly 60–72 characters.

### 13.9 Shadows and borders

- Prefer 1px semantic borders and tonal surfaces.
- Shadows should be soft and low-opacity.
- Use stronger elevation only for floating menus/dialogs.
- Dark mode should use borders and tonal separation, not giant shadows.
- Avoid a shadow on every element.

---

## 14. Theme System and Dark Mode

### 14.1 Token architecture

Use Tailwind v4 theme variables plus semantic CSS variables.

```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --background: oklch(0.985 0.006 248);
  --foreground: oklch(0.20 0.025 255);
  --surface: oklch(1 0 0);
  --surface-raised: oklch(0.995 0.004 248);
  --muted: oklch(0.95 0.012 248);
  --muted-foreground: oklch(0.50 0.025 255);
  --border: oklch(0.90 0.015 248);

  --brand: oklch(0.57 0.19 252);
  --brand-foreground: oklch(0.99 0.005 250);
  --accent: oklch(0.70 0.14 175);
  --accent-foreground: oklch(0.17 0.025 175);

  --success: oklch(0.64 0.15 150);
  --warning: oklch(0.78 0.15 78);
  --danger: oklch(0.61 0.21 25);

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.35rem;
}

.dark {
  --background: oklch(0.145 0.02 255);
  --foreground: oklch(0.94 0.008 250);
  --surface: oklch(0.19 0.022 255);
  --surface-raised: oklch(0.22 0.024 255);
  --muted: oklch(0.245 0.022 255);
  --muted-foreground: oklch(0.70 0.02 250);
  --border: oklch(0.30 0.024 255);

  --brand: oklch(0.70 0.15 245);
  --brand-foreground: oklch(0.15 0.025 255);
  --accent: oklch(0.73 0.13 175);
  --accent-foreground: oklch(0.15 0.02 175);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-danger: var(--danger);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
}
```

These are initial design values, not immutable requirements. Check contrast and adjust.

### 14.2 Theme implementation

Use one root `ThemeProvider` with:

- class attribute
- system preference
- stored user preference
- no transition flash on initial load
- `suppressHydrationWarning` on `<html>`
- mounted-safe theme toggle UI
- correct `color-scheme`

Do not mount separate competing theme providers for landing and dashboard.

### 14.3 Dark-mode quality bar

Dark mode is not a simple background inversion.

Verify:

- images do not become visually muddy
- chart colors remain distinct
- status badges have adequate contrast
- borders remain visible but subtle
- inputs, dropdowns, popovers, calendars, dialogs, toasts, skeletons, tables, and tooltips are themed
- logo has a correct dark variant or adaptive colors
- focus rings remain visible
- no hard-coded white/black surfaces remain
- native browser controls use appropriate color scheme

---

## 15. Landing Page Design Specification

The landing page should be the visual showpiece. It must communicate trust and make service discovery immediate.

### 15.1 Header

- Transparent or lightly surfaced over the hero, becoming a stable surface after scroll.
- Logo left.
- Navigation: Services, Technicians, How it works, About.
- Theme toggle.
- Login secondary action.
- “Book a service” primary action.
- Mobile menu uses an accessible sheet, not a tiny dropdown.
- Do not overload the nav.

### 15.2 Hero

Create a two-column or layered editorial hero.

Content:

- Trust-oriented eyebrow.
- Strong headline, for example: “Reliable home help, right when you need it.”
- Supporting copy explaining verified technicians, simple booking, and secure payment without making claims unsupported by the backend/business.
- Primary CTA: browse/book services.
- Secondary CTA: join as technician.
- Compact service/location search module using real categories from the API when feasible.
- Trust indicators such as service categories, transparent booking flow, and customer ratings only when real/derived data exists.

Visual:

- High-quality real photograph of a technician performing a home service.
- Supporting smaller crop or interface preview.
- Subtle service-path line or animated tool motif.
- Avoid generic 3D floating icons.
- Avoid a giant gradient blob behind everything.
- Image treatment should work in light and dark mode.

Animation:

- One-time logo entrance.
- Headline and CTA stagger.
- Gentle media scale/parallax.
- Search module settles with spring motion.
- Keep the initial hero usable before animation completes.

### 15.3 Service categories

- Fetch real categories.
- Present 6–8 primary categories with a “View all” action.
- Use icons without square backgrounds.
- Layout can be an open horizontal grid with dividers or a clean carousel on mobile.
- Each category has a short meaningful label and optional image.
- Skeleton shape must match final content.

Examples: plumbing, electrical, cleaning, painting, appliance repair, carpentry—only if present in data or safely used as static marketing examples clearly separate from live categories.

### 15.4 How it works

Use a flowing three-step composition rather than three identical boxed cards:

1. Choose a service.
2. Pick a technician and time.
3. Track, pay, and review.

Use an animated connector line or subtle scroll-progress treatment. Icons should be open line icons.

### 15.5 Featured technicians

- Use real API data when available.
- Show avatar/photo, name, service, area, rating, review count, price semantics, availability.
- Entire card/link is accessible.
- Use horizontal scroll on small mobile with correct snapping only if it improves usability.
- Do not fake “verified” badges unless the backend/business defines verification.

### 15.6 Trust and safety section

Use a large image plus concise content:

- clear service details
- role/account controls
- secure provider-based payment
- booking status tracking
- reviews after completion

Do not make unverified claims such as background checks, insurance, guarantees, or 24/7 support.

### 15.7 Booking journey showcase

Show a polished mock/real interface of the booking timeline and dashboard. Use it as an editorial visual, not a fake interactive control.

The timeline can animate on scroll:

```text
Requested → Accepted → Paid → In progress → Completed
```

### 15.8 Testimonials/reviews

Use backend reviews if public review data exists. Otherwise use clearly-marked static design placeholders only during development and remove them before production. Never publish fabricated customer claims.

### 15.9 Technician CTA

A distinct but integrated section:

- explain how technicians receive and manage jobs
- CTA to register as Technician
- image of a professional technician
- avoid an unrelated pricing-card pattern

### 15.10 FAQ

Use accessible accordion primitives. Questions should address actual product behavior such as booking, payment timing, cancellation, role registration, and review eligibility. Do not promise policies the backend does not enforce.

### 15.11 Final CTA and footer

- Strong final service-search/book CTA.
- Footer with product, company, legal, role links, contact, and social links only when real.
- No giant duplicate navigation.
- Include copyright and policy links.
- Include accessible focus states and adequate mobile spacing.

---

## 16. Image and Asset Direction

### 16.1 Photography brief

Use images showing:

- real technicians in clean residential environments
- plumbing, electrical, cleaning, painting, appliance repair
- authentic tools and human interaction
- inclusive people
- natural light and professional composition
- room for headline cropping

Avoid:

- uncanny AI hands/tools
- generic corporate handshakes
- excessively staged stock smiles
- images with visible third-party logos
- inconsistent color grading
- tiny decorative images that add no meaning

### 16.2 Source and licensing

Use self-created, generated, or properly licensed open-source/stock imagery. Keep `docs/image-credits.md` when attribution or license terms require it. Verify terms at implementation time.

### 16.3 Image engineering

- Use `next/image`.
- Prefer local optimized assets for hero content.
- Define precise `remotePatterns` for approved hosts.
- Set intrinsic dimensions or `fill` with a sized parent.
- Use responsive `sizes`.
- Use meaningful alt text; decorative media gets empty alt.
- Use blur placeholders where appropriate.
- Prevent layout shift.
- Lazy-load below-the-fold images.
- Do not lazy-load the primary LCP hero image.
- Provide graceful broken-image fallbacks.

---

## 17. Brand Logo and Lottie Animation

Create a real FixItNow brand system, not only text in a generic font.

### 17.1 Logo concept

Combine two or three of these ideas without making the mark busy:

- a simple house roof/outline
- a wrench or screwdriver
- a check mark
- a subtle lightning/“now” motion cue

The mark must remain recognizable at favicon size.

### 17.2 Deliverables

Create:

```text
public/brand/fixitnow-mark.svg
public/brand/fixitnow-logo.svg
public/brand/fixitnow-logo-dark.svg
public/brand/favicon.svg
public/brand/fixitnow-loader.json
```

### 17.3 Lottie behavior

The Lottie JSON should:

- contain the brand mark, not a long wordmark animation
- use vector shapes
- avoid external image assets and font dependencies
- be optimized and preferably below roughly 80 KB
- animate in about 0.9–1.4 seconds
- draw the house/tool path
- use a subtle tool rotation or snap
- finish with a small check/energy accent
- loop only in the full-screen loader
- play once in header/hero branding
- have a static SVG fallback
- stop or simplify for reduced motion
- not block first content rendering

### 17.4 Loader usage

Use the Lottie logo for:

- initial session/bootstrap loading when a full-screen loader is truly required
- payment return verification
- rare full-app critical transitions

Do not show it for every query or button action.

---

## 18. Dashboard Shell

### 18.1 Desktop

- Persistent left sidebar around 240–280px.
- Compact logo and role label.
- Navigation grouped by task.
- Active route indicated by color, weight, and a subtle marker—not a huge filled pill.
- Top bar with page title/breadcrumb, search only when useful, theme toggle, notifications only if supported, and user menu.
- Main content uses consistent max width and spacing.
- Sidebar may collapse to icons with tooltips.

### 18.2 Tablet

- Collapsible sidebar/drawer.
- Preserve content width.
- Avoid squeezing large tables beyond usability.

### 18.3 Mobile

- Use a header and accessible navigation sheet or a carefully limited bottom navigation for 3–5 primary destinations.
- Secondary destinations live in menu/profile.
- Ensure 44px targets.
- Convert dense table rows to stacked summaries.
- Keep critical status/action visible.
- Avoid fixed UI that obscures form controls or mobile browser chrome.

### 18.4 Shared dashboard states

Every dashboard feature needs:

- shape-matched skeleton
- empty state with a relevant next action
- scoped error with retry
- stale/background refreshing indicator
- success toast for completed mutations
- confirm dialog for destructive actions
- responsive filters
- pagination or infinite list based on API behavior
- URL-synchronized filters for shareable/admin lists when appropriate

---

## 19. Customer Panel

### 19.1 Customer overview

Show only meaningful data available from the API:

- upcoming booking
- active bookings
- completed bookings
- payment status/history summary
- pending review prompt
- quick browse/search action

Use a clean hierarchy:

1. greeting and next action
2. upcoming booking focus
3. compact metrics
4. recent activity

Do not create empty analytics charts for simple counts.

### 19.2 Browse and booking

Customers should be able to:

- browse categories/services
- filter technicians by supported parameters
- open technician detail
- choose service/time
- enter address/details
- review booking
- submit once
- see confirmation with booking ID/status

Filters should be reflected in the URL where useful. Mobile filters use a sheet. Desktop filters can be an inline toolbar/sidebar depending on complexity.

### 19.3 Customer bookings list

- tabs or segmented filter for active/completed/cancelled
- search only if data volume justifies it
- status, technician, service, date, amount
- clear next action: pay, view, review, or none
- pagination matching API
- skeleton rows/cards

### 19.4 Booking detail

Include:

- status timeline
- technician/service summary
- appointment date/time and timezone
- address
- customer notes
- amount/payment
- permitted actions
- audit timestamps if available
- review after completion

Use a prominent but calm status presentation.

### 19.5 Payment flow

- payment is available only for eligible accepted bookings
- show amount returned/derived by server
- user chooses provider only if multiple providers are supported
- handle redirect/session creation
- show blocking progress while redirecting
- return page verifies status with backend
- never mark success solely from URL query parameters
- provide retry/recovery for failed or cancelled payment
- prevent duplicate payment attempts when one is pending

### 19.6 Reviews

- prompt only after completion and only when no review exists
- accessible 1–5 star control with keyboard support
- clear labels for rating values
- optional comment
- success state updates booking/detail/review caches

### 19.7 Customer profile

Show/edit only fields supported by API. Include read-only role/email where appropriate. If profile update is not supported, present a polished read-only screen rather than a fake save button.

---

## 20. Technician Panel

### 20.1 Technician overview

Focus on work operations:

- current availability state
- pending booking requests
- accepted/upcoming work
- in-progress job
- completed jobs
- recent reviews
- earnings only if the API provides reliable payment data appropriate to the technician

### 20.2 Profile completeness

If technician profile fields are required, show a clear completeness checklist and one primary “Complete profile” action. Do not use gamified progress without purpose.

### 20.3 Service profile

Allow editing of backend-supported:

- headline
- bio
- skills/categories
- experience
- pricing
- service area
- avatar/image
- active availability status

Use sections and dividers, not a huge card around every field.

### 20.4 Services

If service CRUD endpoints exist:

- list current offerings
- add/edit supported service fields
- activate/deactivate
- show price semantics
- confirm delete/deactivate

If service CRUD is absent, merge service data into the profile editor and hide unsupported navigation.

### 20.5 Availability

Use a clear calendar/list hybrid:

- timezone shown
- weekly/dated slots according to API
- add/remove intervals
- conflict validation
- mobile-friendly time controls
- save behavior clearly indicates whether all slots are replaced
- unsaved-change warning
- loading/empty/error states

Avoid building recurrence or drag-and-drop if the backend cannot represent it.

### 20.6 Booking inbox

Group by actionable status:

- new requests
- accepted/upcoming
- in progress
- completed/declined

Each row shows customer, service, address area, schedule, amount, and status. Sensitive contact details should follow backend policy.

### 20.7 Technician booking detail actions

Use policy-driven actions:

- `REQUESTED`: accept or decline
- `ACCEPTED`/`PAID`: start only when backend permits
- `IN_PROGRESS`: complete
- terminal states: read-only

Show confirmation for decline/complete where appropriate. Handle stale transition conflicts.

### 20.8 Reviews

Show average and distribution only when enough data exists. List review content with dates and related service when available. Do not let technicians edit customer reviews unless moderation endpoints explicitly support it.

---

## 21. Admin Panel

### 21.1 Admin visual character

Admin should be denser and more operational than customer/technician dashboards, but still clean.

- use tables when comparison matters
- use cards only for top-level metrics
- use clear filters and batch-ready layouts
- keep destructive controls explicit
- use role/status badges sparingly

### 21.2 Admin overview

Use API-backed metrics:

- total users
- customers
- technicians
- active/banned users
- booking status distribution
- payment totals/status only if supported
- recent bookings/users

Do not derive expensive platform-wide metrics from downloading all rows if the backend lacks aggregate endpoints. Show available summaries or omit charts.

### 21.3 User management

- server-side pagination/filtering when supported
- role/status/date filters
- user identity and role
- ban/unban action
- confirmation with consequence copy
- optimistic update only with reliable rollback
- show backend conflict/forbidden errors
- protect current admin from accidental self-ban if relevant
- do not expose password/auth secrets

### 21.4 Booking administration

- list all bookings
- filter by status, date, customer, technician where supported
- detail drawer/page
- timeline
- payment linkage
- read-only by default unless admin mutation endpoints exist
- do not add arbitrary status override controls without backend support

### 21.5 Category management

- list active/inactive categories
- create
- edit/delete only if endpoints exist
- image/icon preview
- name/slug validation
- conflict state for duplicates
- confirmation for destructive action
- invalidate public category/service discovery caches after changes

### 21.6 Payments and reviews

Add admin payment/review modules only when the actual API exposes them. Hide unsupported navigation instead of rendering “coming soon” across the production app.

---

## 22. Loading, Skeleton, Empty, and Error UX

### 22.1 Loading taxonomy

Use the correct loading treatment.

#### Route-level skeleton

Use `loading.tsx` for route-segment transitions. It should resemble the final page shape.

#### Component skeleton

Use for lists, cards, profile summary, charts, booking timelines, and tables that load independently.

#### Inline pending state

Use inside buttons, small selectors, and local actions.

#### Blocking overlay

Use only when the user must not interact during a critical state-changing operation, such as payment redirection or final booking creation.

#### Full-screen loader

Use only for:

- initial session bootstrap when no stable shell can render
- payment verification return
- rare critical app initialization

### 22.2 Skeleton design

- match final dimensions to avoid layout shift
- use semantic muted tokens
- subtle shimmer or pulse
- reduced motion uses a static skeleton
- do not show a dozen unrelated rectangles
- skeleton lists should approximate actual row count without making the page overly tall

### 22.3 Empty states

An empty state answers:

1. What is empty?
2. Why might it be empty?
3. What can the user do next?

Examples:

- No bookings: “You have no bookings yet” + browse services.
- No technician requests: “No new requests” + availability/profile guidance.
- No category results: clear filters.
- No reviews: neutral explanation, not negative language.

Use simple illustration/iconography without a generic square icon tile.

### 22.4 Errors

- scoped error near failed content
- retry button
- preserve surrounding shell
- clear human message
- optional support/request ID
- never display stack traces
- global error page for unrecoverable render failures
- dedicated 404 and 403 experiences
- offline/network errors distinguish from validation errors

### 22.5 Toast policy

Use toasts for:

- mutation success
- recoverable mutation failure summary
- background refresh problems
- copied identifiers

Do not use toasts as the only place for form errors or critical payment state.

---

## 23. Motion and Interaction Design

### 23.1 Motion hierarchy

Use Motion for React for:

- page/section reveal
- modal/sheet/dialog presence
- list insertion/removal
- tabs and active indicators
- card hover
- accordions
- status timeline progress
- button feedback
- shared layout transitions
- mobile menu

Use GSAP/ScrollTrigger only for:

- one hero/brand sequence
- the “How it works” connector
- booking journey storytelling
- a restrained pinned visual if it remains usable on mobile

Use Lenis only for marketing pages and only after testing accessibility, anchor links, keyboard navigation, sticky elements, and mobile behavior.

### 23.2 Motion tokens

Create shared motion constants:

```ts
export const motionTokens = {
  duration: {
    fast: 0.16,
    normal: 0.28,
    slow: 0.5,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    emphasized: [0.16, 1, 0.3, 1],
  },
  spring: {
    responsive: { type: "spring", stiffness: 420, damping: 34 },
    gentle: { type: "spring", stiffness: 220, damping: 28 },
  },
};
```

Use consistent values rather than ad hoc animation timings.

### 23.3 Animation rules

- Animate opacity and transforms for best performance.
- Keep UI transitions mostly 160–320ms.
- Landing storytelling may be slower but must not feel delayed.
- Avoid large blur animation.
- Avoid layout-thrashing width/height animation when a transform or Motion layout animation works.
- Use `AnimatePresence` for true entry/exit.
- Use `layout`/`layoutId` for active tabs and shared elements.
- Lazy-load heavy animation code.
- Clean up GSAP contexts and ScrollTriggers.
- Refresh ScrollTrigger after dynamic images/content if needed.
- Do not run GSAP sequences on dashboard pages.
- Keep scroll behavior native for reduced motion.
- Do not hijack scroll or disable browser controls.

### 23.4 Reduced motion

- Use Motion’s reduced-motion support.
- Disable parallax, smooth scrolling, scrubbed timelines, and continuous logo loops.
- Replace with instant state changes or subtle opacity.
- Keep all content available.
- Never make animation required to understand status.

### 23.5 Microinteractions

- Buttons depress 1–2% on tap.
- Cards move only 2–4px on hover.
- Focus is visually stronger than hover.
- Status changes animate once and then settle.
- Form success uses check motion without confetti unless a major milestone warrants it.
- Dropdowns and dialogs use restrained scale/opacity.
- Avoid magnetic cursor effects on essential buttons.

---

## 24. Responsive Design Rules

### 24.1 Breakpoint mindset

Design and test at:

- 320–360px narrow mobile
- 390–430px modern mobile
- 768px tablet
- 1024px small desktop
- 1280px desktop
- 1440px+ wide desktop

Do not design only at Tailwind’s default screenshot widths.

### 24.2 Content containers

- Marketing max width approximately 1200–1320px.
- Dashboard max width can be wider for tables.
- Use fluid side padding with `clamp`.
- Avoid full-width body text.
- Hero height must not trap content below the fold on small laptops.

### 24.3 Tables

- Admin tables may use horizontal scroll with sticky key column/header when necessary.
- Customer/technician lists should become stacked rows/cards on mobile.
- Preserve labels when stacking.
- Do not hide critical data solely to fit mobile.
- Actions should move to a menu only when still discoverable.

### 24.4 Forms

- One column on mobile.
- Two columns only for naturally paired fields on wider screens.
- Sticky mobile submit bar only when it does not cover fields.
- Date/time pickers must be usable by touch and keyboard.
- Keep error text visible without layout collapse.

### 24.5 Navigation

- Mobile marketing nav uses a sheet.
- Dashboard mobile nav must expose the user role and logout.
- Prevent background scroll when overlays are open.
- Restore focus on close.

---

## 25. Accessibility Requirements

Target WCAG 2.2 AA.

- Semantic headings in order.
- One meaningful `h1` per page.
- Skip-to-content link.
- Full keyboard operation.
- Visible focus indicators.
- Correct labels and descriptions.
- Accessible form errors.
- No color-only status communication.
- Sufficient contrast in both themes.
- `aria-current` for active navigation.
- Accessible dialogs, menus, selects, accordions, and tooltips.
- Proper table headers and captions where useful.
- Status changes announced with appropriate live regions.
- Icons have accessible names only when semantic; decorative icons are hidden.
- Images have correct alt behavior.
- Star rating is operable without a pointer.
- Minimum touch target near 44px.
- No auto-playing sound.
- No flashing animation.
- Respect zoom and text resize.
- Reduced-motion support.
- Skeleton containers use `aria-busy`; avoid announcing every skeleton block.
- Loading text should be announced for critical operations.
- Restore focus after navigation/dialog/mutation when needed.

Use Radix/shadcn as accessible foundations, but test the final composition; primitives do not guarantee accessible product copy and focus logic automatically.

---

## 26. SEO and Public Content

For public pages:

- meaningful metadata
- canonical URLs
- Open Graph and social images
- descriptive titles
- public service/category/technician detail metadata from real data
- sitemap
- robots
- structured data only when fields are truthful
- server-rendered primary content
- clean URLs
- no index for dashboard/auth/payment result pages where appropriate

Potential structured data:

- `Service`
- `LocalBusiness` only if FixItNow is truly represented as such
- `AggregateRating` only with real backend data and correct eligibility
- breadcrumb structured data

Do not generate misleading review or availability schema.

---

## 27. Performance Requirements

### 27.1 Rendering

- Server Components by default.
- Place `"use client"` at the smallest interactive boundary.
- Do not make the root layout a giant Client Component.
- Keep providers as deep and small as practical.
- Stream independent sections.
- Use route-level loading skeletons.
- Avoid redundant client fetching after server rendering.

### 27.2 Bundles

- Lazy-load GSAP, Lenis, Lottie, maps, rich charts, and heavy date/calendar widgets.
- Use Motion’s bundle-reduction facilities where appropriate.
- Import Lucide icons individually.
- Avoid a large icon registry object that defeats tree-shaking.
- Do not ship admin chart code to marketing routes.
- Analyze bundles before final delivery.

### 27.3 Images and fonts

- optimize with Next Image
- preload only the true hero/LCP image
- self-host through `next/font`
- limit font weights
- use `font-display` behavior provided by Next
- no giant uncompressed PNGs
- no remote image wildcard hosts

### 27.4 Network

- cancel stale searches
- debounce free-text search around 250–400ms
- do not debounce selects
- server-side pagination for large admin data
- avoid N+1 browser calls when backend provides nested data
- prefetch likely detail routes modestly
- no mutation retries without idempotency
- compress production responses at infrastructure/backend level

### 27.5 Performance budget targets

Treat these as goals:

- mobile LCP under about 2.5s on a realistic connection
- CLS below 0.1
- INP under about 200ms
- initial marketing JavaScript kept lean
- no long animation tasks blocking interaction
- full-screen loader does not mask avoidable slow architecture

---

## 28. Error, Conflict, and Edge-Case Handling

Handle at least:

- expired session
- banned user after login
- technician profile incomplete
- no categories/services
- no technician matches filters
- technician unavailable between selection and submit
- duplicate booking submit
- booking status changed in another session
- payment already completed
- payment session expired
- payment callback reports success but backend verification remains pending
- customer tries to review twice
- review submitted for non-completed booking
- technician tries invalid status transition
- admin attempts duplicate category
- backend returns an unknown enum
- image URL broken
- slow network
- offline transition
- API timeout
- malformed API response
- pagination page becomes empty after mutation
- browser back during booking/payment
- mobile keyboard covering submit
- dark mode hydration mismatch
- reduced-motion user
- long names/addresses
- empty optional fields
- 204 response
- 429 rate limit
- 500/503 service error

Unknown enum values must render a safe “Unknown” presentation and be logged, not crash the UI.

---

## 29. Testing Strategy

### 29.1 Unit tests

Test:

- mappers
- status normalizers
- business policies
- route sanitization
- query key builders
- money/date formatters
- error extraction
- Zod validation
- pagination normalization

### 29.2 Component tests

Test:

- login/register forms
- booking wizard
- status timeline
- payment action state
- technician availability editor
- admin category form
- ban/unban confirmation
- empty/error/loading states
- responsive navigation logic
- theme toggle mounted behavior
- accessible rating input

### 29.3 MSW integration tests

Mock:

- success envelopes
- validation errors
- 401/403
- 409 conflicts
- paginated lists
- malformed data
- delayed responses
- payment pending/completed/failed

### 29.4 End-to-end role flows

Customer:

1. register/login
2. browse category
3. view technician
4. create booking
5. see requested status
6. payment eligibility after acceptance
7. verify payment return
8. see status progress
9. review completed booking

Technician:

1. login
2. complete profile
3. set availability
4. view request
5. accept/decline
6. start job
7. complete job

Admin:

1. login
2. view users
3. ban/unban
4. view bookings
5. create/manage category according to API

### 29.5 Cross-cutting E2E

- role-route protection
- direct URL navigation
- safe return URL
- light/dark mode
- keyboard-only key paths
- 360px mobile
- tablet
- desktop
- reduced motion
- empty database states
- slow API
- session expiry

### 29.6 Contract tests

When possible:

- run the backend’s existing integration/API tests against its safe test configuration
- start the local backend against a non-production test database and probe supported endpoints with a dedicated test client
- generate or maintain an OpenAPI or contract snapshot from verified server routes
- compare frontend Zod contracts with sanitized representative backend fixtures
- track the inspected backend Git commit or version
- fail clearly when response shapes drift
- never require the machine-specific absolute backend path in CI

---

## 30. Analytics and Observability

Only add analytics if the project requires it. Keep it privacy-conscious.

Useful product events:

- service search
- category selected
- technician viewed
- booking flow started
- booking created
- payment started
- payment verified
- review submitted
- technician request accepted/declined
- admin user status changed

Never log:

- passwords
- tokens
- full payment details
- private addresses without a documented need
- raw error bodies containing personal data

Capture client errors with route, role, request ID, and safe context. Redact sensitive fields.

---

## 31. Implementation Conventions

### Naming

- Components: `PascalCase`.
- Hooks: `useX`.
- Services: `x.service.ts`.
- Contracts: `x.contract.ts`.
- Policies: `x.policy.ts`.
- Mappers: `x.mapper.ts`.
- Query options/hooks: `queries.ts` and `mutations.ts`.
- Routes and API paths: centralized constants/builders.
- Avoid vague files such as `helpers.ts` containing unrelated functions.

### Components

- Prefer composition.
- Avoid prop objects with dozens of booleans.
- Use variants through `class-variance-authority` for reusable primitives.
- Keep domain-specific UI outside `components/ui`.
- Avoid premature universal components.
- Do not create a “Card” wrapper for every section.

### Forms

- Schema next to the feature.
- Default values explicit.
- Server errors mapped centrally.
- Pending state and submit lock.
- Dirty-state warning for long forms.
- Reset only after confirmed success.
- Accessible descriptions.

### Styling

- semantic tokens
- `cn()` helper
- no hard-coded brand colors in components
- no inline styles except calculated values or CSS variables
- no dynamic Tailwind class strings that cannot be statically detected
- use data attributes for states
- maintain dark mode at component creation time

### Imports

Suggested aliases:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/app/*": ["./src/app/*"],
    "@/components/*": ["./src/components/*"],
    "@/features/*": ["./src/features/*"],
    "@/services/*": ["./src/services/*"],
    "@/domain/*": ["./src/domain/*"],
    "@/contracts/*": ["./src/contracts/*"]
  }
}
```

---

## 32. Definition of Done

The project is not complete until:

- all real backend endpoints used by the UI are documented from registered routes and verified behavior
- no raw HTTP calls exist outside the HTTP layer
- no JWT is stored in browser-readable storage
- every route has correct role behavior
- every major query has loading, empty, error, and retry UX
- every mutation handles pending, success, validation failure, auth failure, and conflict where applicable
- all forms use shared validation patterns
- API responses are runtime-validated for critical entities
- landing page is visually custom and uses proper imagery
- the animated Lottie logo and static fallback exist
- dashboard is clean rather than over-animated
- light and dark modes are complete
- keyboard navigation works
- reduced motion works
- mobile/tablet/desktop are tested
- public pages have metadata
- dashboard routes are noindex
- no fabricated business claims or fake reviews remain
- no unsupported dashboard links/actions remain
- tests cover role-critical workflows
- build, typecheck, lint, unit tests, and E2E smoke tests pass
- README explains setup, environment, auth mode, architecture, and scripts

---

## 33. Agent Execution Protocol

Follow this order.

1. Receive the explicit local backend path and inspect the backend repository read-only.
2. Produce the API contract inventory and list discrepancies from the baseline.
3. Choose auth Mode A or B from actual backend behavior.
4. Scaffold Next.js and project tooling.
5. Implement design tokens, themes, providers, HTTP client, contracts, mappers, and services.
6. Implement auth and role protection before role pages.
7. Build shared design-system primitives and feedback states.
8. Build public discovery and landing page.
9. Build Customer workflow end to end.
10. Build Technician workflow end to end.
11. Build Admin workflow end to end.
12. Integrate payment return verification.
13. Add animation progressively, after layout and accessibility are stable.
14. Add tests and contract fixtures continuously.
15. Run responsive, theme, accessibility, and performance passes.
16. Remove mocks, unsupported links, dead code, and accidental generic-template styling.
17. Deliver a final implementation report mapping screens to endpoints and tests.

Do not begin with a large visual mock that cannot connect to the API. Build foundations and one vertical slice early.

---

## 34. Final Visual Review Questions

Before considering the UI finished, ask:

- Does the first screen immediately explain what FixItNow does?
- Does the hero use a convincing real service image?
- Can a customer find a service in one obvious action?
- Are technician trust signals truthful and data-backed?
- Are icons clean without repetitive square backgrounds?
- Are there too many cards?
- Are buttons rounded but not all pills?
- Are radii, spacing, and typography consistent?
- Is dark mode intentionally designed?
- Does animation make the page smoother without slowing it?
- Does the dashboard feel calmer than the landing page?
- Can each role identify the next important task?
- Is status visible without relying only on color?
- Are mobile booking and availability controls genuinely usable?
- Does every empty state help the user progress?
- Are unsupported backend features hidden?
- Does any page still look like a default shadcn dashboard? If yes, redesign it.

---

## 35. Current Primary Documentation References

Use current official documentation during implementation:

- Next.js project structure: `https://nextjs.org/docs/app/getting-started/project-structure`
- Next.js Server and Client Components: `https://nextjs.org/docs/app/getting-started/server-and-client-components`
- Next.js authentication: `https://nextjs.org/docs/app/guides/authentication`
- Next.js backend-for-frontend: `https://nextjs.org/docs/app/guides/backend-for-frontend`
- Next.js Proxy: `https://nextjs.org/docs/app/api-reference/file-conventions/proxy`
- Next.js loading UI: `https://nextjs.org/docs/app/api-reference/file-conventions/loading`
- Next.js image optimization: `https://nextjs.org/docs/app/getting-started/images`
- Tailwind theme variables: `https://tailwindcss.com/docs/theme`
- Tailwind dark mode: `https://tailwindcss.com/docs/dark-mode`
- shadcn dark mode for Next.js: `https://ui.shadcn.com/docs/dark-mode/next`
- Radix primitives: `https://www.radix-ui.com/primitives/docs/overview/introduction`
- Lucide React: `https://lucide.dev/guide/react`
- TanStack Query: `https://tanstack.com/query/latest`
- Query keys: `https://tanstack.com/query/v5/docs/framework/react/guides/query-keys`
- Query invalidation: `https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation`
- Advanced server rendering: `https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr`
- Zustand: `https://zustand.docs.pmnd.rs/`
- React Hook Form: `https://react-hook-form.com/get-started`
- Zod: `https://zod.dev/`
- Motion for React: `https://motion.dev/docs/react`
- Motion layout animations: `https://motion.dev/docs/react-layout-animations`
- Motion scroll animations: `https://motion.dev/docs/react-scroll-animations`
- GSAP ScrollTrigger: `https://gsap.com/docs/v3/Plugins/ScrollTrigger/`
- Lenis: `https://lenis.darkroom.engineering/`
- Lottie React: `https://lottiereact.com/`

---

## 36. Final Instruction to the Agent

Build FixItNow as a cohesive product. The landing page may be expressive and cinematic; the dashboards must be calm, fast, precise, and task-oriented. Keep architecture strict, visuals custom, API integration centralized, validation layered, security deliberate, and every interaction accessible.

When the backend contract is unclear, inspect it, isolate the uncertainty in adapters, document the assumption, and continue with the safest truthful implementation. Never spread uncertainty through the UI code and never invent a successful backend operation.
