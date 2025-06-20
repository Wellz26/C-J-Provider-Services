/*
==================================================
C&J Provider Services - Lazy Loading Implementation
Author: Professional Web Development Team
Version: 1.2
==================================================
*/

$(document).ready(function() {
    "use strict";

    // Initialize variables for tracking loaded images
    let loadedImagesCount = 0;
    const totalLazyImages = document.querySelectorAll('img[data-src]').length;
    
    // Pre-load critical images (gallery and other data-src images)
    function preloadCriticalImages() {
        // Preload the first few gallery images that will be visible initially
        $('.gallery-item:lt(3) img[data-src]').each(function() {
            const img = $(this);
            const src = img.data('src');
            if (src) {
                img.attr('src', src);
                img.addClass('loaded');
                loadedImagesCount++;
            }
        });
    }
    
    // Call preload function immediately
    preloadCriticalImages();
    
    // Lazy loading for all other images (excluding already loaded testimonials)
    const lazyImages = document.querySelectorAll('img[data-src]:not(.loaded)');
    
    if ('IntersectionObserver' in window) {
        // Use Intersection Observer API for modern browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        
                        // If there's a srcset attribute, handle that too
                        if (image.dataset.srcset) {
                            image.srcset = image.dataset.srcset;
                        }
                        
                        image.classList.add('loaded');
                        observer.unobserve(image);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                            }
                            
                            img.classList.add('loaded');
                        }
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
        lazyLoad(); // Initial load
    }

    // Helper function to convert all images to lazy loading
    function convertImagesToLazyLoad() {
        const images = document.querySelectorAll('img:not([data-src]):not(.loaded)');
        
        images.forEach(img => {
            // Skip images that are already processed, placeholder images, or SVG files
            if (img.classList.contains('loaded') || 
                !img.src || 
                img.src.includes('data:image') || 
                img.src.includes('placeholder.png') || 
                img.src.endsWith('.svg')) {
                return;
            }
            
            // Store original src in data-src
            img.dataset.src = img.src;
            
            // If there's a srcset, store it too
            if (img.srcset) {
                img.dataset.srcset = img.srcset;
                img.srcset = '';
            }
            
            // Set placeholder (lightweight SVG data URL)
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3C/svg%3E";
            
            // Add loading class for styling
            img.classList.add('lazy-load');
        });
    }

    // Run only on page load to avoid breaking existing images
    if (window.performance && window.performance.navigation.type === 0) {
        convertImagesToLazyLoad();
    }

    // Add CSS for lazy loaded images
    const style = document.createElement('style');
    style.textContent = `
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add basic error handling for all images
    $('img').on('error', function() {
        const $this = $(this);
        if (!$this.hasClass('error-handled')) {
            $this.addClass('error-handled');
            // Use existing onerror fallback if available
            const fallback = $this.attr('onerror');
            if (fallback) {
                const fallbackSrc = fallback.match(/this\.src='(.+?)'/);
                if (fallbackSrc && fallbackSrc[1]) {
                    $this.attr('src', fallbackSrc[1]);
                    return;
                }
            }
            // Default fallback
            $this.attr('src', 'img/1.jpg');
        }
    });
});

