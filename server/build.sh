#!/bin/bash

# Build script for Azure deployment
set -e

echo "Building production server..."

# Build the production server bundle
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/production.js

echo "Production server build completed successfully!"
echo "Output: dist/production.js"