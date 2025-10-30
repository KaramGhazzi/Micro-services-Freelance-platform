import type { Config } from '@jest/types';
import nestJsConfig from '@package/config/jest/nestjs';

// Sync object
const config: Config.InitialOptions = {
  ...nestJsConfig,
  passWithNoTests: true, // set to false once tests are available
};

export default config;
