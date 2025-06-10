#!/bin/bash

# Startup script for Azure App Service Linux
echo "Starting Kambo website application..."

# Set environment variables for production
export NODE_ENV=production

# Debug: Show environment
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "PWD: $(pwd)"
echo "Files in dist/: $(ls -la dist/ 2>/dev/null || echo 'dist/ not found')"

# Start the application
echo "Starting application with node dist/index.js"
node dist/index.js