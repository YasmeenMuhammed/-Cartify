import React from 'react'
import { FaCheck, FaShieldAlt, FaTruck } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'

export default function ProductShipping() {
  return (
    <div className='space-y-6'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-primary-50 to-primary-200 rounded-lg p-6 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
              <FaTruck className='text-xl' />
            </div>
            <h4 className='font-semibold text-gray-900'>Shipping Information</h4>
          </div>
          <ul className='space-y-3'>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Free shipping on orders over $50</span>

            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Standard delivery: 3-5 business days</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Express delivery available (1-2 business days)</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Track your order in real-time</span>
            </li>
          </ul>

        </div>
        <div className="bg-linear-to-br from-violet-50 to-violet-200 rounded-lg p-6 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
              <FaArrowRotateLeft className='text-xl' />
            </div>
            <h4 className='font-semibold text-gray-900'>Returns & Refunds</h4>
          </div>
          <ul className='space-y-3'>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>30-day hassle-free returns</span>

            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Full refund or exchange available</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Free return shipping on defective items</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-gray-700'>
              <FaCheck className='text-violet-600 text-lg' />
              <span>Easy online return process</span>
            </li>
          </ul>

        </div>

      </div>
      <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
        <div className="size-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
          <FaShieldAlt className='text-xl' />
        </div>
        <div>
          <h4 className='font-semibold text-gray-900 mb-1'>
            Buyer Protection Guarantee
          </h4>
          <p className='text-sm text-gray-600'>Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
        </div>
      </div>

    </div>
  )
}
