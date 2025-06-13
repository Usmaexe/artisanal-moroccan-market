// Import PrismaClient from the custom output directory
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

// Create a new PrismaClient instance
const prisma = new PrismaClient();

// Set admin credentials
const adminEmail = 'admin@example.com';
const adminPassword = 'admin123';
const adminName = 'Admin User';

async function createAdmin() {
  try {
    console.log('Starting admin creation process...');
    
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }
    
    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
    
    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        name: adminName,
        email: adminEmail,
        password_hash: passwordHash
      }
    });
    
    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();