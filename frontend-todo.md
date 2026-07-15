# FixItNow Frontend TODO

> **Execution checklist for the FixItNow Next.js + TypeScript frontend**
>
> Use this file together with `frontend-brain.md`. The brain defines architecture and design intent; this file defines the implementation sequence, task ownership, verification gates, and completion criteria.

**Project:** FixItNow  
**Frontend:** Next.js App Router + TypeScript  
**Backend:** Express + PostgreSQL + Prisma  
**API source of truth:** the local Express backend repository path supplied explicitly by the user after these reference files, plus verified local API behavior

---

## 0. How to Use This Checklist

### Status markers

- `[ ]` Not started
- `[-]` In progress
- `[x]` Complete
- `[!]` Blocked by a confirmed backend/API limitation
- `[~]` Deliberately omitted with a documented reason

### Working rules

- [ ] Read `frontend-brain.md` completely before implementing.
- [ ] Receive and inspect the user-provided local backend repository path before wiring production API calls.
- [ ] Keep `docs/api-contract.md` current as endpoints are verified.
- [ ] Complete each phase gate before moving to the next dependent phase.
- [ ] Build one working vertical slice early instead of creating every empty page first.
- [ ] Do not mark an item complete because the UI “looks done”; verify behavior, loading, error handling, responsiveness, dark mode, accessibility, and tests.
- [ ] Never fabricate backend support to unblock a screen.
- [ ] Record every contract ambiguity in `docs/assumptions.md`.
- [ ] Hide or disable unsupported actions with truthful UI copy.
- [ ] Keep all raw network calls inside the HTTP infrastructure layer.
- [ ] Keep server state out of Zustand.
- [ ] Keep tokens out of browser-readable storage.
- [ ] Test every role independently.
- [ ] Keep the landing page expressive and the dashboards restrained.
- [ ] Never commit the user’s absolute backend path.
- [ ] Never inspect or reproduce `.env` secret values.
- [ ] Never modify the backend unless the user explicitly expands the task to include backend changes.

---

# Phase 0 — Backend and Product Contract Audit

## 0.1 Receive and inspect the local backend source

- [ ] Receive the exact backend repository path from the user after `frontend-brain.md` and `frontend-todo.md`.
- [ ] Confirm the coding environment can access the supplied path.
- [ ] Resolve the repository root using `package.json`, `prisma/schema.prisma`, `src`, or the server entry file.
- [ ] Accept Windows, macOS, Linux, WSL, or repository-relative path syntax without rewriting it unnecessarily.
- [ ] Treat the backend as read-only unless the user separately authorizes backend edits.
- [ ] Do not hard-code or commit the machine-specific absolute backend path.
- [ ] Exclude `node_modules`, `.git`, `dist`, `build`, coverage, logs, uploads, caches, and generated output from broad inspection.
- [ ] Inspect `package.json`, scripts, dependencies, and runtime requirements.
- [ ] Locate the Express server entry point.
- [ ] Trace app creation and route-registration order.
- [ ] Locate route/module files.
- [ ] Locate controllers and response helpers.
- [ ] Locate services/use-cases.
- [ ] Locate request validators.
- [ ] Locate authentication middleware.
- [ ] Locate role/authorization middleware.
- [ ] Locate error middleware.
- [ ] Inspect CORS, cookie, proxy, and security configuration.
- [ ] Inspect `prisma/schema.prisma`.
- [ ] Inspect relevant Prisma migrations.
- [ ] Inspect safe seed definitions.
- [ ] Inspect backend integration/unit tests and fixtures.
- [ ] Inspect README/API documentation.
- [ ] Inspect `.env.example` or environment-variable names only.
- [ ] Do not read, print, reproduce, or commit secret values from `.env`, database URLs, JWT secrets, private keys, or payment credentials.
- [ ] Identify the backend base URL for local, staging, and production from safe configuration.
- [ ] Confirm whether the API prefix is `/api`, `/api/v1`, or another value.
- [ ] Confirm whether route paths are case-sensitive.
- [ ] Confirm whether IDs are UUIDs, CUIDs, numeric IDs, or mixed.
- [ ] Confirm request and response content types.
- [ ] Confirm whether all timestamps are ISO 8601 strings.
- [ ] Confirm default timezone expectations.
- [ ] Confirm default currency and all supported currencies.
- [ ] Identify a safe non-production database/test configuration.
- [ ] Run existing backend tests when available and safe.
- [ ] Start the local server only through its documented development/test process.
- [ ] Exercise supported endpoints with safe test data when runtime verification is possible.
- [ ] Save sanitized representative response fixtures under `src/test/fixtures/api`.
- [ ] Remove secrets, tokens, real personal data, and machine-specific paths from committed fixtures.
- [ ] Record the backend Git commit hash/version when available.
- [ ] Create `docs/backend-inspection.md` without including secret values or the absolute local path.

## 0.2 Produce the backend inspection report

Create `docs/backend-inspection.md`.

- [ ] Record repository layout.
- [ ] Record backend entry point.
- [ ] Record Express app and router registration chain.
- [ ] Record API base prefix and local port behavior.
- [ ] Record exact routes grouped by module.
- [ ] Record middleware order for each protected route family.
- [ ] Record validator/request schemas.
- [ ] Record response-envelope helpers.
- [ ] Record error-envelope helpers.
- [ ] Record Prisma models and relations.
- [ ] Record Prisma enums and uniqueness constraints.
- [ ] Record booking state-transition rules.
- [ ] Record payment state-transition and verification rules.
- [ ] Record pagination/filter/sort conventions.
- [ ] Record file-upload/static-file behavior.
- [ ] Record CORS/cookie/CSRF implications.
- [ ] Record available backend test commands.
- [ ] Record unsupported desired frontend features.
- [ ] Record backend commit hash/version.
- [ ] Exclude absolute local path and all secret values from committed documentation.

## 0.3 Confirm authentication mechanics

- [ ] Inspect registration request and response.
- [ ] Inspect login request and response.
- [ ] Inspect `/auth/me` or equivalent.
- [ ] Check for logout endpoint.
- [ ] Check for refresh-token endpoint.
- [ ] Check for forgot-password endpoint.
- [ ] Check for reset-password endpoint.
- [ ] Check for email verification endpoint.
- [ ] Check for password-change endpoint.
- [ ] Check for profile-update endpoint.
- [ ] Determine whether the backend sets an `HttpOnly` cookie.
- [ ] Determine whether login returns an access token in JSON.
- [ ] Determine whether refresh token rotation exists.
- [ ] Determine access-token lifetime.
- [ ] Determine refresh-token lifetime.
- [ ] Determine cookie attributes: `HttpOnly`, `Secure`, `SameSite`, domain, and path.
- [ ] Determine CORS origin and credential requirements.
- [ ] Determine CSRF requirements for cookie-based authentication.
- [ ] Confirm exact role values and casing.
- [ ] Confirm exact banned/suspended user behavior.
- [ ] Confirm whether login reveals account existence.
- [ ] Choose and document Auth Mode A or Auth Mode B from `frontend-brain.md`.
- [ ] Record the choice in `docs/design-decisions.md`.

## 0.4 Confirm common response shapes

- [ ] Record the success envelope.
- [ ] Record the error envelope.
- [ ] Record whether success responses use `data`.
- [ ] Record whether list responses include `meta`.
- [ ] Record pagination structure.
- [ ] Record validation error structure.
- [ ] Record rate-limit error structure.
- [ ] Record conflict error structure.
- [ ] Record unauthorized and forbidden response bodies.
- [ ] Record request/correlation ID headers.
- [ ] Confirm behavior for `204 No Content`.
- [ ] Confirm behavior for malformed JSON or HTML error responses.
- [ ] Confirm whether API errors always include `success: false`.
- [ ] Add normalized TypeScript interfaces for envelopes.
- [ ] Add fixtures for every common error family.

## 0.5 Reconcile expected endpoint inventory

The following endpoints come from the matching FixItNow specification. Verify every method and path against registered Express routes, validators, middleware, controllers, and safe local responses. Mark differences explicitly.

### Authentication

- [ ] `POST /api/auth/register`
- [ ] `POST /api/auth/login`
- [ ] `GET /api/auth/me`
- [ ] Logout endpoint verified or marked absent.
- [ ] Refresh endpoint verified or marked absent.
- [ ] Forgot-password endpoint verified or marked absent.
- [ ] Reset-password endpoint verified or marked absent.
- [ ] Profile update endpoint verified or marked absent.

### Public discovery

- [ ] `GET /api/services`
- [ ] `GET /api/technicians`
- [ ] `GET /api/technicians/:id`
- [ ] `GET /api/categories`
- [ ] Service detail endpoint verified or marked absent.
- [ ] Public review list endpoint verified or marked absent.
- [ ] Search query parameters verified.
- [ ] Filter query parameters verified.
- [ ] Sort query parameters verified.
- [ ] Pagination parameters verified.

### Customer bookings

- [ ] `POST /api/bookings`
- [ ] `GET /api/bookings`
- [ ] `GET /api/bookings/:id`
- [ ] Customer cancellation endpoint verified or marked absent.
- [ ] Customer booking filters verified.
- [ ] Booking detail related-object shape verified.
- [ ] Duplicate booking behavior verified.
- [ ] Availability conflict behavior verified.

### Payments

- [ ] `POST /api/payments/create`
- [ ] `POST /api/payments/confirm`
- [ ] `GET /api/payments`
- [ ] `GET /api/payments/:id`
- [ ] Supported payment providers verified.
- [ ] Payment callback/redirect URL requirements verified.
- [ ] Server-side payment verification flow verified.
- [ ] Pending payment behavior verified.
- [ ] Duplicate payment prevention verified.
- [ ] Refund behavior verified or marked absent.

### Technician

- [ ] `PUT /api/technician/profile`
- [ ] `PUT /api/technician/availability`
- [ ] `GET /api/technician/bookings`
- [ ] `PATCH /api/technician/bookings/:id`
- [ ] Technician profile read endpoint verified.
- [ ] Technician service CRUD endpoints verified or marked absent.
- [ ] Availability read endpoint verified.
- [ ] Availability replacement/patch semantics verified.
- [ ] Allowed status transition request body verified.
- [ ] Technician earnings endpoint verified or marked absent.

### Reviews

- [ ] `POST /api/reviews`
- [ ] Public technician review list endpoint verified.
- [ ] Current-user review list endpoint verified or marked absent.
- [ ] Review update endpoint verified or marked absent.
- [ ] Review delete endpoint verified or marked absent.
- [ ] One-review-per-booking behavior verified.

### Admin

- [ ] `GET /api/admin/users`
- [ ] `PATCH /api/admin/users/:id`
- [ ] `GET /api/admin/bookings`
- [ ] `GET /api/admin/categories`
- [ ] `POST /api/admin/categories`
- [ ] Category update endpoint verified or marked absent.
- [ ] Category delete/deactivate endpoint verified or marked absent.
- [ ] Admin dashboard metrics endpoint verified or marked absent.
- [ ] Admin payment endpoint verified or marked absent.
- [ ] Admin review moderation endpoint verified or marked absent.
- [ ] Admin user detail endpoint verified or marked absent.

## 0.6 Complete the API contract matrix

Create `docs/api-contract.md` with one row per operation.

- [ ] Operation name
- [ ] Method
- [ ] Exact path
- [ ] Access role
- [ ] Authentication mode
- [ ] Request headers
- [ ] Path parameters
- [ ] Query parameters
- [ ] Request body schema
- [ ] Success status
- [ ] Success body schema
- [ ] Error statuses
- [ ] Error body examples
- [ ] Pagination semantics
- [ ] Cache strategy
- [ ] Cache invalidation
- [ ] UI consumers
- [ ] Side effects
- [ ] Idempotency notes
- [ ] Open questions
- [ ] Verified date and backend version/commit

## 0.7 Confirm domain enums and lifecycle

- [ ] Confirm user role enum.
- [ ] Confirm user status enum.
- [ ] Confirm booking status enum.
- [ ] Confirm payment status enum.
- [ ] Confirm payment provider enum.
- [ ] Confirm pricing-unit enum.
- [ ] Confirm cancellation status name.
- [ ] Confirm booking status transition matrix.
- [ ] Confirm which role may perform each transition.
- [ ] Confirm whether payment occurs before or after technician acceptance.
- [ ] Confirm whether `PAID` is a booking status, payment status, or both.
- [ ] Confirm whether a technician can start an unpaid booking.
- [ ] Confirm whether an admin can override status.
- [ ] Confirm whether a customer can cancel after acceptance.
- [ ] Confirm review eligibility.
- [ ] Confirm availability slot model.
- [ ] Confirm whether a technician can serve multiple categories.
- [ ] Confirm whether a service belongs to a technician, category, or both.
- [ ] Add unknown-enum fallback behavior to the design.

## 0.8 Phase 0 gate

Do not proceed to production wiring until all are true:

- [ ] The user-provided backend path was accessible.
- [ ] The server entry point and route-registration chain were traced.
- [ ] `docs/backend-inspection.md` was created without secrets or an absolute machine path.

- [ ] Authentication mode is known.
- [ ] Role values are known.
- [ ] Core response envelope is known.
- [ ] Core entity response schemas are captured.
- [ ] Booking status transitions are known.
- [ ] Payment verification behavior is known.
- [ ] Pagination semantics are known.
- [ ] Unsupported desired features are documented.
- [ ] No secret is committed.

