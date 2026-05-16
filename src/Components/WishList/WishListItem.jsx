import React, { useContext, useState } from 'react'
import { FaCheck, FaShoppingCart, FaTrashAlt } from 'react-icons/fa'
import Rating from '../Rating/Rating';
import { CartContext } from '../../Context/Cart.context';
import { Link } from 'react-router';

export default function WishListItem({ productInfo }) {
    const { title, category, ratingsAverage, price, imageCover, id } = productInfo;
    const { fetchDeleteProductFromWishList, fetchAddProductToCart } = useContext(CartContext);
    const [isRemoving, setIsRemoving] = useState(false);

    async function handleRemove() {
        setIsRemoving(true);
        await fetchDeleteProductFromWishList({ id });
        setIsRemoving(false);
    }

    return (
        <>
            <div className={`relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ${isRemoving && "pointer-events-none opacity-70"}`}>
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
                                    <Link to={`/product/${id}`} >
                                        <h3 className='font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base '>
                                            {title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className='inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-xs font-medium rounded-full '>
                                            {category?.name || "Product"}
                                        </span>
                                    </div>
                                </div>
                                <div className="rating">
                                    <Rating rating={ratingsAverage || 0} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                    <div className="text-primary-600 font-bold text-lg">
                                        {price} EGP
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto flex flex-wrap items-center justify-between ">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => fetchAddProductToCart({ id })}
                                        className='flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-sm'
                                    >
                                        <FaShoppingCart />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleRemove}
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
