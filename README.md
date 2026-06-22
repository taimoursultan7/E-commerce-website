# ShopSphere — Premium E‑Commerce (React + Vite + Tailwind)

A modern, responsive, premium e‑commerce website built with **React**, **Vite**, and **Tailwind CSS**.
It includes a complete shopping flow (search, filters, wishlist, cart, checkout, order summary) with a professional UI/UX.

## Tech Stack

- React (Functional Components)
- React Router DOM (Lazy-loaded routes)
- Tailwind CSS
- Context API (Auth / Shop / UI)
- Framer Motion (animations)
- react-hot-toast (toast notifications)

## Features

- Responsive design (mobile / tablet / desktop)
- Sticky navigation bar
- Hero section + promotional layout
- Product categories + featured products
- Product cards: image, title, price, rating, add-to-cart, wishlist
- Product search + filtering (category + max price)
- Product details page: gallery, specs, reviews, related products
- Cart system: quantity increment/decrement, remove, clear
- Secure checkout (demo) + order summary
- User authentication (demo login/register)
- User dashboard with orders
- Contact / About / FAQ pages
- Newsletter section
- Dark/Light mode toggle (premium “B option” toggle with moon/sun)
- Loading skeletons + smooth transitions

## Folder Structure

```
src/
  components/
    layout/
    nav/
    products/
    seo/
    ui/
  data/
  pages/
  providers/
  state/
    auth/
    shop/
    ui/
  utils/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

- Payments are **demo-only**. Do not enter real card information.
- State (cart, wishlist, user, orders, theme) is stored in `localStorage` for persistence.

## Customization

- Primary accent color used in key UI areas: `#D3D4C0`
- Footer social links include Instagram, LinkedIn, and WhatsApp.

---

© ShopSphere
