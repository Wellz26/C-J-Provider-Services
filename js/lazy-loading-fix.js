/*
==================================================
C&J Provider Services - Minimal Lazy Loading
==================================================
*/

$(document).ready(function() {
    // Handle any remaining images with data-src attributes
    $('img[data-src]').each(function() {
        var img = $(this);
        var src = img.attr('data-src');
        if (src) {
            img.attr('src', src);
        }
    });
    
    // Add error handling for all images
    $('img').on('error', function() {
        var img = $(this);
        if (!img.hasClass('error-handled')) {
            img.addClass('error-handled');
            if (img.attr('src') !== 'img/1.jpg') {
                img.attr('src', 'img/1.jpg');
            }
        }
    });
});