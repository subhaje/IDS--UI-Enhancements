/**
 * Configuration system for different trademarks and labels
 * This allows easy switching between different brand configurations
 */

// Brand configurations
const BRAND_CONFIGS = {
    greenheck: {
        name: 'Greenheck',
        logoPath: 'Greenheck_Logo.png',
        tagline: '',
        primaryColor: '#1e40af',
        secondaryColor: '#6b7280',
        labels: {
            loginLabel: 'Log In',
            loginPagePara: 'Please log in to your Greenheck account.',
            createAccountLabel: 'Create Account',
            buttonLabelNext: 'Next',
            needHelpLabel: 'Need help?',
            keepMeSignedIn: 'Keep me signed in',
            passwordLabel: 'Password',
            forgetPasswordLabel: 'Forget Password?',
            contactUsTitle: 'Contact Us',
            thankYouTitle: 'Thank You!',
            thankYouMessage: 'Your Contact request has been submitted. A team member will contact you soon.',
            sendButton: 'Send',
            okButton: 'OK',
            userSupportTitle: 'User Support:',
            phoneNumber: '(855) 886-8324',
            emailLabel: '*Email Address',
            nameLabel: 'Name',
            phoneLabel: 'Phone Number',
            reasonLabel: '*Reason',
            messageLabel: '*Message',
            messagePlaceholder: 'Enter Message',
            reasonOptions: [
                { value: '', text: 'Select...' },
                { value: 'technical-support', text: 'Technical Support' },
                { value: 'billing', text: 'Billing' },
                { value: 'general-inquiry', text: 'General Inquiry' },
                { value: 'feature-request', text: 'Feature Request' },
                { value: 'other', text: 'Other' }
            ]
        }
    },
    neutral: {
        name: 'Company',
        logoPath: 'https://via.placeholder.com/200x60/4b5563/ffffff?text=LOGO',
        tagline: '',
        primaryColor: '#4b5563',
        secondaryColor: '#6b7280',
        labels: {
            loginLabel: 'Log In',
            loginPagePara: 'Please log in to your account.',
            createAccountLabel: 'Create Account',
            buttonLabelNext: 'Next',
            needHelpLabel: 'Need help?',
            keepMeSignedIn: 'Keep me signed in',
            passwordLabel: 'Password',
            forgetPasswordLabel: 'Forget Password?',
            contactUsTitle: 'Contact Us',
            thankYouTitle: 'Thank You!',
            thankYouMessage: 'Your Contact request has been submitted. A team member will contact you soon.',
            sendButton: 'Send',
            okButton: 'OK',
            userSupportTitle: 'User Support:',
            phoneNumber: '(855) 123-4567',
            emailLabel: '*Email Address',
            nameLabel: 'Name',
            phoneLabel: 'Phone Number',
            reasonLabel: '*Reason',
            messageLabel: '*Message',
            messagePlaceholder: 'Enter Message',
            reasonOptions: [
                { value: '', text: 'Select...' },
                { value: 'technical-support', text: 'Technical Support' },
                { value: 'billing', text: 'Billing' },
                { value: 'general-inquiry', text: 'General Inquiry' },
                { value: 'feature-request', text: 'Feature Request' },
                { value: 'other', text: 'Other' }
            ]
        }
    }
};

// Current brand configuration
let currentBrand = 'greenheck';

/**
 * Get the current brand configuration
 * @returns {Object} Current brand configuration
 */
function getCurrentBrandConfig() {
    return BRAND_CONFIGS[currentBrand] || BRAND_CONFIGS.greenheck;
}

/**
 * Set the current brand
 * @param {string} brandName - Name of the brand to switch to
 */
function setBrand(brandName) {
    if (BRAND_CONFIGS[brandName]) {
        currentBrand = brandName;
        applyBrandConfiguration();
    } else {
        console.warn(`Brand configuration '${brandName}' not found. Using default.`);
    }
}

