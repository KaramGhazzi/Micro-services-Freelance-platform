# @app/subscription

## Description

This is Freelance's subscription service which handles all subscription and payment actions for the platform.

## Installation

```bash
$ npm install
```

## Local Encryption Key Setup

To set up your local development encryption key:

1. Run the following command to generate a new encryption key and automatically add it to your `.env` file:

   ```bash
   npm run generate-encryption-key
   ```

2. This script will:
   - Generate a secure, random 32-byte key
   - Add or update the `ENCRYPTION_KEY` in your `.env` file

Note: Run this command whenever you need to regenerate the encryption key. Be aware that changing the key will invalidate any previously encrypted data.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
