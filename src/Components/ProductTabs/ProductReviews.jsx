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
    <div className="space-y-10">
      {/* Add Review Form */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Overall Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                >
                  <FaStar className={`${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-200'}`} />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-500 font-medium">
                {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={reviewData}
              onChange={(e) => setReviewData(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all resize-y"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !token}
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <CgSpinner className="animate-spin text-xl" />}
              {token ? 'Submit Review' : 'Login to Review'}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Customer Reviews 
          <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-sm">
            {reviews.length}
          </span>
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <CgSpinner className="animate-spin text-4xl text-primary-500" />
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review._id || review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {review.user?.profilePic ? (
                      <img src={review.user.profilePic} alt={review.user.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <FaUserCircle className="text-3xl" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.user?.name || "Anonymous User"}</h4>
                      <p className="text-xs text-gray-500">{new Date(review.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Rating rating={review.ratings || review.rating || 0} />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {review.title || review.review}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 shadow-sm">
              <FaStar className="text-2xl" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h4>
            <p className="text-gray-500">Be the first to share your thoughts about this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
