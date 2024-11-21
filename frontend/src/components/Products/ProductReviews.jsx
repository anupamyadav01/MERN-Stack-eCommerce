import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductReviews = () => {
  const productId = useParams();
  console.log(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment) {
      const newReview = { rating, comment };
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment("");
    }
  };

  const handleAddReview = async () => {};

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-8">
      {/* Reviews Section */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">REVIEWS</h2>
        {reviews?.length === 0 ? (
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-4">
            No Reviews
          </div>
        ) : (
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <p className="text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overall Rating and Write Review Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Overall Rating Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              OVERALL RATING
            </h3>
            <div className="ml-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mb-2">
                  <span className="text-yellow-500 flex ">
                    {star} <span>★</span>
                  </span>
                  <div className="w-64 h-2 bg-gray-200 ml-2">
                    <div
                      className="h-2 bg-black"
                      style={{
                        width: `${Math.round(
                          (reviews.filter((r) => r.rating === star).length /
                            reviews.length) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">
                    {reviews.length
                      ? Math.round(
                          (reviews.filter((r) => r.rating === star).length /
                            reviews.length) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Customer Review Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              WRITE CUSTOMER REVIEW
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={handleRatingChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                >
                  <option value="0">Select ...</option>
                  <option value="1">1 ★</option>
                  <option value="2">2 ★★</option>
                  <option value="3">3 ★★★</option>
                  <option value="4">4 ★★★★</option>
                  <option value="5">5 ★★★★★</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Write your review here..."
                ></textarea>
              </div>

              <button
                type="submit"
                onClick={handleAddReview}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
