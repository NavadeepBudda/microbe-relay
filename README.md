# Ocean Denitrification: Microbial Relay Science

An interactive educational website that teaches how ocean microbes share denitrification work through specialized biochemical pathways. Users control food and oxygen levels to observe which microbial specialists dominate and when greenhouse gases are produced. Designed for high school students and the general public to understand ocean biogeochemistry and climate connections.

## What You'll Learn

This interactive simulation demonstrates how marine microorganisms work together in low-oxygen ocean zones to process nitrogen compounds. Key learning outcomes include:

- How food scarcity versus abundance affects which microbial specialists dominate
- When and why nitrous oxide (N2O) greenhouse gas production peaks
- The connection between ocean fertility, microbial competition, and climate
- Why ocean nitrogen cycling matters for global environmental systems

## Features

- Interactive food and oxygen level controls
- Real-time visualization of microbial pathway dynamics
- Animated nitrogen compound transformations
- Educational content progression from basic concepts to complex interactions
- Pre and post-assessment testing to measure learning gains
- Responsive design for desktop and mobile devices

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd glass-ocean-prelude
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Tech Stack

### Frontend
- **React 18** - Component-based user interface
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Recharts** - Data visualization charts

### Backend & Database
- **Supabase** - PostgreSQL database and authentication
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling and validation

### Development Tools
- **ESLint** - Code linting and style enforcement
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI base components
│   ├── *Card.tsx       # Educational content cards
│   ├── *Slider.tsx     # Interactive controls
│   └── *Animation.tsx  # Visual simulations
├── pages/              # Route components
│   ├── Orientation.tsx # Landing and introduction
│   ├── MeetTheRelay.tsx # Concept introduction
│   ├── Relay.tsx       # Main simulation
│   └── TryIt.tsx       # Interactive playground
├── lib/                # Utility functions and services
│   ├── supabase.ts     # Database client and types
│   ├── relay-state.ts  # Simulation state logic
│   └── analytics.ts    # Usage tracking
└── hooks/              # Custom React hooks
    ├── use-mobile.tsx  # Mobile device detection
    └── useDocumentTitle.ts # Dynamic page titles
```

## Environment Setup

### Supabase Configuration

The project uses Supabase for data persistence. Environment variables are already configured in `.env.local` and excluded from version control for security.

If you need to set up your own Supabase instance:

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anonymous key
3. Update the `.env.local` file with your credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Note: The `.env.local` file is ignored by git to prevent exposing sensitive credentials.

### Database Schema

The application uses Supabase PostgreSQL with the following key tables:
- `pretest_questions` - Pre-assessment question bank
- `pretest_sessions` - User assessment sessions
- `pretest_responses` - Individual question responses
- `posttest_questions` - Post-assessment question bank
- `posttest_sessions` - Post-learning assessment sessions
- `posttest_responses` - Post-learning responses

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run build:dev    # Build for development environment
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code analysis
```

### Project Management
The application includes automated testing and assessment functionality through Supabase integration. User responses are tracked for educational research purposes.

## Browser Support

Modern browsers supporting ES2020+ features:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Educational Context

This project teaches ocean biogeochemistry through the lens of microbial ecology. The denitrification process converts nitrate to nitrogen gas through four main steps, each often performed by different microbial specialists. Understanding this process is crucial for:

- Marine ecosystem health assessment
- Climate change research
- Ocean dead zone prediction
- Biogeochemical cycle modeling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit with clear messages: `git commit -m "Add new feature"`
6. Push to your branch: `git push origin feature/new-feature`
7. Create a pull request with detailed description

### Code Style Guidelines

- Use TypeScript for all new files
- Follow existing component structure and naming conventions
- Ensure responsive design for all new UI components
- Add appropriate error handling for database operations
- Include JSDoc comments for complex functions

## License

This educational project is developed for research and teaching purposes. Please contact the development team for usage permissions and collaboration opportunities.

## Support

For technical issues or educational content questions, please create an issue in the repository or contact the development team.