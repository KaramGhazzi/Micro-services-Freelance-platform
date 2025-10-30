import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_URL ?? '../../router/superschema.gql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/@generated/types.ts': { plugins: ['typescript'] },
    './src/graphql/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '../graphql/@generated/types',
        extension: '.generated.gql.ts',
      },
      plugins: ['@graphql-codegen/typescript-operations'],
      config: {
        addOperationExport: true,
      },
    },
  },
};

export default config;
