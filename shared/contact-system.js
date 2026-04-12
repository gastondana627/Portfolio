// Unified Contact System for Multi-Portfolio Ecosystem
// Handles contact forms, routing, and consistency across all portfolios

class UnifiedContactSystem {
    constructor() {
        this.currentPortfolio = this.detectCurrentPortfolio();
        this.contactEndpoint = 'https://formspree.io/f/meoerdwl';
        this.thankYouPage = this.getThankYouPage();
        this.init();
    }

    // Detect current portfolio context
    detectCurrentPortfolio() {
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    // Get appropriate thank you page based on portfolio
    getThankYouPage() {
        switch (this.currentPortfolio) {
            case 'gaming':
                return '../thankyou.html';
            case 'content':
                return '../thankyou.html';
            default:
                return 'thankyou.html';
        }
    }

    // Initialize contact system
    init() {
        this.enhanceExistingForms();
        this.setupFormValidation();
        this.setupFormSubmissionHandling();
        this.addContactRouting();
        this.ensureConsistentStyling();
        
        console.log('📧 Unified Contact System initialized for:', this.currentPortfolio);
    }

    // Enhance existing contact forms with unified features
    enhanceExistingForms() {
        const forms = document.querySelectorAll('form[id$="-contact-form"], #contact-form');
        
        forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    // Enhance individual form
    enhanceForm(form) {
        // Ensure portfolio context is set
        this.ensurePortfolioContext(form);
        
        // Add inquiry type routing if not present
        this.addInquiryTypeRouting(form);
        
        // Add form validation
        this.addFormValidation(form);
        
        // Add submission tracking
        this.addSubmissionTracking(form);
        
        // Ensure consistent field structure
        this.ensureConsistentFields(form);
    }

    // Ensure portfolio context is properly set
    ensurePortfolioContext(form) {
        let contextInput = form.querySelector('input[name="portfolio_context"]');
        
        if (!contextInput) {
            contextInput = document.createElement('input');
            contextInput.type = 'hidden';
            contextInput.name = 'portfolio_context';
            form.appendChild(contextInput);
        }
        
        // Set context based on current portfolio
        const portfolioNames = {
            tech: 'Tech Portfolio',
            gaming: 'Gaming Ecosystem',
            content: 'Content Creation'
        };
        
        contextInput.value = portfolioNames[this.currentPortfolio] || 'Tech Portfolio';
    }

    // Add inquiry type routing for better contact management
    addInquiryTypeRouting(form) {
        // Check if form already has inquiry type selection
        const existingSelect = form.querySelector('select[name$="_interest"], select[name="inquiry_type"]');
        
        if (!existingSelect) {
            // Create inquiry type selector based on portfolio
            const inquiryTypes = this.getInquiryTypes();
            
            if (inquiryTypes.length > 0) {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';
                
                const label = document.createElement('label');
                label.setAttribute('for', 'inquiry-type');
                label.textContent = 'Inquiry Type';
                
                const select = document.createElement('select');
                select.id = 'inquiry-type';
                select.name = 'inquiry_type';
                select.required = true;
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select inquiry type...';
                select.appendChild(defaultOption);
                
                // Add portfolio-specific options
                inquiryTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.value;
                    option.textContent = type.label;
                    select.appendChild(option);
                });
                
                formGroup.appendChild(label);
                formGroup.appendChild(select);
                
                // Insert before message field
                const messageGroup = form.querySelector('textarea[name="message"]')?.closest('.form-group');
                if (messageGroup) {
                    form.insertBefore(formGroup, messageGroup);
                } else {
                    // Insert before submit button
                    const submitButton = form.querySelector('button[type="submit"]');
                    if (submitButton) {
                        form.insertBefore(formGroup, submitButton);
                    }
                }
            }
        }
    }

    // Get inquiry types based on current portfolio
    getInquiryTypes() {
        const inquiryTypes = {
            tech: [
                { value: 'ai-ml-project', label: 'AI/ML Project' },
                { value: 'full-stack-development', label: 'Full-Stack Development' },
                { value: 'consulting', label: 'Technical Consulting' },
                { value: 'collaboration', label: 'Collaboration Opportunity' },
                { value: 'mentorship', label: 'Mentorship' },
                { value: 'general', label: 'General Inquiry' }
            ],
            gaming: [
                { value: 'game-development', label: 'Game Development' },
                { value: 'qa-testing', label: 'QA Testing Services' },
                { value: 'gaming-content', label: 'Gaming Content Collaboration' },
                { value: 'unity-unreal', label: 'Unity/Unreal Consulting' },
                { value: 'general', label: 'General Gaming Inquiry' }
            ],
            content: [
                { value: 'video-production', label: 'Video Production' },
                { value: 'design-work', label: 'Design & Graphics' },
                { value: 'brand-partnership', label: 'Brand Partnership' },
                { value: 'content-strategy', label: 'Content Strategy' },
                { value: 'creative-consulting', label: 'Creative Consulting' },
                { value: 'general', label: 'General Creative Inquiry' }
            ]
        };
        
        return inquiryTypes[this.currentPortfolio] || inquiryTypes.tech;
    }

