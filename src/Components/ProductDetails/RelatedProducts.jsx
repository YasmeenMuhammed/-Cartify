import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../services/products-services';
import HomeLoading from './../../pages/Home/HomeLoading';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductCard from '../ProductCard';
import { Navigation } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation'

export default function RelatedProducts({ productDetails }) {
    const { category } = productDetails;

    console.log(category._id);



    const [relatedProducts, setRelatedProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    async function fetchRelatedProducts() {
        try {
            const response = await getAllProducts({ category: category._id });
            if (response.success) {
                setIsLoading(true)
                setRelatedProducts(response.data.data);
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false);
            setIsError(true)
        }

    }

    useEffect(() => {
        fetchRelatedProducts();
    }, [])

    if (isLoading) return <HomeLoading />


    return (
        <>
            <section id='related-products' className='py-10'>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">You May aslo Like</h2>
                        <div className="flex space-x-2">
                            <div className="size-10 prev-btn rounded-full cursor-pointer bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                                <FaArrowLeft />
                            </div>
                            <div className="size-10 next-btn rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer">
                                <FaArrowRight />
                            </div>

                        </div>

                    </div>
                    <Swiper
                        spaceBetween={10}
                        loop={true}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".next-btn",
                            prevEl: ".prev-btn",
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 12,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 14,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 18,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {relatedProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="py-8">
                                    <ProductCard productInfo={product} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </section>
        </>
    )
}
