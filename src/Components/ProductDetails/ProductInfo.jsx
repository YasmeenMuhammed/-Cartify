import React, { useContext, useState } from 'react'
import { IoIosCart, IoMdHome, IoMdRefresh } from 'react-icons/io'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link, NavLink } from 'react-router'
import Rating from '../Rating/Rating'
import { FaBolt, FaMinus, FaPlus, FaShieldAlt } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { FaShareNodes, FaTruckFast } from 'react-icons/fa6'
import { calcDiscount } from '../../utils/discount-deals'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/image-gallery.css";
import { CartContext } from '../../Context/Cart.context'
import { CgSpinner } from 'react-icons/cg'

export default function ProductInfo({ productDetails, count }) {

    const { price, title, description, category, brand, reviews, quantity, priceAfterDiscount, imageCover, ratingsQuantity, ratingsAverage
        , images, _id } = productDetails;
    console.log(productDetails);
    


    const productCount = count || 1;


    const { fetchAddProductToCart, fetchUpdateCartItem, cartInfo, loadingProductId } = useContext(CartContext);

    const [updateCount, setUpdateCount] = useState(null);

    async function updateCountHandler({ id, count }) {
        try {

            if (count < 1) return;
            if (productCount === 1 && !cartInfo?.data?.products?.some(
                (item) => item.product._id === id
            )) {

                await fetchAddProductToCart({ id });

                return;
            }


            setUpdateCount(true);
            await fetchUpdateCartItem({
                id,
                count
            });

        } catch (error) {

            console.log(error);

        } finally {

            setUpdateCount(false);
        }
    }

    return <section className='mt-5'>
        <nav className='BreadCrumb'>
            <div className="container mx-auto px-4">
                <ul className='flex items-center flex-wrap gap-1 text-sm'>
                    <li className='flex items-center '>
                        <NavLink to={'/'} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                            <IoMdHome className='text-xl' />
                            <span className='mt-1'>Home</span>
                        </NavLink>
                        <MdOutlineKeyboardArrowRight className='text-xl mt-1' />

                    </li>
                    <li className='flex items-center '>
                        <NavLink to={`/products?category[in]=${category._id}`} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                            <span className='mt-1'>{category.name}</span>
                        </NavLink>
                        <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                    </li>

                    <li className='flex items-center '>
                        <NavLink to={`/products?brand[in]=${brand._id}`} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                            <span className='mt-1'>{brand.name}</span>
                        </NavLink>
                        <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                    </li>
                    <li className='flex items-center text-gray-500 transition gap-1 justify-center '>
                        <span className='mt-1  dark:text-slate-200'>{title}</span>
                    </li>
                </ul>

            </div>

        </nav>
        <div className={`product-details py-6 dark:text-slate-200 ${updateCount ? 'pointer-events-none opacity-70' : ''}`}>
            <div className="container mx-auto px-4 ">
                <div className="flex flex-col lg:flex-row gap-8 ">
                    <div className="product-images lg:w-1/4">
                        <ImageGallery
                            showNav={false}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            items={images.map((image) => {
                                return {
                                    original: image,
                                    thumbnail: image
                                }
                            })} />
                    </div>
                    <div className="product-info lg:w-3/4 ">
                        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-slate-900">
                            <div className="flex flex-wrap gap-2 mb-4 ">
                                <Link to={`/products?category[in]=${category._id}`} className='bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition'>
                                    {category.name}
                                </Link>
                                <Link to={`/products?brand[in]=${brand._id}`} className='bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full'>
                                   {brand.name}
                                </Link>

                            </div>
                            <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3  dark:text-slate-200'>{title}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <Rating rating={ratingsAverage} />
                                <span className='text-sm text-gray-600'>
                                    Rating({ratingsQuantity})
                                </span>
                                <span className='text-sm text-gray-600'>
                                    ({reviews.length} Reviews)
                                </span>
                            </div>
                            <div className='flex items-center flex-wrap gap-3 mb-6 dark:text-slate-200'>
                                {priceAfterDiscount ? <>
                                    <span className='text-2xl font-bold text-gray-900 dark:text-slate-200 '>
                                        {priceAfterDiscount} EGP
                                    </span>

                                    <span className='text-lg text-gray-400 line-through dark:text-slate-200'>
                                        {price}
                                    </span>

                                    <span className='bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium'>
                                        Save {calcDiscount({ price, priceAfterDiscount })}%
                                    </span>
                                </> : <>
                                    <span className='text-2xl font-bold text-gray-900  dark:text-slate-200'>
                                        {price} EGP
                                    </span>

                                </>}

                                <div className="flex">
                                    {quantity > 0 ? <span className='flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-violet-50 text-violet-700'>
                                        <span className='w-2 h-2 rounded-full bg-violet-500'></span>
                                        In Stock
                                    </span> : <span className='flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700'>
                                        <span className='w-2 h-2 rounded-full bg-red-500'></span>
                                        Out of Stock
                                    </span>
                                    }
                                </div>

                            </div>
                            <div className="border-t border-gray-100 pt-5 mb-6">
                                <p className='text-gray-600 leading-relaxed'>
                                    {description}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl p-1 border border-gray-200 dark:border-slate-70 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => updateCountHandler({
                                            id: _id,
                                            count: productCount - 1
                                        })}
                                        disabled={productCount <= 1}
                                        className="size-9 rounded-lg bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-gray-500 dark:text-slate-350 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                    >
                                        <FaMinus />
                                    </button>

                                    <span className="w-12 text-gray-900 dark:text-slate-100 font-bold text-center">
                                        {productCount}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => updateCountHandler({
                                            id: _id,
                                            count: productCount + 1
                                        })}
                                        className="size-9 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        <FaPlus />
                                    </button>

                                </div>
                                <div className="mb-7 ms-4">
                                    <span className='text-sm text-gray-500 dark:text-slate-400'>{quantity} available</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6  dark:text-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className='text-gray-600'>Total Price:</span>
                                    <span className='text-2xl font-bold text-primary-600'>{priceAfterDiscount ? priceAfterDiscount : price} EGP</span>

                                </div>

                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <button onClick={() => { fetchAddProductToCart({ id }) }} className='flex-1 bg-primary-600  shadow-primary-600/50 shadow-lg gap-2 hover:bg-primary-700 active:scale-[0.98] font-medium rounded-xl px-6 py-3.5 text-white transition-all flex items-center justify-center' id='addToCart'>
                                    {loadingProductId ? <>
                                        <span className='text-white'>Adding</span>
                                        <CgSpinner />
                                    </> : <>
                                        <IoIosCart className='text-2xl' />
                                        <span className='text-white'>Add to Cart</span>
                                    </>}
                                </button>
                                <button className='flex-1 bg-gray-900  shadow-gray-600/50 shadow-lg gap-2 hover:bg-gray-800 active:scale-[0.98] font-medium rounded-xl px-6 py-3.5 text-white transition-all flex items-center justify-center  ' id='Buy Now'>
                                    <FaBolt className='text-2xl' />
                                    Buy Now
                                </button>


                            </div>
                            <div className="flex gap-3 mb-6 ">
                                <button id='wishlistBtn' className='flex-1 border-2 py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-colors duration-200'>
                                    <CiHeart className='text-xl' />
                                    Add To Wishlist
                                </button>
                                <button className='border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-200 hover:border-primary-300 hover:text-primary-600 '>
                                    <FaShareNodes className='text-xl' />
                                </button>

                            </div>
                            <ul className='*:flex *:flex-1 *:items-center  gap-4 *:text-sm *:gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                                <li>
                                    <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600">
                                        <IoMdRefresh className='text-xl' />

                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>
                                            30 Days Return
                                        </h3>
                                        <p className='text-sm'>Money back</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600 text-xl">
                                        <FaTruckFast />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>
                                            Free Delivery

                                        </h3>
                                        <p className='text-sm'>Orders over $50</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="icon size-10 rounded-full flex items-center justify-center bg-primary-300 text-primary-600">
                                        <FaShieldAlt />

                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>
                                            Secure Payment
                                        </h3>
                                        <p className='text-sm'>100% Protected</p>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
}
