const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const challenge = await prisma.challenge.create({
    data: {
      name: "Walk to Turku",
      meters: 167000,
    },
  });
  console.log(`challenge with id ${challenge.id} created`);
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
