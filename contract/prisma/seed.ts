import { PrismaClient } from '@freelance/contract/client';

const prisma = new PrismaClient();

async function main() {
  // Test data can go here, e.g. contracts for companies that are created in the seeder of the core.
  // Master data (like new products) goes into a migration.
}

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'acceptance'
) {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      await prisma.$disconnect();

      process.exit(1);
    });
}
