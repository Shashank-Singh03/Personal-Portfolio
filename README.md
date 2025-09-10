# 💪 Gym-Themed Tech Portfolio

A production-ready personal portfolio website with a gym/fitness visual theme but tech-focused content. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Screenshot](./public/images/screenshot.png)

## 🏋️‍♂️ Features

- **Gym-Themed Design**: Dark steel background, neon accents, and gym metaphors throughout
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion powered animations and micro-interactions
- **Type-Safe**: Built with TypeScript for maximum reliability
- **SEO Optimized**: Next.js App Router with comprehensive meta tags
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for Core Web Vitals and Lighthouse scores
- **Interactive Calculators**: BMI and One Rep Max calculators with Zod validation
- **Contact Form**: Working contact form with API route and validation
- **Content Management**: Centralized content configuration for easy updates

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod
- **Testing**: Vitest + Playwright + Testing Library
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Content Configuration

All user-editable content is centralized in the `/content` directory:

- **`/content/site.ts`**: Personal information, social links, SEO settings
- **`/content/projects.ts`**: Project portfolio with descriptions and links
- **`/content/skills.ts`**: Technical skills with proficiency levels
- **`/content/achievements.ts`**: Professional achievements and milestones

### Example: Updating Personal Information

```typescript
// content/site.ts
export const siteConfig = {
  name: "Your Name",
  role: "Your Role",
  tagline: "Your Tagline",
  email: "your.email@example.com",
  location: "Your Location",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
  // ... more configuration
};
```

### Adding a New Project

```typescript
// content/projects.ts
const newProject: Project = {
  id: "unique-project-id",
  title: "Project Title",
  description: "Detailed project description...",
  summary: "Brief project summary",
  technologies: ["React", "Next.js", "TypeScript"],
  category: "web",
  status: "completed",
  featured: true,
  links: {
    github: "https://github.com/yourusername/project",
    live: "https://project.example.com",
  },
  startDate: "2024-01-01",
  endDate: "2024-03-01",
};
```

### Theme Customization

Colors and theme settings can be modified in:

- **Global styles**: `app/globals.css`
- **Tailwind config**: `tailwind.config.ts`
- **Site config**: `content/site.ts` (theme colors)

### Changing Accent Colors

```typescript
// content/site.ts
export const siteConfig = {
  theme: {
    primaryColor: "oklch(0.7 0.3 130)", // Neon green
    accentColor: "oklch(0.7 0.3 200)",  // Neon blue
  },
};
```

## 🧪 Testing

### Running Tests

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Unit tests
npm run test

# E2E tests
npm run e2e

# All tests in headless mode
npm run e2e:headless
```

### Test Coverage

The project includes comprehensive testing:

- **Unit Tests**: Component logic and utilities
- **Integration Tests**: API routes and form handling
- **E2E Tests**: Full user workflows with Playwright
- **Accessibility Tests**: Automated a11y checks

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** (if any)
3. **Deploy** - Vercel will automatically build and deploy

The project includes a `vercel.json` configuration file with optimized settings.

### Manual Deployment

1. Build the application: `npm run build`
2. Upload the `.next` folder and other required files
3. Set up environment variables on your hosting platform
4. Start the production server: `npm start`

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # ESLint linting
npm run format       # Prettier formatting
npm run test         # Run unit tests
npm run test:watch   # Watch mode for tests
npm run e2e          # Run E2E tests with UI
npm run e2e:headless # Run E2E tests headlessly
npm run prepare      # Setup Husky hooks
npm run analyze      # Analyze bundle size
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── (site)/            # Site pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Calculators/      # Calculator components
│   └── ...               # Custom components
├── content/              # Content configuration
│   ├── site.ts          # Site settings
│   ├── projects.ts      # Project data
│   ├── skills.ts        # Skills data
│   └── achievements.ts  # Achievement data
├── lib/                 # Utility libraries
│   ├── validators.ts    # Zod schemas
│   ├── utils.ts        # Helper functions
│   └── seo.ts          # SEO utilities
├── public/             # Static assets
│   ├── images/        # Image assets
│   └── lottie/        # Animation files
├── tests/             # Test files
│   ├── unit/         # Unit tests
│   ├── integration/  # Integration tests
│   └── e2e/          # E2E tests
└── styles/           # Additional styles
```

## 🎨 Customization Ideas

### 1. Change Color Scheme
- Modify CSS variables in `app/globals.css`
- Update theme colors in `content/site.ts`
- Adjust Tailwind config for new color palette

### 2. Add New Sections
- Create new page components in `app/(site)/`
- Add navigation links in `components/Nav.tsx`
- Update content configuration files

### 3. Replace Images
- Add your photos to `public/images/`
- Update image references in components
- Optimize images for web (WebP recommended)

### 4. Enable Blog (Future Enhancement)
- Add blog content type to validators
- Create blog pages and components
- Add blog navigation and routing

### 5. Add More Calculators
- Create new calculator components in `components/Calculators/`
- Add validation schemas to `lib/validators.ts`
- Include utility functions in `lib/utils.ts`

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
- Run `npm run type-check` to identify TypeScript issues
- Check ESLint errors with `npm run lint`
- Ensure all required dependencies are installed

**Styling Issues**
- Clear `.next` cache: `rm -rf .next`
- Rebuild Tailwind: `npm run build`
- Check for CSS conflicts in browser dev tools

**Animation Issues**
- Verify Framer Motion version compatibility
- Check for conflicting CSS animations
- Test on different browsers

### Getting Help

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Tailwind CSS docs](https://tailwindcss.com/docs)
3. Consult [Framer Motion guides](https://www.framer.com/motion/)
4. Open an issue on the repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

Built with 💪 and ❤️ using Next.js, TypeScript, and Tailwind CSS.