import CollectionsPage from "@/app/collections/page";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <CollectionsPage categorySlug={resolvedParams.slug} />;
}
