// Create a seed file in your project (e.g., prisma/seed.js)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedAnimals() {
  const animals = [
    {
      name: "Lion",
      imageUrl: "https://placehold.co/400x400/f39c12/FFFFFF.png?text=Lion",
      clickCount: Math.floor(Math.random() * 100)
    },
    {
      name: "Tiger",
      imageUrl: "https://placehold.co/400x400/e74c3c/FFFFFF.png?text=Tiger",
      clickCount: Math.floor(Math.random() * 100)
    },
    // ... other animals
  ];
  
  console.log("Seeding animals...");
  for (const animal of animals) {
    await prisma.animal.create({
      data: animal
    });
    console.log(`Created animal: ${animal.name}`);
  }
  console.log("Animal seeding completed!");
}

async function main() {
  await seedAnimals();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });