#!/bin/bash

# Startup script for Azure App Service Linux
echo "Starting Kambo website application..."

# Set environment variables for production
export NODE_ENV=production
export PORT=${PORT:-8080}

# Start the application
echo "Starting application on port $PORT"
node dist/index.js