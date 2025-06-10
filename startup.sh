#!/bin/bash

# Startup script for Azure App Service Linux
echo "Starting Kambo website application..."

# Set environment variables for production
export NODE_ENV=production

# Default PORT if not set by Azure
export PORT=${PORT:-8080}

# Debug: Show environment
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "PWD: $(pwd)"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "ERROR: dist/ directory not found. Build may have failed."
    exit 1
fi

# Check if main server file exists
if [ ! -f "dist/index.js" ]; then
    echo "ERROR: dist/index.js not found. Build may have failed."
    exit 1
fi

echo "Files in dist/: $(ls -la dist/ 2>/dev/null)"

# Start the application
echo "Starting application with node dist/index.js on port $PORT"
exec node dist/index.js