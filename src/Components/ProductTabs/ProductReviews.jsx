import React, { useEffect, useState, useContext } from 'react'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getProductReviews, postReview } from '../../services/products-services'
import { AuthContext } from '../../Context/Auth.context'
import Rating from '../Rating/Rating'
import { CgSpinner } from 'react-icons/cg'

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewData, setReviewData] = useState("")
  const [hoverRating, setHoverRating] = useState(0)
  const { token } = useContext(AuthContext)

  useEffect(() => {
    if (productId) {
      fetchReviews()
    }
  }, [productId])

  async function fetchReviews() {
    try {
      setIsLoading(true)
      const response = await getProductReviews({ id: productId })
      if (response.success) {
        setReviews(response.data.data || [])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!token) {
      toast.error("Please login to add a review")
      return
    }
    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }
    if (!reviewData.trim()) {
      toast.error("Please write a review")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await postReview({ productId, reviewData, rating })
      if (response.success) {
        toast.success("Review added successfully")
        setReviewData("")
        setRating(0)
        fetchReviews()
      }
    } catch (error) {
      toast.error(error.message || "Failed to add review")
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-10 dark:text-slate-200">

      {/* Add Review Form */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">

        <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Write a Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-slate-300">
              Overall Rating
            </label>

            <div className="flex flex-wrap items-center gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                >
                  <FaStar
                    className={`${(hoverRating || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-slate-600"
                      }`}
                  />
                </button>
              ))}

              <span className="ml-2 text-sm font-medium text-gray-500 dark:text-slate-400">
                {rating > 0
                  ? `${rating} out of 5 stars`
                  : "Select a rating"}
              </span>

            </div>
          </div>

          {/* Review Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
              Your Review
            </label>

            <textarea
              value={reviewData}
              onChange={(e) => setReviewData(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              className="min-h-32 w-full resize-y rounded-2xl border border-gray-200 bg-white p-4 text-gray-700 outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={isSubmitting || !token}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && (
                <CgSpinner className="animate-spin text-xl" />
              )}

              {token ? "Submit Review" : "Login to Review"}
            </button>

          </div>

        </form>
      </div>

      {/* Reviews List */}
      <div>

        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">

          Customer Reviews

          <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
            {reviews.length}
          </span>

        </h3>

        {isLoading ? (

          <div className="flex justify-center py-12">
            <CgSpinner className="animate-spin text-4xl text-primary-500" />
          </div>

        ) : reviews.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {reviews.map((review) => (

              <div
                key={review._id || review.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >

                <div className="mb-4 flex items-start justify-between">

                  {/* User */}
                  <div className="flex items-center gap-3">

                    {review.user?.profilePic ? (

                      <img
                        src={review.user.profilePic}
                        alt={review.user.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-500/20"
                      />

                    ) : (

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500">
                        <FaUserCircle className="text-3xl" />
                      </div>

                    )}

                    <div>

                      <h4 className="font-semibold text-gray-800 dark:text-slate-100">
                        {review.user?.name || "Anonymous User"}
                      </h4>

                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {new Date(
                          review.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* Rating */}
                  <div className="rounded-full bg-yellow-50 px-3 py-1 dark:bg-yellow-500/10">
                    <Rating rating={review.ratings || review.rating || 0} />
                  </div>

                </div>

                {/* Review Text */}
                <p className="leading-relaxed text-gray-600 dark:text-slate-300">
                  {review.title || review.review}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-14 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
              <FaStar className="text-2xl" />
            </div>

            <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-slate-100">
              No reviews yet
            </h4>

            <p className="text-gray-500 dark:text-slate-400">
              Be the first to share your thoughts about this product!
            </p>

          </div>

        )}

      </div>
    </div>
  )
}
