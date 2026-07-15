# FixItNow Backend Inspection

> Generated from local backend source inspection. No secrets or absolute machine paths included.

## Repository Layout

```
FixItNow/
├── api/index.ts            # Vercel serverless entry
├── prisma/
│   ├── models/             # Split Prisma model files
│   │   ├── schema.prisma   # datasource + generator
│   │   ├── enums.prisma    # all enums
│   │   ├── user.prisma     # User + TechnicianProfile
│   │   ├── booking.prisma  # Booking
│   │   ├── payment.prisma  # Payment
│   │   ├── review.prisma   # Review
│   │   ├── service.prisma  # Service
│   │   └── category.prisma # Category
│   └── migrations/
├── src/
│   ├── app.ts              # Express app + CORS + routes
│   ├── server.ts           # HTTP server start
│   ├── app/
│   │   ├── docs/swagger.ts
│   │   ├── modules/        # Feature modules
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── category/
│   │   │   ├── payment/
│   │   │   ├── review/
│   │   │   ├── service/
│   │   │   ├── technician/
│   │   │   └── admin/
│   │   └── routes/index.ts
│   ├── config/index.ts
│   ├── lib/prisma.ts, stripe.ts
│   ├── middlewares/auth.ts, globalErrorHandler.ts, notFound.ts, validateRequest.ts
│   └── utils/catchAsync.ts, jwt.ts, sendResponse.ts
```

## Entry Point & Route Registration

- Entry: `src/app.ts`
- API prefix: `/api`
- Port: `5000` (default)
- All module routes registered at `/api/{module}`

## Authentication Transport

- **Mode B** — JWT Bearer token
- Login returns `{ accessToken, user }` in JSON body
- Bearer token sent as `Authorization: Bearer <token>`
- **No HttpOnly cookie set by backend**
- **No logout endpoint** (frontend-only)
- **No refresh token** endpoint
- **No forgot/reset password** endpoint
- Token lifetime: configured via `JWT_ACCESS_EXPIRES_IN` env var (typically `1d`)
- Frontend must implement BFF: store JWT in HttpOnly cookie via Next.js Route Handler

## CORS Configuration

- Allows: `http://localhost:3000`, `http://localhost:3001`, `FRONTEND_URL`
- `credentials: true`
- Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Headers: Content-Type, Authorization

## Role & Permission Middleware

Roles: `CUSTOMER`, `TECHNICIAN`, `ADMIN`  
Auth middleware validates Bearer token, checks DB for user existence and BANNED status.

## Exact Endpoint Inventory

### Auth (`/api/auth`)
| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/register` | Public | `{ email, password, role?: CUSTOMER\|TECHNICIAN, skills?[], experience?, hourlyRate?, bio?, location? }` |
| POST | `/login` | Public | `{ email, password }` → `{ accessToken, user }` |
| GET | `/me` | Any role | → `{ id, email, role, status, createdAt, updatedAt, technicianProfile? }` |

Technician register requires: `skills`, `experience`, `hourlyRate`

### Services (`/api/services`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/` | Public | Filter params TBD |
| POST | `/` | TECHNICIAN | `{ name, description, price, categoryId }` |
| PATCH | `/:id` | TECHNICIAN | Partial update |
| DELETE | `/:id` | TECHNICIAN | Delete own service |

### Technicians (`/api/technicians`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/` | Public | Query: `skill?, location?, minExperience?, minRating?, search?` |
| GET | `/:id` | Public | Full detail with profile |

### Technician Management (`/api/technician`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| PUT | `/profile` | TECHNICIAN | `{ skills?, experience?, hourlyRate?, bio?, location? }` |
| PUT | `/availability` | TECHNICIAN | `{ availability: string[] }` — REPLACES all slots |
| GET | `/bookings` | TECHNICIAN | Own booking queue |
| PATCH | `/bookings/:id` | TECHNICIAN | `{ status: ACCEPTED\|DECLINED\|IN_PROGRESS\|COMPLETED }` |

### Categories (`/api/categories`)
| Method | Path | Auth |
|--------|------|------|
| GET | `/` | Public |

### Bookings (`/api/bookings`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/` | CUSTOMER | `{ technicianId, serviceId, scheduledTime (ISO 8601) }` |
| GET | `/` | CUSTOMER | Own bookings |
| GET | `/:id` | CUSTOMER | Own booking detail |
| PATCH | `/:id/cancel` | CUSTOMER | Cancel booking |

