# Decor (Decornish)

A modern, high-performance e-commerce storefront for home decor and furniture, built with the latest web technologies.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI/Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.studiofreight.com/) (smooth scrolling)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Emails**: [Nodemailer](https://nodemailer.com/) (Transactional order & contact emails)
- **Icons**: [Lucide React](https://lucide.dev/) & [Radix UI Icons](https://icons.radix-ui.com/)

## Features

- **Modern Storefront**: Responsive, animated, and beautifully designed user interface.
- **Admin Dashboard**: Full CRUD management for Products, Categories, Collections, and Orders.
- **Shopping Cart**: Real-time cart state management with persistent wishlist.
- **Checkout Flow**: Validated checkout process with automated, responsive HTML email notifications sent to both admins and customers.
- **Optimized Assets**: Next.js Image optimization utilizing proper `sizes` and `srcset` generation.
- **Clean Architecture**: Highly modularized components and unified server actions.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DaniyalFarrukh/Decor.git
   cd Decor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root of your project based on the required configurations:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Email (Gmail SMTP App Password)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure Overview

- `src/app`: Next.js App Router pages (storefront, checkout, admin).
- `src/components`: Reusable UI components, separated into `home`, `cart`, `layout`, `product`, and generic `ui` elements.
- `src/lib`: Core utilities, unified server actions (`actions/*`), and the `email.ts` dispatch service.
- `src/config`: Global site configurations and metadata.
- `src/utils/supabase`: Supabase clients for both server and client components.
- `supabase/schema.sql`: Database schema definition for the Supabase project.

## License

All rights reserved. © Decornish.