    // Ensure consistent field structure across all forms
    ensureConsistentFields(form) {
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`);
            if (field) {
                // Ensure consistent attributes
                field.required = true;
                
                // Add consistent placeholders
                const placeholders = {
                    name: 'Your Full Name',
                    email: 'your.email@example.com',
                    message: this.getMessagePlaceholder()
                };
                
                if (!field.placeholder) {
                    field.placeholder = placeholders[fieldName] || '';
                }
                
                // Add consistent labels
                const label = form.querySelector(`label[for="${field.id}"]`);
                if (label && !label.textContent.trim()) {
                    const labelTexts = {
                        name: 'Your Name',
                        email: 'Your Email',
                        message: 'Your Message'
                    };
                    label.textContent = labelTexts[fieldName] || fieldName;
                }
            }
        });
    }

    // Get message placeholder based on portfolio
    getMessagePlaceholder() {
        const placeholders = {
            tech: 'Tell me about your AI/ML project, development needs, or collaboration idea...',
            gaming: 'Tell me about your gaming project, QA testing needs, or collaboration idea...',
            content: 'Tell me about your creative project, content needs, or partnership idea...'
        };
        
        return placeholders[this.currentPortfolio] || placeholders.tech;
    }

    // Setup form validation
    setupFormValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('form[id$="-contact-form"] input, form[id$="-contact-form"] textarea, #contact-form input, #contact-form textarea')) {
                this.validateField(e.target);
            }
        });
        
        document.addEventListener('blur', (e) => {
            if (e.target.matches('form[id$="-contact-form"] input, form[id$="-contact-form"] textarea, #contact-form input, #contact-form textarea')) {
                this.validateField(e.target);
            }
        });
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('field-error');
        this.removeFieldError(field);
        
        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation
        if (field.name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        }
        
        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }
        
        // Apply validation styling
        if (!isValid) {
            field.classList.add('field-error');
            this.showFieldError(field, errorMessage);
        } else {
            field.classList.add('field-valid');
        }
        
        return isValid;
    }

    // Show field error
    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    // Remove field error
    removeFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('field-valid');
    }

    // Setup form submission handling
    setupFormSubmissionHandling() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.matches('form[id$="-contact-form"], #contact-form')) {
                e.preventDefault();
                this.handleFormSubmission(form);
            }
        });
    }

    // Handle form submission
    async handleFormSubmission(form) {
        const formId = form.id;
        const statusElement = this.getStatusElement(form);
        
        // Validate all fields
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormStatus(statusElement, 'Please correct the errors above', 'error');
            return;
        }
        
        // Show loading state
        this.showFormStatus(statusElement, 'Sending message...', 'loading');
        this.setFormLoading(form, true);
        
        // Prepare form data
        const formData = new FormData(form);
        
        // Add additional context data
        formData.append('submission_timestamp', new Date().toISOString());
        formData.append('user_agent', navigator.userAgent);
        formData.append('page_url', window.location.href);
        formData.append('referrer', document.referrer);
        
        // Add portfolio-specific routing tags
        const routingTags = this.getRoutingTags();
        routingTags.forEach(tag => {
            formData.append('_subject', `[${tag}] New Contact Form Submission`);
        });
        
        try {
            const response = await fetch(this.contactEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.handleSuccessfulSubmission(form, statusElement);
            } else {
                const result = await response.json();
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleSubmissionError(form, statusElement, error.message);
        } finally {
            this.setFormLoading(form, false);
        }
    }

    // Get status element for form
    getStatusElement(form) {
        const formId = form.id;
        let statusId = 'form-status';
        
        if (formId.includes('gaming')) {
            statusId = 'gaming-form-status';
        } else if (formId.includes('content')) {
            statusId = 'content-form-status';
        }
        
        let statusElement = document.getElementById(statusId);
        
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = statusId;
            statusElement.className = 'form-status';
            form.parentNode.appendChild(statusElement);
        }
        
        return statusElement;
    }

    // Get routing tags for email organization
    getRoutingTags() {
        const portfolioTags = {
            tech: 'TECH',
            gaming: 'GAMING',
            content: 'CONTENT'
        };
        
        return [portfolioTags[this.currentPortfolio] || 'TECH'];
    }

    // Handle successful form submission
    handleSuccessfulSubmission(form, statusElement) {
        this.showFormStatus(statusElement, '✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Remove validation classes
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.classList.remove('field-error', 'field-valid');
            this.removeFieldError(field);
        });
        
        // Track successful submission
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.trackEvent('contact_form_success', {
                portfolio: this.currentPortfolio,
                form_id: form.id
            });
        }
        
        // Optional: redirect to thank you page after delay
        setTimeout(() => {
            if (this.thankYouPage && confirm('Would you like to visit the thank you page?')) {
                window.location.href = this.thankYouPage;
            }
        }, 3000);
    }

    // Handle submission error
    handleSubmissionError(form, statusElement, errorMessage) {
        this.showFormStatus(statusElement, `❌ Error: ${errorMessage}. Please try again.`, 'error');
        
        // Track submission error
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.trackEvent('contact_form_error', {
                portfolio: this.currentPortfolio,
                form_id: form.id,
                error_message: errorMessage
            });
        }
    }

    // Show form status message
    showFormStatus(statusElement, message, type) {
        statusElement.textContent = message;
        statusElement.className = `form-status form-status-${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'form-status';
            }, 5000);
        }
    }

    // Set form loading state
    setFormLoading(form, isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        const fields = form.querySelectorAll('input, textarea, select, button');
        
        if (isLoading) {
            fields.forEach(field => field.disabled = true);
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
        } else {
            fields.forEach(field => field.disabled = false);
            if (submitButton) {
                const originalText = this.getSubmitButtonText();
                submitButton.innerHTML = `<i class="fas fa-paper-plane"></i> ${originalText}`;
            }
        }
    }

    // Get submit button text based on portfolio
    getSubmitButtonText() {
        const buttonTexts = {
            tech: 'Send Message',
            gaming: 'Send Message',
            content: 'Send Message'
        };
        
        return buttonTexts[this.currentPortfolio] || 'Send Message';
    }

    // Add contact routing for better organization
    addContactRouting() {
        // This could integrate with a backend system for automatic routing
        // For now, we use form data to categorize submissions
        console.log('📧 Contact routing configured for:', this.currentPortfolio);
    }

    // Ensure consistent styling across all portfolios
    ensureConsistentStyling() {
        this.addContactSystemStyles();
    }

    // Add contact system styles
    addContactSystemStyles() {
        if (document.getElementById('unified-contact-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'unified-contact-styles';
        styles.textContent = `
            /* Unified Contact System Styles */
            .form-status {
                margin-top: 1rem;
                padding: 0.75rem;
                border-radius: 6px;
                font-weight: 500;
                text-align: center;
                transition: all 0.3s ease;
            }

            .form-status-loading {
                background: rgba(255, 193, 7, 0.1);
                color: #ffc107;
                border: 1px solid rgba(255, 193, 7, 0.3);
            }

            .form-status-success {
                background: rgba(76, 175, 80, 0.1);
                color: #4caf50;
                border: 1px solid rgba(76, 175, 80, 0.3);
            }

            .form-status-error {
                background: rgba(244, 67, 54, 0.1);
                color: #f44336;
                border: 1px solid rgba(244, 67, 54, 0.3);
            }

            .field-error {
                border-color: #f44336 !important;
                box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
            }

            .field-valid {
                border-color: #4caf50 !important;
                box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2) !important;
            }

            .field-error-message {
                color: #f44336;
                font-size: 0.8rem;
                margin-top: 0.25rem;
                font-weight: 500;
            }

            /* Portfolio-specific form enhancements */
            .gaming-portfolio .form-status-success {
                background: rgba(255, 68, 68, 0.1);
                color: #FF4444;
                border-color: rgba(255, 68, 68, 0.3);
            }

            .gaming-portfolio .field-valid {
                border-color: #FF8800 !important;
                box-shadow: 0 0 0 2px rgba(255, 136, 0, 0.2) !important;
            }

            .content-portfolio .form-status-success {
                background: rgba(128, 128, 128, 0.1);
                color: #808080;
                border-color: rgba(128, 128, 128, 0.3);
            }

            .content-portfolio .field-valid {
                border-color: #808080 !important;
                box-shadow: 0 0 0 2px rgba(128, 128, 128, 0.2) !important;
            }

            /* Enhanced form animations */
            .form-group {
                position: relative;
                margin-bottom: 1.5rem;
            }

            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                transform: translateY(-2px);
                transition: all 0.3s ease;
            }

            /* Loading spinner animation */
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .fa-spinner {
                animation: spin 1s linear infinite;
            }

            /* Responsive improvements */
            @media (max-width: 768px) {
                .form-status {
                    font-size: 0.9rem;
                    padding: 0.6rem;
                }

                .field-error-message {
                    font-size: 0.75rem;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Get contact information consistency
    getContactInfo() {
        return {
            email: 'contact@gastondana.com', // This would be the actual contact email
            linkedin: 'https://www.linkedin.com/in/gaston-d-859653184/',
            github: 'https://github.com/gastondana627',
            response_time: '24-48 hours',
            availability: 'Available for new projects and collaborations'
        };
    }

    // Export contact data for analytics
    getContactAnalytics() {
        const forms = document.querySelectorAll('form[id$="-contact-form"], #contact-form');
        
        return {
            portfolio: this.currentPortfolio,
            forms_count: forms.length,
            inquiry_types: this.getInquiryTypes(),
            contact_info: this.getContactInfo(),
            endpoint: this.contactEndpoint
        };
    }
}

// Initialize unified contact system
let unifiedContactSystem;

document.addEventListener('DOMContentLoaded', () => {
    unifiedContactSystem = new UnifiedContactSystem();
    window.unifiedContactSystem = unifiedContactSystem;
});

// Export for use in other modules
window.UnifiedContactSystem = UnifiedContactSystem;