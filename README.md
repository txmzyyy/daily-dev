# daily-dev

daily-dev is a developer-focused platform that helps users discover, read, and share technical content. It supports multiple user roles, including regular users and writers, making it easy to build a community around learning and publishing.

## Features

- User sign-up and authentication
- Role-based access for users and writers
- Developer-focused content experience
- Responsive layout for desktop and mobile
- Scalable frontend and backend structure

## Tech Stack

- Frontend: React / Next.js
- Backend: Node.js / Next.js API routes
- Database: PostgreSQL
- Authentication: JWT or session-based auth
- Styling: CSS / Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- PostgreSQL
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/txmzyyy/daily-dev.git
   cd daily-dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your project settings.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## Environment Variables

Example:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/daily_dev
JWT_SECRET=your-secret-key
```

## Project Structure

```bash
daily-dev/
├── app/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── styles/
├── lib/
├── prisma/
├── public/
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the project for production
npm run start    # Run the production build
npm run lint     # Run lint checks
```

## Contributing

Front-end was worked on by; Oren and James
Oren worked on the component folder this includes the common layout and content.
James worked on the context,data and screens.

Backend
Tamara and ilhan worked on the backend
## License

This project is licensed under the MIT License.
