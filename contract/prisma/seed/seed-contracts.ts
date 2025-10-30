/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { PrismaClient, Prisma, ProductSlug } from '@freelance/contract/client';
import { companies } from './companies';
import { getContract, Contract } from './contracts';

const prisma = new PrismaClient();
let environment = process.env.ENV ?? '';
if (environment === 'develop') {
  environment = 'dev';
}

let coreDb;
if (environment) {
  coreDb = Prisma.sql``;
  coreDb.strings.pop();
  coreDb.strings.push(`core-${environment}`);
} else {
  coreDb = Prisma.sql`freelance-db`;
}

const getCompanyIdByName = async (name: string) => {
  const companyName = Prisma.sql`${name}`;

  const company = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM \`${coreDb}\`.\`Company\` WHERE name = ${companyName};
  `;

  if (company?.length) {
    return Number(company[0]?.id);
  }

  return -1;
};

const createContract = async (companyId: number, useContract: Contract) => {
  const plan = await prisma.plan.findFirstOrThrow({
    where: {
      product: {
        slug: useContract.slug,
      },
    },
    select: {
      id: true,
      usageAmount: true,
    },
  });

  const contract = await prisma.contract.findFirst({
    where: {
      companyId,
      plan: {
        product: {
          slug: useContract.slug,
        },
      },
    },
    select: {
      id: true,
    },
  });

  const externalProviderId = `cus_test_account_${companyId}`;
  await prisma.externalProviderCompany.upsert({
    where: {
      companyId,
    },
    create: {
      externalProviderId,
      companyId,
    },
    update: {
      externalProviderId,
    },
  });

  console.log(
    `Creating contract for company: ${companyId} adding contract: ${useContract.slug}`
  );

  await prisma.contract.upsert({
    where: {
      id: contract?.id ?? -1,
    },
    create: {
      companyId,
      planId: plan.id,
      startDate: new Date(),
      usageType: useContract.type,
      usageAmount: plan.usageAmount,
    },
    update: {
      usageType: useContract.type,
    },
  });
};

async function genericProcessSequentially(items, processFunction) {
  return items?.reduce(async (promiseChain: unknown, item: unknown) => {
    await promiseChain;
    return processFunction(item);
  }, Promise.resolve());
}

const processContractsSequentially = async () => {
  if (companies.length === 0) {
    return Promise.resolve();
  }

  const company = companies.shift();
  if (!company) {
    return Promise.resolve();
  }

  const companyId = await getCompanyIdByName(company?.name ?? '');

  if (companyId === -1) {
    return Promise.resolve();
  }
  console.log(`Found id ${companyId} for company with name: ${company.name}`);

  await createContract(companyId, getContract(ProductSlug.COMPANY_BASIC));

  return genericProcessSequentially(company.contracts, async (contract) => {
    await createContract(companyId, contract);
  }).then(() => processContractsSequentially());
};

export const createContracts = async () => {
  console.log(
    `Starting create contracts for environment ${
      environment || 'local development'
    } using info from db: ${coreDb.strings[0]}`
  );

  await processContractsSequentially();
};

const main = async () => {
  if (!['dev', 'test', 'acc'].includes(environment ?? '')) {
    console.error('Only works for dev, test and acc environments!');
    return;
  }
  await createContracts();
};

main()
  .finally(async () => {
    console.log('Seeding done');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
