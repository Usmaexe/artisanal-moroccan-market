const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
