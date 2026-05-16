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
            <section id='tabs' className='py-8'>
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <div className="border-b border-gray-200">
                            <div className="md:flex overflow-x-hidden md:scrollbar-hide ">

                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`w-full md:w-auto flex items-center gap-2 px-6 hover:text-primary-600 hover:bg-gray-50/50 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600
                                         ${activeTab === "details" && "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"}
                                     `}>
                                    <RiBox3Fill />

                                    Product Details

                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={` w-full md:w-auto flex items-center gap-2 px-6 py-4  hover:text-primary-600 hover:bg-gray-50/50 font-medium whitespace-nowrap transition-all duration-200 text-gray-600
                                         ${activeTab === "reviews" && "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"}
                                     `}>
                                    <FaStar />


                                    Reviews ({reviews.length})

                                </button>
                                <button
                                    onClick={() => setActiveTab('shipping')}
                                    className={`w-full md:w-auto flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap  hover:text-primary-600 hover:bg-gray-50/50 transition-all duration-200 text-gray-600
                                         ${activeTab === "shipping" && "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"}
                                     `}

                                >
                                    <FaTruck />

                                    Shipping & Returns

                                </button>


                            </div>

                        </div>
                        <div className="p-6">
                            {getActiveTab()}
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
