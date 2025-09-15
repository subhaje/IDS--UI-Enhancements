# Brand Neutral Login System

A fully accessible, responsive login system with contact functionality that supports multiple brand configurations. Built with HTML5, CSS3, and Vanilla JavaScript following WCAG 2.1 AA standards.

## Features

### 🎨 **Brand Configuration**

- **Greenheck Theme**: Blue color scheme with "Building Value in Air" tagline
- **Neutral Theme**: Gray color scheme for other trademarks
- **Configurable Logos**: Easy logo switching via configuration
- **Customizable Labels**: All text content can be configured per brand

### ♿ **Accessibility (WCAG 2.1 AA Compliant)**

- **Screen Reader Support**: Full ARIA labels and live regions
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus trapping in modals
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Semantic HTML**: Proper heading hierarchy and landmarks

### 📱 **Responsive Design**

- **Mobile-First**: Optimized for mobile devices
- **Desktop Support**: Enhanced desktop experience
- **Touch-Friendly**: 44px minimum touch targets
- **Flexible Layout**: Adapts to all screen sizes

### 🔍 **SEO Optimized**

- **Semantic Structure**: Proper HTML5 elements
- **Meta Tags**: Comprehensive meta information
- **Schema.org**: Structured data markup
- **Performance**: Optimized loading and rendering

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS with accessibility features
├── script.js           # JavaScript functionality
├── config.js           # Brand configuration system
└── README.md           # This file
```

## Usage

### Basic Implementation

1. **Include the files** in your HTML:

```html
<link rel="stylesheet" href="styles.css" />
<script src="config.js"></script>
<script src="script.js"></script>
```

2. **The system initializes automatically** when the DOM loads.

### Brand Configuration

#### Switch to Neutral Brand

```javascript
// Switch to neutral brand
BrandConfig.setBrand("neutral");
```

#### Switch to Greenheck Brand

```javascript
// Switch to Greenheck brand
BrandConfig.setBrand("greenheck");
```

#### URL Parameter

You can also switch brands via URL parameter:

```
?brand=neutral
?brand=greenheck
```

### Available Brands

- **`greenheck`**: Greenheck brand with blue theme
- **`neutral`**: Neutral brand with gray theme

### Custom Brand Configuration

To add a new brand, modify the `BRAND_CONFIGS` object in `config.js`:

```javascript
const BRAND_CONFIGS = {
  yourBrand: {
    name: "Your Brand",
    logoPath: "path/to/your/logo.png",
    tagline: "Your Tagline",
    primaryColor: "#your-color",
    secondaryColor: "#your-secondary-color",
    labels: {
      // ... all label configurations
    },
  },
};
```

## Features Overview

### Login Form

- **Email Validation**: Real-time email format validation
- **Remember Me**: Checkbox for persistent login
- **Accessibility**: Full keyboard and screen reader support
- **Error Handling**: Clear error messages and validation

### Contact Modal

- **Form Validation**: Comprehensive form validation
- **Character Counter**: Real-time message length counter
- **Phone Support**: Clickable phone number
- **Accessibility**: Modal focus management and ARIA support

### Thank You Modal

- **Confirmation**: Success message after form submission
- **Accessibility**: Screen reader announcements
- **Clean UI**: Simple, focused confirmation

## Accessibility Features

### Screen Reader Support

- **ARIA Labels**: All interactive elements properly labeled
- **Live Regions**: Dynamic content announced to screen readers
- **Landmarks**: Proper page structure with landmarks
- **Descriptions**: Form fields have descriptive text

### Keyboard Navigation

- **Tab Order**: Logical tab sequence
- **Focus Management**: Visible focus indicators
- **Modal Trapping**: Focus trapped within open modals
- **Escape Key**: Close modals with Escape key

### Visual Accessibility

- **Color Contrast**: Meets WCAG AA standards
- **Focus Indicators**: Clear focus outlines
- **Error States**: Visual error indicators
- **High Contrast**: Support for high contrast mode

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Accessibility Tools**: NVDA, JAWS, VoiceOver
- **Progressive Enhancement**: Works without JavaScript

## Performance

- **Optimized CSS**: Efficient selectors and minimal repaints
- **Vanilla JavaScript**: No external dependencies
- **Responsive Images**: Optimized logo loading
- **Fast Loading**: Minimal file sizes

## Customization

### Colors

Modify CSS custom properties in `styles.css`:

```css
:root {
  --primary-blue: #your-color;
  --secondary-gray: #your-secondary-color;
}
```

### Labels

Update the `labels` object in your brand configuration:

```javascript
labels: {
    loginLabel: 'Your Login Text',
    loginPagePara: 'Your description text',
    // ... other labels
}
```

### Styling

All styles use CSS custom properties for easy theming. Key variables:

- `--primary-blue`: Primary brand color
- `--secondary-gray`: Secondary brand color
- `--font-family`: Typography
- `--spacing-*`: Spacing system
- `--radius-*`: Border radius system

## Testing

### Accessibility Testing

1. **Keyboard Only**: Navigate using only keyboard
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Use tools like WebAIM Contrast Checker
4. **Focus Management**: Verify focus indicators

### Responsive Testing

1. **Mobile**: Test on various mobile devices
2. **Tablet**: Test on tablet breakpoints
3. **Desktop**: Test on different screen sizes
4. **Touch**: Verify touch interactions

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact the development team or refer to the inline code comments for implementation details.
