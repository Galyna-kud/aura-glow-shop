import InfoPage from "@/components/InfoPage";
import StoreReviews from "@/components/StoreReviews";
import reviews from "@/data/reviews.json";

export const metadata = {
  title: "Відгуки про магазин",
  openGraph: { title: "Відгуки про магазин" },
};

export default function StoreReviewsPage() {
  return (
    <InfoPage href="/store-reviews/" title="Відгуки про магазин">
      <h1 className="main-h">Відгуки про магазин</h1>
      <StoreReviews reviews={reviews} />
    </InfoPage>
  );
}
