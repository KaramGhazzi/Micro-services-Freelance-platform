import type { Config } from '@jest/types';
import nestJsConfig from '@package/config/jest/nestjs';
import { join } from 'path';

// Sync object
const config: Config.InitialOptions = {
  ...nestJsConfig,
  passWithNoTests: true, // set to false once tests are available
  setupFiles: [join(__dirname, 'jest.setup.ts')],
  rootDir: join(__dirname, 'src'),
};

export default config;