---

# Phase 1 — Repository and Tooling Bootstrap

## 1.1 Create the application

- [ ] Create a Next.js App Router project with TypeScript.
- [ ] Use `src/` directory.
- [ ] Use pnpm.
- [ ] Enable ESLint.
- [ ] Enable Tailwind CSS.
- [ ] Configure import alias `@/*`.
- [ ] Pin a supported Node.js version.
- [ ] Add `.nvmrc` or equivalent runtime declaration.
- [ ] Add `packageManager` to `package.json`.
- [ ] Confirm local development runs.
- [ ] Confirm production build runs.
- [ ] Confirm TypeScript strict mode.
- [ ] Add `noUncheckedIndexedAccess` if practical.
- [ ] Add `exactOptionalPropertyTypes` if practical and compatible.
- [ ] Remove starter page and unused assets.
- [ ] Add repository README shell.

## 1.2 Install approved dependencies

### UI

- [ ] shadcn/ui initialized.
- [ ] Radix-based primitives added as needed.
- [ ] Lucide React installed.
- [ ] Sonner installed.
- [ ] `class-variance-authority` installed.
- [ ] `clsx`/`tailwind-merge` or the shadcn `cn` utility configured.
- [ ] `next-themes` installed.
- [ ] Recharts installed only if confirmed useful.
- [ ] Date/calendar dependency selected deliberately.

### Data and forms

- [ ] TanStack Query v5 installed.
- [ ] TanStack Query Devtools limited to development.
- [ ] Zustand installed.
- [ ] React Hook Form installed.
- [ ] Zod v4 installed.
- [ ] Hook-form Zod resolver installed.
- [ ] `date-fns` installed.

### Motion

- [ ] Motion for React installed.
- [ ] Lottie React installed.
- [ ] GSAP installed only when the landing design requires it.
- [ ] Lenis installed only when tested need is confirmed.

### Testing

- [ ] Vitest configured.
- [ ] React Testing Library configured.
- [ ] `@testing-library/user-event` configured.
- [ ] MSW configured.
- [ ] Playwright configured.
- [ ] Accessibility testing dependency configured.
- [ ] Coverage output configured.

## 1.3 Add scripts

- [ ] `dev`
- [ ] `build`
- [ ] `start`
- [ ] `lint`
- [ ] `lint:fix`
- [ ] `typecheck`
- [ ] `test`
- [ ] `test:watch`
- [ ] `test:coverage`
- [ ] `test:e2e`
- [ ] `test:e2e:ui`
- [ ] `format`
- [ ] `format:check`
- [ ] `check` combining lint, typecheck, unit tests, and build where practical
- [ ] `test:contract` or `api:contract:test` script if feasible

## 1.4 Code quality setup

- [ ] Configure Prettier.
- [ ] Configure Tailwind class sorting if used.
- [ ] Configure import order.
- [ ] Configure lint rules for hooks.
- [ ] Configure lint rules against accidental `any`.
- [ ] Configure rule/convention preventing raw `fetch` outside `src/services/http`.
- [ ] Add `lint-staged` only when team workflow benefits.
- [ ] Add a pre-commit hook only when it does not make commits fragile.
- [ ] Add `.editorconfig`.
- [ ] Add `.gitignore`.
- [ ] Add a pull request template with accessibility/responsive/API checks.

## 1.5 Environment management

- [ ] Create `.env.example`.
- [ ] Add server-only `API_BASE_URL`.
- [ ] Add public `NEXT_PUBLIC_APP_URL`.
- [ ] Add public API URL only when direct browser-to-Express mode is selected.
- [ ] Add default currency configuration.
- [ ] Add default timezone configuration.
- [ ] Add payment return URLs if required.
- [ ] Validate all environment variables with Zod.
- [ ] Fail fast on invalid production environment.
- [ ] Never expose backend secrets through `NEXT_PUBLIC_`.
- [ ] Document every variable in README.
- [ ] Configure local, preview, and production values.

## 1.6 Create folder structure

- [ ] `src/app`
- [ ] `src/components/ui`
- [ ] `src/components/layout`
- [ ] `src/components/feedback`
- [ ] `src/components/data-display`
- [ ] `src/components/forms`
- [ ] `src/components/brand`
- [ ] `src/config`
- [ ] `src/contracts/api`
- [ ] `src/domain/models`
- [ ] `src/domain/enums`
- [ ] `src/domain/mappers`
- [ ] `src/domain/policies`
- [ ] `src/domain/formatters`
- [ ] `src/features`
- [ ] `src/services/http`
- [ ] `src/services/api`
- [ ] `src/lib/auth`
- [ ] `src/lib/query`
- [ ] `src/lib/dates`
- [ ] `src/lib/validation`
- [ ] `src/state`
- [ ] `src/styles`
- [ ] `src/test`
- [ ] `docs`
- [ ] `e2e`

## 1.7 Phase 1 gate

- [ ] Fresh clone can install with one command.
- [ ] Development server starts.
- [ ] Production build succeeds.
- [ ] Typecheck succeeds.
- [ ] Lint succeeds.
- [ ] Unit-test runner succeeds.
- [ ] Playwright boots.
- [ ] Environment validation works.
- [ ] No unnecessary dependency is installed.

---

# Phase 2 — Design System, Theme, and Brand Foundation

## 2.1 Define visual tokens

- [ ] Create `src/styles/tokens.css`.
- [ ] Define semantic background tokens.
- [ ] Define semantic foreground tokens.
- [ ] Define surface levels.
- [ ] Define muted colors.
- [ ] Define border colors.
- [ ] Define brand colors.
- [ ] Define accent colors.
- [ ] Define success colors.
- [ ] Define warning colors.
- [ ] Define danger colors.
- [ ] Define focus-ring color.
- [ ] Define chart colors.
- [ ] Define status colors.
- [ ] Define spacing conventions.
- [ ] Define radius scale.
- [ ] Define shadow scale.
- [ ] Define typography scale.
- [ ] Define z-index layers.
- [ ] Define motion duration/easing tokens.
- [ ] Use OKLCH or another deliberate accessible color space.
- [ ] Verify light-mode contrast.
- [ ] Verify dark-mode contrast.
- [ ] Avoid hard-coded palette colors in feature components.

## 2.2 Tailwind v4 theme integration

- [ ] Map semantic CSS variables into Tailwind theme variables.
- [ ] Add utility aliases for surfaces.
- [ ] Add utility aliases for semantic text.
- [ ] Add utility aliases for semantic borders.
- [ ] Add container-width utilities.
- [ ] Add fluid page-padding utility.
- [ ] Add text-balance utilities where useful.
- [ ] Ensure dynamic class generation is avoided.
- [ ] Document how to re-theme the site centrally.

## 2.3 Font system

- [ ] Select a variable UI font.
- [ ] Load through `next/font`.
- [ ] Limit weights.
- [ ] Define heading and body roles.
- [ ] Add tabular-numeral utility for metrics/money.
- [ ] Verify Bengali glyph support if Bengali localization is expected.
- [ ] Verify no layout shift from font loading.
- [ ] Test long headings and names.

## 2.4 Theme provider

- [ ] Add one root `ThemeProvider`.
- [ ] Enable system preference.
- [ ] Persist explicit preference.
- [ ] Add mounted-safe theme switcher.
- [ ] Add `<html suppressHydrationWarning>`.
- [ ] Set `color-scheme`.
- [ ] Prevent theme flash.
- [ ] Verify popovers/portals inherit theme.
- [ ] Verify system theme changes while app is open.
- [ ] Verify dark logo variant.
- [ ] Verify reduced-motion and theme preference do not conflict.

## 2.5 Brand logo

- [ ] Sketch at least three simple logo concepts.
- [ ] Select one combining home/service/speed/check concepts.
- [ ] Ensure the mark reads at 16–24px.
- [ ] Create `fixitnow-mark.svg`.
- [ ] Create light wordmark.
- [ ] Create dark wordmark.
- [ ] Create favicon SVG.
- [ ] Create app icon variants if PWA is used.
- [ ] Remove unnecessary SVG metadata.
- [ ] Ensure SVG has accessible title only where appropriate.
- [ ] Ensure decorative logo instances have correct accessibility behavior.
- [ ] Add logo usage component.
- [ ] Add compact mark-only variant.
- [ ] Add brand asset preview page in development or Storybook-like route if useful.

## 2.6 Lottie logo

- [ ] Create vector-only Lottie JSON.
- [ ] Keep file optimized.
- [ ] Avoid external fonts.
- [ ] Avoid external raster images.
- [ ] Animate house/tool path.
- [ ] Add subtle motion cue.
- [ ] Add completion/check cue.
- [ ] Keep single-play duration near 0.9–1.4 seconds.
- [ ] Loop only in full-screen loader.
- [ ] Add static SVG fallback.
- [ ] Add reduced-motion fallback.
- [ ] Test light mode.
- [ ] Test dark mode.
- [ ] Test low-end mobile.
- [ ] Test hydration.
- [ ] Verify no layout shift.
- [ ] Add `BrandMotionLogo` component.
- [ ] Add `FullScreenBrandLoader` component.

## 2.7 Core UI primitives

Create or customize only needed primitives.

- [ ] Button
- [ ] Icon button
- [ ] Link button
- [ ] Input
- [ ] Textarea
- [ ] Password input
- [ ] Phone input if needed
- [ ] Number/currency input
- [ ] Checkbox
- [ ] Radio group
- [ ] Switch
- [ ] Select
- [ ] Combobox
- [ ] Date picker
- [ ] Time picker
- [ ] Calendar
- [ ] Dialog
- [ ] Alert dialog
- [ ] Sheet
- [ ] Dropdown menu
- [ ] Tooltip
- [ ] Popover
- [ ] Accordion
- [ ] Tabs
- [ ] Segmented control
- [ ] Badge/status badge
- [ ] Avatar
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Table
- [ ] Skeleton
- [ ] Progress
- [ ] Separator
- [ ] Toast
- [ ] Form field wrapper
- [ ] Inline alert
- [ ] Empty state
- [ ] Error state
- [ ] Loading button
- [ ] Search input
- [ ] Filter chip
- [ ] Responsive filter sheet

## 2.8 Primitive quality checks

For every primitive:

- [ ] Keyboard behavior works.
- [ ] Focus ring is visible.
- [ ] Disabled state is distinguishable.
- [ ] Pending state is supported where relevant.
- [ ] Light mode works.
- [ ] Dark mode works.
- [ ] 200% zoom works.
- [ ] Mobile touch target is adequate.
- [ ] Long text does not break layout.
- [ ] Icons do not use automatic square backgrounds.
- [ ] Radius matches design language.
- [ ] Hover does not replace focus.
- [ ] Reduced motion is respected.
- [ ] Component API does not contain excessive booleans.

## 2.9 Shared layout components

- [ ] Marketing header
- [ ] Marketing mobile navigation
- [ ] Marketing footer
- [ ] Page container
- [ ] Section shell
- [ ] Section heading
- [ ] Dashboard shell
- [ ] Dashboard sidebar
- [ ] Dashboard mobile navigation
- [ ] Dashboard top bar
- [ ] Dashboard page header
- [ ] Dashboard content container
- [ ] User menu
- [ ] Role label
- [ ] Skip link
- [ ] Theme toggle

## 2.10 Phase 2 gate

- [ ] Brand is recognizable without relying on text.
- [ ] Theme can be substantially changed from token files.
- [ ] Dark mode covers all primitives.
- [ ] No default shadcn visual identity remains unchecked.
- [ ] No icon is automatically placed in a square tile.
- [ ] Buttons are rounded but mostly not pills.
- [ ] Primitive accessibility smoke tests pass.
- [ ] Lottie has a static and reduced-motion fallback.

---

# Phase 3 — HTTP, Contracts, Services, Caching, and State

## 3.1 HTTP error model

- [ ] Create `ApiError`.
- [ ] Preserve HTTP status.
- [ ] Preserve safe error code.
- [ ] Preserve safe validation details.
- [ ] Preserve request ID.
- [ ] Add helpers for 401/403/409/422/429/5xx.
- [ ] Add a safe fallback message.
- [ ] Never expose stack traces.
- [ ] Unit-test error construction.
- [ ] Unit-test unknown response bodies.

## 3.2 Core HTTP client

- [ ] Create URL joiner.
- [ ] Create safe query serializer.
- [ ] Support arrays according to backend convention.
- [ ] Support JSON body.
- [ ] Support `FormData`.
- [ ] Support `204`.
- [ ] Support JSON response.
- [ ] Support text/non-JSON error response.
- [ ] Add request timeout.
- [ ] Merge caller `AbortSignal`.
- [ ] Add credentials according to auth mode.
- [ ] Add authorization server-side according to auth mode.
- [ ] Do not log sensitive headers.
- [ ] Normalize API envelope.
- [ ] Throw `ApiError` on non-2xx.
- [ ] Throw `ApiError` on `success: false` if applicable.
- [ ] Validate response with optional Zod schema.
- [ ] Add safe malformed-response error.
- [ ] Add tests for all response types.
- [ ] Add tests for aborted requests.
- [ ] Add tests for timeout.
- [ ] Add tests for validation failure.
- [ ] Add tests for query encoding.

## 3.3 Browser and server clients

