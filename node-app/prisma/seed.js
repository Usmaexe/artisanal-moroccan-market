const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../src/utils/constants');

// Create a new PrismaClient instance
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting seed process...');
    
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@example.com' }
    });
    
    if (!existingAdmin) {
      // Create default admin user
      const passwordHash = await bcrypt.hash('admin123', SALT_ROUNDS);
      
      const admin = await prisma.admin.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password_hash: passwordHash
        }
      });
      
      console.log('Default admin user created:', admin.email);
    } else {
      console.log('Admin user already exists, skipping creation');
    }
    
    console.log('Seed process completed successfully');
  } catch (error) {
    console.error('Error during seed process:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();