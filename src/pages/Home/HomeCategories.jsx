import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router'
import { getAllCategories } from '../../services/category-services';
import HomeLoading from './HomeLoading';
import { CategoriesContext } from '../../Context/Categories.context';

export default function HomeCategories() {
    const { categories, isLoading, error, isError } = useContext(CategoriesContext)

    if (isLoading) {
        return <HomeLoading />
    }

    return (
        <section>
            <div className="container p-4 md:px-6">
                <div className="flex justify-between items-center py-8">
                    <div className="title flex gap-3 items-center">
                        <div className='h-8 w-1.5 bg-linear-to-b from-violet-500 to-violet-700 rounded-full'></div>
                        <h2>
                            <Link className='font-bold text-4xl md:text-2xl text-gray-800 dark:text-slate-100'>
                                Shop By <span className=' text-transparent bg-clip-text bg-linear-to-b from-violet-500 to-violet-700'>Category</span>
                            </Link>
                        </h2>
                    </div>
                    <div>
                        <Link to={'/categories'} className='text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-1 justify-center'>
                            <span>
                                View All Categories
                            </span>
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 group ">

                    {categories && categories.map((category) => <Fragment key={category._id}>

                        <Link to={`/products?category[in]=${category._id}`} className="card flex flex-col items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-md dark:shadow-none cursor-pointer hover:shadow-2xl dark:hover:shadow-none hover:bg-gray-50 dark:hover:bg-slate-900/80 transition-all hover:scale-101 duration-300">
                            <img src={category.image}
                                alt=""
                                className='size-24 rounded-full object-cover group-hover:scale-101 transition-all duration-300'
                            />
                            <h3 className='font-bold text-gray-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300'>{category.name}</h3>
                        </Link>
                    </Fragment>)}
                </div>
            </div>
        </section>
    )
}
