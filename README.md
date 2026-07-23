c# AI Form Builder Monorepo

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-000000.svg?style=flat-square&logo=turborepo)](https://turbo.build/)
[![tRPC](https://img.shields.io/badge/API-tRPC-2563EB.svg?style=flat-square&logo=trpc)](https://trpc.io/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-000000.svg?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Drizzle ORM](https://img.shields.io/badge/Database-Drizzle%20ORM-C5F74F.svg?style=flat-square&logo=postgresql)](https://orm.drizzle.team/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

An enterprise-grade, production-ready SaaS application for building dynamic forms instantly. Powered by Google Gemini AI, it generates fields, labels, options, and validations in seconds based on plain English descriptions. Fully equipped with interactive drag-and-drop customization, real-time analytics, and a premium SaaS aesthetic.

---

## ⚡ Quick Demo & Showcase

![AI Form Builder Dashboard Placeholder](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

> _Placeholder for the application dashboard interface showing dynamic AI generation panel, real-time response trends graph, and form builder canvas._

---

## ✨ Features

- **🧠 AI Form Generator**: Describe a form in natural language (e.g. _"Job application for Senior React Devs with portfolio uploads and experience levels"_) and let Gemini AI assemble the fields, custom validation, and layout instantly.
- **📊 Real-Time Analytics**: Full dashboard tracking active forms, average response rates, total submissions, and conversion metrics over dynamic time periods.
- **🎨 Premium SaaS Aesthetic**: Crafted using a highly-refined neutral design language, custom interactive cards, sleek dark mode transitions, and glassmorphic micro-animations.
- **🔒 Fully Type-Safe Auth**: Native cookied Supabase JWT authentication flow with tRPC protected procedure middlewares securing all mutations.
- **⚡ Fast Performance**: Leverages Next.js App Router, React Server Components (RSC), Turbopack caching, and Drizzle ORM database client.

---

## 🛠️ Tech Stack

### Frameworks & Tools

- **Build System**: [Turborepo](https://turbo.build/) (Optimized monorepo configuration with task caching)
- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router, Tailwind CSS, shadcn/ui primitives)
- **API**: [tRPC](https://trpc.io/) (End-to-end type safety with automatic router mapping)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) (Sleek SQL dialect query builder)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Postgres database host)
- **AI Integration**: [@google/genai SDK](https://github.com/google/generative-ai-js) (Gemini model orchestration)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 📐 Architecture Overview

```mermaid
graph TD
    %% Clients
    WebClient[Next.js App Router Client /apps/web] -->|tRPC Client SDK| TRPCRouter
    APIClient[REST Clients / OpenAPI docs] -->|HTTP Requests| APIServer

    %% Server Nodes
    subgraph Server [SaaS Server Layer]
        APIServer[apps/api standalone server]
        TRPCRouter[packages/trpc API Router]
        AuthGuard[Protected Middleware JWT Check]

        APIServer --- TRPCRouter
        TRPCRouter --> AuthGuard
    end

    %% Services & Packages
    subgraph Packages [Shared Libraries /packages]
        AIService[packages/ai Gemini Service]
        CoreServices[packages/services Domain Layer]
        DbClient[packages/database Drizzle ORM]
        EnvConfig[packages/env Configuration]
        Validators[packages/validators Zod Schemas]
    end

    AuthGuard --> CoreServices
    CoreServices --> DbClient
    CoreServices --> AIService
    DbClient --> Database[(PostgreSQL Engine)]
    AIService --> GeminiAPI[Google Gemini AI API]
    EnvConfig -.-> WebClient
    EnvConfig -.-> APIServer
    Validators -.-> WebClient
    Validators -.-> TRPCRouter
```

### Request Flow & Middleware Architecture

```mermaid
sequenceDiagram
    autonumber
    actor User as User Agent
    participant Web as Next.js Web
    participant TRPC as tRPC Router
    participant Auth as Auth Middleware
    participant Service as Service Layer
    participant DB as Postgres (Drizzle)

    User->>Web: Click "Generate with AI" (prompt entered)
    Web->>TRPC: Mutate trpc.ai.generateForm({ prompt })
    TRPC->>Auth: Intercept check cookie JWT accessToken
    alt Invalid/No Cookie
        Auth-->>TRPC: Throw TRPCError (UNAUTHORIZED)
        TRPC-->>Web: Redirect /login or toast error
    else Valid Session
        Auth->>TRPC: Inject verified user profile into context
        TRPC->>Service: Call aiFormService.createForm(userId, prompt)
        Service->>DB: Check billing plan/credits limit
        DB-->>Service: Credits OK
        Service->>Service: Query Gemini Model via SDK
        Service->>Service: Parse & slice title (55) & description (150)
        Service->>DB: INSERT Form and FormFields
        DB-->>Service: Form Created (id, slug)
        Service-->>TRPC: Return Form Metadata
        TRPC-->>Web: Form successfully created payload
        Web->>User: Route to /b/[formId] Builder Canvas
    end
```

---

## 📂 Folder Structure

```txt
.
├── apps/
│   ├── api/                   # Standalone api server serving routes and tRPC requests
│   └── web/                   # Next.js 16 Web Dashboard and builder UI
├── packages/
│   ├── ai/                    # `@google/genai` integration & prompt services
│   ├── database/              # Drizzle ORM client, schemas, and migrations
│   ├── env/                   # Zod validated type-safe environment configuration
│   ├── eslint-config/         # Shared ESLint configuration presets
│   ├── logger/                # Pino-based lightweight logger package
│   ├── services/              # Domain service layers (Forms, Submissions, Users, Analytics)
│   ├── trpc/                  # End-to-end tRPC routing protocols & context definitions
│   ├── typescript-config/     # Unified tsconfig options across the monorepo
│   └── validators/            # Shared validation definitions for API and client payloads
├── package.json               # Root monorepo configuration
├── pnpm-workspace.yaml        # PNPM workspace packages definition
└── turbo.json                 # Turborepo task configuration settings
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version >= 18.x)
- [PNPM](https://pnpm.io/) (Version >= 9.x)
- [PostgreSQL Database Instance](https://www.postgresql.org/)

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/username/form-builder.git
cd form-builder
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Credentials
DATABASE_URL="postgresql://postgres:password@localhost:5432/formbuilder"

# Supabase Auth / Cookie JWT Credentials
SUPABASE_URL="https://your-supabase-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_JWT_SECRET="your-jwt-secret-used-for-access-token-validation"

# Google Gemini API Credentials
GEMINI_API_KEY="AIzaSy..."

# API Endpoint Configurations
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
```

### 3. Initialize the Database

Generate the SQL schema files and apply migrations:

```bash
# Generate SQL migrations via drizzle-kit
pnpm run db:generate

# Apply migrations to database engine
pnpm run db:migrate
```

### 4. Start Development Server

```bash
pnpm run dev
```

This launches:

- `web` panel on `http://localhost:3000`
- `api` endpoint backend on `http://localhost:3001`

---

## ⚡ Turborepo Task Commands

Run tasks across all packages from the root using `turbo`:

```bash
# Build production bundle for all apps and packages
pnpm run build

# Build only the web frontend
pnpm run build --filter=web

# Run ESLint validation checks
pnpm run lint

# Check Typescript compilation across all workspaces
pnpm run check-types

# Format files using Prettier configuration
pnpm run format
```

---

## 🎨 Design Decisions

1. **Service Layer Separation**: Business logic lives strictly inside `/packages/services`, making it independent of next.js server components or standalone express route controllers.
2. **VARCHAR limits**: Programmatic slicing is enforced at the service level for form names (max 55) and descriptions (max 150) before writing to PostgreSQL to ensure SQL column constraints (`VARCHAR(55)` / `VARCHAR(150)`) are never broken by AI prompt generations.
3. **Controlled Triggers**: Overridden radix dialog triggers manually inside tooltip wrappers to prevent context bubbling bugs, maintaining pure click capture on responsive SaaS elements.

---

## 📈 Performance & Security

- **Turborepo Cache hit**: Cache builds and typings using Turborepo's local artifacts cache to speed up continuous integration pipelines.
- **HTTP-Only Access Tokens**: JWT authentication is validated securely via HttpOnly cookies (`accessToken`) using middleware checks, preventing cross-site scripting token theft.
- **Varchar Length Sanitization**: Truncates incoming generated data lengths to safely prevent buffer exceptions or DB column index exceptions.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
