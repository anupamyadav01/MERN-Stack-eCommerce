import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white relative">
      <Slider {...settings}>
        <Link to="/products">
          <div>
            <img
              src="./bannerImgOne.webp"
              alt="dd"
              className="w-full h-auto object-cover"
            />
          </div>
        </Link>
        <Link to="/products">
          <div>
            <img
              src="./bannerImgTwo.webp"
              alt="dssdf"
              className="w-full h-auto object-cover"
            />
          </div>
        </Link>
        <Link to="/products">
          <div>
            <img
              src="./bannerImgThree.webp"
              alt="sfsdf"
              className="w-full h-auto object-cover"
            />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;
