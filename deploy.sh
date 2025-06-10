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

# Install root dependencies
echo "Installing root dependencies..."
npm ci --production

# Install client dependencies
if [ -d "client" ]; then
    echo "Installing client dependencies..."
    cd client
    npm ci
    cd ..
fi

# Build Vite frontend
echo "Building Vite frontend..."
cd client
npm run build
cd ..

# Build Express backend
echo "Building Express backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Linux deployment completed successfully!"

# Set executable permissions for PM2 or direct node execution
chmod +x dist/index.js 2>/dev/null || true

echo "Application ready to start with: node dist/index.js"