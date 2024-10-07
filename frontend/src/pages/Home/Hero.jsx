import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`rounded-2xl w-full border relative bg-cover bg-center min-h-[70vh] 800px:min-h-[80vh] bg-no-repeat flex justify-center items-center`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={` w-[90%] 800px:w-[55%]`}>
        <h1
          className={`text-5xl leading-[1.2] text-[#2f2c2c] font-bold capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-lg text-[#000000ba] ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
          <div
            className={`w-[150px] hover:bg-black bg-gray-900 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer mt-5`}
          >
            <span className="text-[#fff] text-lg">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
