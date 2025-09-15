/**
 * Main JavaScript functionality for login system
 * Handles form validation, modal interactions, and accessibility features
 */

// Global state management
const AppState = {
    isContactModalOpen: false,
    isThankYouModalOpen: false,
    currentFocusedElement: null
};

// Form validation utilities
const FormValidator = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    validateEmail(email) {
        return this.emailRegex.test(email);
    },
    
    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    },
    
    validateRequired(value) {
        return value && value.trim().length > 0;
    },
    
    validateMessageLength(message, maxLength = 2000) {
        return message && message.length <= maxLength;
    }
};

// Accessibility utilities
const AccessibilityUtils = {
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    },
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },
    
    setFocusManagement(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
};

// Modal management
const ModalManager = {
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Store currently focused element
        AppState.currentFocusedElement = document.activeElement;
        
        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Set focus to modal
        AccessibilityUtils.setFocusManagement(modal);
        
        // Trap focus within modal
        AccessibilityUtils.trapFocus(modal);
        
        // Update state
        if (modalId === 'contact-modal') {
            AppState.isContactModalOpen = true;
        } else if (modalId === 'thank-you-modal') {
            AppState.isThankYouModalOpen = true;
        }
        
        // Announce to screen readers
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            AccessibilityUtils.announceToScreenReader(`${modalTitle.textContent} dialog opened`);
        }
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Hide modal
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Restore focus to previously focused element
        if (AppState.currentFocusedElement) {
            AppState.currentFocusedElement.focus();
            AppState.currentFocusedElement = null;
        }
        
        // Update state
        if (modalId === 'contact-modal') {
            AppState.isContactModalOpen = false;
        } else if (modalId === 'thank-you-modal') {
            AppState.isThankYouModalOpen = false;
        }
        
        // Announce to screen readers
        AccessibilityUtils.announceToScreenReader('Dialog closed');
    },
    
    closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
        AppState.isContactModalOpen = false;
        AppState.isThankYouModalOpen = false;
    }
};

// Form handling
const FormHandler = {
    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    },
    
    clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    },
    
    validateField(fieldId, value, validationRules) {
        let isValid = true;
        let errorMessage = '';
        
        for (const rule of validationRules) {
            if (!rule.validator(value)) {
                isValid = false;
                errorMessage = rule.message;
                break;
            }
        }
        
        if (isValid) {
            this.clearError(fieldId);
        } else {
            this.showError(fieldId, errorMessage);
        }
        
        return isValid;
    },
    
    validateLoginForm(formData) {
        const emailValid = this.validateField('email', formData.email, [
            {
                validator: (value) => FormValidator.validateRequired(value),
                message: 'Email address is required'
            },
            {
                validator: (value) => FormValidator.validateEmail(value),
                message: 'Please enter a valid email address'
            }
        ]);
        
        return emailValid;
    },
    
    validateContactForm(formData) {
        const emailValid = this.validateField('contact-email', formData.email, [
            {
                validator: (value) => FormValidator.validateRequired(value),
                message: 'Email address is required'
            },
            {
                validator: (value) => FormValidator.validateEmail(value),
                message: 'Please enter a valid email address'
            }
        ]);
        
        const nameValid = this.validateField('contact-name', formData.name, [
            {
                validator: (value) => !value || value.trim().length >= 2,
                message: 'Name must be at least 2 characters long'
            }
        ]);
        
        const phoneValid = this.validateField('contact-phone', formData.phone, [
            {
                validator: (value) => !value || FormValidator.validatePhone(value),
                message: 'Please enter a valid phone number'
            }
        ]);
        
        const reasonValid = this.validateField('contact-reason', formData.reason, [
            {
                validator: (value) => FormValidator.validateRequired(value),
                message: 'Please select a reason for contact'
            }
        ]);
        
        const messageValid = this.validateField('contact-message', formData.message, [
            {
                validator: (value) => FormValidator.validateRequired(value),
                message: 'Message is required'
            },
            {
                validator: (value) => FormValidator.validateMessageLength(value),
                message: 'Message must be 2000 characters or less'
            }
        ]);
        
        return emailValid && nameValid && phoneValid && reasonValid && messageValid;
    }
};

// Character counter for message textarea
const CharacterCounter = {
    init() {
        const messageTextarea = document.getElementById('contact-message');
        const charCountElement = document.getElementById('char-count');
        
        if (messageTextarea && charCountElement) {
            messageTextarea.addEventListener('input', () => {
                const currentLength = messageTextarea.value.length;
                const maxLength = 2000;
                charCountElement.textContent = `${currentLength}/${maxLength}`;
                
                // Update color based on character count
                if (currentLength > maxLength * 0.9) {
                    charCountElement.style.color = 'var(--error-red)';
                } else if (currentLength > maxLength * 0.8) {
                    charCountElement.style.color = 'var(--secondary-gray)';
                } else {
                    charCountElement.style.color = 'var(--secondary-gray)';
                }
            });
        }
    }
};

