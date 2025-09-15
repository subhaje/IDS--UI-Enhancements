# Brand Neutral Login System

A fully dynamic, configurable login system that supports multiple brand themes with real-time logo and color switching. Built with HTML5, CSS3, and Vanilla JavaScript following WCAG 2.1 AA standards.

## 🎯 **Key Features**

### **🎨 Dynamic Brand Configuration**

- **Real-time Logo Switching**: Change logos instantly via JavaScript
- **Dynamic Color Theming**: Update primary and secondary colors on-the-fly
- **Brand-Specific Styling**: Each brand can have unique visual identity
- **Custom Brand Support**: Create unlimited custom brand configurations

### **♿ Accessibility (WCAG 2.1 AA Compliant)**

- **Screen Reader Support**: Full ARIA labels and live regions
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus trapping in modals
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Semantic HTML**: Proper heading hierarchy and landmarks

### **📱 Responsive Design**

- **Mobile-First**: Optimized for mobile devices
- **Desktop Support**: Enhanced desktop experience
- **Touch-Friendly**: 44px minimum touch targets
- **Flexible Layout**: Adapts to all screen sizes

### **🔍 SEO Optimized**

- **Semantic Structure**: Proper HTML5 elements
- **Meta Tags**: Comprehensive meta information
- **Schema.org**: Structured data markup
- **Performance**: Optimized loading and rendering

## 📁 **File Structure**

```
├── index.html                    # Main HTML structure
├── brand-neutral-demo.html       # Demo page showcasing brand switching
├── base.css                      # Base styles and layout (renamed from styles.css)
├── styles.css                    # Brand neutral theme styles
├── script.js                     # JavaScript functionality
├── config.js                     # Brand configuration system
├── Greenheck_Logo.png           # Greenheck logo image
└── README.md                     # Main documentation
```

## 🚀 **Quick Start**

### **1. Basic Implementation**

Include the CSS and JavaScript files in your HTML:

```html
<link rel="stylesheet" href="base.css" />
<link rel="stylesheet" href="styles.css" />
<script src="config.js"></script>
<script src="script.js"></script>
```

### **2. Switch Between Predefined Brands**

```javascript
// Switch to neutral brand (gray theme)
BrandConfig.setBrand("neutral");

// Switch to Greenheck brand (blue theme)
BrandConfig.setBrand("greenheck");
```

### **3. Create Custom Brand**

```javascript
// Set custom brand with your colors and logo
BrandConfig.setCustomBrand(
  "#059669", // Primary color (green)
  "#10b981", // Secondary color (lighter green)
  "path/to/your/logo.png", // Logo path
  "Your Brand Name" // Brand name
);
```

## 🎨 **Brand Configuration**

### **Predefined Brands**

#### **Neutral Brand**

