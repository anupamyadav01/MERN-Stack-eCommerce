import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/Home/BestSellers/BestSellers";
import NewArrivals from "../../components/Home/NewArrivals/NewArrivals";
import Sale from "../../components/Home/Sale/Sale";
import SpecialOffers from "../../components/Home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/Home/YearProduct/YearProduct";

const Hero = () => {
  return (
    <div className="">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Hero;