- [ ] Create browser HTTP client.
- [ ] Create server HTTP client.
- [ ] Keep server-only imports out of Client Components.
- [ ] Add BFF allowlist when Auth Mode B is used.
- [ ] Validate forwarded paths.
- [ ] Validate allowed methods.
- [ ] Strip unsafe headers.
- [ ] Enforce request-body size.
- [ ] Preserve status codes.
- [ ] Preserve safe response headers.
- [ ] Forward request ID.
- [ ] Add route tests for BFF handlers.
- [ ] Confirm no open-proxy behavior.

## 3.4 Raw API contracts

Create Zod schemas matching actual responses.

- [ ] common envelope
- [ ] pagination metadata
- [ ] auth login response
- [ ] auth register response
- [ ] current user
- [ ] user
- [ ] address
- [ ] category
- [ ] service
- [ ] technician profile
- [ ] availability slot
- [ ] booking
- [ ] payment
- [ ] review
- [ ] admin metric response
- [ ] backend field-error variants
- [ ] unknown enum fallback strategy

For every contract:

- [ ] Success fixture parses.
- [ ] Missing required field fails clearly.
- [ ] Nullable fields match reality.
- [ ] Date strings are checked.
- [ ] Numeric strings are normalized only when backend actually returns them.
- [ ] No broad `.passthrough()` without a reason.
- [ ] No schema silently converts invalid critical fields.

## 3.5 Domain models and mappers

- [ ] Create normalized user model.
- [ ] Create normalized technician model.
- [ ] Create normalized category model.
- [ ] Create normalized service model.
- [ ] Create normalized availability model.
- [ ] Create normalized booking model.
- [ ] Create normalized payment model.
- [ ] Create normalized review model.
- [ ] Normalize role casing.
- [ ] Normalize status casing.
- [ ] Normalize optional/nullable values.
- [ ] Normalize timestamps.
- [ ] Normalize numeric values.
- [ ] Preserve raw ID identity.
- [ ] Add mapper unit tests.
- [ ] Add unknown status test.
- [ ] Keep backend field names out of components.

## 3.6 Route builders

- [ ] Create centralized API path builders.
- [ ] Encode path parameters.
- [ ] Avoid duplicated literal endpoint strings.
- [ ] Add unit tests for path builders.
- [ ] Document API prefix handling.

## 3.7 Domain services

### Auth service

- [ ] register
- [ ] login
- [ ] current user
- [ ] logout if supported
- [ ] refresh if supported
- [ ] forgot/reset password only if supported
- [ ] update profile only if supported

### Category service

- [ ] list public categories
- [ ] admin list
- [ ] create
- [ ] update if supported
- [ ] delete/deactivate if supported

### Service service

- [ ] list/filter services
- [ ] detail if supported
- [ ] technician create/update/delete if supported

### Technician service

- [ ] list/filter technicians
- [ ] technician detail
- [ ] update own profile
- [ ] read availability
- [ ] update availability
- [ ] list own reviews if supported

### Booking service

- [ ] create
- [ ] current-user list
- [ ] detail
- [ ] customer cancel if supported
- [ ] technician list
- [ ] technician status update
- [ ] admin list
- [ ] admin detail if supported

### Payment service

- [ ] create payment
- [ ] confirm/verify
- [ ] current-user list
- [ ] detail
- [ ] admin list if supported

### Review service

- [ ] create
- [ ] list public reviews if supported
- [ ] current-user list if supported
- [ ] update/delete only if supported

For every service function:

- [ ] Accept typed input.
- [ ] Accept abort signal for reads.
- [ ] Validate response.
- [ ] Map DTO to domain model.
- [ ] Contain no React hooks.
- [ ] Contain no toast.
- [ ] Contain no navigation.
- [ ] Contain no Zustand mutation.
- [ ] Contain no JSX.
- [ ] Add service-level tests with mocked HTTP client.

## 3.8 TanStack Query provider

- [ ] Create stable client instance.
- [ ] Configure sensible default stale time.
- [ ] Configure retry policy.
- [ ] Disable mutation retries by default.
- [ ] Avoid sensitive cache persistence.
- [ ] Add development devtools.
- [ ] Add error-boundary integration where useful.
- [ ] Configure refetch-on-focus deliberately.
- [ ] Configure network mode deliberately.
- [ ] Add query provider at the correct boundary.
- [ ] Confirm no new QueryClient is created each render.

## 3.9 Query key factories

- [ ] auth keys
- [ ] category keys
- [ ] service keys
- [ ] technician keys
- [ ] booking keys
- [ ] payment keys
- [ ] review keys
- [ ] admin user keys
- [ ] admin metric keys

For every key:

- [ ] Broad root key exists.
- [ ] List/detail keys are distinct.
- [ ] Filters are stable and serializable.
- [ ] Undefined/default values are normalized.
- [ ] Detail IDs are included.
- [ ] Unit tests verify equivalent filters produce equivalent keys.

## 3.10 Query options/hooks

- [ ] current user
- [ ] category list
- [ ] service list
- [ ] service detail if supported
- [ ] technician list
- [ ] technician detail
- [ ] technician reviews
- [ ] customer booking list
- [ ] booking detail
- [ ] technician booking list
- [ ] admin booking list
- [ ] payment list
- [ ] payment detail
- [ ] admin users
- [ ] admin categories
- [ ] admin metrics if supported

For every query:

- [ ] Correct query key.
- [ ] Correct service function.
- [ ] Correct enabled condition.
- [ ] Correct stale time.
- [ ] Abort signal is forwarded.
- [ ] Pagination is retained correctly.
- [ ] Placeholder data is used only when beneficial.
- [ ] Error state is testable.
- [ ] Empty state is distinguishable from loading.

## 3.11 Mutation hooks

- [ ] register
- [ ] login
- [ ] logout
- [ ] update user profile if supported
- [ ] create booking
- [ ] cancel booking if supported
- [ ] create payment
- [ ] verify payment
- [ ] create review
- [ ] update technician profile
- [ ] update availability
- [ ] create/update/delete technician service if supported
- [ ] update technician booking status
- [ ] ban/unban user
- [ ] create category
- [ ] update/delete category if supported

For every mutation:

- [ ] Pending state.
- [ ] Duplicate-submit protection.
- [ ] Targeted invalidation.
- [ ] Detail cache update when safe.
- [ ] List invalidation.
- [ ] Error normalization.
- [ ] Form field-error mapping where relevant.
- [ ] `401` behavior.
- [ ] `403` behavior.
- [ ] `409` behavior.
- [ ] No unsafe optimistic update.
- [ ] Success toast or inline confirmation.
- [ ] No automatic high-risk retry.

## 3.12 Zustand stores

- [ ] Dashboard UI store.
- [ ] Booking draft store if multi-step flow is used.
- [ ] Search/filter drawer state if necessary.
- [ ] Persist only safe UI preferences.
- [ ] Do not persist tokens.
- [ ] Do not persist remote lists.
- [ ] Do not persist payment details.
- [ ] Add store reset on logout.
- [ ] Add store unit tests.
- [ ] Avoid one giant app store.

## 3.13 Phase 3 gate

- [ ] Grep finds no raw `fetch` outside the allowed HTTP layer/Next internals.
- [ ] Components import feature hooks, not API paths.
- [ ] Critical API responses are runtime-validated.
- [ ] Query keys are centralized.
- [ ] Server state is absent from Zustand.
- [ ] Error handling is consistent.
- [ ] Service tests pass.
- [ ] No token is browser-readable.

---

# Phase 4 — Authentication and Role Protection

## 4.1 Auth pages

### Login

- [ ] Build responsive login layout.
- [ ] Add logo.
- [ ] Add email field.
- [ ] Add password field.
- [ ] Add password visibility control.
- [ ] Add correct autocomplete.
- [ ] Add accessible labels/descriptions.
- [ ] Add client validation.
- [ ] Map server authentication error.
- [ ] Preserve entered email after failure.
- [ ] Add pending state.
- [ ] Prevent duplicate submit.
- [ ] Sanitize `returnTo`.
- [ ] Redirect by role after success.
- [ ] Add link to registration.
- [ ] Add forgot-password link only if supported.
- [ ] Test dark mode.
- [ ] Test mobile keyboard.
- [ ] Test keyboard-only flow.

### Registration

- [ ] Build Customer/Technician role selection.
- [ ] Exclude Admin.
- [ ] Explain role differences.
- [ ] Add required fields from API.
- [ ] Add confirm password client-only field.
- [ ] Add password policy matching backend.
- [ ] Add terms acceptance only if actual policy pages exist.
- [ ] Add server field-error mapping.
- [ ] Add duplicate email behavior.
- [ ] Add pending state.
- [ ] Redirect based on real backend behavior.
- [ ] Handle technician profile-completion requirement.
- [ ] Test light/dark/mobile/keyboard.

## 4.2 Session utilities

- [ ] Create canonical server `getSessionUser()`.
- [ ] Create browser session query if needed.
- [ ] Avoid duplicate `/me` calls.
- [ ] Add safe session cache behavior.
- [ ] Add logout cleanup.
- [ ] Clear Query cache on logout.
- [ ] Reset Zustand stores on logout.
- [ ] Redirect to login after logout.
- [ ] Handle expired session.
- [ ] Handle malformed session user.
- [ ] Handle banned/suspended account.
- [ ] Add tests.

## 4.3 Proxy and layout protection

- [ ] Create `src/proxy.ts` when appropriate.
- [ ] Match only protected paths.
- [ ] Keep proxy logic lightweight.
- [ ] Add coarse unauthenticated redirect.
- [ ] Add safe role path handling if signed role information is available.
- [ ] Perform authoritative role check in server layout.
- [ ] Redirect `/dashboard` to role home.
- [ ] Add dedicated forbidden state.
- [ ] Avoid redirect loops.
- [ ] Preserve safe return URL.
- [ ] Block external/open redirects.
- [ ] Add direct-navigation tests.
- [ ] Add role mismatch tests.

## 4.4 Dashboard navigation by role

- [ ] Create navigation config by role.
- [ ] Hide unsupported pages.
- [ ] Add active-route state.
- [ ] Add mobile navigation.
- [ ] Add role label.
- [ ] Add user menu.
- [ ] Add logout.
- [ ] Add profile route only if supported/read-only state is designed.
- [ ] Add noindex metadata.
- [ ] Verify browser back/forward.
- [ ] Verify keyboard navigation.

## 4.5 Auth error UX

- [ ] `401` logs out locally and redirects.
- [ ] `403` does not automatically destroy valid session.
- [ ] `409` preserves form state.
- [ ] Banned user sees account-status page.
- [ ] Session expiry during form preserves safe values.
- [ ] Session expiry during payment gives recovery guidance.
- [ ] Raw tokens are never displayed.
- [ ] Support/contact information is truthful.

## 4.6 Phase 4 gate

- [ ] Public visitor cannot open dashboard routes.
- [ ] Customer cannot open Technician/Admin routes.
- [ ] Technician cannot open Customer/Admin routes.
- [ ] Admin cannot accidentally see self-registration option.
- [ ] Authenticated user is redirected away from login when appropriate.
- [ ] Logout clears all private client state.
- [ ] No open redirect exists.
- [ ] No token appears in storage, URL, logs, or Query cache.

---

# Phase 5 — Public Website and Landing Page

## 5.1 Marketing shell

- [ ] Build responsive header.
- [ ] Add sticky/scrolled header state.
- [ ] Add accessible mobile sheet.
- [ ] Add Services navigation.
- [ ] Add Technicians navigation.
- [ ] Add How It Works navigation.
- [ ] Add About navigation.
- [ ] Add theme toggle.
- [ ] Add Login action.
- [ ] Add Book a Service primary action.
- [ ] Build footer.
- [ ] Add legal links.
- [ ] Add social links only when real.
- [ ] Add contact information only when real.
- [ ] Verify focus and scroll behavior.

## 5.2 Landing hero

- [ ] Write clear product headline.
- [ ] Write concise supporting copy.
- [ ] Add primary booking/discovery CTA.
- [ ] Add Technician registration CTA.
- [ ] Add service/location search only for supported filters.
- [ ] Use a proper service photograph.
- [ ] Optimize hero image.
- [ ] Add responsive art direction if needed.
- [ ] Add truthful trust signals.
- [ ] Avoid unsupported claims.
- [ ] Add one-time entrance animation.
- [ ] Add reduced-motion version.
- [ ] Preserve usable first paint without JavaScript animation.
- [ ] Verify LCP.
- [ ] Verify mobile crop.
- [ ] Verify dark mode.

## 5.3 Service categories section

- [ ] Load real categories.
- [ ] Add shape-matched skeleton.
- [ ] Add API error state.
- [ ] Add empty state.
- [ ] Show primary categories.
- [ ] Add View All.
- [ ] Use line icons without square backgrounds.
- [ ] Use category imagery only when coherent.
- [ ] Add accessible links.
- [ ] Test mobile horizontal behavior if used.
- [ ] Avoid excessive card styling.

## 5.4 How It Works section

- [ ] Create three-step story.
- [ ] Use open composition instead of three generic cards.
- [ ] Add connector or progress visual.
- [ ] Add subtle scroll-triggered animation.
- [ ] Add reduced-motion static state.
- [ ] Ensure steps remain understandable without animation.
- [ ] Use actual product lifecycle language.
- [ ] Avoid unsupported policy promises.

## 5.5 Featured technicians

