import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const WishlistPage = () => {
  const navigate = useNavigate();

  // Dummy data for wishlist items
  const wishlistItems = [
    {
      _id: "1",
      title: "Apple iPhone 14 Pro Max",
      productImage:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753619946",
      rating: 4.8,
      ratings: [1, 2, 3, 4, 5],
      price: 1099,
    },
    {
      _id: "2",
      title: "Samsung Galaxy S23 Ultra",
      productImage:
        "https://images.samsung.com/is/image/samsung/p6pim/in/smartphones/galaxy-s23/gallery/in-galaxy-s23-s918-sm-s918bzdgins-535221116?$2052_1641_PNG$",
      rating: 4.7,
      ratings: [1, 2, 3, 4],
      price: 999,
    },
    {
      _id: "3",
      title: "Sony WH-1000XM5 Wireless Headphones",
      productImage:
        "https://m.media-amazon.com/images/I/61d5F7z7vIL._AC_SL1500_.jpg",
      rating: 4.6,
      ratings: [1, 2, 3],
      price: 399,
    },
  ];

  const showProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-black mb-8">
        Your Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* Product Image */}
              <div
                className="flex justify-center cursor-pointer"
                onClick={() => showProductDetails(item._id)}
              >
                <img
                  className="w-full h-52 object-cover rounded-md transition-all duration-300 transform hover:scale-105"
                  src={item.productImage}
                  alt={item.title}
                />
              </div>
              {/* Product Title */}
              <h2
                className="text-xl font-medium mt-4 cursor-pointer text-black hover:text-blue-600 transition-all duration-300"
                onClick={() => showProductDetails(item._id)}
              >
                {item.title}
              </h2>
              {/* Rating */}
              <div className="flex items-center mt-2">
                <StarRatings
                  rating={item.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                  isSelectable={false}
                />
                <span className="ml-2 text-gray-600 text-sm">
                  ({item.ratings.length})
                </span>
              </div>
              {/* Price */}
              <p className="text-black font-bold text-lg mt-3">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
