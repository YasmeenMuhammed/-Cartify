import React, { useEffect, useState } from 'react'
import { getAllReviews } from '../../services/products-services'
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa'
import Rating from '../../Components/Rating/Rating'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function HomeReviews() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const response = await getAllReviews()
        if (response.success) {
          setReviews(response.data.data?.slice(0, 10) || [])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllReviews()
  }, [])

  if (isLoading || reviews.length === 0) return null;

  return (
    <section className="py-25 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 dark:text-slate-100 mb-4">
            What Our <span className="text-primary-600">Customers</span> Say
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
            Discover why thousands of customers love shopping with us. Read their real experiences and feedback.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}

          // الموبايل
          slidesPerView={1}

          breakpoints={{

            // tablet / md
            768: {
              slidesPerView: 2,
            },

            // desktop
            1024: {
              slidesPerView: 3,
            },
          }}

          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}

          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}

          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id || review.id} className="h-auto">
              <div className="bg-white dark:bg-slate-900/60 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800/80 h-full flex flex-col relative group hover:shadow-md transition-all duration-300">
                <FaQuoteLeft className="absolute top-8 right-8 text-4xl text-gray-100 dark:text-slate-800/40 group-hover:text-primary-50 dark:group-hover:text-slate-800 transition-colors" />

                <div className="mb-6">
                  <Rating rating={review.ratings || review.rating || 0} />
                </div>

                <p className="text-gray-600 dark:text-slate-350 leading-relaxed mb-8 flex-1 relative z-10 italic">
                  "{review.title || review.review}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {review.user?.profilePic ? (
                    <img src={review.user.profilePic} alt={review.user.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary-100 dark:border-slate-800" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary-100 dark:from-slate-800 to-primary-200 dark:to-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-inner">
                      <FaUserCircle className="text-4xl" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-slate-100">{review.user?.name || "Happy Customer"}</h4>
                    {review.product?.title && (
                      <p className="text-xs text-primary-600 font-medium line-clamp-1 mt-0.5">
                        {review.product.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
