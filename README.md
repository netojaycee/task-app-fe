# TaskFlow - Modern Task Management Application

A feature-rich task management application with user authentication, role-based access control, and a modern UI built with Next.js (App Router).

![TaskFlow Logo](./public/logo.png)

## Features

- **User Authentication**: Secure login and registration system
- **Role-Based Access Control**: Admin and regular user roles
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering & Sorting**: Organize tasks by priority, status, and more
- **Admin Dashboard**: Manage users and their tasks
- **Modern UI**: Clean, responsive design with animations and transitions
- **Drag and Drop**: Intuitive task organization

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS v4
- **State Management**: React Query & Context API
- **Form Handling**: React Hook Form with Yup validation
- **Animations**: Custom CSS animations

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API server running (separate repository)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management.git
   cd task-management/fe
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory with:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Authentication routes (login, register)
│   ├── (protected)/     # Protected routes (dashboard, admin)
│   └── page.tsx         # Landing page
├── components/
│   ├── local/           # Application-specific components
│   └── ui/              # Reusable UI components (Shadcn)
├── context/             # React Context providers
├── lib/                 # Utility functions and API client
└── types/               # TypeScript type definitions
```

## Authentication Flow

1. Users register or login through the authentication forms
2. Upon successful authentication, a token is stored in cookies
3. Protected routes check for the token using middleware
4. Admin routes verify both token presence and user role

## User Roles

- **Regular User**: Can manage their own tasks
- **Admin User**: Can manage all users and their tasks

## Development Workflow

1. Make changes to the codebase
2. Test locally with the development server
3. Build and deploy to production:
   ```bash
   npm run build
   npm start
   ```

## Deployment

The application can be deployed on Vercel or any platform supporting Next.js:

```bash
# For Vercel CLI deployment
vercel

# For production build
vercel --prod
```
