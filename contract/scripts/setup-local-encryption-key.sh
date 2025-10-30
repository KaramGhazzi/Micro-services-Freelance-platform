#!/bin/bash

# Generate the encryption key
KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")

# Check if .env file exists
if [ -f .env ]; then
    # Check if ENCRYPTION_KEY already exists in .env
    if grep -q "ENCRYPTION_KEY=" .env; then
        # Replace existing ENCRYPTION_KEY
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS version
            sed -i '' "s|ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$KEY|" .env
        else
            # Linux version
            sed -i "s|ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$KEY|" .env
        fi
    else
        # Append ENCRYPTION_KEY to .env
        echo "ENCRYPTION_KEY=$KEY" >> .env
    fi
else
    # Create .env file with ENCRYPTION_KEY
    echo "ENCRYPTION_KEY=$KEY" > .env
fi

echo "ENCRYPTION_KEY has been added to your .env file."
