import React from 'react'
import { FaCcVisa, FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa'
import miniLogo from '../assets/Images/mini-logo.png'
import { MdEmail } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className='bg-[#101828] py-15'>
      <div className="container">
        <div className="footer-1 py-4">
          <div className="grid lg:grid-cols-6">
            <div className="md:col-span-2 p-4">
              <div className="flex flex-col space-y-5">
                <div className="logo flex items-center gap-2 cursor-pointer">
                  <img src={miniLogo} alt="" className='w-10' />
                  <h2 className='text-2xl font-bold text-gray-400'>Cartify</h2>

                </div>
                <p className='text-gray-500'>
                  FreshCart is your one-stop destination for quality products. From fashion to electronics,
                  we bring you the best brands at competitive prices with a seamless shopping experience.
                </p>
                <div className="contact">
                  <ul className='*:flex *:gap-2 *:items-center space-y-3'>
                    <li className='cursor-pointer text-gray-400 hover:text-primary-500 transition-colors duration-200 font-medium' >
                      <FaPhoneAlt className='text-primary-500 text-xl' />
                      +1 (800) 123-4567
                    </li>
                    <li className='cursor-pointer text-gray-400 hover:text-primary-500 transition-colors duration-200 font-medium'>
                      <MdEmail className='text-primary-500 text-xl' />
                      support@cartify.com
                    </li>
                    <li className=' text-gray-400  font-medium' >
                      <FaLocationDot className='text-primary-500 text-xl' />
                      123 Commerce Street, New York, NY 10001
                    </li>
                  </ul>
                </div>
                <div className="icons flex gap-2">
                  <a className=" flex items-center justify-center icon bg-gray-800 text-gray-400  hover:text-white hover:bg-primary-500 transition-colors duration-200  w-10 h-10 rounded-full p-5 ">
                    <div>
                      <FaFacebook className=' text-xl' />
                    </div>
                  </a>
                  <a className=" flex items-center justify-center icon bg-gray-800 text-gray-400  hover:text-white hover:bg-primary-500 transition-colors duration-200  w-10 h-10 rounded-full p-5 ">
                    <div>
                      <FaTwitter className=' text-xl' />
                    </div>
                  </a>
                  <a className=" flex items-center justify-center icon bg-gray-800 text-gray-400  hover:text-white hover:bg-primary-500 transition-colors duration-200  w-10 h-10 rounded-full p-5 ">
                    <div>
                      <FaInstagram className=' text-xl' />
                    </div>
                  </a>
                  <a className=" flex items-center justify-center icon bg-gray-800 text-gray-400  hover:text-white hover:bg-primary-500 transition-colors duration-200  w-10 h-10 rounded-full p-5 ">
                    <div>
                      <FaYoutube className=' text-xl' />
                    </div>
                  </a>
                </div>
              </div>


            </div>
            <div className='md:col-span-1 p-4'>
              <h1 className='text-white text-lg font-semibold pb-5'>Shop</h1>
              <ul className='space-y-3'>
                <li>
                  <Link to={'/products'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>All Products</Link>
                </li>
                <li>
                  <Link to={'/categories'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Categories</Link>
                </li>
                <li>
                  <Link to={'/brands'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Brands</Link>
                </li>
                <li>
                  <Link to={'/products?category[in]=6439d2d167d9aa4ca970649f'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Electronics</Link>
                </li>
                <li>
                  <Link to={'/products?category[in]=6439d5b90049ad0b52b90048'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Men's Fashion</Link>
                </li>
                <li>
                  <Link to={'/products?category[in]=6439d58a0049ad0b52b9003f'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Women's Fashion</Link>
                </li>

              </ul>

            </div>
            <div className='md:col-span-1 p-4'>
              <h1 className='text-white text-lg font-semibold pb-5'>Account</h1>
              <ul className='space-y-3'>
                <li>
                  <Link to={'/account'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>My Account</Link>
                </li>
                <li>
                  <Link to={'/orders'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Order History</Link>
                </li>
                <li>
                  <Link to={'/wishlist'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Wishlist</Link>
                </li>
                <li>
                  <Link to={'/cart'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Shopping Cart</Link>
                </li>
                <li>
                  <Link to={'/login'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Sign In</Link>
                </li>
                <li>
                  <Link to={'/signup'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Create Account</Link>
                </li>

              </ul>

            </div>
            <div className='md:col-span-1 p-4'>
              <h1 className='text-white text-lg font-semibold pb-5'>Support</h1>
              <ul className='space-y-3'>
                <li>
                  <Link to={'/contact'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Contact Us</Link>
                </li>
                <li>
                  <Link to={'/contact'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Help Center</Link>
                </li>
                <li>
                  <Link to={'/contact'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Shipping Info</Link>
                </li>
                <li>
                  <Link to={'/contact'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Returns & Refunds</Link>
                </li>
                <li>
                  <Link to={'/orders'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Track Order</Link>
                </li>


              </ul>

            </div>
            <div className='md:col-span-1 p-4'>
              <h1 className='text-white text-lg font-semibold pb-5'>Legal</h1>
              <ul className='space-y-3'>
                <li>
                  <Link to={'/privacy'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={'/privacy'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Terms of Service</Link>
                </li>
                <li>
                  <Link to={'/privacy'} className='text-gray-400 hover:text-primary-400 transition-colors text-sm'>Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-2 text-gray-500 flex justify-between border-t border-gray-300 py-3">
          <p>
            &copy;{new Date().getFullYear()} Cartify. All rights reserved.
          </p>
          <div className="icons flex items-center gap-4">
            <div className="icon flex items-center gap-2">
              <FaCcVisa />
              <span>Visa</span>
            </div>
            <div className="icon flex items-center gap-2">
              <FaCcVisa />
              <span>Mastercard</span>
            </div>

            <div className="icon flex items-center gap-2">
              <FaCcVisa />
              <span>PayPal</span>
            </div>



          </div>
        </div>
      </div>

    </footer>
  )
}
