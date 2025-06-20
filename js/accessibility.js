/*
==================================================
C&J Provider Services - Accessibility Enhancements
Author: Professional Web Development Team
Version: 1.0
==================================================
*/

$(document).ready(function() {
    "use strict";

    try {
        // Add skip to content link for keyboard users with error handling
        const body = $('body');
        if (body.length && !$('.skip-link').length) {
            const skipLink = $('<a href="#main-content" class="skip-link">Skip to main content</a>');
            body.prepend(skipLink);
        }
    } catch (error) {
        console.warn('Error adding skip link:', error);
    }

    try {
        // Add aria attributes to navigation with error handling
        const navLinks = $('.navbar-nav a');
        if (navLinks.length) {
            navLinks.attr('role', 'menuitem');
        }
        
        const navToggler = $('.navbar-toggler');
        if (navToggler.length) {
            navToggler.attr({
                'aria-label': 'Toggle navigation menu',
                'aria-expanded': 'false'
            });
        }
    } catch (error) {
        console.warn('Error setting navigation aria attributes:', error);
    }

    // Add proper focus states for all interactive elements with error handling
    try {
        $('a, button, input, select, textarea').on('focus', function() {
            try {
                $(this).addClass('focus-visible');
            } catch (error) {
                console.warn('Error adding focus-visible class:', error);
            }
        }).on('blur', function() {
            try {
                $(this).removeClass('focus-visible');
            } catch (error) {
                console.warn('Error removing focus-visible class:', error);
            }
        });
    } catch (error) {
        console.warn('Error setting up focus states:', error);
    }

    // Improve keyboard navigation for gallery items with error handling
    try {
        const galleryLinks = $('.gallery-link');
        if (galleryLinks.length) {
            galleryLinks.attr('tabindex', '0');
            galleryLinks.on('keydown', function(e) {
                try {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        $(this).click();
                    }
                } catch (error) {
                    console.warn('Error in gallery keydown handler:', error);
                }
            });
        }
    } catch (error) {
        console.warn('Error setting up gallery keyboard navigation:', error);
    }

    // Improve keyboard navigation for back to top button with error handling
    try {
        const backToTop = $('.back-to-top');
        if (backToTop.length) {
            backToTop.attr({
                'tabindex': '0',
                'role': 'button',
                'aria-label': 'Back to top of page'
            }).on('keydown', function(e) {
                try {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        $(this).click();
                    }
                } catch (error) {
                    console.warn('Error in back-to-top keydown handler:', error);
                }
            });
        }
    } catch (error) {
        console.warn('Error setting up back-to-top keyboard navigation:', error);
    }

    // Add ARIA labels for form inputs with error handling
    try {
        $('input, textarea, select').each(function() {
            try {
                const element = $(this);
                if (!element.attr('aria-label') && !element.attr('aria-labelledby')) {
                    const id = element.attr('id');
                    if (id) {
                        const label = $(`label[for="${id}"]`);
                        if (label.length) {
                            element.attr('aria-labelledby', id + '-label');
                            label.attr('id', id + '-label');
                        }
                    }
                    
                    // Fallback to placeholder if no label found
                    if (!element.attr('aria-label') && !element.attr('aria-labelledby')) {
                        const placeholder = element.attr('placeholder');
                        if (placeholder) {
                            element.attr('aria-label', placeholder);
                        }
                    }
                }
            } catch (error) {
                console.warn('Error processing form input aria labels:', error);
            }
        });
    } catch (error) {
        console.warn('Error setting up form input aria labels:', error);
    }

    // Add ARIA attributes to service cards with error handling
    try {
        const serviceCards = $('.service-card');
        if (serviceCards.length) {
            serviceCards.each(function() {
                try {
                    const card = $(this);
                    const heading = card.find('h3');
                    const headingText = heading.length ? heading.text().trim() : 'Service';
                    
                    card.attr({
                        'role': 'region',
                        'aria-label': headingText + ' service information'
                    });
                } catch (error) {
                    console.warn('Error setting service card aria attributes:', error);
                }
            });
        }
    } catch (error) {
        console.warn('Error setting up service card aria attributes:', error);
    }

    // Add ARIA attributes to testimonials with error handling
    try {
        const testimonialCards = $('.testimonial-card');
        if (testimonialCards.length) {
            testimonialCards.attr({
                'role': 'article',
                'aria-label': 'Testimonial'
            });
        }
    } catch (error) {
        console.warn('Error setting up testimonial aria attributes:', error);
    }

    // Add ARIA roles to social links with error handling
    try {
        const socialLinks = $('.social-links a');
        if (socialLinks.length) {
            socialLinks.each(function() {
                try {
                    const link = $(this);
                    const icon = link.find('i');
                    let socialPlatform = 'social media';
                    
                    if (icon.length) {
                        const iconClass = icon.attr('class');
                        if (iconClass) {
                            // Extract platform name from class
                            const match = iconClass.match(/fa-([a-z-]+)/);
                            if (match && match[1]) {
                                socialPlatform = match[1].replace('-', ' ');
                            }
                        }
                    }
                    
                    link.attr('aria-label', `Visit our ${socialPlatform} page`);
                } catch (error) {
                    console.warn('Error setting social link aria label:', error);
                }
            });
        }
    } catch (error) {
        console.warn('Error setting up social link aria attributes:', error);
    }
});
