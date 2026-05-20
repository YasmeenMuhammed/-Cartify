import React, { useContext } from 'react'
import { FaPlus, FaRegHeart, FaRegStar, FaSpinner, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { FiRefreshCcw } from 'react-icons/fi'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { calcDiscount } from '../utils/discount-deals';
import Rating from './Rating/Rating';
import { Link } from 'react-router';
import { CartContext } from '../Context/Cart.context';

export default function ProductCard({ productInfo }) {
    const { id, category, imageCover, price, priceAfterDiscount, ratingsAverage, ratingsQuantity, title } = productInfo;

    const { fetchAddProductToCart, loadingProductId, fetchAddProductToWishList } = useContext(CartContext);

    return (
        <div>
            <div className="card relative h-100 cursor-pointer border border-gray-100 dark:border-slate-800/80 shadow-md hover:shadow-lg mt-6 overflow-hidden hover:-translate-y-3 rounded-2xl transition-all duration-300 bg-white dark:bg-slate-900/60 hover:dark:bg-slate-900">
                <Link to={`/product/${id}`} className='block'>
                    <img src={imageCover} alt="" className='w-full h-60 object-contain p-2' />

                </Link>
                <div className="content p-6 gap-1 flex flex-col">
                    <span className='text-sm text-gray-500 dark:text-slate-400'>{category.name}</span>
                    <p>
                        <Link to={`/product/${id}`} className='line-clamp-1 text-slate-800 dark:text-slate-100 hover:text-primary-500 dark:hover:text-primary-400 font-semibold' >
                            {title}
                        </Link>
                    </p>
                    <div className="rating flex gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <Rating rating={ratingsAverage} />
                        <span>{ratingsAverage}</span>
                        <span>({ratingsQuantity})</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="price">
                            <span className='font-extrabold text-primary-500 text-lg me-1'>{priceAfterDiscount ? priceAfterDiscount : price} EGP</span>
                            {priceAfterDiscount && <del className='text-gray-500 dark:text-slate-400 text-lg'>{price} EGP</del>}
                        </div>
                        <button

                            disabled={loadingProductId === id}
                            className='bg-violet-500 rounded-full size-8 text-white flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed hover:bg-violet-600 transition-colors duration-200' onClick={() => fetchAddProductToCart({ id })} >
                            {loadingProductId === id ? (
                                <FaSpinner className='animate-spin' />
                            ) : (
                                <FaPlus />
                            )}
                        </button>
                    </div>

                </div>
                <div className="side-icons space-y-1.5 absolute right-4 top-4 z-50">
                    <div
                        onClick={() => fetchAddProductToWishList({ id })}
                        className="icon size-8 rounded-full border border-violet-100 dark:border-slate-700 bg-violet-50/80 dark:bg-slate-850 shadow-md text-violet-600 dark:text-violet-450 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200">
                        <FaRegHeart />
                    </div>
                    <div className="icon size-8 rounded-full border border-violet-100 dark:border-slate-700 bg-violet-50/80 dark:bg-slate-850 shadow-md text-violet-600 dark:text-violet-450 flex items-center justify-center hover:bg-violet-600 hover:text-white hover:border-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-200">
                        <FiRefreshCcw className='text-sm' />
                    </div>
                    <div className="icon size-8 rounded-full border border-violet-100 dark:border-slate-700 bg-violet-50/80 dark:bg-slate-850 shadow-md text-violet-600 dark:text-violet-450 flex items-center justify-center hover:bg-violet-600 hover:text-white hover:border-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-200">
                        <Link to={`/product/${id}`} className="flex items-center justify-center w-full h-full text-violet-600 dark:text-violet-450 hover:text-white dark:hover:text-white transition-colors duration-200">
                            <MdOutlineRemoveRedEye />
                        </Link>
                    </div>
                </div>
                {priceAfterDiscount && <span className='w-15 h-5 bg-red-500 text-white rounded-2xl flex items-center justify-center text-md absolute top-4 left-2 z-10'>
                    -{calcDiscount({ price, priceAfterDiscount })} %
                </span>}
            </div>

        </div>
    )
}
