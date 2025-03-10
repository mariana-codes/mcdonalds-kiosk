import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import { routing } from "@/i18n/routing";
import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";
interface RestaurantPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const RestaurantPage = async (props: RestaurantPageProps) => {
  const t = await getTranslations("HomePage");

  const { params } = props;
  const { slug, locale } = await params;

  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-10">
        <LocaleSwitcher currentLocale={locale} locales={routing.locales} />
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />

          <h2 className="font-semibold">{restaurant.name}</h2>
        </div>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">{t("title")}</h3>
        <p className="opacity-55">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          option="DINE_IN"
          slug={slug}
          imageUrl="/dine_in.png"
          imageAlt={t("dinein-button")}
          buttonText={t("dinein-button")}
        />
        <ConsumptionMethodOption
          option="TAKEAWAY"
          slug={slug}
          imageUrl="/takeaway.png"
          imageAlt={t("takeaway-button")}
          buttonText={t("takeaway-button")}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
