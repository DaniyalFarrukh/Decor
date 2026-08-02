import CollectionsPage from "@/app/collections/page";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CollectionsPage categorySlug={params.slug} />;
}
