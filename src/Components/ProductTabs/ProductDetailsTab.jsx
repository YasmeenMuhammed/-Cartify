import React from 'react'

export default function ProductDetailsTab({ productDetails }) {

  const { description, sold, brand, category, subcategory } = productDetails;

  return (
    <div className="font-sans py-2">
      <h2 className='font-bold text-xl'>About this Product</h2>
      <p className="text-md text-gray-700 mb-5">
        {description}
      </p>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Product Information */}
        <div className="bg-gray-50/50 shadow-sm rounded-xl p-5">
          <p className="text-md font-medium text-gray-800 mb-4">Product information</p>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="text-gray-500 font-semibold py-2">Category</td>
                <td className="text-right font-medium text-gray-800 py-2">{category.name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="text-gray-500 font-semibold py-2">Subcategory</td>
                <td className="text-right font-medium text-gray-800 py-2">{subcategory[0].name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="text-gray-500 font-semibold py-2">Brand</td>
                <td className="text-right font-medium text-gray-800 py-2">{brand.name}</td>
              </tr>
              <tr>
                <td className="text-gray-500 font-semibold py-2">Items Sold</td>
                <td className="text-right font-medium text-gray-800 py-2">{sold} sold</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50/50 shadow-sm rounded-xl p-5">
          <p className="text-md font-medium text-gray-800 mb-4">Key features</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-md text-gray-800">
              Premium Quality Product
            </li>
            <li className="flex items-center gap-2 text-md text-gray-800">
              100% Authentic Guarantee
            </li>
            <li className="flex items-center gap-2 text-md text-gray-800">
              Fast &amp; Secure Packaging
            </li>
            <li className="flex items-center gap-2 text-md text-gray-800">
              Quality Tested
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}