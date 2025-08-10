import { PrismaClient } from "../app/generated/prisma";
const prisma = new PrismaClient();
async function main() {
  await prisma.issue.createMany({
    data: [
      {
        title: "Login button not working",
        description: "Clicking the login button does nothing on Chrome 115.",
        status: "open",
        priority: "high",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Slow dashboard load time",
        description:
          "Dashboard takes over 10 seconds to load on slower connections.",
        status: "in-progress",
        priority: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Typo in settings page",
        description: "The word 'notifcations' should be 'notifications'.",
        status: "open",
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Search feature returns incomplete results",
        description: "Some relevant items are missing from search output.",
        status: "in-progress",
        priority: "high",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Profile picture not updating",
        description:
          "After uploading a new profile picture, the old one is still displayed.",
        status: "closed",
        priority: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
