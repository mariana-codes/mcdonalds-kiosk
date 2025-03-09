import { redirect } from "@/i18n/navigation";
import { getDefaultSlug } from "@/lib/getDefaultSlug";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const slug = await getDefaultSlug();

  redirect({ href: `/${slug}`, locale: locale });
}
