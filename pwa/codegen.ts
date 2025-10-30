import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env['GRAPHQL_URL'] ?? '../../router/superschema.gql', // the schema should be available from the router
  documents: [
    './graphql/**/*.gql',
    './app/**.*.tsx',
    '!./src/graphql/generated/**/*',
  ],
  generates: {
    'graphql/types.ts': { plugins: ['typescript'] },
    'app/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../graphql/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      // see https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo
      config: {
        dedupeOperationSuffix: true,
        federation: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      'prettier --write "**/*.generated.tsx" ./graphql/types.ts',
    ],
  },
};

export default config;
