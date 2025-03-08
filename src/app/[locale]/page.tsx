// import { useTranslations } from "next-intl";

// import { Link } from "@/i18n/navigation";

// export default function HomePage() {
//   const t = useTranslations("HomePage");
//   return (
//     <div>
//       <h1>{t("title")}</h1>
//       <Link href="/about">{t("about")}</Link>
//     </div>
//   );
// }

import { redirect } from "@/i18n/navigation";
import { getDefaultSlug } from "@/lib/getDefaultSlug";

interface Params {
  locale: string;
}

export default async function Home({ params }: { params: Params }) {
  const slug = await getDefaultSlug();

  redirect({ href: `/${slug}`, locale: params.locale });
}
