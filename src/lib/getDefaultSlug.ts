import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDefaultSlug() {
  const firstPage = await prisma.restaurant.findFirst({
    select: { slug: true },
    orderBy: { createdAt: "asc" },
  });

  return firstPage?.slug;
}
