import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import homeSliderImg from '../../assets/Images/home-slider-1.png'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'

const SlideUp = (delay = 0) => ({
    initial: { y: 70, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1.5, delay },
});

export default function HomeSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative group w-full"> {/* container أب عشان نحدد مكان الزراير */}

            <Swiper
                slidesPerView={1}
                loop={true}
                modules={[Navigation, Pagination]}
                /* ربطنا الـ Swiper بالزراير المخصصة بتاعتك هنا 👇 */
                navigation={{
                    nextEl: '.custom-swiper-next',
                    prevEl: '.custom-swiper-prev',
                }}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div style={{
                        backgroundImage: `url('${homeSliderImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} >
                        <div className="overlay py-28 bg-linear-to-r from-primary-600/95 to-primary-600/40 md:px-25 px-10">
                            <motion.div
                                variants={SlideUp(0.8)}
                                initial="initial"
                                animate={activeIndex === 0 ? "animate" : "initial"}
                                className="container space-y-4 text-white"
                            >
                                <h2 className='text-2xl font-bold'>
                                    Fresh Products Delivered <br /> to your Door
                                </h2>
                                <p>Get 20% off of your first order</p>
                                <div className='space-x-3'>
                                    <button className='btn bg-white hover:scale-105 transition-all duration-200 border-2 border-white text-primary-500 hover:bg-gray-200 px-4'>
                                        Shop Now
                                    </button>
                                    <button className='btn hover:scale-105 bg-transparent transition-all duration-200 border border-gray-300 text-white hover:bg-white hover:text-primary-500'>
                                        View Deals
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div style={{
                        backgroundImage: `url('${homeSliderImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} >
                        <div className="overlay py-28 bg-linear-to-r from-primary-600/95 to-primary-600/40 md:px-25 px-10">
                            <motion.div
                                variants={SlideUp(0.6)}
                                initial="initial"
                                animate={activeIndex === 1 ? "animate" : "initial"}
                                className="container space-y-4 text-white"
                            >
                                <h2 className='text-2xl font-bold'>
                                    Fast and Free Delivery <br /> All over Egypt
                                </h2>
                                <p>Same Day delivery available</p>
                                <div className='space-x-3'>
                                    <button className='btn bg-white hover:scale-105 transition-all duration-200 border-2 border-white text-violet-500 hover:bg-gray-200 px-4'>
                                        Order Now
                                    </button>
                                    <button className='btn hover:scale-105 bg-transparent transition-all duration-200 border border-gray-300 text-white hover:bg-white hover:text-violet-500'>
                                        Delivery Info
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div style={{
                        backgroundImage: `url('${homeSliderImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} >
                        <div className="overlay py-28 bg-linear-to-r from-primary-600/95 to-primary-600/40 md:px-25 px-10">
                            <motion.div
                                variants={SlideUp(0.6)}
                                initial="initial"
                                animate={activeIndex === 2 ? "animate" : "initial"}
                                className="container space-y-4 text-white">
                                <h2 className='text-2xl font-bold'>
                                    Premium Quality Guranteed <br /> Fresh from Factory to you
                                </h2>
                                <p>Get 20% off of your first order</p>
                                <div className='space-x-3'>
                                    <button className='btn bg-white hover:scale-105 transition-all duration-200 border-2 border-white text-blue-500 hover:bg-gray-200 px-4'>
                                        Shop Now
                                    </button>
                                    <button className='btn hover:scale-105 bg-transparent transition-all duration-200 border border-gray-300 text-white hover:bg-white hover:text-blue-500'>
                                        View Deals
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <button className="custom-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 size-12 bg-gray-200 hover:bg-gray-300 text-primary-600 hover:text-primary-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md cursor-pointer">
                <span className="text-md font-bold select-none">＜</span>
            </button>

            <button className="custom-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 size-12 bg-gray-200 hover:bg-gray-300 text-primary-600 hover:text-primary-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md cursor-pointer">
                <span className="text-md font-bold select-none">＞</span>
            </button>

        </div>
    )
}