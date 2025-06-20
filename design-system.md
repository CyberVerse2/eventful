# Eventful Design System

## Color Palette

- **Primary Yellow Gradient:** from-yellow-400 via-yellow-300 to-yellow-200
- **Accent Yellow:** #FACC15 (bg-yellow-500)
- **Black:** #000000 (text, borders, shadows)
- **White:** #FFFFFF (backgrounds, cards)
- **Gray:** text-gray-900, text-gray-700, text-gray-600, text-gray-500
- **Category Colors:**
  - Green: bg-green-500
  - Yellow: bg-yellow-500
  - Purple: bg-purple-500

## Typography

- **Headings:**
  - Font weight: bold
  - Sizes: text-2xl, text-4xl, text-6xl, text-xl, text-lg
- **Body:**
  - Font weight: normal or medium
  - Sizes: text-base, text-sm, text-xl
- **Font Family:** System default (inherits from Tailwind/Next.js base)

## Buttons

- **Primary:**
  - Background: Black
  - Text: White
  - Border: Black
  - Hover: bg-gray-800
- **Outline:**
  - Background: White or transparent
  - Border: Black
  - Text: Black
  - Hover: bg-gray-100
- **Shape:**
  - Rounded corners (default Tailwind)
  - Padding: px-4, py-2 or as per shadcn/ui

## Cards

- **Background:** White
- **Border:** 4px solid Black
- **Shadow:** shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
- **Hover:** shadow-2xl, transform hover:-translate-y-2
- **Rounded corners:** Default Tailwind

## Badges

- **Background:** Accent Yellow (bg-yellow-500)
- **Text:** Black
- **Font:** Semibold
- **Shape:** Rounded

## Progress Bar

- **Height:** h-2
- **Color:** Uses primary yellow or accent

## Navigation Bar

- **Background:** White
- **Border:** 4px solid Black (bottom)
- **Shadow:** shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]
- **Sticky:** top-0, z-50

## Order Summary/Checkout

- **Cards:** Same as above
- **Success Icon:** Green circle with white check
- **Order Details:** Use gray backgrounds for info boxes

## General UI/UX Patterns

- **Spacing:** Generous padding and margin (e.g., py-4, px-4, gap-4, gap-8)
- **Grid Layouts:** Responsive, using grid-cols-2, grid-cols-3, etc.
- **Feedback:** Clear, bold success and error states
- **Accessibility:** High contrast, large clickable areas

---

**Always reference this file when creating or updating any UI component or page.**
