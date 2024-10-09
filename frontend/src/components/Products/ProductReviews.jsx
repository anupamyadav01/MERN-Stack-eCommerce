import { useState } from "react";

const ProductReviews = () => {
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Reviews Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">REVIEWS</h2>

      {/* No Reviews Message */}
      {reviews.length === 0 ? (
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-4">
          No Reviews
        </div>
      ) : (
        <div>
          {/* Display existing reviews */}
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

      <div className="flex justify-between">
        {/* Write Customer Review Form */}
        <div className="bg-gray-50 border rounded-lg p-6 w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
            WRITE CUSTOMER REVIEW
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Rating Dropdown */}
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

            {/* Comment Section */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Overall Rating */}
        <div className="text-center">
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              OVERALL RATING
            </h3>
            <div className="ml-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mb-2">
                  <span className="text-yellow-500">{star} ★</span>
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
      </div>
    </div>
  );
};

export default ProductReviews;
