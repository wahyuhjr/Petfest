const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin123', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();