- **Colors**: Gray theme (#4b5563, #6b7280)
- **Logo**: Placeholder logo
- **Tagline**: None (clean logo-only display)
- **Use Case**: Generic, professional appearance

#### **Greenheck Brand**

- **Colors**: Blue theme (#1e40af, #6b7280)
- **Logo**: Greenheck_Logo.png
- **Tagline**: None (clean logo-only display)
- **Use Case**: Greenheck-specific branding

### **Custom Brand Configuration**

```javascript
// Method 1: Using setCustomBrand function
BrandConfig.setCustomBrand(
  "#your-primary-color", // Primary brand color
  "#your-secondary-color", // Secondary brand color
  "path/to/logo.png", // Logo image path
  "Your Brand Name" // Brand name for SEO
);

// Method 2: Adding to BRAND_CONFIGS object
const customBrand = {
  name: "Your Brand",
  logoPath: "path/to/your/logo.png",
  tagline: "Your Tagline",
  primaryColor: "#your-color",
  secondaryColor: "#your-secondary-color",
  labels: {
    // ... all label configurations
  },
};
```

## 🎛️ **Dynamic Color System**

The system uses CSS custom properties for real-time color switching:

```css
:root {
  --brand-primary-color: #4b5563; /* Main brand color */
  --brand-secondary-color: #6b7280; /* Secondary color */
  --brand-accent-color: #4b5563; /* Button and interactive elements */
  --brand-accent-hover: #374151; /* Hover states */
  --brand-background-color: #ffffff; /* Background color */
  --brand-text-color: #1f2937; /* Main text color */
  --brand-text-secondary: #6b7280; /* Secondary text color */
  --brand-border-color: #d1d5db; /* Border color */
  --brand-link-color: #4b5563; /* Link color */
  --brand-focus-color: #4b5563; /* Focus outline color */
}
```

## 🖼️ **Logo Configuration**

### **Logo Requirements**

- **Format**: PNG, JPG, SVG recommended
- **Dimensions**: 200x60px recommended (responsive)
- **Aspect Ratio**: 3.33:1 (200:60)
- **Background**: Transparent or white

### **Setting Logo Path**

```javascript
// Method 1: Via brand configuration
BrandConfig.setBrand("your-brand");

// Method 2: Direct logo update
const logo = document.getElementById("company-logo");
logo.src = "path/to/your/logo.png";
logo.alt = "Your Brand Logo";
```

## 📱 **Responsive Behavior**

### **Desktop (768px+)**

- Full logo size (200x60px)
- Complete tagline display
- Full form layout

### **Tablet (768px and below)**

- Reduced logo size (180x50px)
- Condensed layout
- Touch-optimized buttons

### **Mobile (480px and below)**

- Compact logo size (160x45px)
- Stacked layout
- Mobile-first form design

## 🎯 **Usage Examples**

### **1. Basic Brand Switching**

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="base.css" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Your login form HTML -->

    <script src="config.js"></script>
    <script src="script.js"></script>

    <script>
      // Initialize with neutral brand
      BrandConfig.setBrand("neutral");

      // Switch to custom brand
      BrandConfig.setCustomBrand("#ff6b6b", "#ff8e8e", "logo.png", "My Brand");
    </script>
  </body>
</html>
```

### **2. URL Parameter Brand Switching**

```javascript
// Check for brand parameter in URL
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get("brand");

if (brand) {
  BrandConfig.setBrand(brand);
} else {
  BrandConfig.setBrand("neutral"); // Default
}
```

### **3. Dynamic Brand Selection**

```html
<select id="brand-selector" onchange="switchBrand(this.value)">
  <option value="neutral">Neutral Brand</option>
  <option value="greenheck">Greenheck Brand</option>
  <option value="custom">Custom Brand</option>
</select>

<script>
  function switchBrand(brand) {
    if (brand === "custom") {
      BrandConfig.setCustomBrand(
        "#purple",
        "#violet",
        "custom-logo.png",
        "Custom"
      );
    } else {
      BrandConfig.setBrand(brand);
    }
  }
</script>
```

## 🔧 **API Reference**

### **BrandConfig Object**

```javascript
// Available methods
BrandConfig.setBrand(brandName); // Switch to predefined brand
BrandConfig.setCustomBrand(primary, secondary, logo, name); // Set custom brand
BrandConfig.getCurrentBrandConfig(); // Get current brand config
BrandConfig.getAvailableBrands(); // Get list of available brands
BrandConfig.updateColors(primary, secondary); // Update colors only
BrandConfig.initializeConfig(); // Initialize the system
```

### **CSS Custom Properties**

```css
/* Brand Colors */
--brand-primary-color: #4b5563;
--brand-secondary-color: #6b7280;
--brand-accent-color: #4b5563;
--brand-accent-hover: #374151;
--brand-background-color: #ffffff;
--brand-text-color: #1f2937;
--brand-text-secondary: #6b7280;
--brand-border-color: #d1d5db;
--brand-link-color: #4b5563;
--brand-focus-color: #4b5563;

/* Logo Configuration */
--brand-logo-width: 200px;
--brand-logo-height: 60px;
```

## 🧪 **Testing**

### **Brand Switching Test**

1. Open `brand-neutral-demo.html`
2. Click different brand buttons
3. Verify logo and color changes
4. Test form functionality
5. Check responsive behavior

### **Accessibility Testing**

1. **Keyboard Navigation**: Tab through all elements
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Use WebAIM Contrast Checker
4. **Focus Management**: Verify focus indicators

### **Responsive Testing**

1. **Mobile**: Test on various mobile devices
2. **Tablet**: Test on tablet breakpoints
3. **Desktop**: Test on different screen sizes
4. **Touch**: Verify touch interactions

## 🎨 **Customization Guide**

### **Adding New Predefined Brands**

1. **Update config.js**:

```javascript
const BRAND_CONFIGS = {
  yourBrand: {
    name: "Your Brand",
    logoPath: "path/to/logo.png",
    tagline: "Your Tagline",
    primaryColor: "#your-color",
    secondaryColor: "#your-secondary-color",
    labels: {
      // ... label configurations
    },
  },
};
```

2. **Add brand switching**:

```javascript
BrandConfig.setBrand("yourBrand");
```

### **Custom Styling**

Override CSS custom properties for specific brands:

```css
.brand-your-brand {
  --brand-primary-color: #your-color;
  --brand-secondary-color: #your-secondary-color;
  /* ... other custom properties */
}
```

## 🚀 **Performance**

- **Optimized CSS**: Efficient selectors and minimal repaints
- **Vanilla JavaScript**: No external dependencies
- **Responsive Images**: Optimized logo loading
- **Fast Switching**: Instant brand changes via CSS custom properties

## 🔒 **Security**

- **No External Dependencies**: All functionality is self-contained
- **XSS Protection**: Proper input sanitization
- **CSRF Protection**: Form validation and sanitization
- **Secure Defaults**: Safe configuration defaults

## 📄 **License**

This project is open source and available under the MIT License.

## 🤝 **Support**

For questions or issues:

1. Check the demo page: `brand-neutral-demo.html`
2. Review the API reference above
3. Examine the source code comments
4. Test with different brand configurations

## 🔄 **Migration from Single Brand**

If migrating from a single-brand system:

1. **Rename** `styles.css` to `base.css`
2. **Create** new `styles.css` with brand neutral styles
3. **Update** HTML to include both CSS files
4. **Add** `config.js` for brand management
5. **Initialize** with `BrandConfig.initializeConfig()`

The system is designed to be backward compatible while adding powerful brand switching capabilities.
