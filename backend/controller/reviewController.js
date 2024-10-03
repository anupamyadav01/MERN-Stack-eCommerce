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
    return res.status(500).send({
      success: false,
      message: "Something went wrong in review Controller",
    });
  }
};
