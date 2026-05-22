import React from 'react'

export default function ProductDetailsTab({ productDetails }) {

  const { description, sold, brand, category, subcategory } = productDetails;

  return (
<div className="font-sans py-2 dark:text-slate-200">

  {/* Title */}
  <h2 className='font-bold text-2xl text-gray-900 mb-3 dark:text-white'>
    About this Product
  </h2>

  {/* Description */}
  <p className="text-md leading-relaxed text-gray-600 mb-6 dark:text-slate-300">
    {description}
  </p>

  <div className="grid md:grid-cols-2 gap-5">

    {/* Product Information */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      <div className="flex items-center justify-between mb-5">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Information
        </p>

        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
          {sold} Sold
        </span>
      </div>

      <table className="w-full text-sm">
        <tbody>

          <tr className="border-b border-gray-200 dark:border-slate-700">
            <td className="py-3 font-medium text-gray-500 dark:text-slate-400">
              Category
            </td>

            <td className="py-3 text-right font-semibold text-gray-800 dark:text-slate-200">
              {category.name}
            </td>
          </tr>

          <tr className="border-b border-gray-200 dark:border-slate-700">
            <td className="py-3 font-medium text-gray-500 dark:text-slate-400">
              Subcategory
            </td>

            <td className="py-3 text-right font-semibold text-gray-800 dark:text-slate-200">
              {subcategory[0].name}
            </td>
          </tr>

          <tr className="border-b border-gray-200 dark:border-slate-700">
            <td className="py-3 font-medium text-gray-500 dark:text-slate-400">
              Brand
            </td>

            <td className="py-3 text-right font-semibold text-gray-800 dark:text-slate-200">
              {brand.name}
            </td>
          </tr>

          <tr>
            <td className="py-3 font-medium text-gray-500 dark:text-slate-400">
              Items Sold
            </td>

            <td className="py-3 text-right font-semibold text-primary-600 dark:text-primary-300">
              {sold} sold
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    {/* Key Features */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      <p className="text-lg font-semibold text-gray-900 mb-5 dark:text-white">
        Key Features
      </p>

      <ul className="flex flex-col gap-4">

        <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-800/70">
          <span className="size-2 rounded-full bg-primary-600"></span>

          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
            Premium Quality Product
          </span>
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-800/70">
          <span className="size-2 rounded-full bg-primary-600"></span>

          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
            100% Authentic Guarantee
          </span>
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-800/70">
          <span className="size-2 rounded-full bg-primary-600"></span>

          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
            Fast & Secure Packaging
          </span>
        </li>

        <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-800/70">
          <span className="size-2 rounded-full bg-primary-600"></span>

          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
            Quality Tested
          </span>
        </li>

      </ul>
    </div>

  </div>

  {/* Buyer Protection */}
  <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/70 p-5 shadow-sm dark:border-primary-500/20 dark:bg-primary-500/10">

    <h3 className="mb-2 text-lg font-semibold text-primary-700 dark:text-primary-300">
      Buyer Protection Guarantee
    </h3>

    <p className="leading-relaxed text-primary-700/90 dark:text-primary-200">
      Get a full refund if your order doesn't arrive or isn't as described.
      We ensure your shopping experience is safe and secure.
    </p>

  </div>

</div>
  )
}