- [ ] Define API-backed selection method.
- [ ] Do not claim “top rated” without valid sort/data.
- [ ] Add technician image/avatar.
- [ ] Add name.
- [ ] Add specialization.
- [ ] Add rating and review count only when available.
- [ ] Add price semantics only when known.
- [ ] Add location/service area only when available.
- [ ] Add availability only when reliable.
- [ ] Add skeleton.
- [ ] Add empty state.
- [ ] Add responsive layout.
- [ ] Make entire item keyboard accessible.
- [ ] Avoid fake verification badges.

## 5.6 Trust and safety section

- [ ] Add truthful feature statements.
- [ ] Explain booking visibility.
- [ ] Explain provider-based payment without overstating protection.
- [ ] Explain review-after-completion behavior.
- [ ] Add professional supporting image.
- [ ] Avoid claims of background checks/insurance/guarantees unless verified.
- [ ] Verify copy with product owner/backend behavior.

## 5.7 Booking journey showcase

- [ ] Visualize status sequence.
- [ ] Match actual enum names.
- [ ] Add animated progress on scroll.
- [ ] Add reduced-motion static timeline.
- [ ] Ensure contrast.
- [ ] Avoid presenting a fake interactive dashboard control.
- [ ] Add link to start booking.

## 5.8 Reviews/testimonials section

- [ ] Confirm public reviews endpoint.
- [ ] Use real reviews if available.
- [ ] Remove development placeholder testimonials before production.
- [ ] Do not fabricate names or claims.
- [ ] Add skeleton/error/empty states.
- [ ] Truncate long content accessibly.
- [ ] Link to technician profile where appropriate.

## 5.9 Technician CTA

- [ ] Explain Technician value proposition truthfully.
- [ ] Explain profile/availability/booking workflow.
- [ ] Add Technician registration CTA.
- [ ] Add appropriate service-professional image.
- [ ] Keep visual distinct from pricing cards.
- [ ] Add responsive layout.
- [ ] Add restrained motion.

## 5.10 FAQ

- [ ] Add actual booking question.
- [ ] Add payment timing question.
- [ ] Add cancellation question only after policy verified.
- [ ] Add Technician registration question.
- [ ] Add review eligibility question.
- [ ] Use accessible accordion.
- [ ] Deep-link or preserve focus correctly.
- [ ] Avoid unsupported guarantees.

## 5.11 Public service listing

- [ ] Add page metadata.
- [ ] Fetch service/category data server-side where useful.
- [ ] Add search.
- [ ] Add supported filters.
- [ ] Add sort only when backend supports it.
- [ ] Synchronize filters to URL.
- [ ] Debounce free-text search.
- [ ] Add pagination.
- [ ] Add skeleton.
- [ ] Add empty state with clear filters.
- [ ] Add retry state.
- [ ] Add mobile filter sheet.
- [ ] Add responsive result layout.
- [ ] Preserve filter state on back navigation.

## 5.12 Public service detail

- [ ] Build only if detail data exists.
- [ ] Add title.
- [ ] Add category.
- [ ] Add description.
- [ ] Add pricing semantics.
- [ ] Add image.
- [ ] Add technician relationship.
- [ ] Add Book action.
- [ ] Add metadata.
- [ ] Add 404.
- [ ] Add unavailable/inactive state.
- [ ] Add related services only if available efficiently.

## 5.13 Public technician listing

- [ ] Add metadata.
- [ ] Add search.
- [ ] Add supported category/skill filters.
- [ ] Add supported price/rating/location filters.
- [ ] Do not show filters unsupported by API.
- [ ] Add URL synchronization.
- [ ] Add pagination.
- [ ] Add skeleton.
- [ ] Add empty state.
- [ ] Add retry.
- [ ] Add mobile filters.
- [ ] Add responsive layout.

## 5.14 Technician detail

- [ ] Fetch by exact identifier.
- [ ] Add name/avatar.
- [ ] Add headline/bio.
- [ ] Add skills.
- [ ] Add experience.
- [ ] Add service area.
- [ ] Add services.
- [ ] Add pricing.
- [ ] Add rating/review count.
- [ ] Add reviews.
- [ ] Add availability if public.
- [ ] Add Book action for Customers.
- [ ] Add Login-to-book for visitors.
- [ ] Prevent Technician/Admin booking action.
- [ ] Add metadata.
- [ ] Add 404/unavailable state.
- [ ] Add skeleton for client-updated sections.
- [ ] Verify long profile content.
- [ ] Verify mobile.

## 5.15 Static pages

- [ ] How It Works
- [ ] About
- [ ] Contact
- [ ] Privacy
- [ ] Terms
- [ ] 404
- [ ] 403
- [ ] Generic service error page
- [ ] Ensure all copy is truthful and project-specific.
- [ ] Add metadata.
- [ ] Add responsive layouts.
- [ ] Add dark mode.
- [ ] Add accessible headings.

## 5.16 Phase 5 gate

- [ ] Landing page does not look like a generic SaaS template.
- [ ] Hero uses a high-quality relevant image.
- [ ] Service discovery is obvious.
- [ ] No fake reviews or claims remain.
- [ ] Public pages are indexable and have metadata.
- [ ] Public data has loading/error/empty treatment.
- [ ] Mobile landing page performs well.
- [ ] Reduced motion preserves the design.
- [ ] Dark mode is complete.

---

# Phase 6 — Customer Panel

## 6.1 Customer dashboard overview

- [ ] Create role-specific page title/greeting.
- [ ] Load upcoming booking.
- [ ] Load active booking count.
- [ ] Load completed booking count.
- [ ] Load pending payment/review prompt if data permits.
- [ ] Avoid expensive client-side aggregation over all data.
- [ ] Add primary Browse Services action.
- [ ] Add upcoming booking focus section.
- [ ] Add compact metrics.
- [ ] Add recent activity.
- [ ] Add skeleton matching final layout.
- [ ] Add empty-first-user state.
- [ ] Add scoped retry.
- [ ] Add responsive stacking.
- [ ] Add dark mode.
- [ ] Avoid unnecessary charts.

## 6.2 Booking entry points

- [ ] Book from service listing.
- [ ] Book from service detail.
- [ ] Book from technician detail.
- [ ] Preserve selected service/technician safely.
- [ ] Redirect visitor to login with safe return path.
- [ ] Return authenticated Customer to booking context.
- [ ] Prevent non-Customer role from entering booking flow.
- [ ] Handle inactive service/technician.
- [ ] Handle missing preselection.

## 6.3 Booking wizard

### Step 1 — Service

- [ ] Select category/service.
- [ ] Show price semantics.
- [ ] Show service description.
- [ ] Validate required selection.
- [ ] Preserve draft.
- [ ] Load skeleton/error/empty states.

### Step 2 — Technician and time

- [ ] Select technician when not preselected.
- [ ] Load supported availability.
- [ ] Display timezone.
- [ ] Disable unavailable slots.
- [ ] Validate future time.
- [ ] Validate selection.
- [ ] Recheck availability on submit.
- [ ] Handle no availability.
- [ ] Handle timezone edge cases.

### Step 3 — Address and details

- [ ] Add exact backend address fields.
- [ ] Add phone/contact field if required.
- [ ] Add service notes.
- [ ] Add field length limits.
- [ ] Add accessible errors.
- [ ] Preserve draft across navigation.
- [ ] Avoid storing sensitive details longer than needed.

### Step 4 — Review and confirm

- [ ] Show service.
- [ ] Show technician.
- [ ] Show date/time/timezone.
- [ ] Show address.
- [ ] Show customer notes.
- [ ] Show server-derived/quoted amount.
- [ ] Explain current booking state.
- [ ] Add edit links to earlier steps.
- [ ] Add Confirm Booking action.
- [ ] Prevent duplicate submit.
- [ ] Show blocking local pending state.
- [ ] Do not use a full-screen loader unless navigation/critical finalization warrants it.
- [ ] Handle validation response.
- [ ] Handle availability conflict.
- [ ] Handle session expiry.
- [ ] On success, clear draft.
- [ ] On success, navigate to confirmation/detail.
- [ ] Invalidate Customer booking queries.

## 6.4 Booking confirmation

- [ ] Show success state.
- [ ] Show booking identifier safely.
- [ ] Show `REQUESTED` or actual returned status.
- [ ] Explain next expected action.
- [ ] Add View Booking.
- [ ] Add Back to Dashboard.
- [ ] Do not imply technician acceptance.
- [ ] Do not imply payment is complete.
- [ ] Add accessible status announcement.

## 6.5 Customer bookings list

- [ ] Add active/completed/cancelled filters.
- [ ] Match real statuses.
- [ ] Add date filter if supported.
- [ ] Add search only if supported/useful.
- [ ] Synchronize filters to URL.
- [ ] Add pagination.
- [ ] Show service.
- [ ] Show technician.
- [ ] Show scheduled date.
- [ ] Show status.
- [ ] Show amount.
- [ ] Show next action.
- [ ] Add skeleton rows/cards.
- [ ] Add empty state.
- [ ] Add error/retry.
- [ ] Add background-refresh indicator.
- [ ] Add mobile stacked layout.
- [ ] Preserve accessible links/actions.

## 6.6 Customer booking detail

- [ ] Load by ID.
- [ ] Verify current user ownership through backend.
- [ ] Show status timeline.
- [ ] Show service summary.
- [ ] Show technician summary.
- [ ] Show scheduled date/time/timezone.
- [ ] Show address.
- [ ] Show notes.
- [ ] Show amount/currency.
- [ ] Show payment summary.
- [ ] Show review summary.
- [ ] Show created/updated time where useful.
- [ ] Add policy-driven action area.
- [ ] Add 404/forbidden distinction.
- [ ] Add skeleton.
- [ ] Add retry.
- [ ] Poll only while status is active when necessary.
- [ ] Stop polling on terminal status.
- [ ] Show Last Updated if polling.
- [ ] Add manual refresh if useful.

## 6.7 Customer cancellation

- [ ] Confirm endpoint exists.
- [ ] Implement `canCustomerCancel`.
- [ ] Hide action for ineligible status.
- [ ] Add confirmation dialog.
- [ ] Explain consequence.
- [ ] Add optional reason only if backend accepts it.
- [ ] Disable while pending.
- [ ] Handle stale `409`.
- [ ] Handle `403`.
- [ ] Update detail cache.
- [ ] Invalidate lists.
- [ ] Announce status change.
- [ ] Add test for cancellation just before status changes.

## 6.8 Customer payments list

- [ ] Confirm list endpoint.
- [ ] Show transaction/reference.
- [ ] Show booking link.
- [ ] Show amount.
- [ ] Show provider.
- [ ] Show status.
- [ ] Show date.
- [ ] Add status filters if supported.
- [ ] Add pagination.
- [ ] Add skeleton.
- [ ] Add empty state.
- [ ] Add retry.
- [ ] Add mobile layout.
- [ ] Avoid displaying sensitive provider details.

## 6.9 Review submission

- [ ] Implement eligibility policy.
- [ ] Show review action only for completed unreviewed booking.
- [ ] Create keyboard-accessible star rating.
- [ ] Add visible rating labels.
- [ ] Add comment field.
- [ ] Add rating validation.
- [ ] Add comment validation.
- [ ] Add pending state.
- [ ] Handle duplicate review conflict.
- [ ] Handle booking not completed.
- [ ] Update booking/detail cache.
- [ ] Invalidate technician reviews/rating.
- [ ] Invalidate customer review list.
- [ ] Show success confirmation.
- [ ] Prevent second submission.

## 6.10 Customer profile

- [ ] Confirm profile read fields.
- [ ] Confirm update endpoint.
- [ ] Build profile view.
- [ ] Build edit mode only when supported.
- [ ] Validate exact editable fields.
- [ ] Add avatar upload only when supported.
- [ ] Add phone/address editing only when supported.
- [ ] Keep email/role read-only when appropriate.
- [ ] Map server field errors.
- [ ] Invalidate current-user query.
- [ ] Update session display.
- [ ] Add dirty-state warning.
- [ ] Create polished read-only state when update is unsupported.

## 6.11 Customer phase gate

- [ ] Customer can complete one full supported booking flow.
- [ ] Booking draft survives step navigation.
- [ ] Booking cannot submit twice.
- [ ] Status actions follow policy and server response.
- [ ] Payment action appears only when eligible.
- [ ] Review action appears only when eligible.
- [ ] Customer cannot access another user’s detail through frontend, and backend denial is handled.
- [ ] All pages support mobile, dark mode, loading, empty, and error states.
- [ ] Customer E2E flow passes.

---

# Phase 7 — Technician Panel

## 7.1 Technician dashboard overview

- [ ] Show profile-completeness state.
- [ ] Show availability state.
- [ ] Show new request count.
- [ ] Show accepted/upcoming jobs.
- [ ] Show in-progress job.
- [ ] Show completed jobs.
- [ ] Show recent reviews.
- [ ] Show earnings only when a reliable endpoint exists.
- [ ] Add primary next action.
- [ ] Add skeleton.
- [ ] Add no-request empty state.
- [ ] Add error/retry.
- [ ] Add responsive layout.
- [ ] Avoid decorative charts without useful data.

## 7.2 Technician profile

- [ ] Load own profile.
- [ ] Add avatar/image if supported.
- [ ] Add headline.
- [ ] Add bio.
- [ ] Add skills.
- [ ] Add experience.
- [ ] Add service area.
- [ ] Add base pricing.
- [ ] Add categories/services relation.
- [ ] Add validation.
- [ ] Add image validation.
- [ ] Add pending state.
- [ ] Map server errors.
- [ ] Add dirty-state warning.
- [ ] Update detail/current-user caches.
- [ ] Add public-profile preview.
- [ ] Handle incomplete profile.
- [ ] Handle unsupported fields gracefully.

