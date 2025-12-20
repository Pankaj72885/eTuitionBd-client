# eTuitionBd - Dark Mode Implementation Progress

## ✅ Completed Pages

### Core Components

- [x] Navbar - Full dark mode with glassmorphism
- [x] Footer - Complete dark mode support
- [x] HomePage - All sections updated

### Authentication

- [x] LoginPage - Complete with form fields, buttons, and links

## 🔄 Pages Requiring Updates

### Public Pages (High Priority)

1. [ ] RegisterPage
2. [ ] TuitionsListPage
3. [ ] TuitionDetailsPage
4. [ ] TutorsListPage
5. [ ] TutorProfilePage
6. [ ] AboutPage
7. [ ] ContactPage
8. [ ] NotFoundPage

### Student Dashboard (High Priority)

9. [ ] StudentDashboardHome
10. [ ] MyTuitions
11. [ ] PostNewTuition
12. [ ] AppliedTutors
13. [ ] StudentPayments
14. [ ] StudentBookmarks
15. [ ] StudentProfileSettings

### Tutor Dashboard (High Priority)

16. [ ] TutorDashboardHome
17. [ ] MyApplications
18. [ ] TutorOngoingTuitions
19. [ ] TutorRevenueHistory
20. [ ] TutorProfileSettings

### Admin Dashboard (Medium Priority)

21. [ ] AdminDashboardHome
22. [ ] AdminAnalytics
23. [ ] UserManagement
24. [ ] TuitionManagement
25. [ ] ReportsTransactions

## 🎨 Standard Dark Mode Pattern

### Page Container

```jsx
className =
  "min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200";
```

### Section Backgrounds (Alternating)

```jsx
// White section
className = "bg-white dark:bg-gray-900";

// Gray section
className = "bg-gray-50 dark:bg-gray-800";
```

### Cards

```jsx
className =
  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-indigo-900/20 transition-shadow";
```

### Headings

```jsx
// H1
className = "text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white";

// H2
className = "text-xl md:text-2xl font-semibold text-gray-900 dark:text-white";

// H3
className = "text-lg font-semibold text-gray-900 dark:text-white";
```

### Body Text

```jsx
// Primary
className = "text-gray-900 dark:text-white";

// Secondary
className = "text-gray-600 dark:text-gray-300";

// Muted
className = "text-gray-500 dark:text-gray-400";
```

### Buttons

```jsx
// Primary
className =
  "bg-brand dark:bg-indigo-600 text-white hover:bg-brand-dark dark:hover:bg-indigo-700";

// Outline
className =
  "border border-brand dark:border-indigo-400 text-brand dark:text-indigo-400 hover:bg-brand hover:text-white dark:hover:bg-indigo-600";
```

### Inputs & Forms

```jsx
className =
  "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";
```

### Labels

```jsx
className = "block text-sm font-medium text-gray-700 dark:text-gray-300";
```

### Links

```jsx
className =
  "text-brand dark:text-indigo-400 hover:text-brand-dark dark:hover:text-indigo-300 transition-colors";
```

## 📝 Implementation Notes

### Priority Order

1. **Authentication Pages** - Most visible to new users
2. **Public Pages** - SEO and first impressions
3. **Dashboard Pages** - User retention

### Testing Checklist

- [ ] Toggle dark mode on each page
- [ ] Check all text is readable
- [ ] Verify hover states work
- [ ] Test form inputs
- [ ] Check button variants
- [ ] Verify card shadows
- [ ] Test responsive breakpoints

### Common Issues to Avoid

- ❌ Hardcoded colors (use semantic classes)
- ❌ Missing dark: variants
- ❌ Poor contrast ratios
- ❌ Inconsistent transitions
- ❌ Broken hover states

### Performance Considerations

- Use `transition-colors duration-200` for smooth theme switching
- Avoid complex gradients that may cause repaints
- Use CSS custom properties where beneficial

---

## 🚀 Next Steps

1. Update all public pages with dark mode
2. Update dashboard pages systematically
3. Test all pages in both modes
4. Create screenshots for documentation
5. Update README with dark mode feature

---

<div align="center">
  <p>Implementation Guide for eTuitionBd</p>
  <p>© 2025 eTuitionBd. All rights reserved.</p>
</div>