### Payments (`/api/payments`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/create` | CUSTOMER | `{ bookingId, provider?: STRIPE\|SSLCOMMERZ }` |
| POST | `/confirm` | Public (webhook) | Stripe raw body webhook |
| POST | `/sslcommerz/success\|fail\|cancel\|ipn` | Public | SSLCommerz callbacks |
| GET | `/` | CUSTOMER | Payment history |
| GET | `/:id` | CUSTOMER | Payment detail |

### Reviews (`/api/reviews`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/` | CUSTOMER | Create review after completion |

### Admin (`/api/admin`)
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/users` | ADMIN | Paginated user list |
| PATCH | `/users/:id` | ADMIN | Update user status |
| GET | `/bookings` | ADMIN | All bookings |
| GET | `/categories` | ADMIN | All categories |
| POST | `/categories` | ADMIN | `{ name, slug }` |
| PATCH | `/categories/:id` | ADMIN | Update category |
| DELETE | `/categories/:id` | ADMIN | Delete category |

## Response Envelope

```json
// Success
{ "success": true, "message": "...", "data": {...} }

// Error
{ "success": false, "message": "...", "errorDetails": {} }
```

## Prisma Models

### User
- `id` UUID, `email` unique, `password` hashed, `role` Role, `status` UserStatus (default ACTIVE)
- `technicianProfile` optional relation

### TechnicianProfile
- `id`, `userId` unique, `skills` String[], `availability` String[], `experience` Int, `hourlyRate` Float
- `bio?`, `location?`

### Service
- `id`, `name`, `description`, `price` Float, `categoryId`, `technicianId`

### Booking
- `id`, `customerId`, `technicianId`, `serviceId`, `status` BookingStatus, `scheduledTime` DateTime
- **No address field** — booking is just service + technician + time

### Payment
- `id`, `bookingId` unique, `transactionId?`, `amount` Float, `method` String, `provider` PaymentProvider
- `status` PaymentStatus, `paidAt?`

### Review
- `id`, `bookingId` unique, `customerId`, `technicianId`, `rating` Int, `comment?`

### Category
- `id`, `name` unique, `slug` unique

## Enums
- `Role`: CUSTOMER, TECHNICIAN, ADMIN
- `UserStatus`: ACTIVE, BANNED
- `BookingStatus`: REQUESTED, ACCEPTED, DECLINED, PAID, IN_PROGRESS, COMPLETED, CANCELLED
- `PaymentStatus`: PENDING, COMPLETED, FAILED
- `PaymentProvider`: STRIPE, SSLCOMMERZ

## Business Policy (from service layer)

- **Customer can cancel**: status in `[REQUESTED, ACCEPTED, PAID]`
- **Technician status transitions allowed**: ACCEPTED, DECLINED, IN_PROGRESS, COMPLETED
- **Payment eligibility**: status must be ACCEPTED (technician accepted)
- **Review eligibility**: booking must be COMPLETED

## Booking Status Transition Matrix

```
REQUESTED → ACCEPTED (Technician)
REQUESTED → DECLINED (Technician)
ACCEPTED  → PAID     (Payment system)
ACCEPTED  → CANCELLED (Customer)
PAID      → IN_PROGRESS (Technician)
PAID      → CANCELLED (Customer)
IN_PROGRESS → COMPLETED (Technician)
* → CANCELLED (Customer, if REQUESTED|ACCEPTED|PAID)
```

## Payment Flow

### Stripe
1. `POST /api/payments/create` → returns Stripe checkout URL
2. User redirected to Stripe
3. On success: redirect to `FRONTEND_URL/payment/success?session_id=...&bookingId=...`
4. On cancel: redirect to `FRONTEND_URL/payment/cancel?bookingId=...`
5. Stripe webhook: `POST /api/payments/confirm` (raw body, Stripe signature)
6. Frontend verifies by calling backend to sync session

### SSLCommerz
1. `POST /api/payments/create` → returns SSLCommerz URL
2. User redirected to SSLCommerz
3. Backend receives POST callbacks at `/api/payments/sslcommerz/success|fail|cancel|ipn`

## Unsupported Features (not in backend)

- No logout endpoint (frontend-only)
- No refresh token
- No forgot/reset password
- No email verification
- No profile update for Customer (name, phone, avatar)
- No address field in Booking
- No public review list endpoint
- No admin payment list endpoint
- No admin metrics/dashboard aggregate endpoint
- No technician earnings endpoint
- No service detail endpoint (no `GET /api/services/:id`)
- No category detail endpoint
- No search on `/api/services` confirmed (needs verification)
- No pagination confirmed (needs verification from controller)