## 7.3 Technician services

Only implement CRUD that exists.

- [ ] Confirm create endpoint.
- [ ] Confirm update endpoint.
- [ ] Confirm delete/deactivate endpoint.
- [ ] List current services.
- [ ] Add service form.
- [ ] Add title.
- [ ] Add category.
- [ ] Add description.
- [ ] Add price.
- [ ] Add pricing unit.
- [ ] Add duration.
- [ ] Add image if supported.
- [ ] Add active state if supported.
- [ ] Validate all fields.
- [ ] Handle duplicate/conflict.
- [ ] Add pending state.
- [ ] Add delete/deactivate confirmation.
- [ ] Invalidate public service/technician queries.
- [ ] Hide entire navigation item if service management is unsupported.

## 7.4 Availability editor

- [ ] Confirm read endpoint.
- [ ] Confirm write semantics.
- [ ] Confirm dated vs weekly slots.
- [ ] Confirm timestamp format.
- [ ] Display timezone.
- [ ] Add interval.
- [ ] Edit interval.
- [ ] Remove interval.
- [ ] Validate start before end.
- [ ] Validate future constraints.
- [ ] Detect overlap.
- [ ] Detect duplicates.
- [ ] Add no-availability state.
- [ ] Add loading/error state.
- [ ] Warn if `PUT` replaces all slots.
- [ ] Add unsaved-change warning.
- [ ] Add mobile-friendly controls.
- [ ] Add keyboard support.
- [ ] Add pending state.
- [ ] Map backend conflict.
- [ ] Update caches.
- [ ] Do not implement recurrence unless supported.
- [ ] Do not implement drag-and-drop unless usability and API support justify it.

## 7.5 Technician booking inbox

- [ ] Load Technician bookings.
- [ ] Group/filter by status.
- [ ] Add New Requests.
- [ ] Add Accepted/Upcoming.
- [ ] Add In Progress.
- [ ] Add Completed/Declined.
- [ ] Show customer identity allowed by API.
- [ ] Show service.
- [ ] Show schedule.
- [ ] Show address area.
- [ ] Show amount.
- [ ] Show status.
- [ ] Add pagination.
- [ ] Add skeleton.
- [ ] Add empty state per tab.
- [ ] Add error/retry.
- [ ] Add mobile layout.
- [ ] Add background refresh for actionable states if necessary.

## 7.6 Technician booking detail

- [ ] Load detail.
- [ ] Show booking timeline.
- [ ] Show service.
- [ ] Show customer information allowed by API.
- [ ] Show schedule/timezone.
- [ ] Show address.
- [ ] Show notes.
- [ ] Show amount/payment status.
- [ ] Show action area from policy.
- [ ] Add `REQUESTED` accept action.
- [ ] Add `REQUESTED` decline action.
- [ ] Add start action only when eligible.
- [ ] Add complete action only when eligible.
- [ ] Add confirmation where appropriate.
- [ ] Prevent duplicate action.
- [ ] Handle stale transition `409`.
- [ ] Handle forbidden transition.
- [ ] Update detail cache.
- [ ] Invalidate Technician lists.
- [ ] Invalidate Customer-visible booking where cache scope applies.
- [ ] Announce status change.
- [ ] Poll active detail only when needed.

## 7.7 Technician reviews

- [ ] Confirm review-list data source.
- [ ] Show average rating.
- [ ] Show review count.
- [ ] Show distribution only when enough data exists.
- [ ] Show review list.
- [ ] Show customer name/avatar as allowed.
- [ ] Show service/booking relation as allowed.
- [ ] Add pagination.
- [ ] Add skeleton.
- [ ] Add empty state.
- [ ] Add error/retry.
- [ ] Do not offer edit/delete without API and policy support.

## 7.8 Technician phase gate

- [ ] Technician can complete profile.
- [ ] Technician can manage availability.
- [ ] Technician can receive and act on booking requests.
- [ ] Invalid transitions are unavailable in UI and handled from server.
- [ ] Service management is either fully supported or truthfully omitted.
- [ ] Dashboard does not expose unsupported earnings.
- [ ] Mobile availability and booking actions are usable.
- [ ] Technician E2E flow passes.

---

# Phase 8 — Admin Panel

## 8.1 Admin dashboard overview

- [ ] Confirm metrics endpoint.
- [ ] Use aggregate endpoint when available.
- [ ] Do not download all records to calculate expensive totals.
- [ ] Show total users.
- [ ] Show Customer count.
- [ ] Show Technician count.
- [ ] Show active/banned count.
- [ ] Show booking-status distribution.
- [ ] Show payment metrics only when supported.
- [ ] Show recent users.
- [ ] Show recent bookings.
- [ ] Add skeleton.
- [ ] Add partial-section error states.
- [ ] Add empty database state.
- [ ] Add responsive layout.
- [ ] Add charts only when they improve decision-making.
- [ ] Add accessible chart summaries.
- [ ] Ensure dark-mode chart contrast.

## 8.2 User management

- [ ] Load paginated users.
- [ ] Add role filter.
- [ ] Add status filter.
- [ ] Add date filter if supported.
- [ ] Add search if supported.
- [ ] Sync filters to URL.
- [ ] Show name/email.
- [ ] Show role.
- [ ] Show status.
- [ ] Show created date.
- [ ] Show relevant job/profile information only if efficient.
- [ ] Add ban action.
- [ ] Add unban action.
- [ ] Add confirmation.
- [ ] Explain impact.
- [ ] Prevent accidental self-ban if relevant.
- [ ] Disable pending row action.
- [ ] Handle `403`.
- [ ] Handle stale conflict.
- [ ] Update row/detail cache.
- [ ] Invalidate user lists/metrics.
- [ ] Add skeleton table.
- [ ] Add mobile row layout or controlled horizontal scroll.
- [ ] Add empty/error states.
- [ ] Do not expose sensitive authentication fields.

## 8.3 Admin bookings

- [ ] Load all bookings.
- [ ] Add status filter.
- [ ] Add date range if supported.
- [ ] Add Customer filter if supported.
- [ ] Add Technician filter if supported.
- [ ] Add search if supported.
- [ ] Sync filters to URL.
- [ ] Add pagination.
- [ ] Show booking ID/reference.
- [ ] Show Customer.
- [ ] Show Technician.
- [ ] Show service.
- [ ] Show schedule.
- [ ] Show status.
- [ ] Show amount/payment.
- [ ] Add detail page/drawer.
- [ ] Add timeline.
- [ ] Keep read-only unless admin mutations exist.
- [ ] Do not fabricate status override.
- [ ] Add skeleton/error/empty.
- [ ] Add mobile strategy.

## 8.4 Category management

- [ ] Load admin categories.
- [ ] Show active/inactive state if supported.
- [ ] Add category creation.
- [ ] Add name.
- [ ] Add slug only if backend expects it.
- [ ] Add description.
- [ ] Add icon/image only if supported.
- [ ] Add active state if supported.
- [ ] Validate fields.
- [ ] Handle duplicate conflict.
- [ ] Add pending state.
- [ ] Add edit only if supported.
- [ ] Add delete/deactivate only if supported.
- [ ] Add destructive confirmation.
- [ ] Invalidate admin categories.
- [ ] Invalidate public categories.
- [ ] Invalidate service discovery where necessary.
- [ ] Add skeleton/error/empty.
- [ ] Add image fallback.

## 8.5 Admin payments

- [ ] Confirm endpoint.
- [ ] Add navigation only when supported.
- [ ] Load paginated payments.
- [ ] Add provider/status/date filters.
- [ ] Show safe transaction reference.
- [ ] Show booking relation.
- [ ] Show amount/currency.
- [ ] Show provider.
- [ ] Show status.
- [ ] Show date.
- [ ] Add detail only if supported.
- [ ] Do not expose provider secrets.
- [ ] Add skeleton/error/empty.
- [ ] Omit module cleanly when unsupported.

## 8.6 Admin reviews/moderation

- [ ] Confirm moderation endpoint.
- [ ] Add navigation only when supported.
- [ ] Implement allowed moderation actions.
- [ ] Add explicit confirmation.
- [ ] Preserve audit context.
- [ ] Do not imply moderation exists when it does not.
- [ ] Omit cleanly when unsupported.

## 8.7 Admin phase gate

- [ ] Admin sees only supported modules.
- [ ] Large lists use backend pagination/filtering.
- [ ] Destructive actions require confirmation.
- [ ] Admin cannot accidentally expose secrets.
- [ ] Charts are accessible and data-backed.
- [ ] Category mutation invalidates public discovery.
- [ ] Admin E2E flow passes.

---

# Phase 9 — Payment Flow

## 9.1 Payment eligibility

- [ ] Confirm eligible booking status.
- [ ] Create `canCustomerPay`.
- [ ] Hide/disable payment action appropriately.
- [ ] Prevent payment for completed/declined/cancelled booking.
- [ ] Prevent payment when already completed.
- [ ] Handle pending payment.
- [ ] Recheck eligibility server-side.

## 9.2 Create payment

- [ ] Load current booking detail before payment.
- [ ] Display server-derived amount.
- [ ] Display currency.
- [ ] Display provider options only when supported.
- [ ] Add terms/notice required by provider.
- [ ] Create payment request.
- [ ] Disable duplicate submit.
- [ ] Add blocking redirect state.
- [ ] Use full-screen branded loader only during actual redirect/critical transition.
- [ ] Handle popup/redirect failure.
- [ ] Handle session expiry.
- [ ] Handle already-paid conflict.
- [ ] Never send an editable final amount as authoritative.
- [ ] Never log payment tokens/details.

## 9.3 Payment return pages

### Success return

- [ ] Treat URL status as untrusted.
- [ ] Read safe provider/session identifiers.
- [ ] Verify through backend.
- [ ] Show full-screen verification loader.
- [ ] Poll only while backend reports pending.
- [ ] Stop on terminal state.
- [ ] Show verified success.
- [ ] Show booking link.
- [ ] Invalidate payment and booking queries.
- [ ] Handle return-page refresh safely.
- [ ] Avoid double confirmation.

### Failed return

- [ ] Verify backend state.
- [ ] Explain failure in safe language.
- [ ] Offer retry only when eligible.
- [ ] Preserve booking.
- [ ] Link to booking detail.
- [ ] Do not expose raw provider error.

### Cancel return

- [ ] Verify backend state.
- [ ] Explain that booking remains.
- [ ] Offer return to booking.
- [ ] Offer payment retry if eligible.
- [ ] Do not mark failed/completed incorrectly.

### Pending return

- [ ] Add pending state if provider/backend is asynchronous.
- [ ] Poll with bounded interval.
- [ ] Add manual refresh.
- [ ] Add “check later” navigation.
- [ ] Do not trap the user indefinitely.

## 9.4 Payment history/detail

- [ ] Show only safe fields.
- [ ] Show provider.
- [ ] Show amount/currency.
- [ ] Show status.
- [ ] Show booking link.
- [ ] Show transaction/reference safely.
- [ ] Show dates.
- [ ] Add receipt action only if backend/provider supports it.
- [ ] Add retry only when policy permits.

## 9.5 Payment phase gate

- [ ] Client never decides final payable amount.
- [ ] URL query alone never determines success.
- [ ] Duplicate payment attempts are guarded.
- [ ] Pending state has a recovery path.
- [ ] Return pages work after refresh.
- [ ] Sensitive provider data is absent from logs/UI.
- [ ] Payment E2E mocks cover success, pending, failure, and cancel.

---

# Phase 10 — Validation, Errors, Loading, and Feedback

## 10.1 Shared form system

- [ ] Create standard field wrapper.
- [ ] Associate label/control/error.
- [ ] Add optional description.
- [ ] Add required indicator.
- [ ] Add form-level error alert.
- [ ] Add first-invalid-field focus.
- [ ] Add long-form error summary.
- [ ] Add server field-error mapper.
- [ ] Clear server error on field edit.
- [ ] Preserve user values after failure.
- [ ] Add loading submit state.
- [ ] Add dirty-form navigation guard.
- [ ] Add tests.

## 10.2 Validation schemas

- [ ] Login schema.
- [ ] Registration schema.
- [ ] Customer profile schema.
- [ ] Technician profile schema.
- [ ] Technician service schema.
- [ ] Availability schema.
- [ ] Booking schema.
- [ ] Payment initiation schema.
- [ ] Review schema.
- [ ] Category schema.
- [ ] Search/filter schemas.
- [ ] Environment schema.
- [ ] Route parameter schemas.
- [ ] Query parameter schemas.

For every schema:

- [ ] Match backend constraints.
- [ ] Trim appropriate text.
- [ ] Use meaningful error messages.
- [ ] Test boundary values.
- [ ] Test empty/null/undefined.
- [ ] Test cross-field refinements.
- [ ] Do not make frontend stricter without a documented UX reason.

## 10.3 Business-policy helpers

- [ ] `canCustomerCancel`
- [ ] `canCustomerPay`
- [ ] `canCustomerReview`
- [ ] `canTechnicianAccept`
- [ ] `canTechnicianDecline`
- [ ] `canTechnicianStart`
- [ ] `canTechnicianComplete`
- [ ] `getAllowedTechnicianTransitions`
- [ ] `getBookingStatusPresentation`
- [ ] `getPaymentStatusPresentation`
- [ ] `getUserStatusPresentation`
- [ ] Add unit tests for every state.
- [ ] Add unknown-state fallback.
- [ ] Keep server authoritative.

