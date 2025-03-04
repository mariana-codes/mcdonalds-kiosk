/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.restaurant.deleteMany();
    const restaurant = await tx.restaurant.create({
      data: {
        name: "Speedy Burgers",
        slug: "speedy-burgers",
        description: "O hambúrguer mais rápido e saboroso da cidade!",
        avatarImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
        coverImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
      },
    });
    const combosCategory = await tx.menuCategory.create({
      data: {
        name: "Combos",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Mega Speedy Duplo",
          description:
            "Dois hambúrgueres de carne de bovino, queijo cheddar derretido, alface crocante, tomate fresco e molho especial. Acompanhado de batatas fritas e refrigerante.",
          price: 8.99,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão brioche",
            "Dois hambúrgueres de bovino",
            "Queijo cheddar",
            "Alface",
            "Tomate",
            "Molho especial",
          ],
        },
        {
          name: "Speedy Chicken Supreme",
          description:
            "Peito de frango panado crocante, queijo derretido, alface e molho de alho, no pão brioche. Inclui batatas fritas e bebida à escolha.",
          price: 7.99,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão brioche",
            "Peito de frango panado",
            "Queijo cheddar",
            "Alface",
            "Molho de alho",
          ],
        },
      ],
    });
    const snacksCategory = await tx.menuCategory.create({
      data: {
        name: "Acompanhamentos",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Batatas Fritas Clássicas",
          description: "Batatas fritas crocantes, feitas na hora!",
          ingredients: [],
          price: 3.99,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
          menuCategoryId: snacksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Onion Rings",
          description:
            "Deliciosos anéis de cebola panados e fritos até ficarem dourados.",
          ingredients: [],
          price: 4.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: snacksCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const drinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Coca-Cola",
          description:
            "Refrescante e gelada, perfeita para acompanhar qualquer refeição!",
          ingredients: [],
          price: 2.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Sumo de Laranja Natural",
          description: "Sumo de laranja natural, feito na hora!",
          ingredients: [],
          price: 3.0,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const dessertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Gelado de Baunilha",
          description: "Gelado cremoso de baunilha servido num cone crocante.",
          ingredients: [],
          price: 2.99,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",

          menuCategoryId: dessertsCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Brownie de Chocolate",
          description:
            "Brownie quente e húmido, perfeito para os amantes de chocolate!",
          ingredients: [],
          price: 3.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: dessertsCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
