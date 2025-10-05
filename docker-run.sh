#!/bin/bash

# Enhanced Docker run script with more options
echo "🐳 PostgreSQL to DigitalOcean Spaces Backup Docker Runner"
echo "=================================================="

# Load environment variables to get PostgreSQL version
if [ -f ".env" ]; then
    source .env
    POSTGRES_VERSION=${POSTGRES_VERSION:-17}
else
    POSTGRES_VERSION=17
fi

# Build the Docker image
echo "📦 Building Docker image with PostgreSQL version: $POSTGRES_VERSION"
docker build --build-arg POSTGRES_VERSION=$POSTGRES_VERSION -t postgres-spaces-backup .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo ""
    
    docker run \
        --rm \
        --name postgres-backup \
        --env-file .env \
        postgres-spaces-backup

    echo ""
    echo "🏁 Container execution completed!"

else
    echo "❌ Docker build failed!"
    echo "Make sure Docker Desktop is running and authenticated."
    exit 1
fi