## 10.4 Route loading states

- [ ] Root/marketing loading only where needed.
- [ ] Dashboard shell loading.
- [ ] Customer dashboard loading.
- [ ] Customer booking list loading.
- [ ] Customer booking detail loading.
- [ ] Technician dashboard loading.
- [ ] Technician bookings loading.
- [ ] Technician detail/editor loading.
- [ ] Admin dashboard loading.
- [ ] Admin user table loading.
- [ ] Admin booking table loading.
- [ ] Public service list loading.
- [ ] Public technician list loading.
- [ ] Payment verification full-screen loading.

For every route skeleton:

- [ ] Match final layout.
- [ ] Avoid layout shift.
- [ ] Respect reduced motion.
- [ ] Use semantic muted tokens.
- [ ] Avoid excessive placeholder blocks.
- [ ] Mark busy region appropriately.

## 10.5 Component loading states

- [ ] Button pending indicator.
- [ ] Inline selector loading.
- [ ] Avatar/image loading.
- [ ] Table background refresh.
- [ ] Booking status refresh.
- [ ] Search loading.
- [ ] Infinite/paginated next-page loading if used.
- [ ] Image upload progress if available.
- [ ] Avoid full-screen loader for ordinary queries.

## 10.6 Empty states

- [ ] No categories.
- [ ] No services.
- [ ] No technician results.
- [ ] Customer has no bookings.
- [ ] Customer has no payments.
- [ ] Customer has no reviews.
- [ ] Technician has no requests.
- [ ] Technician has no availability.
- [ ] Technician has no reviews.
- [ ] Admin has no users.
- [ ] Admin has no bookings.
- [ ] Admin has no categories.
- [ ] Filtered results are empty.
- [ ] Every empty state provides a useful next action.
- [ ] Empty states do not use repetitive boxed icon tiles.

## 10.7 Error states

- [ ] Network offline.
- [ ] Request timeout.
- [ ] 400 validation.
- [ ] 401 unauthenticated.
- [ ] 403 forbidden.
- [ ] 404 not found.
- [ ] 409 conflict.
- [ ] 422 validation if used.
- [ ] 429 rate limited.
- [ ] 500 server error.
- [ ] 503 unavailable.
- [ ] malformed API response.
- [ ] unknown status enum.
- [ ] broken image.
- [ ] payment verification error.
- [ ] global render error.
- [ ] Add scoped retry where safe.
- [ ] Add request ID where helpful.
- [ ] Never display stack trace.
- [ ] Never use a toast as the only critical error surface.

## 10.8 Toast behavior

- [ ] Mutation success.
- [ ] Mutation failure summary.
- [ ] Background refresh issue.
- [ ] Copied identifier.
- [ ] Do not toast every navigation.
- [ ] Avoid duplicate toasts.
- [ ] Ensure screen-reader announcement.
- [ ] Ensure dark-mode styling.
- [ ] Ensure actionable errors remain inline.

## 10.9 Phase 10 gate

- [ ] Every major query has loading, empty, error, retry.
- [ ] Every mutation has pending, success, and failure.
- [ ] Forms preserve user input on server failure.
- [ ] Skeletons match final layouts.
- [ ] Full-screen loading is used sparingly.
- [ ] Unknown backend values cannot crash the UI.
- [ ] Error language is clear and non-technical.

---

# Phase 11 — Motion, Scroll Effects, and Interaction Polish

## 11.1 Motion foundation

- [ ] Create shared motion tokens.
- [ ] Create common reveal variants.
- [ ] Create stagger variants.
- [ ] Create dialog/sheet variants where primitives need customization.
- [ ] Create route-section transition pattern.
- [ ] Add reduced-motion utility/hook.
- [ ] Avoid custom timings scattered across components.
- [ ] Keep most UI motion 160–320ms.
- [ ] Use transforms/opacity.
- [ ] Test keyboard and focus during animation.

## 11.2 Landing animations

- [ ] Logo entrance.
- [ ] Hero headline stagger.
- [ ] Hero CTA entrance.
- [ ] Hero image subtle scale/parallax.
- [ ] Search module spring entrance.
- [ ] Category reveal.
- [ ] How-it-works connector progress.
- [ ] Booking journey timeline animation.
- [ ] Technician cards restrained reveal.
- [ ] CTA visual movement.
- [ ] Footer reveal only if it adds value.
- [ ] Do not animate every heading independently.
- [ ] Do not delay content visibility excessively.
- [ ] Add reduced-motion static state.
- [ ] Test on low-end mobile.

## 11.3 GSAP/ScrollTrigger decision

- [ ] Identify one or two interactions that require timeline/scrub control.
- [ ] Confirm Motion alone is insufficient.
- [ ] Lazy-load GSAP on marketing routes.
- [ ] Register ScrollTrigger client-side.
- [ ] Scope animations with context.
- [ ] Clean up on unmount.
- [ ] Refresh after dynamic media.
- [ ] Disable/reduce for mobile when needed.
- [ ] Disable for reduced motion.
- [ ] Verify anchor navigation.
- [ ] Verify browser back.
- [ ] Verify no horizontal overflow.
- [ ] Verify no pinned-section trap.
- [ ] Remove GSAP if the result is only decorative complexity.

## 11.4 Lenis decision

- [ ] Confirm smooth scrolling adds real value.
- [ ] Restrict to marketing layout.
- [ ] Keep dashboards native-scroll.
- [ ] Test keyboard scrolling.
- [ ] Test anchor links.
- [ ] Test browser find.
- [ ] Test touch/mobile.
- [ ] Test sticky header.
- [ ] Test dialogs/sheets.
- [ ] Disable for reduced motion.
- [ ] Avoid nested scroll bugs.
- [ ] Remove Lenis if any core accessibility or navigation issue remains.

## 11.5 Dashboard microinteractions

- [ ] Sidebar active indicator.
- [ ] Sidebar collapse transition.
- [ ] Mobile drawer transition.
- [ ] Tab active indicator.
- [ ] Booking status timeline transition.
- [ ] List insertion/removal.
- [ ] Button press.
- [ ] Form success cue.
- [ ] Dialog/sheet presence.
- [ ] Skeleton-to-content transition.
- [ ] No cinematic dashboard transitions.
- [ ] No parallax in operational screens.
- [ ] No motion blocking immediate actions.

## 11.6 Motion performance gate

- [ ] No long main-thread tasks caused by animation.
- [ ] No animation-induced CLS.
- [ ] No scroll jank.
- [ ] No continuous animation when offscreen.
- [ ] No unnecessary `will-change`.
- [ ] Reduced motion disables scrub/parallax/loops.
- [ ] Content remains comprehensible without motion.
- [ ] Animation code is not shipped to unrelated routes.

---

# Phase 12 — Responsive, Accessibility, Dark Mode, SEO, and Performance Pass

## 12.1 Responsive test matrix

Test every key route at:

- [ ] 320px
- [ ] 360px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px+

Check:

- [ ] No horizontal overflow.
- [ ] No clipped menus.
- [ ] No inaccessible fixed footer/button.
- [ ] Mobile keyboard does not cover submit.
- [ ] Tables have a deliberate mobile strategy.
- [ ] Filters remain usable.
- [ ] Dialogs fit viewport.
- [ ] Date/time controls work by touch.
- [ ] Hero crop remains meaningful.
- [ ] Navigation remains discoverable.
- [ ] Long names/addresses wrap safely.
- [ ] Touch targets meet size guidance.
- [ ] Safe-area insets are respected where needed.

## 12.2 Accessibility audit

- [ ] Skip link works.
- [ ] Landmarks are correct.
- [ ] Heading order is valid.
- [ ] One meaningful `h1` per page.
- [ ] All interactive elements are keyboard reachable.
- [ ] Focus order is logical.
- [ ] Focus is visible.
- [ ] Focus returns after dialog/sheet.
- [ ] Active navigation uses `aria-current`.
- [ ] Forms have associated labels.
- [ ] Errors use `aria-describedby`.
- [ ] Critical status updates use live regions.
- [ ] Status is not color-only.
- [ ] Star rating is keyboard accessible.
- [ ] Tables have headers.
- [ ] Charts have summaries.
- [ ] Icon buttons have accessible names.
- [ ] Decorative icons are hidden.
- [ ] Image alt text is meaningful.
- [ ] Decorative images use empty alt.
- [ ] Accordions/dialogs/menus work with assistive technology.
- [ ] Zoom at 200% works.
- [ ] Text resize works.
- [ ] Contrast passes in light mode.
- [ ] Contrast passes in dark mode.
- [ ] Reduced motion works.
- [ ] No flashing content.
- [ ] Automated axe checks pass.
- [ ] Manual keyboard audit passes.
- [ ] Screen-reader smoke test passes on critical flows.

## 12.3 Dark-mode audit

- [ ] Marketing header.
- [ ] Hero.
- [ ] Photography overlays.
- [ ] Category section.
- [ ] Technician cards.
- [ ] FAQ.
- [ ] Footer.
- [ ] Auth pages.
- [ ] Dashboard shell.
- [ ] Sidebar.
- [ ] Tables.
- [ ] Forms.
- [ ] Popovers.
- [ ] Selects.
- [ ] Calendar.
- [ ] Dialogs.
- [ ] Sheets.
- [ ] Tooltips.
- [ ] Toasts.
- [ ] Skeletons.
- [ ] Charts.
- [ ] Status badges.
- [ ] Payment pages.
- [ ] Error pages.
- [ ] Empty states.
- [ ] Logo.
- [ ] Focus ring.
- [ ] Native controls.
- [ ] No hard-coded light surface remains.

## 12.4 Public SEO

- [ ] Root metadata.
- [ ] Landing metadata.
- [ ] Services metadata.
- [ ] Technician listing metadata.
- [ ] Dynamic technician detail metadata.
- [ ] Dynamic service detail metadata if applicable.
- [ ] Canonical URLs.
- [ ] Open Graph.
- [ ] Social image.
- [ ] Favicon.
- [ ] Robots.
- [ ] Sitemap.
- [ ] Dashboard noindex.
- [ ] Auth noindex where appropriate.
- [ ] Payment return noindex.
- [ ] 404 metadata.
- [ ] Structured data only from truthful fields.
- [ ] No fabricated AggregateRating.
- [ ] Share previews render correctly.

## 12.5 Image performance

- [ ] Use `next/image`.
- [ ] Set dimensions/aspect ratio.
- [ ] Configure strict remote patterns.
- [ ] Optimize hero image.
- [ ] Preload only true LCP image.
- [ ] Use correct `sizes`.
- [ ] Lazy-load below fold.
- [ ] Add blur placeholders where useful.
- [ ] Add broken-image fallback.
- [ ] Avoid giant PNGs.
- [ ] Record required image credits/licenses.
- [ ] Test dark-mode image treatment.
- [ ] Test slow network.

## 12.6 Bundle and rendering performance

- [ ] Server Components are default.
- [ ] Client boundaries are small.
- [ ] Root layout is not fully client-side.
- [ ] Providers are scoped.
- [ ] Heavy components are lazy-loaded.
- [ ] GSAP/Lenis excluded from dashboard bundles.
- [ ] Lottie excluded where unused.
- [ ] Admin chart code excluded from public routes.
- [ ] Lucide imports are tree-shakeable.
- [ ] Font weights are limited.
- [ ] Duplicate data fetching is removed.
- [ ] Query hydration is scoped.
- [ ] Search requests cancel/debounce.
- [ ] Lists use backend pagination.
- [ ] Polling is limited to active data.
- [ ] Bundle analyzer run.
- [ ] Large dependencies justified or removed.

## 12.7 Core Web Vitals targets

- [ ] LCP target measured.
- [ ] CLS target measured.
- [ ] INP target measured.
- [ ] Landing mobile Lighthouse run.
- [ ] Technician detail mobile Lighthouse run.
- [ ] Customer booking flow performance checked.
- [ ] Admin table performance checked.
- [ ] Animation main-thread cost checked.
- [ ] Slow 4G test performed.
- [ ] CPU throttling test performed.
- [ ] Full-screen loader is not hiding preventable slowness.

## 12.8 Phase 12 gate

- [ ] Critical routes pass keyboard audit.
- [ ] Light and dark contrast pass.
- [ ] All target widths are usable.
- [ ] Public pages have correct metadata.
- [ ] Dashboard is noindex.
- [ ] Images do not shift layout.
- [ ] Bundle contains no unnecessary marketing animation in dashboard.
- [ ] Core performance targets are reasonably met.

---

# Phase 13 — Testing and Quality Assurance

## 13.1 Unit tests

### HTTP and contracts

- [ ] query serialization
- [ ] URL joining
- [ ] `204` handling
- [ ] JSON success
- [ ] error envelope
- [ ] non-JSON error
- [ ] timeout
- [ ] abort
- [ ] schema success
- [ ] schema failure
- [ ] request ID extraction

### Mappers

- [ ] user mapping
- [ ] role normalization
- [ ] technician mapping
- [ ] service mapping
- [ ] category mapping
- [ ] booking mapping
- [ ] booking unknown status
- [ ] payment mapping
- [ ] review mapping
- [ ] null/optional fields
- [ ] numeric-string handling if required
- [ ] date normalization

