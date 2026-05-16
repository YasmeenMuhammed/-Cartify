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
            <div className="card relative h-100 cursor-pointer border border-gray-100 shadow-md hover:shadow-x mt-6 overflow-hidden hover:-translate-y-3 rounded-2xl transition-all duration-300 bg-white-200">
                <Link to={`/product/${id}`} className='block'>
                    <img src={imageCover} alt="" className='w-full h-60 object-contain' />

                </Link>
                <div className="content p-6 gap-1 flex flex-col">
                    <span className='text-sm text-gray-500'>{category.name}</span>
                    <p>
                        <Link to={`product/${id}`} className='line-clamp-1' >
                            {title}
                        </Link>
                    </p>
                    <div className="rating flex gap-1">
                        <Rating rating={ratingsAverage} />
                        <span>{ratingsAverage}</span>
                        <span>({ratingsQuantity})</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="price">
                            <span className='font-extrabold text-primary-500 text-lg me-1'>{priceAfterDiscount ? priceAfterDiscount : price} EGP</span>
                            {priceAfterDiscount && <del className='text-gray-500 text-lg'>{price} EGP</del>}
                        </div>
                        <button

                            disabled={loadingProductId === id}
                            className='bg-green-500 rounded-full size-8 text-white flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed' onClick={() => fetchAddProductToCart({ id })} >
                            {loadingProductId === id ? (
                                <FaSpinner className='animate-spin' />
                            ) : (
                                <FaPlus />
                            )}
                        </button>
                    </div>

                </div>
                <div className="side-icons space-y-1 absolute right-4 top-4 z-50">
                    <div
                        onClick={() => fetchAddProductToWishList({ id })}
                        className="icon size-7 rounded-full border border-gray-200 shadow-md text-gray-600 flex items-center justify-center ">
                        <FaRegHeart className='hover:text-red-500' />
                    </div>
                    <div className="icon size-7 rounded-full border border-gray-200 shadow-md text-gray-600 flex items-center justify-center ">
                        <FiRefreshCcw className='hover:text-primary-500 text-sm' />
                    </div>
                    <div className="icon size-7 rounded-full border border-gray-200 shadow-md text-gray-600 flex items-center justify-center ">
                        <Link to={`product/${id}`}>
                            <MdOutlineRemoveRedEye className='hover:text-primary-500' />
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
