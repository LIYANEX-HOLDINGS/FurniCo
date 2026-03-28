import HeroSlider from "@/components/home/HeroSlider";
import TopCategories from "@/components/home/TopCategories";
import ImagePromoGrid from "@/components/home/ImagePromoGrid";
import LatestProducts from "@/components/home/LatestProducts";
import DealCountdown from "@/components/home/DealCountdown";
import InspirationBundle from "@/components/home/InspirationBundle";
import ShopByColor from "@/components/home/ShopByColor";
import ValuePropBanners from "@/components/home/ValuePropBanners";
import TestimonialBrandSlider from "@/components/home/TestimonialBrandSlider";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      <HeroSlider />
      <TopCategories />
      <ImagePromoGrid />
      <LatestProducts />
      <DealCountdown />
      <InspirationBundle />
      <ShopByColor />
      <ValuePropBanners />
      <TestimonialBrandSlider />
    </div>
  );
}
