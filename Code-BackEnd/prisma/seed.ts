import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
//  const userRole = await prisma.role.upsert({
//    where: {
//      id: 2,
//    },
//    update: {
//      role: 'user',
//    },
//    create: {
//      role: 'user',
//    },
//  });
//
//  const admRole = await prisma.role.upsert({
//    where: { id: 1 },
//    update: {
//      role: 'admin',
//    },
//    create: {
//      role: 'admin',
//    },
//  });

  const adm = await prisma.user.upsert({
    where: { id: 1 },
    update: {
      "email": "connectpharmacy@connectpharmacy.com",
      "username": "connectpharmacy",
      "cnpj": "123-123-123-123",
      "role": "admin",
      "password": "admin"
    },
    create: {
      "email": "connectpharmacy@connectpharmacy.com",
      "username": "connectpharmacy",
      "cnpj": "123-123-123-123",
      "role": "admin",
      "password": "admin"
    },
  });

  console.log({ adm });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
