const app = require('./app');
const prisma = require('./utils/prisma');

const PORT = process.env.PORT || 3000;

async function main() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  prisma.$disconnect();
  process.exit(1);
});
