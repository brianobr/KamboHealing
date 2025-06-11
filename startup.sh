#!/bin/bash

# Startup script for Azure App Service Linux
echo "Starting Kambo website application..."

# Set environment variables for production
export NODE_ENV=production

# Default PORT if not set by Azure (Azure typically uses 8080)
export PORT=${PORT:-8080}

# Debug: Show environment
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "PWD: $(pwd)"

# Check if server directory exists
if [ ! -d "server" ]; then
    echo "ERROR: server/ directory not found. Build may have failed."
    exit 1
fi

# Check if main server file exists
if [ ! -f "server/index.js" ]; then
    echo "ERROR: server/index.js not found. Build may have failed."
    exit 1
fi

# Check if public directory exists
if [ ! -d "server/public" ]; then
    echo "ERROR: server/public/ directory not found. Static files may be missing."
    exit 1
fi

echo "Files in deployment: $(ls -la 2>/dev/null)"
echo "Files in server: $(ls -la server/ 2>/dev/null)"

# Start the application
echo "Starting application with node server/index.js on port $PORT"
cd server
exec node index.js