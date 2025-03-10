import { isValidNif, removeNifPunctuation } from "@/helpers/nif";
import { db } from "@/lib/prisma";

import NifForm from "./components/nif-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ nif: string }>;
}

const Orders = async ({ searchParams }: OrdersPageProps) => {
  const { nif } = await searchParams;

  if (!nif) {
    return <NifForm />;
  }

  if (!isValidNif(nif)) {
    return <NifForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerNif: removeNifPunctuation(nif),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrderList orders={orders} />;
};

export default Orders;
