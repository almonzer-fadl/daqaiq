# Daqaiq - Auto Parts E-commerce Platform

A modern e-commerce platform built with Next.js 14, focusing on automotive parts and accessories.

## Tech Stack

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + DaisyUI
- **Authentication:** NextAuth.js
- **Database:** MongoDB with Mongoose
- **State Management:** React Query
- **UI Components:** Headless UI + Heroicons

## Features

- Modern, responsive design
- Server-side rendering for optimal performance
- Role-based authentication (Admin, Supplier, Customer)
- Product catalog with categories and search
- Shopping cart functionality
- Order management system
- Supplier dashboard
- Admin panel
- Analytics and reporting

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/daqaiq.git
cd daqaiq
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
daqaiq/
├── app/                  # Next.js app directory
│   ├── components/      # React components
│   │   ├── common/     # Shared components
│   │   ├── features/   # Feature-specific components
│   │   └── ui/        # UI components
│   ├── lib/           # Core functionality
│   │   ├── models/    # Database models
│   │   ├── utils/    # Utility functions
│   │   └── auth/     # Authentication logic
│   ├── config/       # Configuration files
│   ├── constants/    # Constants and translations
│   └── api/         # API routes
├── public/          # Static assets
└── styles/         # Global styles
```

## Development Guidelines

- Follow the component naming convention: `ButtonAccount.jsx`, `CardAnalyticsMain.jsx`
- Use functional components and hooks
- Implement proper error handling and loading states
- Write meaningful commit messages
- Keep components small and focused
- Use TypeScript for better type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 