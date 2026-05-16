import React, { useContext, useState } from 'react'
import { FaCheck, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import Rating from '../Rating/Rating';
import { CartContext } from '../../Context/Cart.context';
import { Link } from 'react-router';

export default function CartItem({ productInfo }) {
    const { count, price, product } = productInfo;
    const { title, category, ratingsAverage, brand, slug, imageCover, id } = product;
    const { fetchDeleteCartItem, fetchUpdateCartItem } = useContext(CartContext);
    const [updateCount, setUpdateCount] = useState(null);

    async function updateCountHandler({ id, count }) {
        setUpdateCount(true);
        await fetchUpdateCartItem({ id, count });
        setUpdateCount(false);
    }

    return (
        <>
            <div className={`relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ${updateCount && "pointer-events-none opacity-70"}`}>
                <div className="p-4 sm:p-5">
                    <div className="flex gap-4 sm:gap-6">
                        <div className="relative shrink-0 group">
                            <div className="size-28 sm:size-24 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                                <img src={imageCover} className='size-full object-contain transition-transform duration-300 group-hover:scale-110' alt={title} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ">
                                <FaCheck />
                                In Stock

                            </div>

                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="mb-3 flex items-start justify-between gap-2">
                                <div className="group/title">
                                    <Link to={`/product/${product.id}`} >
                                        <h3 className='font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base '>
                                            {title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className='inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-xs font-medium rounded-full '>
                                            {category.name}
                                        </span>
                                        <span className='text-xs text-gray-400 '>.</span>
                                        <span className='text-xs text-gray-500'>SKU: 5CA0B3</span>
                                    </div>

                                </div>
                                <div className="rating">
                                    <Rating rating={ratingsAverage} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                    <div className="text-primary-600 font-bold text-lg">
                                        {price} EGP
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Per Unit
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto flex flex-wrap items-center justify-between ">
                                <div className="flex items-center">
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                        <button
                                            onClick={() => { updateCountHandler({ id, count: count - 1 }) }}
                                            className='size-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all '>
                                            <FaMinus />
                                        </button>
                                        <span className='w-12 text-gray-900 font-bold text-center'>
                                            {count}
                                        </span>
                                        <button
                                            onClick={() => { updateCountHandler({ id, count: count + 1 }) }}
                                            className='size-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all'>
                                            <FaPlus />
                                        </button>

                                    </div>

                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p>Total</p>

                                        <div className="text-xs text-gray-400 mb-0.5 flex gap-3 items-center">
                                            <p className='text-xl font-bold text-gray-900'>{price * count}</p>
                                            <span className='text-xl font-bold text-gray-400'>EGP</span>

                                        </div>
                                    </div>
                                    <button
                                        onClick={() => fetchDeleteCartItem({ id })}
                                        className='size-10 rounded-xl border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 '>

                                        <FaTrashAlt />
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
