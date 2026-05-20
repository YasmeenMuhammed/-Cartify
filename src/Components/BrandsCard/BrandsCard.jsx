import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router'
import { ProductContext } from '../../Context/Products.context';

export default function BrandsCard({ brand }) {
    const { products } = useContext(ProductContext)
    console.log(products);

    const { name, image, _id } = brand;

    return (
        <div>
            <Link to={`/products?brand=${_id}`}
                className=
                "group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl dark:shadow-none hover:border-violet-200 dark:hover:border-violet-800/80 transition-all duration-300 hover:-translate-y-1 flex flex-col"

            >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-850 mb-3 p-4 flex items-center justify-center">
                    <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />

                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-center text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                    {name}
                </h3>
                <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1">
                        View Products <FaArrowRight />
                    </span>
                </div>

            </Link>
        </div>
    )
}