### Policies

- [ ] Customer cancel by every status.
- [ ] Customer pay by every status.
- [ ] Customer review by every status/review state.
- [ ] Technician accept by every status.
- [ ] Technician decline by every status.
- [ ] Technician start by every status/payment condition.
- [ ] Technician complete by every status.
- [ ] Unknown status fallback.

### Utilities

- [ ] safe return URL
- [ ] currency formatting
- [ ] date formatting
- [ ] timezone display
- [ ] field-error extraction
- [ ] query key normalization
- [ ] pagination normalization
- [ ] availability overlap detection
- [ ] image validation
- [ ] phone normalization if used

## 13.2 Component tests

- [ ] Theme toggle.
- [ ] Marketing mobile navigation.
- [ ] Dashboard mobile navigation.
- [ ] Login validation.
- [ ] Login server error.
- [ ] Registration role selection.
- [ ] Password visibility.
- [ ] Booking wizard navigation.
- [ ] Booking availability conflict.
- [ ] Booking final submit lock.
- [ ] Booking status timeline.
- [ ] Customer cancellation confirmation.
- [ ] Payment eligibility state.
- [ ] Review star input.
- [ ] Technician profile form.
- [ ] Availability overlap error.
- [ ] Technician status action controls.
- [ ] Admin ban/unban confirmation.
- [ ] Category duplicate error.
- [ ] Empty states.
- [ ] Error retry.
- [ ] Skeleton busy state.
- [ ] Reduced-motion behavior.

## 13.3 MSW integration scenarios

- [ ] Auth success.
- [ ] Auth invalid credentials.
- [ ] Auth banned user.
- [ ] Auth session expiry.
- [ ] Public category success/empty/error.
- [ ] Technician list pagination.
- [ ] Technician detail 404.
- [ ] Booking create success.
- [ ] Booking create validation error.
- [ ] Booking availability conflict.
- [ ] Booking duplicate submit prevention.
- [ ] Customer cancellation success/conflict.
- [ ] Technician accept success/conflict.
- [ ] Technician start forbidden.
- [ ] Payment create success.
- [ ] Payment already completed.
- [ ] Payment pending.
- [ ] Payment verification success/failure.
- [ ] Review success/duplicate.
- [ ] Admin list pagination.
- [ ] Admin ban forbidden/conflict.
- [ ] Category duplicate.
- [ ] Malformed API response.
- [ ] Rate limit.
- [ ] Network timeout.

## 13.4 Playwright E2E — Public

- [ ] Landing loads.
- [ ] Mobile navigation works.
- [ ] Theme persists.
- [ ] Category navigation works.
- [ ] Service filters update URL.
- [ ] Technician filters update URL.
- [ ] Technician detail renders.
- [ ] Login return path works.
- [ ] No horizontal overflow at mobile.
- [ ] Reduced motion does not hide content.

## 13.5 Playwright E2E — Customer

- [ ] Customer login.
- [ ] Customer dashboard.
- [ ] Browse service.
- [ ] View technician.
- [ ] Start booking.
- [ ] Complete booking steps.
- [ ] Create booking.
- [ ] View requested booking.
- [ ] Cancel eligible booking.
- [ ] Payment action appears after accepted state.
- [ ] Payment return verifies backend.
- [ ] Completed booking shows review action.
- [ ] Review submits.
- [ ] Direct Technician/Admin route is denied.
- [ ] Session expiry redirects safely.
- [ ] Mobile booking works.

## 13.6 Playwright E2E — Technician

- [ ] Technician login.
- [ ] Incomplete profile prompt.
- [ ] Update profile.
- [ ] Set availability.
- [ ] View request.
- [ ] Accept request.
- [ ] Decline request.
- [ ] Start eligible booking.
- [ ] Complete in-progress booking.
- [ ] Invalid transition rejected gracefully.
- [ ] Direct Customer/Admin route is denied.
- [ ] Mobile action flow works.

## 13.7 Playwright E2E — Admin

- [ ] Admin login.
- [ ] Admin dashboard.
- [ ] Paginated user list.
- [ ] Filter user list.
- [ ] Ban user.
- [ ] Unban user.
- [ ] View booking list.
- [ ] Create category.
- [ ] Handle duplicate category.
- [ ] Edit/delete category only when supported.
- [ ] Direct Customer/Technician route behavior is intentional.
- [ ] Mobile/tablet admin layout works.

## 13.8 Visual regression

Capture light/dark and key widths for:

- [ ] Landing hero.
- [ ] Service category section.
- [ ] Technician detail.
- [ ] Login.
- [ ] Customer overview.
- [ ] Customer booking detail.
- [ ] Technician availability.
- [ ] Technician booking detail.
- [ ] Admin users.
- [ ] Payment success.
- [ ] 404.
- [ ] 403.
- [ ] Empty states.
- [ ] Skeleton states.

## 13.9 Contract testing

- [ ] Run the backend’s existing integration/API tests against its safe test configuration.
- [ ] Start the backend with a non-production test database for endpoint contract checks when feasible.
- [ ] Probe verified routes with a dedicated test client.
- [ ] Validate sanitized representative responses against frontend schemas.
- [ ] Track backend version/commit.
- [ ] Generate or maintain an OpenAPI/contract snapshot when practical.
- [ ] Fail CI on critical contract drift where feasible.
- [ ] Update fixtures only after reviewing intentional API changes.
- [ ] Do not snapshot secrets, tokens, personal data, or absolute local paths.
- [ ] Document safe backend test setup and required environment-variable names.
- [ ] Ensure CI does not depend on the user’s machine-specific backend path.

## 13.10 QA exploratory scenarios

- [ ] Very long user name.
- [ ] Very long address.
- [ ] No avatar.
- [ ] Broken image.
- [ ] Zero reviews.
- [ ] One review.
- [ ] Large review count.
- [ ] Zero-price or missing price if API allows.
- [ ] Unknown currency.
- [ ] Unknown status.
- [ ] Empty database.
- [ ] Page beyond final pagination page.
- [ ] Mutation removes last row on page.
- [ ] Browser back during wizard.
- [ ] Browser refresh mid-wizard.
- [ ] Browser refresh on payment return.
- [ ] Two tabs changing same booking.
- [ ] Network goes offline mid-form.
- [ ] API becomes slow.
- [ ] API returns HTML error page.
- [ ] System theme changes while open.
- [ ] 200% browser zoom.
- [ ] Keyboard-only.
- [ ] Screen reader.
- [ ] Reduced motion.
- [ ] Low-end mobile.

## 13.11 Phase 13 gate

- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] Critical E2E tests pass.
- [ ] Accessibility checks pass.
- [ ] Visual regression reviewed.
- [ ] Contract suite passes or blockers are documented.
- [ ] No flaky critical test is ignored.
- [ ] Coverage includes domain policies and mapping boundaries.

---

# Phase 14 — Deployment, Security, Documentation, and Handoff

## 14.1 Production configuration

- [ ] Configure production frontend URL.
- [ ] Configure production API URL.
- [ ] Configure secure cookie domain/path.
- [ ] Configure HTTPS.
- [ ] Configure CORS allowlist.
- [ ] Configure credentials.
- [ ] Configure CSRF defense when required.
- [ ] Configure payment return URLs.
- [ ] Configure image remote patterns.
- [ ] Configure Content Security Policy as deployment allows.
- [ ] Configure referrer policy.
- [ ] Configure clickjacking defense.
- [ ] Configure MIME sniffing defense.
- [ ] Configure secrets in hosting environment.
- [ ] Confirm no secret is in client bundle.
- [ ] Confirm preview environments use safe test services.
- [ ] Confirm Admin routes remain protected in preview.

## 14.2 Security review

- [ ] No token in localStorage.
- [ ] No token in sessionStorage.
- [ ] No token in URL.
- [ ] No token in Query cache.
- [ ] No token in Zustand persistence.
- [ ] No sensitive console logging.
- [ ] No unrestricted BFF proxy.
- [ ] Safe redirect allowlist.
- [ ] User-generated text is rendered safely.
- [ ] No dangerous HTML without sanitization.
- [ ] Upload type/size validated.
- [ ] Backend remains authority for roles.
- [ ] Backend remains authority for amounts.
- [ ] Backend remains authority for transitions.
- [ ] Rate-limit errors handled.
- [ ] Error pages do not leak internals.
- [ ] Admin data is not prefetched for non-admin routes.
- [ ] Source maps/logging policy reviewed.
- [ ] Dependency audit reviewed.

## 14.3 Observability

- [ ] Add safe client error reporting if required.
- [ ] Include route and user role.
- [ ] Include request ID.
- [ ] Redact personal data.
- [ ] Redact tokens.
- [ ] Redact payment details.
- [ ] Track web vitals if required.
- [ ] Add uptime/health monitoring at infrastructure level.
- [ ] Add payment verification failure alerting where appropriate.
- [ ] Add API contract failure visibility.
- [ ] Document production debugging process.

## 14.4 Analytics

Only when approved:

- [ ] service search event
- [ ] category selected
- [ ] technician viewed
- [ ] booking flow started
- [ ] booking created
- [ ] payment started
- [ ] payment verified
- [ ] review submitted
- [ ] technician accepted/declined
- [ ] admin user status changed
- [ ] Consent/privacy requirements reviewed.
- [ ] No sensitive address/payment data included.
- [ ] Event naming documented.

## 14.5 README

- [ ] Project purpose.
- [ ] Technology stack.
- [ ] Prerequisites.
- [ ] Install command.
- [ ] Environment setup.
- [ ] Development command.
- [ ] Build command.
- [ ] Test commands.
- [ ] Folder architecture.
- [ ] Dependency rules.
- [ ] Auth mode.
- [ ] API integration pattern.
- [ ] Query/caching pattern.
- [ ] Theme customization.
- [ ] Image asset policy.
- [ ] Animation policy.
- [ ] Role routes.
- [ ] Deployment instructions.
- [ ] Known backend limitations.
- [ ] Troubleshooting.

## 14.6 Documentation set

- [ ] `frontend-brain.md`
- [ ] `frontend-todo.md`
- [ ] `docs/api-contract.md`
- [ ] `docs/assumptions.md`
- [ ] `docs/design-decisions.md`
- [ ] `docs/test-matrix.md`
- [ ] `docs/image-credits.md`
- [ ] `docs/accessibility-audit.md`
- [ ] `docs/performance-audit.md`
- [ ] `docs/release-checklist.md`
- [ ] Local backend inspection and safe test-environment instructions.
- [ ] API-to-screen mapping.
- [ ] Final supported-feature matrix.

## 14.7 Final cleanup

- [ ] Remove mock data from production paths.
- [ ] Remove fake testimonials.
- [ ] Remove unsupported navigation.
- [ ] Remove dead components.
- [ ] Remove unused dependencies.
- [ ] Remove console logs.
- [ ] Remove commented-out experiments.
- [ ] Remove stale TODOs or convert them to tracked issues.
- [ ] Remove accidental hard-coded colors.
- [ ] Remove accidental raw fetch calls.
- [ ] Remove duplicate types.
- [ ] Remove duplicate API paths.
- [ ] Remove generic placeholder copy.
- [ ] Remove default shadcn styling that conflicts with brand.
- [ ] Optimize SVG/Lottie/images.
- [ ] Run formatter.
- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run tests.
- [ ] Run build.
- [ ] Run dependency audit.
- [ ] Review generated bundle.

## 14.8 Release smoke test

Production-like environment:

- [ ] Landing page.
- [ ] Public categories.
- [ ] Public technicians.
- [ ] Login.
- [ ] Customer booking.
- [ ] Technician status action.
- [ ] Admin user action.
- [ ] Payment test-provider flow.
- [ ] Logout.
- [ ] Direct protected URL.
- [ ] Mobile.
- [ ] Dark mode.
- [ ] Reduced motion.
- [ ] 404.
- [ ] Error reporting.
- [ ] No secret in browser source/network logs.

## 14.9 Final handoff report

The implementing agent must provide:

- [ ] Architecture summary.
- [ ] Auth mode and security rationale.
- [ ] Exact supported roles.
- [ ] Exact supported endpoints.
- [ ] Screen-to-endpoint map.
- [ ] Unsupported backend features.
- [ ] Known limitations.
- [ ] Test results.
- [ ] Accessibility audit result.
- [ ] Performance result.
- [ ] Deployment variables.
- [ ] Admin test credentials delivery method without committing secrets.
- [ ] Image/license credits.
- [ ] Future recommendations separated from completed work.

---

# Vertical Slice Milestones

Use these to demonstrate working progress without creating disconnected screens.

## Milestone A — Public discovery

- [ ] Theme and design tokens.
- [ ] HTTP client.
- [ ] Category contract/service/query.
- [ ] Technician contract/service/query.
- [ ] Landing hero.
- [ ] Category section.
- [ ] Technician listing.
- [ ] Technician detail.
- [ ] Loading/error/empty states.
- [ ] Responsive/dark-mode pass.
- [ ] Public smoke test.

**Acceptance:** A visitor can browse real categories and technicians through the centralized API layer.

## Milestone B — Authentication and shell

- [ ] Auth contracts/services.
- [ ] Login.
- [ ] Registration.
- [ ] Secure session implementation.
- [ ] Role redirect.
- [ ] Role guards.
- [ ] Dashboard shell.
- [ ] Logout.
- [ ] Auth tests.

