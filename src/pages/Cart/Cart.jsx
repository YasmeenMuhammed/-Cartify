import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaLock, FaMinus, FaPlus, FaShieldAlt, FaShoppingBag, FaShoppingCart, FaTag, FaTrash, FaTrashAlt, FaTruck } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link, NavLink } from 'react-router'
import CartItem from '../../Components/Cart/CartItem'
import { CartContext } from '../../Context/Cart.context'
import HomeLoading from './../Home/HomeLoading';
import PageMetaData from '../../Components/PageMetaData/PageMetaData';

export default function Cart() {
  const { cartInfo, isLoading, fetchDeleteCartItem, fetchDeleteAllCart } = useContext(CartContext);
  console.log(cartInfo);
  const { numOfCartItems, data } = cartInfo || {};
  const { products = [], totalCartPrice = 0 } = data || {};

  const [shippingProgress, setShippingProgress] = useState(0);

  function calculateShippingProgress() {
    if (!totalCartPrice) return 0;
    const progress = (500 - totalCartPrice) * 100;
    setShippingProgress(progress);
    return Math.min(progress, 100);

  }
  useEffect(() => {
    calculateShippingProgress();
  }, [totalCartPrice]);





  if (isLoading) {
    return <HomeLoading />
  }

  return (
    <>
      <PageMetaData title="Shoping Cart" />

      <div className="bg-gray-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 ">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-4 ">
              {/* Breadcrumb */}
              <ul className='flex'>
                <li className='flex items-center '>
                  <NavLink to={'/'} className='text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition flex gap-1 items-center justify-center'>
                    <IoMdHome className='text-xl' />
                    <span className='mt-1'>Home</span>
                  </NavLink>
                  <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                </li>
                <li className='flex items-center '>
                  <NavLink to={'/category'} className='text-gray-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition flex gap-1 items-center justify-center'>
                    <span className='mt-1'>Cart</span>
                  </NavLink>
                  <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <h1 className='md:text-3xl font-bold text-gray-900 dark:text-slate-100 items-center gap-3 flex'>
                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white size-10 md:size-12 rounded-xl flex items-center justify-center">
                  <FaShoppingCart className='text-sm md:text-lg' />
                </span>
                Shopping Cart
              </h1>
              <p className='text-gray-500 dark:text-slate-400 text-sm md:text-lg'>
                You have <span className='font-semibold text-primary-600 dark:text-primary-400'>{numOfCartItems}</span> item(s) in your cart
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">

                {products.length > 0 ? products?.map((product) => (
                  <CartItem key={product.id} productInfo={product} />
                )) : <div className='text-center py-16'>
                  <FaShoppingCart className='text-6xl text-gray-300 dark:text-slate-700 mx-auto mb-4' />
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2'>Your Cart is Empty</h2>
                </div>}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800/80 flex items-center justify-between ">
                <Link className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition font-semibold flex items-center gap-2" to={'/'}>
                  <span>←</span>
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={fetchDeleteAllCart}
                  disabled={products.length === 0}
                  className='group flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500 hover:text-red-500 transition-colors disabled:opacity-50'>
                  <FaTrash className='text-lg' />
                  <span>Clear all items</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sticky top-24 overflow-hidden shadow-md dark:shadow-none">
                <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white px-6 py-4 ">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaShoppingBag />
                    Order Summary
                  </h2>
                  <p className='text-primary-100 text-sm mt-2'>{numOfCartItems} item in your cart</p>

                </div>
                <div className="p-6 space-y-5">
                  {totalCartPrice < 500 ? (
                    <div className="bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaTruck className="text-orange-600 dark:text-orange-400" />
                        <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">Add {`${Math.min(500 - totalCartPrice?.toFixed(0))}`} EGP for free shipping</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-linear-to-r from-violet-50 to-amber-50 dark:from-violet-950/20 dark:to-amber-950/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaTruck className="text-violet-600 dark:text-violet-400" />
                        <div className="text-sm font-semibold text-violet-600 dark:text-violet-400">You Unlocked Free Shipping!</div>
                      </div>
                    </div>
                  )}
                  {
                    totalCartPrice < 500 && (
                      <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${shippingProgress}%` }}></div>
                      </div>
                    )
                  }

                </div>


                <div className="p-4 space-y-3">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600 dark:text-slate-400 mt-4">
                      <span>SubTotal:</span>
                      <span className='font-medium text-gray-900 dark:text-slate-100'>EGP {totalCartPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-slate-400">
                      <span>Shipping:</span>
                      <span className='font-medium text-gray-900 dark:text-slate-100'>EGP 50</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 dark:border-slate-800 pt-3 mt-3 ">
                      <div className="flex justify-between items-baseline">
                        <span className='text-gray-900 dark:text-slate-100 font-semibold'>Total:</span>
                        <span className='font-bold text-lg dark:text-slate-100'>EGP {(totalCartPrice + 50).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-400 hover:border-primary-400 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-950/10 transition-all">
                    <FaTag />
                    <span className='text-sm font-medium'>Apply Promo Code</span>
                  </button>

                  <Link to="/checkout" className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]">
                    <FaLock />
                    <span>Secure Checkout</span>
                  </Link>
                  <div className='flex items-center justify-center gap-4 py-2'>
                    <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-450' >
                      <FaShieldAlt className='text-primary-500' />
                      <span>Secure Payment</span>
                    </div>
                    <div className='w-px h-4 bg-gray-200 dark:bg-slate-800'></div>
                    <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-450' >
                      <FaTruck className='text-blue-500' />
                      <span>Fast Delivery</span>
                    </div>

                  </div>
                  <div className="flex justify-center">
                    <Link className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition font-semibold flex items-center gap-2" to={'/'}>
                      <span>←</span>
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>



      </div>

    </>
  );
}
