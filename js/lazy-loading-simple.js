/*
==================================================
C&J Provider Services - Simplified Lazy Loading
Author: Professional Web Development Team
Version: 1.3 - Simplified
==================================================
*/

$(document).ready(function() {
    "use strict";

    // Since we're now using direct src images, this file mainly handles
    // error cases and any remaining data-src images
    
    try {
        // Handle any remaining images with data-src attributes
        $('img[data-src]').each(function() {
            const $img = $(this);
            const src = $img.attr('data-src');
            if (src) {
                $img.attr('src', src);
                $img.addClass('loaded');
            }
        });
        
        // Add error handling for all images
        $('img').on('error', function() {
            const $this = $(this);
            if (!$this.hasClass('error-handled')) {
                $this.addClass('error-handled');
                // Try fallback image
                if ($this.attr('src') !== 'img/1.jpg') {
                    $this.attr('src', 'img/1.jpg');
                }
            }
        });
        
        // Basic lazy loading for any images still using data-src
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
    } catch (error) {
        // Silent error handling for production
    }
});