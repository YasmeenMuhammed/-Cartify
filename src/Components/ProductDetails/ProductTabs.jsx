import React, { useState } from 'react'
import { FaStar, FaTruck } from 'react-icons/fa'
import { RiBox3Fill } from 'react-icons/ri'
import ProductDetailsTab from './../ProductTabs/ProductDetailsTab';
import ProductReviews from './../ProductTabs/ProductReviews';
import ProductShipping from './../ProductTabs/ProductShipping';

export default function ProductTabs({ productDetails }) {
    const { reviews } = productDetails;

    const [activeTab, setActiveTab] = useState('details');

    function getActiveTab() {
        switch (activeTab) {
            case 'details':
                return <ProductDetailsTab productDetails={productDetails} />
            case 'reviews':
                return <ProductReviews productId={productDetails.id || productDetails._id} />
            case 'shipping':
                return <ProductShipping />
            default:
                return <ProductDetailsTab />
        }
    }



    return (
        <>
            <section id='tabs' className='py-8 dark:text-slate-200'>
                <div className="container mx-auto px-4">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-700">

                        {/* Tabs Header */}
                        <div className="border-b border-gray-200 dark:border-slate-700">
                            <div className="md:flex overflow-x-auto scrollbar-hide">

                                {/* Details */}
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-300
                            
                            ${activeTab === "details"
                                            ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/70 dark:bg-primary-500/10 dark:text-primary-400"
                                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                                        }
                        `}
                                >
                                    <RiBox3Fill className='text-lg' />
                                    Product Details
                                </button>

                                {/* Reviews */}
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-300
                            
                            ${activeTab === "reviews"
                                            ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/70 dark:bg-primary-500/10 dark:text-primary-400"
                                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                                        }
                        `}
                                >
                                    <FaStar className='text-sm' />
                                    Reviews ({reviews.length})
                                </button>

                                {/* Shipping */}
                                <button
                                    onClick={() => setActiveTab('shipping')}
                                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-300
                            
                            ${activeTab === "shipping"
                                            ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/70 dark:bg-primary-500/10 dark:text-primary-400"
                                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                                        }
                        `}
                                >
                                    <FaTruck className='text-sm' />
                                    Shipping & Returns
                                </button>

                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 bg-white dark:bg-slate-900">
                            {getActiveTab()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
