import BannerSlider from "@/components/BannerSlider";
import BannerGrid from "@/components/BannerGrid";
import BrandsList from "@/components/BrandsList";
import ProductCarousel from "@/components/ProductCarousel";
import Categories from "@/components/Categories";
import Reviews from "@/components/Reviews";
import BlogPreview from "@/components/BlogPreview";
import SeoText from "@/components/SeoText";
import { CatalogButton } from "@/components/MobileMenu";
import banners from "@/data/banners.json";
import brands from "@/data/brands.json";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import reviews from "@/data/reviews.json";
import posts from "@/data/blog.json";
import { isSale } from "@/lib/products";

export default function Home() {
  return (
    <main id="main" className="main">
      <BannerSlider banners={banners.slider} />
      <CatalogButton />
      <BrandsList brands={brands} />
      <ProductCarousel title="Хіти продажу" rel="hits" products={products.filter((p) => p.isHit)} />
      <BannerGrid banners={banners.afterHits} />
      <ProductCarousel title="Розпродаж" rel="global_action" products={products.filter(isSale)} />
      <BannerGrid banners={banners.afterSale} />
      <ProductCarousel title="Новинки" rel="novelties" products={products.filter((p) => p.isNew)} />
      <Categories categories={categories} />
      <Reviews reviews={reviews} />
      <BlogPreview posts={posts} />
      <SeoText />
    </main>
  );
}
