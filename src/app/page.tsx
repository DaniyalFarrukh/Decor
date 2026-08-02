import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { CategorySlider } from "@/components/home/BestSellers";
import { Footer } from "@/components/layout/Footer";
import { getStorefrontProducts } from "@/lib/actions/storefront";

export default async function Home() {
  const products = await getStorefrontProducts();

  // Group products by category
  const categoriesMap = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categories = Object.keys(categoriesMap);

  return (
    <main className="flex min-h-screen flex-col bg-brand-primary">
      <Navbar />
      <Hero />
      
      {categories.length === 0 ? (
        <div className="py-32 text-center text-brand-text/50">
          <p className="text-xl">No products available yet.</p>
        </div>
      ) : (
        categories.map((category) => (
          <CategorySlider 
            key={category} 
            title={category} 
            description={`Explore our exclusive collection of ${category.toLowerCase()}.`}
            products={categoriesMap[category]} 
          />
        ))
      )}

      <Footer />
    </main>
  );
}