// Event listeners
const EventListeners = {
    init() {
        this.initLoginForm();
        this.initContactForm();
        this.initModalEvents();
        this.initKeyboardEvents();
        this.initAccessibilityEvents();
    },
    
    initLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (!loginForm) return;
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                keepSignedIn: document.getElementById('keep-signed-in').checked
            };
            
            if (FormHandler.validateLoginForm(formData)) {
                // Simulate login process
                this.handleLoginSuccess();
            }
        });
        
        // Real-time validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', () => {
                const value = emailField.value;
                FormHandler.validateField('email', value, [
                    {
                        validator: (val) => !val || FormValidator.validateEmail(val),
                        message: 'Please enter a valid email address'
                    }
                ]);
            });
        }
    },
    
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('contact-email').value,
                name: document.getElementById('contact-name').value,
                phone: document.getElementById('contact-phone').value,
                reason: document.getElementById('contact-reason').value,
                message: document.getElementById('contact-message').value
            };
            
            if (FormHandler.validateContactForm(formData)) {
                this.handleContactSubmit(formData);
            }
        });
        
        // Real-time validation for required fields
        const requiredFields = ['contact-email', 'contact-reason', 'contact-message'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    const value = field.value;
                    const rules = [
                        {
                            validator: (val) => FormValidator.validateRequired(val),
                            message: 'This field is required'
                        }
                    ];
                    
                    if (fieldId === 'contact-email') {
                        rules.push({
                            validator: (val) => FormValidator.validateEmail(val),
                            message: 'Please enter a valid email address'
                        });
                    }
                    
                    FormHandler.validateField(fieldId, value, rules);
                });
            }
        });
    },
    
    initModalEvents() {
        // Contact modal triggers
        const needHelpLink = document.getElementById('need-help-link');
        if (needHelpLink) {
            needHelpLink.addEventListener('click', (e) => {
                e.preventDefault();
                ModalManager.openModal('contact-modal');
            });
        }
        
        // Modal close buttons
        const closeContactModal = document.getElementById('close-contact-modal');
        if (closeContactModal) {
            closeContactModal.addEventListener('click', () => {
                ModalManager.closeModal('contact-modal');
            });
        }
        
        const okButton = document.getElementById('ok-button');
        if (okButton) {
            okButton.addEventListener('click', () => {
                ModalManager.closeModal('thank-you-modal');
            });
        }
        
        // Close modals when clicking overlay
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const modalId = modal.id;
                    ModalManager.closeModal(modalId);
                }
            });
        });
    },
    
    initKeyboardEvents() {
        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (AppState.isContactModalOpen) {
                    ModalManager.closeModal('contact-modal');
                } else if (AppState.isThankYouModalOpen) {
                    ModalManager.closeModal('thank-you-modal');
                }
            }
        });
    },
    
    initAccessibilityEvents() {
        // Info button tooltip
        const infoButton = document.querySelector('.info-button');
        if (infoButton) {
            infoButton.addEventListener('click', () => {
                const tooltip = infoButton.getAttribute('title');
                if (tooltip) {
                    AccessibilityUtils.announceToScreenReader(tooltip);
                }
            });
        }
        
        // Create account link
        const createAccountLink = document.getElementById('create-account-link');
        if (createAccountLink) {
            createAccountLink.addEventListener('click', (e) => {
                e.preventDefault();
                AccessibilityUtils.announceToScreenReader('Create account functionality not implemented');
            });
        }
    },
    
    handleLoginSuccess() {
        // Simulate successful login
        AccessibilityUtils.announceToScreenReader('Login successful');
        
        // In a real application, you would redirect or update the UI
        console.log('Login successful');
        
        // For demo purposes, show a success message
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            const originalText = nextButton.querySelector('span').textContent;
            nextButton.querySelector('span').textContent = 'Success!';
            nextButton.style.backgroundColor = 'var(--success-green)';
            
            setTimeout(() => {
                nextButton.querySelector('span').textContent = originalText;
                nextButton.style.backgroundColor = '';
            }, 2000);
        }
    },
    
    handleContactSubmit(formData) {
        // Simulate form submission
        console.log('Contact form submitted:', formData);
        
        // Close contact modal
        ModalManager.closeModal('contact-modal');
        
        // Show thank you modal
        setTimeout(() => {
            ModalManager.openModal('thank-you-modal');
        }, 300);
        
        // Reset form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.reset();
            // Clear all error states
            const errorElements = contactForm.querySelectorAll('.error-message');
            errorElements.forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
            
            const inputElements = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
            inputElements.forEach(input => {
                input.classList.remove('error');
            });
        }
        
        // Reset character counter
        const charCountElement = document.getElementById('char-count');
        if (charCountElement) {
            charCountElement.textContent = '0/2000';
            charCountElement.style.color = 'var(--secondary-gray)';
        }
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize character counter
    CharacterCounter.init();
    
    // Initialize event listeners
    EventListeners.init();
    
    // Initialize accessibility features
    AccessibilityUtils.announceToScreenReader('Login page loaded');
    
    console.log('Login system initialized');
});

// Export for external use
window.LoginSystem = {
    ModalManager,
    FormHandler,
    AccessibilityUtils,
    AppState
};
