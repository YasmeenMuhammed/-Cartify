
import React, { useState } from 'react'
import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'

import homeSliderImg from '../../assets/Images/home-slider-1.png'

import 'swiper/css'
import 'swiper/css/pagination'

const SlideUp = (delay = 0) => ({
  initial: { y: 70, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1, delay },
})

const slides = [
  {
    id: 1,
    title: `Fresh Products Delivered 
to your Door`,
    description: 'Get 20% off of your first order',
    image: homeSliderImg,

    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/products',

    secondaryBtnText: 'View Deals',
    secondaryBtnLink: '/products',

    primaryBtnColor: 'text-primary-500',
    secondaryHoverColor: 'hover:text-primary-500',
  },

  {
    id: 2,
    title: `Fast and Free Delivery 
All over Egypt`,
    description: 'Same Day delivery available',
    image: homeSliderImg,

    primaryBtnText: 'Order Now',
    primaryBtnLink: '/products',

    secondaryBtnText: 'Delivery Info',
    secondaryBtnLink: '/products',

    primaryBtnColor: 'text-violet-500',
    secondaryHoverColor: 'hover:text-violet-500',
  },

  {
    id: 3,
    title: `Premium Quality Guaranteed `,
    description: 'Best quality products with amazing prices',
    image: homeSliderImg,

    primaryBtnText: 'Explore Now',
    primaryBtnLink: '/products',

    secondaryBtnText: 'View Deals',
    secondaryBtnLink: '/products',

    primaryBtnColor: 'text-blue-500',
    secondaryHoverColor: 'hover:text-blue-500',
  },
]

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative w-full overflow-hidden rounded-2xl">

      <Swiper
        slidesPerView={1}
        loop={true}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-prev',
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >

        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>

            <div
              className="min-h-90 md:min-h-100"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >

              <div
                className="
                  overlay
                  min-h-90
                  md:min-h-100
                  bg-linear-to-r
                  from-primary-600/95
                  to-primary-600/40
                  px-5
                  py-20
                  sm:px-8
                  md:px-16
                  md:py-28
                  lg:px-24
                "
              >

                <motion.div
                  variants={SlideUp(0.5)}
                  initial="initial"
                  animate={activeIndex === index ? 'animate' : 'initial'}
                  className="
                    container
                    space-y-4
                    text-white
                  "
                >

                  <div className="min-h-10">
                    <h2
                      className="
                        text-2xl
                        font-bold
                        md:text-2xl
                      "
                    >
                      {slide.title}
                    </h2>
                  </div>

                  <div className="min-h-6">
                    <p
                      className="
                        text-sm
                        leading-relaxed
                        md:text-base
                      "
                    >
                      {slide.description}
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link to={slide.primaryBtnLink}>
                      <button
                        className={`
                          btn
                          border-2
                          border-white
                          bg-white
                          px-4
                          text-sm
                          transition-all
                          duration-200
                          hover:scale-105
                          hover:bg-gray-200
                          ${slide.primaryBtnColor}
                        `}
                      >
                        {slide.primaryBtnText}
                      </button>
                    </Link>

                    <Link to={slide.secondaryBtnLink}>
                      <button
                        className={`
                          btn
                          border
                          border-gray-300
                          bg-transparent
                          text-sm
                          text-white
                          transition-all
                          duration-200
                          hover:scale-105
                          hover:bg-white
                          
                          ${slide.secondaryHoverColor}
                        `}
                      >
                        {slide.secondaryBtnText}
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev */}
      <button
        className="
          custom-swiper-prev
          absolute
          left-2
          top-1/2
          z-10
          hidden
          size-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-gray-200
          text-primary-600
          shadow-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-gray-300
          md:flex
        "
      >
        <span className="text-md font-bold select-none">
          ＜
        </span>
      </button>

      {/* Next */}
      <button
        className="
          custom-swiper-next
          absolute
          right-2
          top-1/2
          z-10
          hidden
          size-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-gray-200
          text-primary-600
          shadow-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-gray-300
          md:flex
        "
      >
        <span className="text-md font-bold select-none">
          ＞
        </span>
      </button>

    </section>
  )
}