import { reviewModel } from "../model/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    const { productId } = req.params;
    const review = await reviewModel.create({
      user: userId,
      product: productId,
      comment,
      rating,
    });
    return res.status(200).send({
      success: true,
      message: "Review Added Successfully",
      review: review,
    });
  } catch (error) {
    console.log("Error in addReview", error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong in review Controller",
    });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user")
      .populate("product");
    if (!reviews) {
      console.log("no reviews found");
    }
    return res.status(200).send({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.log("Error in getReviewsByProductId", error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong in Get Reviews Controller",
    });
  }
};
