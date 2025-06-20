/*
==================================================
C&J Provider Services - Structured Data Implementation
Author: Professional Web Development Team
Version: 1.0
==================================================
*/

// Dynamically inject JSON-LD schema markup for better SEO with comprehensive error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Organization schema with error handling
        let organizationSchema;
        try {
            const origin = (window && window.location && window.location.origin) ? window.location.origin : '';
            organizationSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "C&J Provider Services",
                "url": origin,
                "logo": origin + "/img/logo.svg",
                "description": "C&J Provider Services offers comprehensive care services including day habilitation, residential habilitation, companion care, respite, and transportation for individuals with disabilities.",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "123 Care Avenue",
                    "addressLocality": "Compassion City",
                    "addressRegion": "NY",
                    "postalCode": "10001",
                    "addressCountry": "US"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-555-123-4567",
                    "contactType": "customer service"
                },
                "sameAs": [
                    "https://www.facebook.com/cjproviderservices",
                    "https://www.twitter.com/cjprovider",
                    "https://www.instagram.com/cjproviderservices"
                ]
            };
        } catch (orgSchemaError) {
            console.warn('Error creating organization schema:', orgSchemaError);
            // Fallback schema without dynamic URL
            organizationSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "C&J Provider Services",
                "description": "C&J Provider Services offers comprehensive care services including day habilitation, residential habilitation, companion care, respite, and transportation for individuals with disabilities."
            };
        }

        // Service schema for specific services with error handling
        let servicesSchema;
        try {
            servicesSchema = {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Disability Support Services",
                "provider": {
                    "@type": "Organization",
                    "name": "C&J Provider Services"
                },
                "areaServed": {
                    "@type": "State",
                    "name": "New York"
                },
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                }
            };
        } catch (serviceSchemaError) {
            console.warn('Error creating service schema:', serviceSchemaError);
            servicesSchema = null;
        }

        // Local business schema with error handling
        let localBusinessSchema;
        try {
            const origin = (window && window.location && window.location.origin) ? window.location.origin : '';
            localBusinessSchema = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "C&J Provider Services",
                "image": origin + "/img/logo.svg",
                "telephone": "+1-555-123-4567",
                "email": "info@cjprovider.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "123 Care Avenue",
                    "addressLocality": "Compassion City",
                    "addressRegion": "NY",
                    "postalCode": "10001",
                    "addressCountry": "US"
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "09:00",
                        "closes": "17:00"
                    }
                ],
                "priceRange": "$$"
            };
        } catch (businessSchemaError) {
            console.warn('Error creating local business schema:', businessSchemaError);
            // Fallback schema without dynamic URL
            localBusinessSchema = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "C&J Provider Services",
                "telephone": "+1-555-123-4567",
                "email": "info@cjprovider.com"
            };
        }

        // Create script elements for each schema with comprehensive error handling
        const createSchemaScript = (schema) => {
            try {
                if (!schema || typeof schema !== 'object') {
                    console.warn('Invalid schema provided to createSchemaScript');
                    return false;
                }
                
                if (!document.head) {
                    console.warn('Document head not available for schema injection');
                    return false;
                }
                
                const script = document.createElement('script');
                if (!script) {
                    console.warn('Failed to create script element');
                    return false;
                }
                
                script.type = 'application/ld+json';
                
                try {
                    script.textContent = JSON.stringify(schema);
                } catch (jsonError) {
                    console.warn('Error stringifying schema:', jsonError);
                    return false;
                }
                
                try {
                    document.head.appendChild(script);
                    return true;
                } catch (appendError) {
                    console.warn('Error appending schema script to head:', appendError);
                    return false;
                }
            } catch (error) {
                console.error('Error in createSchemaScript function:', error);
                return false;
            }
        };

        // Add all schemas to the page with error handling
        try {
            if (organizationSchema) {
                createSchemaScript(organizationSchema);
            }
        } catch (orgError) {
            console.warn('Error adding organization schema:', orgError);
        }

        // Add service schema only on services page with error handling
        try {
            if (window && window.location && window.location.pathname) {
                if (window.location.pathname.includes('services') && servicesSchema) {
                    createSchemaScript(servicesSchema);
                }
            }
        } catch (serviceError) {
            console.warn('Error adding service schema:', serviceError);
        }

        // Add local business schema only on contact or home page with error handling
        try {
            if (window && window.location && window.location.pathname) {
                const pathname = window.location.pathname;
                if (localBusinessSchema && 
                    (pathname.includes('contact') || 
                     pathname === '/' || 
                     pathname.endsWith('index.html'))) {
                    createSchemaScript(localBusinessSchema);
                }
            }
        } catch (businessError) {
            console.warn('Error adding local business schema:', businessError);
        }
        
    } catch (error) {
        console.error('Error in schema initialization:', error);
    }
});
