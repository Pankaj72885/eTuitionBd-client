# eTuitionBd - Color Scheme & Design System

## 🎨 Color Palette

### Primary Colors

```css
/* Light Mode */
--brand-primary: #4f46e5; /* Indigo-600 */
--brand-primary-hover: #4338ca; /* Indigo-700 */
--brand-primary-light: #e0e7ff; /* Indigo-100 */
--brand-primary-dark: #3730a3; /* Indigo-800 */

/* Dark Mode */
--brand-primary-dark: #818cf8; /* Indigo-400 */
--brand-primary-hover-dark: #a5b4fc; /* Indigo-300 */
```

### Background Colors

```css
/* Light Mode */
--bg-primary: #ffffff; /* White */
--bg-secondary: #f9fafb; /* Gray-50 */
--bg-tertiary: #f3f4f6; /* Gray-100 */
--bg-accent: #eef2ff; /* Indigo-50 */

/* Dark Mode */
--bg-primary-dark: #111827; /* Gray-900 */
--bg-secondary-dark: #1f2937; /* Gray-800 */
--bg-tertiary-dark: #374151; /* Gray-700 */
--bg-accent-dark: #1e1b4b; /* Indigo-950 */
```

### Text Colors

```css
/* Light Mode */
--text-primary: #111827; /* Gray-900 */
--text-secondary: #4b5563; /* Gray-600 */
--text-tertiary: #6b7280; /* Gray-500 */
--text-muted: #9ca3af; /* Gray-400 */

/* Dark Mode */
--text-primary-dark: #f9fafb; /* Gray-50 */
--text-secondary-dark: #d1d5db; /* Gray-300 */
--text-tertiary-dark: #9ca3af; /* Gray-400 */
--text-muted-dark: #6b7280; /* Gray-500 */
```

### Border Colors

```css
/* Light Mode */
--border-primary: #e5e7eb; /* Gray-200 */
--border-secondary: #d1d5db; /* Gray-300 */

/* Dark Mode */
--border-primary-dark: #374151; /* Gray-700 */
--border-secondary-dark: #4b5563; /* Gray-600 */
```

### Status Colors

```css
/* Success */
--success: #10b981; /* Green-500 */
--success-light: #d1fae5; /* Green-100 */
--success-dark: #065f46; /* Green-800 */

/* Warning */
--warning: #f59e0b; /* Amber-500 */
--warning-light: #fef3c7; /* Amber-100 */
--warning-dark: #92400e; /* Amber-800 */

/* Danger */
--danger: #ef4444; /* Red-500 */
--danger-light: #fee2e2; /* Red-100 */
--danger-dark: #991b1b; /* Red-800 */

/* Info */
--info: #3b82f6; /* Blue-500 */
--info-light: #dbeafe; /* Blue-100 */
--info-dark: #1e40af; /* Blue-800 */
```

## 📐 Component Patterns

### Cards

```jsx
// Light Mode
className =
  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-indigo-900/20 transition-shadow";

// Content
className = "text-gray-900 dark:text-white";
className = "text-gray-600 dark:text-gray-300";
```

### Buttons

```jsx
// Primary
className =
  "bg-brand dark:bg-indigo-600 text-white hover:bg-brand-dark dark:hover:bg-indigo-700";

// Outline
className =
  "border border-brand dark:border-indigo-400 text-brand dark:text-indigo-400 hover:bg-brand hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white";

// Ghost
className =
  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";
```

### Inputs

```jsx
className =
  "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-brand dark:focus:ring-indigo-400 focus:border-brand dark:focus:border-indigo-400";
```

### Sections

```jsx
// Alternating backgrounds
className = "bg-white dark:bg-gray-900";
className = "bg-gray-50 dark:bg-gray-800";
```

### Headings

```jsx
className = "text-gray-900 dark:text-white";
className = "text-gray-700 dark:text-gray-200";
```

### Links

```jsx
className =
  "text-brand dark:text-indigo-400 hover:text-brand-dark dark:hover:text-indigo-300";
```

## 🎯 Usage Guidelines

### 1. Always use semantic colors

- Use `text-gray-900 dark:text-white` for primary headings
- Use `text-gray-600 dark:text-gray-300` for body text
- Use `text-gray-500 dark:text-gray-400` for muted text

### 2. Maintain contrast ratios

- Ensure WCAG AA compliance (4.5:1 for normal text)
- Test with both light and dark modes

### 3. Consistent transitions

```jsx
className = "transition-colors duration-200";
```

### 4. Hover states

- Always provide visual feedback
- Use subtle color changes
- Add shadow transitions for cards

### 5. Focus states

```jsx
className =
  "focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
```

## 📱 Responsive Patterns

### Container

```jsx
className = "max-w-6xl mx-auto px-4 md:px-6";
```

### Grid

```jsx
className = "grid gap-4 md:grid-cols-2 lg:grid-cols-3";
```

### Spacing

```jsx
className = "py-12 md:py-16";
className = "space-y-4 md:space-y-6";
```

## ✨ Special Effects

### Glassmorphism

```jsx
className = "backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95";
```

### Gradients

```jsx
className =
  "bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/30 to-gray-50 dark:to-gray-900";
```

### Shadows

```jsx
className = "shadow-sm dark:shadow-gray-800/50";
className = "shadow-lg dark:shadow-indigo-900/20";
```

## 🔄 Animation Classes

### Fade In

```jsx
className = "animate-fadeIn";
```

### Slide In

```jsx
className = "animate-slideInLeft";
className = "animate-slideInRight";
```

### Pulse

```jsx
className = "animate-pulse";
```

---

## Implementation Checklist

- [ ] All pages have dark mode support
- [ ] All components use semantic colors
- [ ] Proper contrast ratios maintained
- [ ] Smooth transitions implemented
- [ ] Hover states defined
- [ ] Focus states accessible
- [ ] Responsive breakpoints working
- [ ] Tested in both modes

---

<div align="center">
  <p>Designed for eTuitionBd Platform</p>
  <p>© 2025 eTuitionBd. All rights reserved.</p>
</div>
