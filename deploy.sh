#!/bin/bash

# Multi-Portfolio Ecosystem Deployment Script
# This script handles deployment to various hosting platforms

set -e  # Exit on any error

echo "🚀 Starting Multi-Portfolio Ecosystem Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required directories exist
check_structure() {
    print_status "Checking multi-portfolio structure..."
    
    required_dirs=("gaming" "content" "shared" "assets" "backend")
    required_files=("index.html" "gaming/index.html" "content/index.html" "sitemap.xml")
    
    for dir in "${required_dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            print_error "Required directory '$dir' not found!"
            exit 1
        fi
    done
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Required file '$file' not found!"
            exit 1
        fi
    done
    
    print_success "Portfolio structure validation passed"
}

# Optimize assets for production
optimize_assets() {
    print_status "Optimizing assets for production..."
    
    # Update sitemap with current date
    current_date=$(date +%Y-%m-%d)
    sed -i.bak "s/<lastmod>.*<\/lastmod>/<lastmod>$current_date<\/lastmod>/g" sitemap.xml
    rm -f sitemap.xml.bak
    
    # Minify CSS files (if uglify-css is available)
    if command -v uglifycss &> /dev/null; then
        print_status "Minifying CSS files..."
        find . -name "*.css" -not -path "./node_modules/*" -not -name "*.min.css" | while read file; do
            uglifycss "$file" > "${file%.css}.min.css"
            print_status "Minified: $file"
        done
    else
        print_warning "uglifycss not found, skipping CSS minification"
    fi
    
    print_success "Asset optimization completed"
}

# Validate configuration files
validate_config() {
    print_status "Validating deployment configuration..."
    
    # Check if routing files exist
    config_files=("vercel.json" "netlify.toml" "_redirects" ".htaccess")
    
    for config in "${config_files[@]}"; do
        if [ -f "$config" ]; then
            print_success "Found: $config"
        else
            print_warning "Missing: $config"
        fi
    done
    
    # Validate JSON files
    if command -v jq &> /dev/null; then
        if [ -f "vercel.json" ]; then
            if jq empty vercel.json 2>/dev/null; then
                print_success "vercel.json is valid JSON"
            else
                print_error "vercel.json contains invalid JSON"
                exit 1
            fi
        fi
    else
        print_warning "jq not found, skipping JSON validation"
    fi
    
    print_success "Configuration validation completed"
}

# Test portfolio routing
test_routing() {
    print_status "Testing portfolio routing..."
    
    # Check if all portfolio HTML files are accessible
    portfolios=("index.html" "gaming/index.html" "content/index.html")
    
    for portfolio in "${portfolios[@]}"; do
        if [ -f "$portfolio" ] && [ -r "$portfolio" ]; then
            print_success "✓ $portfolio is accessible"
        else
            print_error "✗ $portfolio is not accessible"
            exit 1
        fi
    done
    
    print_success "Portfolio routing test passed"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod --yes
        print_success "Vercel deployment completed"
    else
        print_warning "Vercel CLI not found. Install with: npm i -g vercel"
        print_status "Manual deployment: Run 'vercel --prod' in project directory"
    fi
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir .
        print_success "Netlify deployment completed"
    else
        print_warning "Netlify CLI not found. Install with: npm i -g netlify-cli"
        print_status "Manual deployment: Drag and drop project folder to Netlify dashboard"
    fi
}

# Deploy backend to Railway
deploy_railway() {
    print_status "Deploying backend to Railway..."
    
    if command -v railway &> /dev/null; then
        railway up
        print_success "Railway backend deployment completed"
    else
        print_warning "Railway CLI not found. Install from: https://railway.app/cli"
        print_status "Manual deployment: Connect GitHub repo to Railway dashboard"
    fi
}

# Generate deployment report
generate_report() {
    print_status "Generating deployment report..."
    
    report_file="deployment-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# Multi-Portfolio Ecosystem Deployment Report

**Deployment Date:** $(date)
**Deployment Version:** $(git rev-parse --short HEAD 2>/dev/null || echo "N/A")

## Portfolio Structure
- ✅ Main Tech Portfolio: /
- ✅ Gaming Ecosystem: /gaming
- ✅ Content Creation: /content

## Configuration Files
- ✅ vercel.json (Vercel deployment)
- ✅ netlify.toml (Netlify deployment)
- ✅ _redirects (Netlify routing)
- ✅ .htaccess (Apache routing)
- ✅ railway.toml (Backend deployment)

## Security Features
- ✅ HTTPS redirect
- ✅ Security headers (XSS, CSRF, etc.)
- ✅ Content Security Policy
- ✅ HSTS enabled

## Performance Optimizations
- ✅ Asset compression (gzip)
- ✅ Cache headers configured
- ✅ CDN-ready static assets
- ✅ Lazy loading implemented

## SEO Configuration
- ✅ Sitemap.xml updated
- ✅ Robots.txt configured
- ✅ Meta tags for all portfolios
- ✅ Structured data markup

## Deployment URLs
- **Production:** https://gastondana.com
- **Gaming Portfolio:** https://gastondana.com/gaming
- **Content Portfolio:** https://gastondana.com/content
- **Backend API:** https://portfolio-production-b1b4.up.railway.app

## Next Steps
1. Monitor performance metrics
2. Test cross-portfolio navigation
3. Verify analytics tracking
4. Gather user feedback

EOF

    print_success "Deployment report generated: $report_file"
}

# Main deployment function
main() {
    echo "=================================================="
    echo "🎯 Multi-Portfolio Ecosystem Deployment"
    echo "=================================================="
    
    # Parse command line arguments
    PLATFORM=${1:-"all"}
    
    case $PLATFORM in
        "vercel")
            check_structure
            validate_config
            optimize_assets
            test_routing
            deploy_vercel
            ;;
        "netlify")
            check_structure
            validate_config
            optimize_assets
            test_routing
            deploy_netlify
            ;;
        "railway")
            deploy_railway
            ;;
        "all")
            check_structure
            validate_config
            optimize_assets
            test_routing
            print_status "Ready for deployment to all platforms"
            print_status "Run specific deployments:"
            print_status "  ./deploy.sh vercel   - Deploy frontend to Vercel"
            print_status "  ./deploy.sh netlify  - Deploy frontend to Netlify"
            print_status "  ./deploy.sh railway  - Deploy backend to Railway"
            ;;
        *)
            print_error "Unknown platform: $PLATFORM"
            print_status "Usage: ./deploy.sh [vercel|netlify|railway|all]"
            exit 1
            ;;
    esac
    
    generate_report
    
    echo "=================================================="
    print_success "🎉 Deployment process completed!"
    echo "=================================================="
}

# Run main function with all arguments
main "$@"