/**
 * Set custom brand colors dynamically
 * @param {string} primaryColor - Primary brand color (hex)
 * @param {string} secondaryColor - Secondary brand color (hex)
 * @param {string} logoPath - Path to logo image
 * @param {string} brandName - Brand name
 */
function setCustomBrand(primaryColor, secondaryColor, logoPath, brandName = 'Custom Brand') {
    const root = document.documentElement;
    
    // Update colors
    updateColors(primaryColor, secondaryColor);
    
    // Update logo
    const logo = document.getElementById('company-logo');
    if (logo && logoPath) {
        logo.src = logoPath;
        logo.alt = `${brandName} Logo`;
    }
    
    // Update page title
    document.title = `Login - ${brandName}`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `Login to your ${brandName} account - Secure access to your dashboard`;
    }
    
    // Update structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Login Page",
        "description": `Login page for ${brandName} user authentication`,
        "publisher": {
            "@type": "Organization",
            "name": brandName,
            "url": `https://www.${brandName.toLowerCase().replace(/\s+/g, '')}.com`
        }
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
    
    console.log(`Custom brand applied: ${brandName} with colors ${primaryColor}/${secondaryColor}`);
}

/**
 * Apply the current brand configuration to the page
 */
function applyBrandConfiguration() {
    const config = getCurrentBrandConfig();
    
    // Update logo
    const logo = document.getElementById('company-logo');
    if (logo) {
        logo.src = config.logoPath;
        logo.alt = `${config.name} Logo`;
    }
    
    // Update tagline
    const tagline = document.getElementById('company-tagline');
    if (tagline) {
        tagline.textContent = config.tagline;
    }
    
    // Update page title
    document.title = `${config.labels.loginLabel} - ${config.name}`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${config.labels.loginLabel} to your ${config.name} account - Secure access to your dashboard`;
    }
    
    // Update all labels
    updateLabels(config.labels);
    
    // Update CSS custom properties for colors
    updateColors(config.primaryColor, config.secondaryColor);
    
    // Update structured data
    updateStructuredData(config);
}

/**
 * Update all text labels on the page
 * @param {Object} labels - Object containing all label text
 */
function updateLabels(labels) {
    // Login section labels
    const loginHeading = document.getElementById('login-heading');
    if (loginHeading) loginHeading.textContent = labels.loginLabel;
    
    const loginDescription = document.getElementById('login-description');
    if (loginDescription) loginDescription.textContent = labels.loginPagePara;
    
    const emailLabel = document.getElementById('email-label');
    if (emailLabel) emailLabel.textContent = labels.emailLabel;
    
    const keepSignedInLabel = document.getElementById('keep-signed-in-label');
    if (keepSignedInLabel) keepSignedInLabel.textContent = labels.keepMeSignedIn;
    
    const nextButtonText = document.getElementById('next-button-text');
    if (nextButtonText) nextButtonText.textContent = labels.buttonLabelNext;
    
    const createAccountLink = document.getElementById('create-account-link');
    if (createAccountLink) createAccountLink.textContent = labels.createAccountLabel;
    
    const needHelpLink = document.getElementById('need-help-link');
    if (needHelpLink) needHelpLink.textContent = labels.needHelpLabel;
    
    // Contact modal labels
    const contactModalTitle = document.getElementById('contact-modal-title');
    if (contactModalTitle) contactModalTitle.textContent = labels.contactUsTitle;
    
    const supportTitle = document.querySelector('.support-title');
    if (supportTitle) supportTitle.textContent = labels.userSupportTitle;
    
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) phoneNumber.textContent = labels.phoneNumber;
    
    // Update contact form labels
    updateContactFormLabels(labels);
    
    // Update reason dropdown options
    updateReasonOptions(labels.reasonOptions);
    
    // Thank you modal labels
    const thankYouTitle = document.getElementById('thank-you-modal-title');
    if (thankYouTitle) thankYouTitle.textContent = labels.thankYouTitle;
    
    const thankYouMessage = document.querySelector('.thank-you-message');
    if (thankYouMessage) thankYouMessage.textContent = labels.thankYouMessage;
    
    const okButton = document.getElementById('ok-button');
    if (okButton) okButton.querySelector('span').textContent = labels.okButton;
    
    const sendButton = document.getElementById('send-button');
    if (sendButton) sendButton.querySelector('span').textContent = labels.sendButton;
}

/**
 * Update contact form labels
 * @param {Object} labels - Object containing contact form labels
 */
function updateContactFormLabels(labels) {
    const contactEmailLabel = document.querySelector('label[for="contact-email"] span');
    if (contactEmailLabel) contactEmailLabel.textContent = labels.emailLabel;
    
    const contactNameLabel = document.querySelector('label[for="contact-name"] span');
    if (contactNameLabel) contactNameLabel.textContent = labels.nameLabel;
    
    const contactPhoneLabel = document.querySelector('label[for="contact-phone"] span');
    if (contactPhoneLabel) contactPhoneLabel.textContent = labels.phoneLabel;
    
    const contactReasonLabel = document.querySelector('label[for="contact-reason"] span');
    if (contactReasonLabel) contactReasonLabel.textContent = labels.reasonLabel;
    
    const contactMessageLabel = document.querySelector('label[for="contact-message"] span');
    if (contactMessageLabel) contactMessageLabel.textContent = labels.messageLabel;
    
    const messageTextarea = document.getElementById('contact-message');
    if (messageTextarea) messageTextarea.placeholder = labels.messagePlaceholder;
}

/**
 * Update reason dropdown options
 * @param {Array} options - Array of option objects with value and text
 */
function updateReasonOptions(options) {
    const reasonSelect = document.getElementById('contact-reason');
    if (reasonSelect) {
        // Clear existing options
        reasonSelect.innerHTML = '';
        
        // Add new options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            reasonSelect.appendChild(optionElement);
        });
    }
}

/**
 * Update CSS custom properties for brand colors
 * @param {string} primaryColor - Primary brand color
 * @param {string} secondaryColor - Secondary brand color
 */
function updateColors(primaryColor, secondaryColor) {
    const root = document.documentElement;
    
    // Update base colors
    root.style.setProperty('--primary-blue', primaryColor);
    root.style.setProperty('--secondary-gray', secondaryColor);
    
    // Update brand neutral specific colors
    root.style.setProperty('--brand-primary-color', primaryColor);
    root.style.setProperty('--brand-secondary-color', secondaryColor);
    root.style.setProperty('--brand-accent-color', primaryColor);
    root.style.setProperty('--brand-accent-hover', darkenColor(primaryColor, 20));
    root.style.setProperty('--brand-link-color', primaryColor);
    root.style.setProperty('--brand-link-hover', darkenColor(primaryColor, 20));
    root.style.setProperty('--brand-focus-color', primaryColor);
    
    // Update button and link colors
    root.style.setProperty('--btn-bg', primaryColor);
    root.style.setProperty('--link-color', primaryColor);
    root.style.setProperty('--btn-border-color', primaryColor);
}

/**
 * Darken a color by a percentage
 * @param {string} color - Hex color string
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened hex color
 */
function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

/**
 * Update structured data with current brand information
 * @param {Object} config - Current brand configuration
 */
function updateStructuredData(config) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${config.labels.loginLabel} Page`,
        "description": `${config.labels.loginLabel} page for ${config.name} user authentication`,
        "publisher": {
            "@type": "Organization",
            "name": config.name,
            "url": `https://www.${config.name.toLowerCase()}.com`
        }
    };
    
    // Update or create structured data script
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
}

/**
 * Initialize the configuration system
 */
function initializeConfig() {
    // Check for brand parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    
    if (brandParam && BRAND_CONFIGS[brandParam]) {
        setBrand(brandParam);
    } else {
        // Apply default brand configuration
        applyBrandConfiguration();
    }
}

// Export functions for external use
window.BrandConfig = {
    setBrand,
    getCurrentBrandConfig,
    getAvailableBrands: () => Object.keys(BRAND_CONFIGS),
    setCustomBrand,
    updateColors,
    initializeConfig
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeConfig);
