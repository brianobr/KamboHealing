#!/bin/bash

# Exit on any error
set -e

echo "Starting Linux deployment for Kambo website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install Node.js 20.x"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install root dependencies (production only)
echo "Installing root dependencies..."
npm ci --production

# Install client dependencies (all deps for build)
if [ -d "client" ]; then
    echo "Installing client dependencies..."
    cd client
    npm ci
    echo "Building Vite frontend..."
    npm run build
    cd ..
    
    # Ensure dist/public directory exists and copy client build
    echo "Copying client build to dist/public..."
    mkdir -p dist/public
    cp -r client/dist/* dist/public/
    
    # Also copy to the location the server expects in production
    mkdir -p public
    cp -r client/dist/* public/
else
    echo "Warning: client directory not found"
fi

# Build Express backend
echo "Building Express backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify

echo "Linux deployment completed successfully!"

# Verify build outputs
echo "Build verification:"
echo "- Server bundle: $(ls -la dist/index.js 2>/dev/null || echo 'MISSING')"
echo "- Client files: $(ls -la dist/public/index.html 2>/dev/null || echo 'MISSING')"

# Set executable permissions
chmod +x dist/index.js 2>/dev/null || true

echo "Application ready to start with: node dist/index.js"