**Acceptance:** Each role logs in and reaches only its correct panel without exposing tokens.

## Milestone C — Customer booking

- [ ] Booking contracts/services.
- [ ] Booking wizard.
- [ ] Booking creation.
- [ ] Customer bookings list.
- [ ] Booking detail.
- [ ] Cancellation if supported.
- [ ] Status timeline.
- [ ] Conflict handling.
- [ ] Customer E2E.

**Acceptance:** A Customer can create and track a real booking end to end.

## Milestone D — Technician operations

- [ ] Technician profile.
- [ ] Availability.
- [ ] Booking inbox.
- [ ] Accept/decline.
- [ ] Start/complete.
- [ ] Conflict handling.
- [ ] Technician E2E.

**Acceptance:** A Technician can configure availability and progress real bookings through permitted states.

## Milestone E — Payment and review

- [ ] Payment eligibility.
- [ ] Payment creation.
- [ ] Provider redirect.
- [ ] Backend verification.
- [ ] Return states.
- [ ] Review eligibility.
- [ ] Review creation.
- [ ] Payment/review E2E mocks.

**Acceptance:** A Customer can pay only when eligible and review only after verified completion.

## Milestone F — Admin operations

- [ ] Admin overview.
- [ ] User list.
- [ ] Ban/unban.
- [ ] Booking list/detail.
- [ ] Category management.
- [ ] Admin E2E.

**Acceptance:** Admin can perform every backend-supported administrative action with confirmation and audit-friendly UI.

## Milestone G — Production hardening

- [ ] Full responsive audit.
- [ ] Full dark-mode audit.
- [ ] Accessibility audit.
- [ ] Performance audit.
- [ ] Security audit.
- [ ] Contract tests.
- [ ] Production build.
- [ ] Release smoke test.
- [ ] Documentation and handoff.

**Acceptance:** All definition-of-done criteria pass.

---

# Endpoint-to-UI Traceability Checklist

Populate exact verified paths in `docs/api-contract.md`.

| Operation | Primary UI consumer | Query/mutation | Required states |
|---|---|---|---|
| Register | Registration page | Mutation | idle, validation, pending, duplicate, success |
| Login | Login page | Mutation | idle, pending, invalid, banned, success |
| Current user | Protected layouts/header | Query/server utility | loading, authenticated, expired, forbidden |
| Categories list | Landing, services, booking, admin | Query | loading, empty, error, success |
| Services list | Services, booking | Query | loading, empty, filters, pagination, error |
| Technicians list | Landing/listing/booking | Query | loading, empty, filters, pagination, error |
| Technician detail | Public detail/booking | Query | loading, 404, error, success |
| Create booking | Booking wizard | Mutation | validation, pending, conflict, success |
| Booking list | Customer/Technician/Admin | Query | loading, empty, filters, pagination, error |
| Booking detail | All role detail pages | Query | loading, 403, 404, active, terminal |
| Customer cancel | Customer detail | Mutation | confirm, pending, conflict, success |
| Technician status update | Technician detail | Mutation | confirm, pending, conflict, forbidden, success |
| Payment create | Customer booking | Mutation | ineligible, pending, redirect, conflict, error |
| Payment verify | Return page | Mutation/query | verifying, pending, success, failed, error |
| Payment list | Customer/Admin | Query | loading, empty, filters, pagination, error |
| Review create | Completed booking | Mutation | eligible, validation, duplicate, success |
| Profile update | Customer/Technician | Mutation | dirty, validation, pending, success, error |
| Availability update | Technician | Mutation | conflict, pending, replace warning, success |
| Admin users | Admin users | Query | loading, empty, filters, pagination, error |
| Ban/unban | Admin users | Mutation | confirm, pending, forbidden, conflict, success |
| Admin bookings | Admin bookings | Query | loading, empty, filters, pagination, error |
| Category create/update/delete | Admin categories | Mutation | validation, duplicate, confirm, success |

- [ ] Every implemented endpoint has at least one UI consumer or documented infrastructure reason.
- [ ] Every UI action maps to a real endpoint.
- [ ] Every mutation lists cache invalidations.
- [ ] Every endpoint has error-state coverage.
- [ ] No endpoint is called directly from a component.

---

# Role Navigation Checklist

## Customer

- [ ] Overview
- [ ] Browse Services
- [ ] Bookings
- [ ] Payments
- [ ] Reviews
- [ ] Profile
- [ ] Unsupported items hidden

## Technician

- [ ] Overview
- [ ] Professional Profile
- [ ] Services only if supported
- [ ] Availability
- [ ] Bookings
- [ ] Reviews
- [ ] Profile Settings
- [ ] Unsupported items hidden

## Admin

- [ ] Overview
- [ ] Users
- [ ] Bookings
- [ ] Categories
- [ ] Payments only if supported
- [ ] Reviews only if supported
- [ ] Settings only if supported
- [ ] Unsupported items hidden

For every role:

- [ ] Active state is clear.
- [ ] Mobile navigation is usable.
- [ ] Role label is visible.
- [ ] Logout is accessible.
- [ ] Direct forbidden navigation is handled.
- [ ] Keyboard navigation works.
- [ ] No navigation item is a dead placeholder.

---

# Design Review Checklist

## Landing page

- [ ] Immediate product clarity.
- [ ] Relevant hero image.
- [ ] Strong primary CTA.
- [ ] Technician CTA is secondary.
- [ ] Service discovery above the fold or immediately adjacent.
- [ ] Trust claims are verified.
- [ ] No generic AI gradient overload.
- [ ] No excessive floating blobs.
- [ ] No repetitive square icon tiles.
- [ ] No excessive card grid.
- [ ] Section rhythm varies intentionally.
- [ ] Images share coherent treatment.
- [ ] Animations support hierarchy.
- [ ] Mobile hero remains strong.
- [ ] Dark mode remains premium.
- [ ] Reduced motion remains complete.

## Dashboard

- [ ] Task hierarchy is obvious.
- [ ] Primary next action is clear.
- [ ] Sidebar is calm and compact.
- [ ] Tables/lists fit the role.
- [ ] Cards are used only for discrete objects/metrics.
- [ ] Status is legible.
- [ ] Filters are organized.
- [ ] Empty states help progression.
- [ ] Skeletons resemble final content.
- [ ] No cinematic motion.
- [ ] No excessive gradients.
- [ ] No generic template copy.
- [ ] Mobile actions remain reachable.
- [ ] Dark mode is operationally clear.

## Shape and icons

- [ ] Buttons use moderate radius.
- [ ] Inputs use consistent radius.
- [ ] Cards/panels use consistent radius.
- [ ] Pills are reserved for compact statuses/tags.
- [ ] Icons use one coherent outline set.
- [ ] Icons do not all have background squares.
- [ ] Icon-only actions have labels/tooltips.
- [ ] Shadows are restrained.
- [ ] Borders provide most separation.
- [ ] Nested card-on-card layouts are rare and justified.

---

# API and Architecture Review Checklist

- [ ] `app/` contains route composition, not business logic.
- [ ] `features/` owns feature UI and hooks.
- [ ] `services/api/` owns domain API operations.
- [ ] `services/http/` is the only raw HTTP layer.
- [ ] `contracts/api/` matches backend DTOs.
- [ ] `domain/mappers/` normalizes DTOs.
- [ ] `domain/policies/` centralizes status rules.
- [ ] Query hooks use services.
- [ ] Components use hooks.
- [ ] Zustand stores only UI/workflow state.
- [ ] No duplicated response-envelope parsing.
- [ ] No duplicated status-label mapping.
- [ ] No duplicated API URL construction.
- [ ] No circular feature dependencies.
- [ ] No broad utility dumping ground.
- [ ] No `any` at API boundaries.
- [ ] No unvalidated `unknown` reaches JSX.
- [ ] No token reaches Client Components.
- [ ] No unsupported backend capability is represented as functional.

---

# Validation Review Checklist

## Authentication

- [ ] Email format.
- [ ] Password required.
- [ ] Backend password limits.
- [ ] Confirm password.
- [ ] Customer/Technician role only.
- [ ] Duplicate email.
- [ ] Generic credential error.
- [ ] Accessible error association.

## Technician profile

- [ ] Headline length.
- [ ] Bio length.
- [ ] Experience integer/range.
- [ ] Skills non-empty when required.
- [ ] No duplicate skills.
- [ ] Price finite/non-negative.
- [ ] Service area.
- [ ] Image type/size.
- [ ] Server errors mapped.

## Availability

- [ ] Start before end.
- [ ] Future date rules.
- [ ] No overlap.
- [ ] No duplicate.
- [ ] Timezone shown.
- [ ] Replacement warning.
- [ ] Conflict response.

## Booking

- [ ] Required service.
- [ ] Required technician.
- [ ] Required time.
- [ ] Future time.
- [ ] Current availability.
- [ ] Address completeness.
- [ ] Notes length.
- [ ] Contact field.
- [ ] Server amount only.
- [ ] Conflict response.
- [ ] Duplicate-submit protection.

## Review

- [ ] Rating 1–5 integer.
- [ ] Comment limits.
- [ ] Completed booking.
- [ ] One per booking.
- [ ] Duplicate conflict.

## Category

- [ ] Name required.
- [ ] Slug rules only when needed.
- [ ] Description limits.
- [ ] Image rules.
- [ ] Duplicate conflict.
- [ ] Destructive confirmation.

---

# Loading and Feedback Review Checklist

- [ ] Route transitions use route skeletons.
- [ ] Lists use row/card skeletons.
- [ ] Details use layout skeletons.
- [ ] Buttons show inline pending state.
- [ ] Full-screen loader appears only for critical app/payment transitions.
- [ ] Skeletons do not cause layout shift.
- [ ] Skeleton animation respects reduced motion.
- [ ] Background refresh does not replace stable content.
- [ ] Empty state is not confused with loading.
- [ ] Error state is not confused with empty.
- [ ] Toast is not the only form error.
- [ ] Destructive actions require confirmation.
- [ ] Success feedback is visible but restrained.
- [ ] Status changes are announced accessibly.

---

# Release Definition of Done

The frontend is complete only when every applicable item is checked.

## Contract and architecture

- [ ] The real local backend route and response contract is documented.
- [ ] Exact endpoint paths are verified.
- [ ] Exact role and status enums are verified.
- [ ] API DTOs are isolated.
- [ ] Runtime schemas cover critical responses.
- [ ] Domain mappers are tested.
- [ ] No raw API calls exist in UI.
- [ ] No server data is kept in Zustand.
- [ ] No token is browser-readable.
- [ ] Role guards exist in frontend and backend denials are handled.

## Product

- [ ] Public discovery works.
- [ ] Customer booking works.
- [ ] Customer payment works according to provider flow.
- [ ] Customer review works.
- [ ] Technician profile works.
- [ ] Technician availability works.
- [ ] Technician booking transitions work.
- [ ] Admin user management works.
- [ ] Admin booking visibility works.
- [ ] Admin category management works.
- [ ] Unsupported features are hidden or documented.

## UI/UX

- [ ] Landing page is custom, attractive, and relevant.
- [ ] Proper service imagery is used.
- [ ] Logo and Lottie animation exist.
- [ ] Icons are coherent and not placed in repetitive square backgrounds.
- [ ] Cards/boxes are not overused.
- [ ] Radius is modern but restrained.
- [ ] Dashboard is clean and organized.
- [ ] Every role sees a clear next action.
- [ ] Loading, empty, error, success, and conflict states are complete.
- [ ] Light and dark modes are complete.
- [ ] All key widths are responsive.
- [ ] Reduced motion works.

## Quality

- [ ] Keyboard audit passes.
- [ ] Contrast audit passes.
- [ ] Screen-reader smoke test passes.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] Critical E2E tests pass.
- [ ] Contract tests pass or blockers are explicit.
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] Bundle review passes.
- [ ] Performance audit passes reasonably.
- [ ] Security audit passes.
- [ ] No fake content remains.
- [ ] Documentation is complete.

---

# Final Agent Output Format

When implementation is complete, report in this exact structure:

## 1. Implemented Product

Summarize public, Customer, Technician, and Admin capabilities.

## 2. Architecture

Explain route groups, features, contracts, mappers, services, HTTP client, Query, Zustand, auth, validation, and design tokens.

## 3. API Integration Map

List every consumed endpoint, role, service function, query/mutation hook, and screen.

## 4. Auth and Security

State the selected auth mode, cookie/token handling, route protection, CSRF/CORS implications, and logout behavior.

## 5. UI/UX and Motion

Summarize visual direction, responsive behavior, dark mode, images, logo/Lottie, Motion usage, GSAP/Lenis decisions, and reduced motion.

## 6. Loading and Error UX

List route skeletons, component skeletons, full-screen loaders, empty states, conflict handling, and payment verification states.

## 7. Validation

List all form schemas, response schemas, business policies, and server-error mapping.

## 8. Testing

Report exact commands and outcomes for lint, typecheck, unit, integration, E2E, accessibility, build, and contract checks.

## 9. Unsupported or Blocked Features

List every desired feature absent from the backend and how the UI handles it.

## 10. Deployment

List required environment variables, hosting assumptions, image domains, payment return URLs, and production security configuration.

## 11. Known Limitations

Be direct and specific. Do not disguise unfinished behavior as future polish.

## 12. Final Verification

Confirm the release Definition of Done item by item or identify the unchecked items.
