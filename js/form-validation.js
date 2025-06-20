/*
==================================================
C&J Provider Services - Form Validation
Author: Professional Web Development Team
Version: 1.0
==================================================
*/

$(document).ready(function() {
    "use strict";

    try {
        // Contact form validation with comprehensive error handling
        const contactForm = $('#contactForm');
        
        if (contactForm.length) {
            try {
                // Add custom validation styles with error handling
                contactForm.find('input, textarea, select').on('focus', function() {
                    try {
                        const parent = $(this).parent();
                        if (parent.length) {
                            parent.addClass('focused');
                        }
                    } catch (error) {
                        console.warn('Error adding focused class:', error);
                    }
                }).on('blur', function() {
                    try {
                        const element = $(this);
                        const parent = element.parent();
                        
                        if (parent.length) {
                            if (element.val() === '') {
                                parent.removeClass('focused');
                            }
                        }
                        validateField(element);
                    } catch (error) {
                        console.warn('Error in blur handler:', error);
                    }
                });

                // Real-time validation with error handling
                contactForm.find('input, textarea, select').on('keyup change', function() {
                    try {
                        validateField($(this));
                    } catch (error) {
                        console.warn('Error in real-time validation:', error);
                    }
                });

                // Form submission handler with comprehensive error handling
                contactForm.on('submit', function(e) {
                    e.preventDefault();
                    
                    try {
                        let isValid = true;
                        
                        // Validate all fields with error handling
                        contactForm.find('input, textarea, select').each(function() {
                            try {
                                if (!validateField($(this))) {
                                    isValid = false;
                                }
                            } catch (fieldError) {
                                console.warn('Error validating field:', fieldError);
                                isValid = false;
                            }
                        });
                        
                        if (isValid) {
                            try {
                                // Collect form data safely
                                const formData = {
                                    name: contactForm.find('input[name="name"]').val() || '',
                                    email: contactForm.find('input[name="email"]').val() || '',
                                    phone: contactForm.find('input[name="phone"]').val() || '',
                                    subject: contactForm.find('select[name="subject"]').val() || '',
                                    message: contactForm.find('textarea[name="message"]').val() || ''
                                };
                                
                                // Show submission feedback
                                showFormFeedback('success', 'Thank you for contacting us! We will get back to you soon.');
                                
                                // Reset form safely
                                try {
                                    contactForm[0].reset();
                                    contactForm.find('.form-group').removeClass('focused has-error has-success');
                                } catch (resetError) {
                                    console.warn('Error resetting form:', resetError);
                                    // Manual reset as fallback
                                    contactForm.find('input, textarea, select').val('');
                                    contactForm.find('.form-group').removeClass('focused has-error has-success');
                                }
                                
                                // In real implementation, this would be an AJAX call to a server endpoint
                                // Form data would be sent to server here
                            } catch (successError) {
                                console.error('Error in form success handling:', successError);
                                showFormFeedback('error', 'There was an error processing your form. Please try again.');
                            }
                        } else {
                            showFormFeedback('error', 'Please fix the errors in the form before submitting.');
                        }
                    } catch (submitError) {
                        console.error('Error in form submission:', submitError);
                        showFormFeedback('error', 'There was an unexpected error. Please try again.');
                    }
                });
            } catch (formSetupError) {
                console.error('Error setting up form validation:', formSetupError);
            }
        }
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
    
    // Helper function to validate a field with comprehensive error handling
    function validateField(field) {
        try {
            if (!field || !field.length) {
                console.warn('Invalid field passed to validateField');
                return false;
            }
            
            const name = field.attr('name');
            const value = field.val() || '';
            const formGroup = field.parent();
            let isValid = true;
            
            if (!name) {
                console.warn('Field has no name attribute');
                return false;
            }
            
            if (!formGroup.length) {
                console.warn('Field has no parent form group');
                return false;
            }
            
            try {
                // Clear previous errors
                formGroup.removeClass('has-error has-success');
                formGroup.find('.error-message').remove();
            } catch (clearError) {
                console.warn('Error clearing previous errors:', clearError);
            }
            
            // Validation rules with error handling
            try {
                switch (name) {
                    case 'name':
                        if (value.trim() === '' || value.trim().length < 2) {
                            addError(field, 'Please enter your name (at least 2 characters)');
                            isValid = false;
                        } else if (value.trim().length > 100) {
                            addError(field, 'Name is too long (maximum 100 characters)');
                            isValid = false;
                        }
                        break;
                        
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (value.trim() === '') {
                            addError(field, 'Please enter your email address');
                            isValid = false;
                        } else if (!emailRegex.test(value.trim())) {
                            addError(field, 'Please enter a valid email address');
                            isValid = false;
                        } else if (value.trim().length > 254) {
                            addError(field, 'Email address is too long');
                            isValid = false;
                        }
                        break;
                        
                    case 'phone':
                        const phoneRegex = /^[0-9()\-\s+]{10,15}$/;
                        if (value.trim() === '') {
                            addError(field, 'Please enter your phone number');
                            isValid = false;
                        } else if (!phoneRegex.test(value.trim())) {
                            addError(field, 'Please enter a valid phone number (10-15 digits)');
                            isValid = false;
                        }
                        break;
                        
                    case 'subject':
                        if (value.trim() === '') {
                            addError(field, 'Please select a subject');
                            isValid = false;
                        }
                        break;
                        
                    case 'message':
                        if (value.trim() === '') {
                            addError(field, 'Please enter your message');
                            isValid = false;
                        } else if (value.trim().length < 10) {
                            addError(field, 'Please enter your message (at least 10 characters)');
                            isValid = false;
                        } else if (value.trim().length > 2000) {
                            addError(field, 'Message is too long (maximum 2000 characters)');
                            isValid = false;
                        }
                        break;
                        
                    default:
                        // Basic validation for unknown fields
                        if (field.prop('required') && value.trim() === '') {
                            addError(field, 'This field is required');
                            isValid = false;
                        }
                        break;
                }
            } catch (validationError) {
                console.warn('Error in field validation rules:', validationError);
                isValid = false;
            }
            
            try {
                if (isValid && formGroup.length) {
                    formGroup.addClass('has-success');
                }
            } catch (successError) {
                console.warn('Error adding success class:', successError);
            }
            
            return isValid;
        } catch (error) {
            console.error('Error in validateField function:', error);
            return false;
        }
    }
    
    // Helper function to add error message with error handling
    function addError(field, message) {
        try {
            if (!field || !field.length) {
                console.warn('Invalid field passed to addError');
                return;
            }
            
            if (!message || typeof message !== 'string') {
                console.warn('Invalid message passed to addError');
                message = 'Please check this field';
            }
            
            const formGroup = field.parent();
            if (!formGroup.length) {
                console.warn('Field has no parent for error message');
                return;
            }
            
            formGroup.addClass('has-error');
            
            // Only add error message if one doesn't already exist
            if (formGroup.find('.error-message').length === 0) {
                // Sanitize message to prevent XSS
                const sanitizedMessage = $('<div>').text(message).html();
                const errorElement = $('<div class="error-message">' + sanitizedMessage + '</div>');
                errorElement.insertAfter(field);
                
                // Add ARIA attributes for accessibility
                const fieldId = field.attr('id');
                if (fieldId) {
                    const errorId = fieldId + '-error';
                    errorElement.attr('id', errorId);
                    field.attr('aria-describedby', errorId);
                }
            }
        } catch (error) {
            console.error('Error in addError function:', error);
        }
    }
    
    // Helper function to show form feedback with comprehensive error handling
    function showFormFeedback(type, message) {
        try {
            if (!type || !message) {
                console.warn('Invalid parameters passed to showFormFeedback');
                return;
            }
            
            // Sanitize message to prevent XSS
            const sanitizedMessage = $('<div>').text(message).html();
            
            // Remove any existing feedback
            try {
                $('.form-feedback').remove();
            } catch (removeError) {
                console.warn('Error removing existing feedback:', removeError);
            }
            
            // Create new feedback element
            const feedbackClass = type === 'success' ? 'form-feedback success' : 'form-feedback error';
            const feedback = $('<div class="' + feedbackClass + '">' + sanitizedMessage + '</div>');
            
            // Add ARIA attributes for accessibility
            feedback.attr({
                'role': type === 'success' ? 'status' : 'alert',
                'aria-live': type === 'success' ? 'polite' : 'assertive'
            });
            
            // Add to DOM and animate
            try {
                const contactForm = $('#contactForm');
                if (contactForm.length) {
                    contactForm.prepend(feedback);
                    
                    // Auto-hide success messages after 5 seconds
                    if (type === 'success') {
                        setTimeout(function() {
                            try {
                                if (feedback.length) {
                                    feedback.fadeOut(300, function() {
                                        try {
                                            $(this).remove();
                                        } catch (fadeError) {
                                            console.warn('Error removing feedback after fade:', fadeError);
                                        }
                                    });
                                }
                            } catch (timeoutError) {
                                console.warn('Error in feedback timeout:', timeoutError);
                            }
                        }, 5000);
                    }
                } else {
                    console.warn('Contact form not found for feedback display');
                }
            } catch (displayError) {
                console.error('Error displaying form feedback:', displayError);
            }
        } catch (error) {
            console.error('Error in showFormFeedback function:', error);
        }
    }
});
