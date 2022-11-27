const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/*
 * Seeds the Walk to Turku challenge https://goo.gl/maps/otUScrmW7tdabFr88
 */
async function main() {
  console.log(`Start seeding ...`);
  const challenge = await prisma.challenge.upsert({
    where: {
      name: "Walk to Turku",
    },
    update: {
      name: "Walk to Turku",
      meters: 262000,
    },
    create: {
      name: "Walk to Turku",
      meters: 262000,
    },
  });
  console.log(`challenge with id ${challenge.id} created`);

  const legs = await prisma.leg.createMany({
    data: [
      {
        name: "Helsinki",
        meters: 0,
        challengeId: challenge.id,
      },
      {
        name: "Westend",
        meters: 10000,
        challengeId: challenge.id,
      },
      {
        name: "Porkkala",
        meters: 53300,
        challengeId: challenge.id,
      },
      {
        name: "Sjundby",
        meters: 86700,
        challengeId: challenge.id,
      },
      {
        name: "Inkoo",
        meters: 100500,
        challengeId: challenge.id,
      },
      {
        name: "Fagervik",
        meters: 123000,
        challengeId: challenge.id,
      },
      {
        name: "Fiskars",
        meters: 149000,
        challengeId: challenge.id,
      },
      {
        name: "Rave in Salo",
        meters: 199000,
        challengeId: challenge.id,
      },
      {
        name: "Paimio",
        meters: 228000,
        challengeId: challenge.id,
      },
      {
        name: "Turku",
        meters: 262000,
        challengeId: challenge.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${legs.count} legs created`);
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
