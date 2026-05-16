import React, { useContext, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link, NavLink } from 'react-router'
import { CartContext } from '../../Context/Cart.context'
import HomeLoading from '../Home/HomeLoading'
import PageMetaData from '../../Components/PageMetaData/PageMetaData'
import WishListItem from '../../Components/WishList/WishListItem'

export default function WishList() {
  const { fetchWishListItems, wishlist, isLoading } = useContext(CartContext);
  
  const products = wishlist?.data || [];

  useEffect(() => {
    fetchWishListItems()
  }, [])

  if (isLoading) {
    return <HomeLoading />
  }

  return (
    <>
      <PageMetaData title="Wishlist" />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 ">
              {/* Breadcrumb */}
              <ul className='flex'>
                <li className='flex items-center '>
                  <NavLink to={'/'} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                    <IoMdHome className='text-xl' />
                    <span className='mt-1'>Home</span>
                  </NavLink>
                  <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                </li>
                <li className='flex items-center '>
                  <NavLink to={'/wishlist'} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                    <span className='mt-1'>Wishlist</span>
                  </NavLink>
                  <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <h1 className='text-3xl font-bold text-gray-900 items-center gap-3 flex'>
                <span className="bg-linear-to-r from-red-500 to-red-600 text-white size-12 rounded-xl flex items-center justify-center">
                  <FaHeart />
                </span>
                My Wishlist
              </h1>
              <p className='text-gray-500'>
                You have <span className='font-semibold text-primary-600'>{products.length}</span> item(s) in your wishlist
              </p>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {products.length > 0 ? products?.map((product) => (
                <WishListItem key={product.id || product._id} productInfo={product} />
              )) : <div className='text-center py-16 bg-white rounded-2xl border border-gray-100'>
                <FaHeart className='text-6xl text-gray-300 mx-auto mb-4' />
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your Wishlist is Empty</h2>
                <p className='text-gray-500 mb-6'>Explore more and shortlist some items.</p>
                <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold">
                  Start Shopping
                </Link>
              </div>}
            </div>
            
            {products.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between ">
                <Link className="text-primary-600 hover:text-primary-700 transition font-semibold flex items-center gap-2" to={'/'}>
                  <span>←</span>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
