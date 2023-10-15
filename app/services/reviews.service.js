import httpStatus from "http-status";
import dB from "../models/index.js";

export async function createReview(data) {
  const review = await dB.reviews.create({ ...data });
  if (!review) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to create review"
    );
  }
  return review;
}

export async function updateReview(reviewId, data) {
  const review = await dB.reviews.update(
    { ...data },
    {
      where: {
        id: reviewId,
      },
    }
  );
  if (!review) {
    throw new APIError(
      "Not Found",
      httpStatus.NOT_FOUND,
      true,
      "Review not found"
    );
  }
  return review;
}

export async function destroyReview(reviewId) {
  const review = await dB.reviews.destory({
    where: {
      id: reviewId,
    },
  });
  if (!review) {
    throw new APIError(
      "Not Found",
      httpStatus.NOT_FOUND,
      true,
      "Review not found"
    );
  }
  return review;
}

export const reviewService = {
  createReview,
  destroyReview,
  updateReview,
};
