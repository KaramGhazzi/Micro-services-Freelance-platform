// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { Response } from 'node-fetch';

// Polyfill the global Response object
// @ts-expect-error
global.Response = Response;

// Env vars
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
