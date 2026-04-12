#!/bin/bash

# Asset Minification Script for Content Portfolio
# Minifies CSS and JavaScript files for production

echo "Starting asset minification..."

# Check if required tools are installed
command -v npx >/dev/null 2>&1 || { echo "npx is required but not installed. Aborting." >&2; exit 1; }

# Create minified directory if it doesn't exist
mkdir -p dist

# Minify CSS files
echo "Minifying CSS files..."
if command -v npx >/dev/null 2>&1; then
    # Using cssnano via postcss-cli
    npx postcss content-styles.css --use cssnano --output dist/content-styles.min.css 2>/dev/null || {
        echo "Note: cssnano not available. Skipping CSS minification."
        cp content-styles.css dist/content-styles.min.css
    }
else
    echo "Copying CSS files without minification..."
    cp content-styles.css dist/content-styles.min.css
fi

# Minify JavaScript files
echo "Minifying JavaScript files..."
JS_FILES=(
    "content-scripts.js"
    "content-data.js"
    "content-portfolio-data.js"
    "lazy-loading.js"
    "image-optimization.js"
    "code-splitting.js"
)

for file in "${JS_FILES[@]}"; do
    if [ -f "$file" ]; then
        output_file="dist/$(basename "$file" .js).min.js"
        
        # Try using terser for minification
        if command -v npx >/dev/null 2>&1; then
            npx terser "$file" --compress --mangle --output "$output_file" 2>/dev/null || {
                echo "Note: terser not available for $file. Copying without minification."
                cp "$file" "$output_file"
            }
        else
            cp "$file" "$output_file"
        fi
        
        echo "  Processed: $file -> $output_file"
    fi
done

# Calculate size savings
echo ""
echo "Minification complete!"
echo "Files saved to dist/ directory"

# Show size comparison if du is available
if command -v du >/dev/null 2>&1; then
    echo ""
    echo "Size comparison:"
    for file in "${JS_FILES[@]}"; do
        if [ -f "$file" ] && [ -f "dist/$(basename "$file" .js).min.js" ]; then
            original_size=$(du -h "$file" | cut -f1)
            minified_size=$(du -h "dist/$(basename "$file" .js).min.js" | cut -f1)
            echo "  $file: $original_size -> $minified_size"
        fi
    done
fi

echo ""
echo "To use minified files in production, update script src paths to point to dist/ directory"
