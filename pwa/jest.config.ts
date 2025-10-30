import type { Config } from '@jest/types';
import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Sync object
const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  displayName: 'Unit Tests',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  roots: ['app', 'middlewares'],
  verbose: true,
  testRegex: '.spec.(ts|tsx)$',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
    '^.+\\.[tj]sx?$': '@swc/jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: '../coverage',
  testEnvironment: 'jsdom',
};
export default createJestConfig(config);
