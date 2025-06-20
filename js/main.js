/*
==================================================
C&J Provider Services - Main JavaScript
Author: Professional Web Development Team
Version: 1.0
==================================================
*/

// Add backup timeout to ensure preloader disappears even if some resources fail to load
var preloaderTimeout = setTimeout(function() {
    try {
        const preloader = $('.preloader');
        if (preloader.length) {
            preloader.fadeOut('slow', function() {
                $(this).remove();
            });
        }
    } catch (error) {
        console.warn('Error hiding preloader:', error);
        // Force hide preloader without animation as fallback
        const preloaderEl = document.querySelector('.preloader');
        if (preloaderEl) {
            preloaderEl.style.display = 'none';
        }
    }
}, 5000); // 5 second backup timeout

$(window).on('load', function() {
    try {
        // Remove preloader once page is fully loaded
        clearTimeout(preloaderTimeout); // Clear the backup timeout
        const preloader = $('.preloader');
        if (preloader.length) {
            preloader.delay(500).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    } catch (error) {
        console.warn('Error in window load handler:', error);
        // Force hide preloader as fallback
        const preloaderEl = document.querySelector('.preloader');
        if (preloaderEl) {
            preloaderEl.style.display = 'none';
        }
    }
});

// Add document ready backup for preloader
$(document).ready(function() {
    try {
        // Add class to start animations
        const spinner = $('.preloader .spinner');
        if (spinner.length) {
            spinner.addClass('loaded');
        }
    } catch (error) {
        console.warn('Error initializing preloader spinner:', error);
    }
});

$(document).ready(function() {
    "use strict";

    try {
        // Professional Video Player Enhancement
        initVideoPlayer();
    } catch (error) {
        console.warn('Error initializing video player:', error);
    }

    // Navbar shrink on scroll with error handling
    $(window).on('scroll', function() {
        try {
            const scrollTop = $(this).scrollTop();
            const navbar = $('.navbar');
            const backToTop = $('.back-to-top');
            
            if (scrollTop > 90) {
                if (navbar.length) navbar.addClass('navbar-shrink');
                if (backToTop.length) backToTop.addClass('active');
            } else {
                if (navbar.length) navbar.removeClass('navbar-shrink');
                if (backToTop.length) backToTop.removeClass('active');
            }
        } catch (error) {
            console.warn('Error in scroll handler:', error);
        }
    });

    // Smooth scrolling for navigation with improved animation and error handling
    $('.navbar-nav a, .hero-buttons a, .service-link, .cta-section a, .footer-links a').on('click', function(e) {
        try {
            if (this.hash !== '' && $(this.hash).length) {
                e.preventDefault();
                const hash = this.hash;
                const target = $(hash);
                
                if (target.length && target.offset()) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, 'easeInOutQuad');
                    
                    // Update URL without page jump
                    if (history && history.pushState) {
                        try {
                            history.pushState(null, null, hash);
                        } catch (historyError) {
                            console.warn('Error updating browser history:', historyError);
                        }
                    }
                }
            }
        } catch (error) {
            console.warn('Error in smooth scroll handler:', error);
        }
    });
    
    // Add easing functions if not included in jQuery with error handling
    try {
        if ($ && $.easing) {
            $.easing.jswing = $.easing.swing;
            $.extend($.easing, {
                easeInOutQuad: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                }
            });
        }
    } catch (error) {
        console.warn('Error setting up easing functions:', error);
    }

    // Close mobile menu when link is clicked with error handling
    $('.nav-link').on('click', function() {
        try {
            const navbarCollapse = $('.navbar-collapse');
            if (navbarCollapse.length && navbarCollapse.collapse) {
                navbarCollapse.collapse('hide');
            }
        } catch (error) {
            console.warn('Error closing mobile menu:', error);
        }
    });

    // Back to top button with error handling
    $('.back-to-top').on('click', function(e) {
        try {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        } catch (error) {
            console.warn('Error in back to top handler:', error);
            // Fallback: immediate scroll to top
            try {
                window.scrollTo(0, 0);
            } catch (scrollError) {
                console.warn('Fallback scroll to top failed:', scrollError);
            }
        }
    });

    // Initialize Magnific Popup for Gallery with error handling
    if ($('.gallery-link').length) {
        try {
            if ($ && $.fn.magnificPopup) {
                $('.gallery-link').magnificPopup({
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300,
                        easing: 'ease-in-out'
                    },
                    callbacks: {
                        imageLoadError: function() {
                            console.warn('Error loading gallery image:', this.currItem.src);
                            this.content = $('<div class="gallery-error">Image could not be loaded</div>');
                        }
                    }
                });
            } else {
                console.warn('Magnific Popup not available, gallery links will open normally');
            }
        } catch (error) {
            console.warn('Error initializing Magnific Popup:', error);
        }
    }
    
    // Gallery filtering functionality with error handling
    if ($('.gallery-filter').length) {
        $('.gallery-filter-btn').on('click', function() {
            try {
                const filterValue = $(this).attr('data-filter');
                const filterBtns = $('.gallery-filter-btn');
                const galleryItems = $('.gallery-item');
                
                if (!filterValue) {
                    console.warn('No filter value found');
                    return;
                }
                
                if (filterBtns.length) {
                    filterBtns.removeClass('active');
                }
                $(this).addClass('active');
                
                if (galleryItems.length) {
                    if (filterValue === 'all') {
                        galleryItems.show(300);
                    } else {
                        galleryItems.not('.' + filterValue).hide(300);
                        galleryItems.filter('.' + filterValue).show(300);
                    }
                }
            } catch (error) {
                console.warn('Error in gallery filter:', error);
            }
        });
    }

    // Form submission handling with comprehensive error handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        try {
            const form = $(this);
            if (!form.length) {
                console.warn('Contact form not found');
                return;
            }
            
            // Get form values with null checks
            const nameField = form.find('input[name="name"]');
            const emailField = form.find('input[name="email"]');
            const phoneField = form.find('input[name="phone"]');
            const subjectField = form.find('select[name="subject"]');
            const messageField = form.find('textarea[name="message"]');
            
            const name = nameField.length ? nameField.val() : '';
            const email = emailField.length ? emailField.val() : '';
            const phone = phoneField.length ? phoneField.val() : '';
            const subject = subjectField.length ? subjectField.val() : '';
            const message = messageField.length ? messageField.val() : '';

            // Basic validation with better error messages
            const missingFields = [];
            if (!name.trim()) missingFields.push('Name');
            if (!email.trim()) missingFields.push('Email');
            if (!phone.trim()) missingFields.push('Phone');
            if (!subject.trim()) missingFields.push('Subject');
            if (!message.trim()) missingFields.push('Message');
            
            if (missingFields.length > 0) {
                const errorMsg = 'Please fill in the following fields: ' + missingFields.join(', ');
                alert(errorMsg);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission - In a real scenario, this would be an AJAX call to a server
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form safely
            if (this.reset) {
                this.reset();
            } else {
                // Manually clear fields as fallback
                form.find('input, select, textarea').val('');
            }
        } catch (error) {
            console.error('Error in form submission:', error);
            alert('There was an error submitting your form. Please try again.');
        }
    });

    // AOS Animation Initialize with error handling
    try {
        if (typeof AOS !== 'undefined' && AOS.init) {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true
            });
        }
    } catch (error) {
        console.warn('Error initializing AOS animations:', error);
    }

    // Count Up Animation for Statistics with error handling
    try {
        if (typeof countUp !== 'undefined' && $('.counter').length) {
            $('.counter').countUp({
                delay: 10,
                time: 1500
            });
        }
    } catch (error) {
        console.warn('Error initializing count up animations:', error);
    }

    // Initialize Bootstrap Tooltips with error handling
    try {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            if (tooltipTriggerList.length) {
                tooltipTriggerList.forEach(function(tooltipTriggerEl) {
                    try {
                        new bootstrap.Tooltip(tooltipTriggerEl);
                    } catch (tooltipError) {
                        console.warn('Error initializing tooltip for element:', tooltipTriggerEl, tooltipError);
                    }
                });
            }
        }
    } catch (error) {
        console.warn('Error initializing Bootstrap tooltips:', error);
    }

    // Service Cards Hover Effect with error handling
    $('.service-card').on('mouseenter', function() {
        try {
            $(this).addClass('active');
        } catch (error) {
            console.warn('Error adding active class to service card:', error);
        }
    }).on('mouseleave', function() {
        try {
            $(this).removeClass('active');
        } catch (error) {
            console.warn('Error removing active class from service card:', error);
        }
    });

    // Testimonial Cards Hover Effect with error handling
    $('.testimonial-card').on('mouseenter', function() {
        try {
            $(this).addClass('active');
        } catch (error) {
            console.warn('Error adding active class to testimonial card:', error);
        }
    }).on('mouseleave', function() {
        try {
            $(this).removeClass('active');
        } catch (error) {
            console.warn('Error removing active class from testimonial card:', error);
        }
    });
    
    // Simple testimonial banners - no carousel needed
});

