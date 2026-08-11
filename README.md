<div align="center">

<br/><br/>

<h1>Cerevia.</h1>

<p><strong>A scalable, production-grade gamification system for BYJU'S — powering daily learning streaks and weekly competitive leaderboards at scale. Built with Next.js 15, PostgreSQL, Prisma, Redis, and TypeScript.</strong></p>

<br/>

<a href="https://team-catalyst-applymate.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/Live%20Demo-Vercel-22c55e?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
&nbsp;
<a href="#interactive-openapi--swagger-docs">
  <img src="https://img.shields.io/badge/API%20Docs-Swagger%20UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Next.js-15%20App%20Router-black?logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-Typed-3178C6?logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/Redis-Cache%20and%20Queue-DC382D?logo=redis&logoColor=white" />
<img src="https://img.shields.io/badge/Zod-Validation-3E67B1" />
<img src="https://img.shields.io/badge/Node--Cron-Scheduler-green" />
<img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Squad-116%20%7C%20Team%2003-6366F1" />
<img src="https://img.shields.io/badge/License-MIT-blue.svg" />

<br/><br/>

</div>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Design](#solution-design)
- [System Architecture](#system-architecture)
- [Request Lifecycle](#request-lifecycle)
- [Redis Caching Strategy](#redis-caching-strategy)
- [Streak State Machine](#streak-state-machine)
- [XP and Level Progression System](#xp-and-level-progression-system)
- [CI/CD Pipeline](#cicd-pipeline)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Design Decisions](#key-design-decisions)
- [Interactive OpenAPI / Swagger Docs](#interactive-openapi--swagger-docs)
- [Environment Configuration](#environment-configuration)
- [Docker and Database Setup](#docker-and-database-setup)
- [Getting Started](#getting-started)
- [Testing and Quality Assurance](#testing-and-quality-assurance)
- [API Reference](#api-reference)
- [Security Model](#security-model)
- [Production Deployment](#production-deployment)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Problem Statement

BYJU'S needs a robust gamification layer to improve student engagement and retention across its learning platform. Two core features must be implemented:

**Daily Streaks**

A streak represents the number of consecutive days a student has completed at least one lesson. It must increment instantly when a lesson is completed, and reset automatically if more than 24 hours pass without any activity. The system must handle concurrent lesson completions without double-counting and must be accurate under high load.

**Weekly Leaderboard**

Every lesson completion updates the student's weekly score in real time. However, computing and serving a fully ranked leaderboard on every request is prohibitively expensive at BYJU'S scale. The public-facing leaderboard must therefore be cached and recalculated on a fixed hourly schedule — trading slight staleness for significantly reduced database load.

---

## Solution Design

The core insight driving the architecture is the separation of **write latency** from **read latency**:

- **Writes** (lesson completions) must be instant — streak updates, XP awards, and score increments happen synchronously on the lesson completion event, with no perceptible delay for the student.
- **Reads** (leaderboard display) can tolerate a one-hour cache window — Redis holds the pre-computed leaderboard snapshot and a scheduled cron job refreshes it hourly from PostgreSQL.

This decoupling means the leaderboard page never touches PostgreSQL directly under normal conditions. The database is never under read pressure from leaderboard queries during peak usage.

---

## System Architecture

The full component topology — from browser through the Next.js API layer, service logic, PostgreSQL, and Redis.

```mermaid
graph TB
    subgraph Client [Client Layer - Browser]
        UI[Next.js 15 React Frontend]
        FETCH[fetch API]
        UI --> FETCH
    end

    subgraph Next [Next.js 15 App Router - Vercel Edge]
        MW[withApiHandler wrapper]
        HELMET_MW[Helmet security headers]
        CORS_MW[CORS middleware]
        RATE_MW[Rate limiter - sliding window]
        SANITIZE[XSS input sanitizer]
        JWT_MW[JWT verification HS256]
        ZOD[Zod schema validation]
        CTRL[Route handlers - /api/*]
        MW --> HELMET_MW --> CORS_MW --> RATE_MW --> SANITIZE --> JWT_MW --> ZOD --> CTRL
    end

    subgraph Services [Service Layer]
        STREAK_SVC[streak.ts - lazy evaluation]
        XP_SVC[gamification.ts - XP and level math]
        LB_SVC[leaderboard.ts - ranking queries]
        PROGRESS_SVC[progress.ts - completion logs]
        PROFILE_SVC[profile.ts - user data]
        LESSON_SVC[lessons.ts - lesson queries]
        CRON[node-cron - hourly LB cache, daily streak verify]
    end

    subgraph Data [Data Layer]
        PG[(PostgreSQL - persistent store)]
        REDIS[(Redis - cache and rate limit)]
        PRISMA[Prisma ORM - type-safe queries]
        PG --- PRISMA
    end

    subgraph Observability [Observability]
        LOGGER[Secure logger - credential redaction]
        HEALTH[GET /api/health - DB and Redis probe]
    end

    FETCH -->|REST + JWT Bearer| MW
    CTRL --> STREAK_SVC
    CTRL --> XP_SVC
    CTRL --> LB_SVC
    CTRL --> PROGRESS_SVC
    CTRL --> PROFILE_SVC
    CTRL --> LESSON_SVC
    STREAK_SVC --> PRISMA
    XP_SVC --> PRISMA
    LB_SVC --> REDIS
    LB_SVC --> PRISMA
    RATE_MW --> REDIS
    CRON --> REDIS
    CRON --> PRISMA
    CTRL --> LOGGER
    HEALTH --> PG
    HEALTH --> REDIS
```

---

## Request Lifecycle

Every inbound API request to Cerevia flows through the `withApiHandler` higher-order wrapper before reaching any business logic. This ensures consistent security enforcement, validation, and response formatting across every route.

```mermaid
sequenceDiagram
    actor Student as Student - Browser
    participant Handler as withApiHandler
    participant CORS as CORS Middleware
    participant Rate as Rate Limiter
    participant XSS as XSS Sanitizer
    participant JWT as JWT Middleware
    participant Zod as Zod Validator
    participant Service as Service Layer
    participant PG as PostgreSQL
    participant Redis as Redis Cache

    Student->>Handler: HTTP request with Bearer token
    Handler->>CORS: Check origin against ALLOWED_ORIGINS
    alt Origin not permitted
        CORS-->>Student: 403 Forbidden
    end

    Handler->>Rate: Check sliding window per IP per route
    alt Rate limit exceeded
        Rate-->>Student: 429 Too Many Requests with Retry-After
    end

    Handler->>XSS: Sanitize request body recursively
    Note over XSS: Escapes HTML special chars in all string fields

    Handler->>JWT: Verify Bearer token signature and expiry
    alt Invalid or missing token
        JWT-->>Student: 401 Unauthorized
    end

    Handler->>Zod: Parse and validate params, query, body
    alt Schema mismatch
        Zod-->>Student: 400 Validation error with field details
    end

    Handler->>Service: Invoke business logic
    Service->>Redis: Read cache if available
    Redis-->>Service: Cache hit or miss
    Service->>PG: Query PostgreSQL if cache miss
    PG-->>Service: Result set
    Service-->>Handler: Structured response

    Handler->>Handler: Inject Helmet security headers
    Handler-->>Student: HTTP response with standard JSON envelope
```

---

## Redis Caching Strategy

How Cerevia uses Redis to serve leaderboard data at scale, with cache-aside invalidation on lesson completion and an hourly cron refresh as a safety net.

```mermaid
flowchart TD
    subgraph Write Path [Write Path - Lesson Completion]
        COMPLETE([POST /api/lessons/id/complete]) --> WRITE_DB[Update XP and score in PostgreSQL]
        WRITE_DB --> PURGE[deleteCachePattern: leaderboard:weekly:*]
        PURGE --> RESP_201([Return 201 Created])
    end

    subgraph Read Path [Read Path - Leaderboard Request]
        GET_LB([GET /api/user/leaderboard]) --> CACHE_CHECK{Cache key\nexists in Redis?}
        CACHE_CHECK -->|Hit| READ_REDIS[Read pre-computed rankings from Redis]
        READ_REDIS --> RESP_200([Return 200 OK - sub 1ms])
        CACHE_CHECK -->|Miss| QUERY_PG[SELECT top N from PostgreSQL\nORDER BY weekly_score DESC]
        QUERY_PG --> WRITE_CACHE[SET cache key in Redis\nwith TTL from LEADERBOARD_CACHE_TTL]
        WRITE_CACHE --> RESP_200
    end

    subgraph Cron Safety Net [Hourly Cron Job]
        CRON[node-cron: 0 * * * *] --> PRECOMPUTE[Query full leaderboard from PostgreSQL]
        PRECOMPUTE --> WARM[Write ranked snapshot to Redis]
        WARM --> LOG[Log cache warm completion]
    end

    subgraph Streak Cron [Daily Streak Verification]
        STREAK_CRON[node-cron: 0 0 * * *] --> SCAN[Scan users where last_activity_at older than 24h]
        SCAN --> RESET_DB[Reset streak to 0 for inactive users]
        RESET_DB --> LOG_STREAK[Log reset count]
    end
```

---

## Streak State Machine

How a student's streak moves through its states — including the lazy evaluation on lesson completion and the nightly cron fallback.

```mermaid
stateDiagram-v2
    [*] --> NoStreak : User registered, no lessons completed

    NoStreak --> Active : First lesson completed\nstreak set to 1, last_activity_at set to now

    Active --> Active : Lesson completed within 24h of last_activity_at\nstreak incremented, timestamp updated

    Active --> Broken : No lesson completed for more than 24h\nEvaluated lazily on next lesson completion\nor by daily cron job

    Broken --> Active : Student completes a lesson\nstreak resets to 1, last_activity_at set to now

    Active --> PersonalBest : Current streak exceeds previous longest_streak\nlongest_streak updated in DB

    PersonalBest --> Active : Continue building streak

    PersonalBest --> Broken : 24h window missed
```

---

## XP and Level Progression System

How XP is earned per lesson completion and how level boundaries are computed.

```mermaid
flowchart TD
    LESSON_COMPLETE([Lesson marked complete]) --> DUP_CHECK{Already completed\nthis lesson?}
    DUP_CHECK -->|Yes| REJECT([400 Already completed - no XP awarded])
    DUP_CHECK -->|No| AWARD[Award XP for lesson\nInsert into xp_records table]

    AWARD --> CALC_TOTAL[Sum all xp_records for user\nCompute total XP]
    CALC_TOTAL --> LEVEL_FORMULA[Apply level formula\nXP threshold for level N\n= 100 times N minus 1 plus 10 times N minus 1 squared]

    LEVEL_FORMULA --> LEVEL_CHECK{New level\nhigher than current?}
    LEVEL_CHECK -->|Yes| UPDATE_LEVEL[Update user level in DB\nReturn level-up flag in response]
    LEVEL_CHECK -->|No| NO_CHANGE[No level change]

    UPDATE_LEVEL --> RESP([Return XP awarded, new total, level, progress to next])
    NO_CHANGE --> RESP
```

---

## CI/CD Pipeline

```mermaid
flowchart TD
    PUSH([Push to main or PR opened]) --> GHA[GitHub Actions workflow triggered]

    GHA --> INFRA[Spin up PostgreSQL 15 and Redis 7\nservice containers with health checks]
    INFRA --> INSTALL[npm ci - install from lockfile]
    INSTALL --> TYPE_CHECK[npx tsc --noEmit\nTypeScript compilation]
    TYPE_CHECK --> LINT[npm run lint - ESLint]
    LINT --> BUILD[npm run build - Next.js production compile]
    BUILD --> MIGRATE[npx prisma db push\ndeploy schema to CI database]
    MIGRATE --> TEST[npm run test\nRun all 12 integration test suites]

    TEST --> RESULT{All checks pass?}
    RESULT -->|Yes| MERGE_OK([PR can be merged\nor deploy proceeds])
    RESULT -->|No - any step fails| BLOCK([Pipeline blocked\nMerge prevented])
```

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 15 App Router | Full-stack - API routes and React pages in one repo |
| Language | TypeScript | Latest | Type-safe code across the entire codebase |
| Database | PostgreSQL | 15+ | Persistent relational store for users, streaks, scores |
| ORM | Prisma | Latest | Type-safe queries, migrations, schema management |
| Cache and Queue | Redis | 7+ | Leaderboard snapshot, rate limiting fallback, cache invalidation |
| Validation | Zod | Latest | Runtime schema enforcement on all request inputs |
| Scheduling | node-cron | Latest | Hourly leaderboard cache warm, daily streak verification |
| Auth | Custom JWT HS256 | — | Stateless auth, algorithm explicitly pinned |
| HTTP Security | Helmet | Latest | CSP, HSTS, X-Frame-Options, X-Content-Type-Options |
| Styling | Tailwind CSS | v3 | Utility-first UI |
| Containerisation | Docker + Compose | Latest | Isolated PostgreSQL and Redis for local dev |
| Deployment | Vercel | — | Edge-optimised Next.js hosting with automatic deploys |
| Testing | Custom sequential runner | — | 12 isolated integration test suites |
| CI/CD | GitHub Actions | — | Type check, lint, build, migrate, test on every PR |

---

## Project Structure

```
Cerevia/
|
+-- prisma/
|   +-- schema.prisma            # User, Streak, WeeklyScore, XpRecord, LessonProgress models
|   +-- migrations/              # Prisma migration history
|   +-- seed.ts                  # Lesson data seeding script
|
+-- src/
|   +-- app/
|   |   +-- api/
|   |   |   +-- auth/
|   |   |   |   +-- login/route.ts       # POST /api/auth/login
|   |   |   |   +-- register/route.ts    # POST /api/auth/register
|   |   |   |   +-- me/route.ts          # GET /api/auth/me
|   |   |   +-- docs/
|   |   |   |   +-- route.ts             # GET /api/docs - Swagger UI
|   |   |   |   +-- swagger.json/route.ts# GET /api/docs/swagger.json
|   |   |   +-- lessons/
|   |   |   |   +-- route.ts             # GET /api/lessons - paginated, filtered
|   |   |   |   +-- progress/route.ts    # GET /api/lessons/progress
|   |   |   |   +-- [id]/route.ts        # GET /api/lessons/:id
|   |   |   |   +-- [id]/complete/route.ts # POST /api/lessons/:id/complete
|   |   |   +-- streak/route.ts          # GET /api/streak
|   |   |   +-- user/
|   |   |   |   +-- profile/route.ts     # GET PUT /api/user/profile
|   |   |   |   +-- streak/route.ts      # GET /api/user/streak
|   |   |   |   +-- xp/route.ts          # GET /api/user/xp
|   |   |   |   +-- leaderboard/route.ts # GET /api/user/leaderboard
|   |   |   |   +-- leaderboard/rank/route.ts # GET /api/user/leaderboard/rank
|   |   |   +-- health/route.ts          # GET /api/health
|   |   +-- instrumentation.ts           # Startup env validation - exits on missing vars
|   |
|   +-- lib/
|   |   +-- api-response.ts      # Standard JSON envelope + withApiHandler HOF
|   |   +-- errors.ts            # Domain error subclasses - mapped to HTTP status codes
|   |   +-- jwt.ts               # Sign and verify with algorithm pinned to HS256
|   |   +-- logger.ts            # Secure logger - redacts passwords, tokens from output
|   |   +-- prisma.ts            # Prisma client singleton
|   |   +-- redis.ts             # Redis client helpers, connection fail-safes, TTL helpers
|   |   +-- security.ts          # Helmet, CORS, rate limiter, XSS sanitizer composition
|   |   +-- cron.ts              # node-cron job definitions - leaderboard and streak cron
|   |   +-- services/
|   |   |   +-- gamification.ts  # XP award, level formula, duplicate completion guard
|   |   |   +-- leaderboard.ts   # Leaderboard ranking queries, pagination, user rank lookup
|   |   |   +-- lessons.ts       # Lesson fetch with filters, pagination, single lookup
|   |   |   +-- profile.ts       # Profile read and update with field validation
|   |   |   +-- progress.ts      # Lesson completion record creation and retrieval
|   |   |   +-- streak.ts        # Lazy streak evaluation, increment, reset, longest track
|   |   +-- validation/
|   |       +-- auth.ts          # Zod schemas for register and login
|   |       +-- leaderboard.ts   # Query param schemas with defaults
|   |       +-- profile.ts       # Profile update schema with constraints
|   |       +-- lessons.ts       # Lesson query and ID schemas
|   |
|   +-- utils/
|       +-- date.ts              # ISO week and year calculation helpers
|
+-- tests/
|   +-- run-all.ts               # Sequential isolated test runner using child processes
|   +-- auth.test.ts             # Registration, login, JWT, tamper, route auth
|   +-- lessons.test.ts          # List, filter, pagination, single fetch, invalid UUID
|   +-- progress.test.ts         # Initial state, completion, duplicate guard, invalid IDs
|   +-- streak.test.ts           # Increment, 24h reset, 48h reset, multi-day edge cases
|   +-- xp.test.ts               # XP award, duplicate guard, level boundaries, transitions
|   +-- leaderboard-service.test.ts     # Ranking, pagination, tie-breaking, user rank
|   +-- leaderboard-validation.test.ts  # Query param schema, out-of-bounds, defaults
|   +-- redis-cache.test.ts      # Get, set, delete pattern, connection fail-safe
|   +-- security.test.ts         # Helmet headers, CORS, rate limiting, XSS, log redaction
|   +-- error-handler.test.ts    # Error class mapping, DB failure hiding, envelope format
|   +-- cron.test.ts             # LB cache job, streak reset job, logging, connection loss
|   +-- profile.test.ts          # Retrieval, field update, avatar URL, bio constraints
|
+-- scripts/                     # Dev automation scripts
+-- docs/                        # Extended documentation
+-- Documentations/              # Architecture and design docs
+-- .github/
|   +-- workflows/
|       +-- ci.yml               # Full CI pipeline - type check, lint, build, migrate, test
+-- Dockerfile                   # Multi-stage build, standalone mode, non-root execution
+-- docker-compose.yml           # PostgreSQL 15 and Redis 7 for local development
+-- vercel.json                  # Vercel deployment configuration
+-- next.config.ts               # Next.js config with standalone output
+-- AGENTS.md                    # AI agent instructions for automated development
+-- CLAUDE.md                    # Claude Code configuration
+-- CONTRIBUTING.md              # Contribution workflow and standards
+-- .env.example                 # Environment variable documentation template
+-- package.json
+-- tsconfig.json
+-- eslint.config.js
+-- prettier.config.js
+-- README.md
```

---

## Key Design Decisions

**Why Redis for the leaderboard and not PostgreSQL directly?**
At BYJU'S scale, thousands of students may view the leaderboard simultaneously. Running `SELECT ... ORDER BY score DESC` on PostgreSQL for every request would create read pressure that spikes exactly when the platform is most active. Redis serves the pre-computed snapshot in under 1ms regardless of concurrent readers.

**Why is the Redis cache invalidated on score update rather than waiting for the hourly cron?**
When a student completes a lesson and then opens the leaderboard, they should see a current snapshot. Deleting the relevant cache keys on score update means the very next leaderboard request will query PostgreSQL and re-warm Redis with fresh data. The cron job is a safety net for periods when no completions are happening, not the primary cache refresh mechanism.

**Why is streak evaluation lazy rather than cron-driven?**
Rather than a scheduled task that scans all users every hour (which scales poorly), the streak is evaluated on each lesson completion. The service reads `last_activity_at` and compares it to `now()`. If the gap exceeds 24 hours, the streak resets to 1. A nightly cron job runs as a fallback for students who never complete another lesson. This approach scales to millions of users with near-zero background processing overhead.

**Why is duplicate completion guarded at the service layer?**
XP should only be awarded once per lesson per user. Checking in the service layer before any write prevents double-counting even under concurrent requests. The `LessonProgress` table enforces a unique constraint on `(userId, lessonId)` as a database-level guarantee.

**Why does `instrumentation.ts` validate environment variables at startup?**
Failing fast on a missing `JWT_SECRET` or malformed `DATABASE_URL` prevents the application from starting in a half-configured state that would serve inconsistent errors to real users. The process exits with code 1 and prints a structured diagnostic block, making misconfiguration immediately visible in deployment logs.

**Why use a custom `withApiHandler` wrapper instead of Next.js middleware?**
Next.js middleware runs at the edge before the function is invoked, making it difficult to inject request-specific context (such as the authenticated user) into the handler. `withApiHandler` is a higher-order function that composes all middleware — CORS, rate limiting, XSS sanitization, JWT verification, Zod validation — in a type-safe chain within each route file, keeping the middleware stack visible and testable.

---

## Interactive OpenAPI / Swagger Docs

Cerevia includes a built-in interactive Swagger UI.

| Resource | URL |
|---|---|
| Interactive UI | `http://localhost:3000/api/docs` |
| OpenAPI JSON spec | `http://localhost:3000/api/docs/swagger.json` |

The documentation UI supports JWT Bearer token authentication for direct API invocation from the browser. No external tool required.

---

## Environment Configuration

Copy `.env.example` to `.env` and configure all variables:

```env
# App
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# PostgreSQL
DB_USER=postgres
DB_PASSWORD=postgrespassword
DB_NAME=cerevia
DB_PORT=5432
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/cerevia

# Redis
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379

# Authentication
# Minimum 32 characters. Use: openssl rand -base64 48
JWT_SECRET=your-minimum-32-character-secret-key

# CORS
# Comma-separated list of permitted origins
ALLOWED_ORIGINS=http://localhost:3000

# Leaderboard cache TTL in seconds (default: 1 hour)
LEADERBOARD_CACHE_TTL=3600

# Cron schedules
LEADERBOARD_REFRESH_CRON=0 * * * *
STREAK_VERIFICATION_CRON=0 0 * * *
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Prisma connection string for PostgreSQL |
| `REDIS_URL` | Yes | ioredis connection string for Redis |
| `JWT_SECRET` | Yes | HMAC HS256 signing secret, minimum 32 characters |
| `ALLOWED_ORIGINS` | Yes | Comma-separated CORS allowlist |
| `LEADERBOARD_CACHE_TTL` | No | Redis cache TTL in seconds, default 3600 |
| `LEADERBOARD_REFRESH_CRON` | No | Cron expression for leaderboard cache warm |
| `STREAK_VERIFICATION_CRON` | No | Cron expression for daily streak reset |

---

## Docker and Database Setup

### Start Infrastructure Services

```bash
# Start PostgreSQL and Redis in detached mode
docker compose up -d db redis

# Verify containers are running and healthy
docker ps
```

### Apply Schema and Seed Data

```bash
# Deploy migrations and sync schema to PostgreSQL
npx prisma db push

# Seed initial lesson data
npx prisma db seed
```

### Inspect the Database (Optional)

```bash
# Open Prisma Studio — visual database browser
npx prisma studio
# Available at http://localhost:5555
```

---

## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | v18+ |
| npm | v9+ |
| Docker + Docker Compose | v20+ / v2+ |

### Installation

```bash
# Clone the repository
git clone https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia.git
cd S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Start infrastructure
docker compose up -d db redis

# Apply database schema
npx prisma db push

# Seed lesson data
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

```bash
npm run dev        # Start Next.js development server with hot reload
npm run build      # Build production Next.js bundle
npm run start      # Start production server from built bundle
npm run lint       # Run ESLint across the codebase
npm run format     # Auto-format with Prettier and prisma format
npm run test       # Run all 12 integration test suites sequentially
```

---

## Testing and Quality Assurance

Cerevia has a production-grade integration test suite covering 12 distinct concern areas. All tests run sequentially in isolated child processes via `tests/run-all.ts`, preventing shared state, connection leaks, and race conditions.

### Test Suite Reference

| Test File | Scenarios Covered |
|---|---|
| `auth.test.ts` | Registration, password hashing, conflict errors, login, credentials, JWT validity, token tamper, route auth |
| `lessons.test.ts` | List all lessons, case-insensitive search, order filters, pagination, fetch by ID, invalid UUID |
| `progress.test.ts` | Initial state, complete lesson, duplicate completion guard, invalid user or lesson UUIDs |
| `streak.test.ts` | Consecutive increments, 24h lazy reset, 48h reset, multi-day edge cases |
| `xp.test.ts` | XP award, duplicate completion guard, level boundary formula, progression transitions |
| `leaderboard-service.test.ts` | Dynamic ranking, pagination, score tie-breaking, user-specific rank lookup |
| `leaderboard-validation.test.ts` | Query param schemas, out-of-bounds page sizes, invalid week/year, default fallbacks |
| `redis-cache.test.ts` | Get, set, deleteCachePattern, connection failure fail-safes |
| `security.test.ts` | Helmet headers, CORS policy, rate limiting, XSS sanitization, credential log redaction |
| `error-handler.test.ts` | Error class to HTTP status mapping, DB failure masking, standard response envelope |
| `cron.test.ts` | LB cache warm job, daily streak reset, logging, connection-loss tolerance |
| `profile.test.ts` | Profile retrieval, field update, avatar URL validation, bio length constraints |

### Running Tests

```bash
# Ensure Docker services are running first
docker compose up -d db redis

# Run the full test suite
npm run test
```

### Type and Lint Checks

```bash
npx tsc --noEmit    # TypeScript compilation check - zero errors expected
npm run lint        # ESLint - zero warnings or errors expected
```

---

## API Reference

All endpoints return a standard JSON envelope:

```json
// Success
{ "success": true, "message": "...", "data": { ... } }

// Error
{ "success": false, "message": "...", "errorCode": "...", "details": [...] }
```

Protected routes require:
```
Authorization: Bearer <jwt_token>
```

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Create new user account |
| `POST` | `/api/auth/login` | No | Login, returns signed JWT |
| `GET` | `/api/auth/me` | Yes | Get authenticated user profile |

### Lessons

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/lessons` | Yes | Paginated lesson list with search and order filters |
| `GET` | `/api/lessons/:id` | Yes | Get single lesson metadata |
| `POST` | `/api/lessons/:id/complete` | Yes | Mark lesson complete — triggers streak, XP, and score update |
| `GET` | `/api/lessons/progress` | Yes | Completed vs remaining lesson breakdown |

### Streaks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/streak` | Yes | Current streak, longest streak, last activity timestamp |
| `GET` | `/api/user/streak` | Yes | Alias returning full streak statistics |

### Leaderboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user/leaderboard` | Yes | Weekly XP leaderboard — served from Redis cache |
| `GET` | `/api/user/leaderboard/rank` | Yes | Authenticated user's current rank and score |

### User

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user/profile` | Yes | Get bio, email, avatar, account metadata |
| `PUT` | `/api/user/profile` | Yes | Update name, bio, avatar URL |
| `GET` | `/api/user/xp` | Yes | Total XP, current level, progress to next level, XP history |

### Platform

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | PostgreSQL and Redis connectivity check |
| `GET` | `/api/docs` | No | Interactive Swagger UI |
| `GET` | `/api/docs/swagger.json` | No | OpenAPI 3.0 specification |

---

## Security Model

Cerevia implements defence-in-depth aligned with OWASP Top 10 guidelines.

| Control | Implementation | Detail |
|---|---|---|
| JWT hardening | HS256 algorithm explicitly pinned | Application throws on startup if `JWT_SECRET` is missing |
| HTTP security headers | Helmet | CSP, HSTS 180 days, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff |
| CORS | Strict origin allowlist | Configured via `ALLOWED_ORIGINS` env var, OPTIONS returns 204 |
| Rate limiting | Sliding window per IP per route | Auth routes: 5 req/60s. General: 60 req/60s. Falls back to in-memory if Redis offline |
| XSS prevention | Recursive HTML sanitizer | Escapes all string fields in POST/PUT/PATCH bodies before any processing |
| Log credential redaction | Custom logger wrapper | Regex-based redaction of passwords, Bearer tokens, and JWTs from all stdout output |
| Startup validation | `instrumentation.ts` | Validates `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET` on boot — exits with code 1 on failure |
| Container security | Non-root Docker execution | Runs as `nextjs:nodejs` user group, not root |
| Password hashing | bcrypt | Applied on registration, compared on login |

---

## Production Deployment

### Vercel (Frontend and API Routes)

1. Push to `main` — GitHub Actions CI runs automatically
2. Connect the repository to Vercel
3. Set all environment variables from `.env.example` in the Vercel project settings
4. Vercel auto-deploys on every push to `main`

### Database and Cache (Managed Services)

| Service | Recommended Provider |
|---|---|
| PostgreSQL | Supabase, Neon, Railway, AWS RDS |
| Redis | Upstash (serverless), Railway, AWS ElastiCache |

### Docker (Self-Hosted)

```bash
# Build production image
docker build -t cerevia:latest .

# Push to registry
docker tag cerevia:latest your-registry/cerevia:latest
docker push your-registry/cerevia:latest

# Apply migrations to production DB before routing traffic
npx prisma migrate deploy
```

The `Dockerfile` uses a multi-stage build with Next.js standalone output, running as a non-root user for minimal attack surface.

### Health Check Endpoint

All load balancers and orchestrators should probe `GET /api/health`:

```json
// 200 OK — all services connected
{ "success": true, "data": { "postgres": "connected", "redis": "connected" } }

// 503 Service Unavailable — degraded
{ "success": false, "errorCode": "SERVICE_UNAVAILABLE", "data": { "postgres": "failed", "redis": "connected" } }
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. Summary:

```bash
git checkout -b feat/your-feature-name
git commit -m "feat(scope): describe your change"
git push origin feat/your-feature-name
# Open a Pull Request against main
```

**Branch naming**: `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`

**Commit format**: Conventional Commits — `type(scope): description`

All PRs must pass the full CI pipeline (type check, lint, build, migrate, 12 test suites) before merge.

---

## Team

Squad 116 · Team 03

| Name | GitHub |
|---|---|
| Avadhut Pawar | [@Avadhut-Pawar31](https://github.com/Avadhut-Pawar31) |
| Areesh Ahmed | [@areesh-ahmed](https://github.com/areesh-ahmed) |
| Hardik Kaurani | [@hardikkaurani](https://github.com/hardikkaurani) |

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

*Cerevia — Squad 116, Team 03*

</div>
