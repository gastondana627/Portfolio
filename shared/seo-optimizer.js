/**
 * SEO Optimization System
 * Handles meta tags, structured data, Open Graph, and SEO best practices
 */

if (typeof window.SEOOptimizer === 'undefined') {
    window.SEOOptimizer = class SEOOptimizer {
        constructor() {
            this.portfolioData = {
                tech: {
                    title: 'Gaston Dana - AI Engineer & Full-Stack Developer',
                    description: 'AI/ML Engineer specializing in RAG systems, multi-agent architectures, and full-stack development. Early access tester for Kaggle and Vercel.',
                    keywords: 'AI Engineer, Machine Learning, RAG Systems, Full-Stack Developer, Python, JavaScript, Multi-Agent Systems',
                    image: '/assets/Space Meditation.jpg',
                    type: 'website',
                    url: '/'
                },
                gaming: {
                    title: 'Gaston Dana - Gaming Ecosystem | Game Development & QA Testing',
                    description: 'Game development with Unity and Unreal Engine, comprehensive QA testing, and gaming content creation. Combining technical expertise with gaming passion.',
                    keywords: 'Game Development, Unity, Unreal Engine, QA Testing, Gaming Content, Game Design, C#',
                    image: '/gaming/assets/gaming-hero.jpg',
                    type: 'website',
                    url: '/gaming'
                },
                content: {
                    title: 'Gaston Dana - Content Creation | Video Production & Design',
                    description: 'Professional video production, graphic design, and brand partnerships. Creating compelling visual narratives with technical precision.',
                    keywords: 'Video Production, Content Creation, Graphic Design, Brand Partnerships, Motion Graphics, Adobe Creative Suite',
                    image: '/assets/content/images/content-hero.jpg',
                    type: 'website',
                    url: '/content'
                }
            };
            
            this.structuredData = {
                person: {
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Gaston Dana",
                    "jobTitle": "AI Engineer & Full-Stack Developer",
                    "description": "AI/ML Engineer specializing in RAG systems and full-stack development",
                    "url": "https://gastondana.com",
                    "sameAs": [
                        "https://www.linkedin.com/in/gaston-d-859653184/",
                        "https://github.com/gastondana627"
                    ],
                    "knowsAbout": [
                        "Artificial Intelligence",
                        "Machine Learning",
                        "RAG Systems",
                        "Multi-Agent Systems",
                        "Full-Stack Development",
                        "Python",
                        "JavaScript",
                        "Game Development",
                        "Content Creation"
                    ],
                    "alumniOf": {
                        "@type": "Organization",
                        "name": "University"
                    }
                },
                website: {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Gaston Dana Portfolio",
                    "url": "https://gastondana.com",
                    "description": "Portfolio showcasing AI engineering, game development, and content creation work",
                    "author": {
                        "@type": "Person",
                        "name": "Gaston Dana"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://gastondana.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }
            };
            
            this.init();
        }

        init() {
            this.detectCurrentPortfolio();
            this.setupDynamicSEO();
            this.addStructuredData();
            this.setupCanonicalURLs();
            this.optimizeImages();
        }

        /**
         * Detect current portfolio and set appropriate SEO
         */
        detectCurrentPortfolio() {
            const path = window.location.pathname;
            const body = document.body;

            let portfolio = 'tech'; // default

            if (path.includes('/gaming') || body.classList.contains('gaming-portfolio')) {
                portfolio = 'gaming';
            } else if (path.includes('/content') || body.classList.contains('content-portfolio')) {
                portfolio = 'content';
            }

            this.currentPortfolio = portfolio;
            this.updateSEOForPortfolio(portfolio);
        }

        /**
         * Update SEO meta tags for specific portfolio
         */
        updateSEOForPortfolio(portfolio) {
            const data = this.portfolioData[portfolio];
            if (!data) return;

            // Update title
            document.title = data.title;
            this.updateMetaTag('name', 'description', data.description);
            this.updateMetaTag('name', 'keywords', data.keywords);

            // Update Open Graph tags
            this.updateMetaTag('property', 'og:title', data.title);
            this.updateMetaTag('property', 'og:description', data.description);
            this.updateMetaTag('property', 'og:image', window.location.origin + data.image);
            this.updateMetaTag('property', 'og:url', window.location.origin + data.url);
            this.updateMetaTag('property', 'og:type', data.type);
            this.updateMetaTag('property', 'og:site_name', 'Gaston Dana Portfolio');

            // Update Twitter Card tags
            this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
            this.updateMetaTag('name', 'twitter:title', data.title);
            this.updateMetaTag('name', 'twitter:description', data.description);
            this.updateMetaTag('name', 'twitter:image', window.location.origin + data.image);

            // Update additional meta tags
            this.updateMetaTag('name', 'author', 'Gaston Dana');
            this.updateMetaTag('name', 'robots', 'index, follow');
            this.updateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
            this.updateMetaTag('http-equiv', 'Content-Type', 'text/html; charset=utf-8');
        }

        /**
         * Update or create meta tag
         */
        updateMetaTag(attribute, name, content) {
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);
            
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            
            meta.setAttribute('content', content);
        }

        /**
         * Setup dynamic SEO for single-page navigation
         */
        setupDynamicSEO() {
            // Listen for portfolio changes
            document.addEventListener('portfolioChanged', (e) => {
                const portfolio = e.detail.portfolio;
                this.updateSEOForPortfolio(portfolio);
                this.updateStructuredData(portfolio);
            });

            // Listen for navigation changes
            window.addEventListener('popstate', () => {
                this.detectCurrentPortfolio();
            });
        }

        /**
         * Add structured data to page
         */
        addStructuredData() {
            // Add Person schema
            this.addJSONLD('person-schema', this.structuredData.person);
            
            // Add Website schema
            this.addJSONLD('website-schema', this.structuredData.website);
            
            // Add portfolio-specific structured data
            this.addPortfolioStructuredData();
        }

        /**
         * Add JSON-LD structured data
         */
        addJSONLD(id, data) {
            let script = document.getElementById(id);
            
            if (!script) {
                script = document.createElement('script');
                script.id = id;
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            
            script.textContent = JSON.stringify(data);
        }

        /**
         * Add portfolio-specific structured data
         */
        addPortfolioStructuredData() {
            const portfolio = this.currentPortfolio;
            
            if (portfolio === 'tech') {
                const techData = {
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "AI Engineering Services",
                    "provider": {
                        "@type": "Person",
                        "name": "Gaston Dana"
                    },
                    "serviceType": "AI/ML Development",
                    "description": "Specialized AI engineering services including RAG systems and multi-agent architectures",
                    "areaServed": "Global",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "AI Development Services",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "RAG System Development"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Multi-Agent System Architecture"
                                }
                            }
                        ]
                    }
                };
                this.addJSONLD('tech-portfolio-schema', techData);
            }
            
            if (portfolio === 'gaming') {
                const gamingData = {
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Gaming Portfolio",
                    "creator": {
                        "@type": "Person",
                        "name": "Gaston Dana"
                    },
                    "description": "Game development projects and QA testing work",
                    "genre": ["Game Development", "Quality Assurance", "Gaming Content"],
                    "keywords": "Unity, Unreal Engine, Game Development, QA Testing"
                };
                this.addJSONLD('gaming-portfolio-schema', gamingData);
            }
            
            if (portfolio === 'content') {
                const contentData = {
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Content Creation Portfolio",
                    "creator": {
                        "@type": "Person",
                        "name": "Gaston Dana"
                    },
                    "description": "Video production, graphic design, and brand partnership work",
                    "genre": ["Video Production", "Graphic Design", "Content Creation"],
                    "keywords": "Video Production, Motion Graphics, Brand Partnerships"
                };
                this.addJSONLD('content-portfolio-schema', contentData);
            }
        }

        /**
         * Setup canonical URLs
         */
        setupCanonicalURLs() {
            const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.origin + window.location.pathname;
            
            if (!document.querySelector('link[rel="canonical"]')) {
                document.head.appendChild(canonical);
            }

            // Add alternate URLs for different portfolios
            this.addAlternateURLs();
        }

        /**
         * Add alternate URLs for portfolio sections
         */
        addAlternateURLs() {
            const alternates = [
                { href: '/', title: 'Tech Portfolio' },
                { href: '/gaming', title: 'Gaming Portfolio' },
                { href: '/content', title: 'Content Portfolio' }
            ];

            alternates.forEach(alt => {
                if (alt.href !== window.location.pathname) {
                    let link = document.querySelector(`link[href="${alt.href}"][rel="alternate"]`);
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'alternate';
                        link.href = window.location.origin + alt.href;
                        link.title = alt.title;
                        document.head.appendChild(link);
                    }
                }
            });
        }

        /**
         * Optimize images for SEO
         */
        optimizeImages() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Ensure alt text exists
                if (!img.alt) {
                    console.warn('Image missing alt text:', img.src);
                    img.alt = this.generateAltText(img);
                }
                
                // Add loading attribute if not present
                if (!img.loading) {
                    img.loading = 'lazy';
                }
                
                // Add dimensions if missing (helps with CLS)
                if (!img.width && !img.height) {
                    img.addEventListener('load', () => {
                        if (!img.width) img.width = img.naturalWidth;
                        if (!img.height) img.height = img.naturalHeight;
                    });
                }
            });
        }

        /**
         * Generate alt text for images without it
         */
        generateAltText(img) {
            const src = img.src;
            const filename = src.split('/').pop().split('.')[0];
            
            // Convert filename to readable text
            return filename
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .trim() || 'Portfolio image';
        }

        /**
         * Create XML sitemap data
         */
        generateSitemapData() {
            const baseURL = window.location.origin;
            const pages = [
                {
                    url: baseURL + '/',
                    lastmod: new Date().toISOString(),
                    changefreq: 'weekly',
                    priority: '1.0'
                },
                {
                    url: baseURL + '/gaming',
                    lastmod: new Date().toISOString(),
                    changefreq: 'monthly',
                    priority: '0.8'
                },
                {
                    url: baseURL + '/content',
                    lastmod: new Date().toISOString(),
                    changefreq: 'monthly',
                    priority: '0.8'
                }
            ];

            return pages;
        }

        /**
         * Update structured data for navigation
         */
        updateStructuredData(portfolio) {
            // Update breadcrumb navigation
            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": window.location.origin
                    }
                ]
            };

            if (portfolio !== 'tech') {
                breadcrumbData.itemListElement.push({
                    "@type": "ListItem",
                    "position": 2,
                    "name": portfolio.charAt(0).toUpperCase() + portfolio.slice(1),
                    "item": window.location.origin + '/' + portfolio
                });
            }

            this.addJSONLD('breadcrumb-schema', breadcrumbData);
        }

        /**
         * Get SEO recommendations
         */
        getSEORecommendations() {
            const recommendations = [];
            
            // Check title length
            const title = document.title;
            if (title.length < 30 || title.length > 60) {
                recommendations.push({
                    type: 'title',
                    message: `Title length (${title.length}) should be between 30-60 characters`,
                    priority: 'high'
                });
            }
            
            // Check meta description
            const description = document.querySelector('meta[name="description"]');
            if (!description) {
                recommendations.push({
                    type: 'meta',
                    message: 'Missing meta description',
                    priority: 'high'
                });
            } else if (description.content.length < 120 || description.content.length > 160) {
                recommendations.push({
                    type: 'meta',
                    message: `Meta description length (${description.content.length}) should be between 120-160 characters`,
                    priority: 'medium'
                });
            }
            
            // Check images without alt text
            const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
            if (imagesWithoutAlt.length > 0) {
                recommendations.push({
                    type: 'accessibility',
                    message: `${imagesWithoutAlt.length} images missing alt text`,
                    priority: 'high'
                });
            }
            
            // Check for h1 tag
            const h1Tags = document.querySelectorAll('h1');
            if (h1Tags.length === 0) {
                recommendations.push({
                    type: 'structure',
                    message: 'Missing H1 tag',
                    priority: 'high'
                });
            } else if (h1Tags.length > 1) {
                recommendations.push({
                    type: 'structure',
                    message: 'Multiple H1 tags found',
                    priority: 'medium'
                });
            }
            
            return recommendations;
        }

        /**
         * Monitor SEO performance
         */
        monitorSEOPerformance() {
            // Track page load metrics
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                const metrics = {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
                };
                
                console.log('SEO Performance Metrics:', metrics);
                return metrics;
            }
            
            return null;
        }
    }
}

// Initialize SEO optimizer
if (!window.seoOptimizer) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof window.seoOptimizer === 'undefined') {
            window.seoOptimizer = new window.SEOOptimizer();
        }
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.SEOOptimizer;
}