// Professional Video Player Enhancement Function with comprehensive error handling
function initVideoPlayer() {
    try {
        const video = document.getElementById('showcase-video');
        const playPauseBtn = document.querySelector('.play-pause-btn');
        
        if (!video || !playPauseBtn) {
            console.warn('Video player elements not found');
            return;
        }
        
        // Custom play/pause functionality with error handling
        playPauseBtn.addEventListener('click', function() {
            try {
                if (video.paused) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            this.innerHTML = '<i class="fas fa-pause"></i>';
                        }).catch(error => {
                            console.warn('Error playing video:', error);
                        });
                    } else {
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            } catch (error) {
                console.warn('Error in play/pause handler:', error);
            }
        });
        
        // Update button when video state changes with error handling
        video.addEventListener('play', function() {
            try {
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            } catch (error) {
                console.warn('Error updating play button:', error);
            }
        });
        
        video.addEventListener('pause', function() {
            try {
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            } catch (error) {
                console.warn('Error updating pause button:', error);
            }
        });
        
        // Hide custom controls when video is playing with error handling
        video.addEventListener('play', function() {
            try {
                const overlay = $('.video-controls-overlay');
                if (overlay.length) {
                    overlay.fadeOut();
                }
            } catch (error) {
                console.warn('Error hiding video controls:', error);
            }
        });
        
        video.addEventListener('pause', function() {
            try {
                const overlay = $('.video-controls-overlay');
                if (overlay.length) {
                    overlay.fadeIn();
                }
            } catch (error) {
                console.warn('Error showing video controls:', error);
            }
        });
        
        // Auto-hide controls on video end with error handling
        video.addEventListener('ended', function() {
            try {
                const overlay = $('.video-controls-overlay');
                if (overlay.length) {
                    overlay.fadeIn();
                }
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            } catch (error) {
                console.warn('Error handling video end:', error);
            }
        });
        
        // Enhanced error handling for videos
        video.addEventListener('error', function(e) {
            console.warn('Video could not be loaded. Error details:', e);
            try {
                // If first video fails, try the second source
                if (video.currentSrc && video.currentSrc.includes('cj-provider-services.mp4')) {
                    console.log('Trying fallback video...');
                    video.src = 'videos/family.mp4';
                    video.load();
                } else {
                    // Show error message to user
                    const videoContainer = video.parentElement;
                    if (videoContainer) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'video-error';
                        errorMsg.innerHTML = '<p>Video could not be loaded. Please try refreshing the page.</p>';
                        videoContainer.appendChild(errorMsg);
                    }
                }
            } catch (fallbackError) {
                console.error('Error in video fallback handling:', fallbackError);
            }
        });
        
        // Add loading state handling
        video.addEventListener('loadstart', function() {
            try {
                video.classList.add('loading');
            } catch (error) {
                console.warn('Error adding loading class:', error);
            }
        });
        
        video.addEventListener('canplay', function() {
            try {
                video.classList.remove('loading');
            } catch (error) {
                console.warn('Error removing loading class:', error);
            }
        });
        
    } catch (error) {
        console.error('Error initializing video player:', error);
    }
}
