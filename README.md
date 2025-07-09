# Companions AI

Welcome to Companions AI, a platform where you can create, manage, and interact with personalized AI-powered companions designed to help you learn and explore various subjects.

![Hero Image](./public/readme/hero.png)

## 🚀 Features

- **Create Custom Companions**: Build your own AI companions by defining their name, subject, specific topic, voice, and interaction style.
- **Companion Library**: Browse a library of all available companions.
- **Search & Filter**: Easily find companions by filtering by subject (e.g., Maths, Science, Coding) or searching by topic.
- **Personalized Dashboard**: The homepage displays popular companions and your recently completed sessions.
- **Interactive Learning**: Engage with companions through a voice-based interface (powered by Vapi).
- **Secure Authentication**: User authentication is handled securely by Clerk.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/ui](https://ui.shadcn.com/) components
- **Database**: [Supabase](https://supabase.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Voice AI**: [Vapi](https://vapi.ai/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Error Monitoring**: [Sentry](https://sentry.io/)

## ⚙️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites

Make sure you have Node.js (v20 or later) and npm installed.

### 2. Clone the Repository

```bash
git clone https://github.com/NoureddineDRIOUECH/companions.git
cd companions
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. You will need to get these credentials from their respective services (Clerk, Supabase, Vapi).

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi AI
NEXT_PUBLIC_VAPI_API_KEY=
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.
