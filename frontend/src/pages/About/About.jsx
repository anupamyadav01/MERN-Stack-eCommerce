/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      {/* Breadcrumb */}
      <Breadcrumbs title="About" prevLocation={prevLocation} />

      <div className="pb-10">
        {/* Introduction Section */}
        <h1 className="max-w-[600px] text-base text-lightText mb-4">
          <span className="text-primeColor font-semibold text-lg">Orebi</span>{" "}
          is one of the world's leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic worldwide cool
          looking style.
        </h1>

        {/* Dummy Content Section */}
        <div className="text-lightText mb-8">
          <p className="mb-4">
            At <span className="text-primeColor font-semibold">Orebi</span>, we
            are dedicated to bringing the latest trends and timeless pieces to
            our customers. Our collections are crafted with precision and
            attention to detail, ensuring the highest quality for every product
            you purchase.
          </p>
          <p className="mb-4">
            We believe in empowering individuals through fashion, offering a
            wide range of products that cater to diverse tastes and preferences.
            Whether you're looking for casual wear, formal attire, or statement
            accessories, <span className="text-primeColor">Orebi</span> has you
            covered.
          </p>
          <p className="mb-4">
            Our commitment extends beyond just products. We are passionate about
            creating a seamless shopping experience for our customers, backed by
            excellent customer service and support. Your satisfaction is our
            priority.
          </p>
          <p className="mb-4">
            Join us in redefining fashion and explore a world of style and
            sophistication. At <span className="text-primeColor">Orebi</span>,
            we make shopping an experience, not just a task.
          </p>
        </div>

        {/* CTA Section */}
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
