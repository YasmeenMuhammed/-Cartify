import { Link } from "react-router";
import ProductCard from "../../Components/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { counterDeal } from "../../utils/deals-counter";
import { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../services/products-services";
import HomeLoading from './HomeLoading';
import { ProductContext } from "../../Context/Products.context";

export default function HomeDeals() {

    const {products , isLoading} = useContext(ProductContext);

    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    
    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = counterDeal();
            setTimeLeft(newTimeLeft)
        }, 1000)
        return function () {
            clearInterval(timer)
        }
    }, [])


    if (isLoading) {
        return <HomeLoading />
    }



    const deals = products?.filter((product) => product.priceAfterDiscount).slice(0, 10)



    return (
        <div>
            <div className="container p-5">
                <div className="flex justify-between items-center py-8">
                    <div className=" flex flex-col">
                        <div className="title flex gap-3 items-center">
                            <div className='h-8 w-1.5 bg-linear-to-b from-violet-500 to-violet-700 rounded-full'></div>
                            <h2>
                                <Link className='font-bold text-4xl md:text-2xl text-gray-800 dark:text-slate-100'>
                                    Hot <span className=' text-transparent bg-clip-text bg-linear-to-b from-violet-500 to-violet-700'>Deals</span>
                                </Link>
                            </h2>
                        </div>
                        <div className="counter flex gap-2 mt-4 items-center">
                            <span className="text-slate-600 dark:text-slate-350">Offer ends in : </span>
                            <span className="bg-black dark:bg-slate-800 size-7 rounded-lg text-white flex items-center justify-center font-semibold">
                                {String(timeLeft.hours).padStart(2, "0")}
                            </span>
                            <span className="dark:text-slate-300">:</span>
                            <span className="bg-black dark:bg-slate-800 size-7 rounded-lg text-white flex items-center justify-center font-semibold">
                                {String(timeLeft.minutes).padStart(2, "0")}

                            </span>
                            <span className="dark:text-slate-300">:</span>
                            <span className="bg-black dark:bg-slate-800 size-7 rounded-lg text-white flex items-center justify-center font-semibold">
                                {String(timeLeft.seconds).padStart(2, "0")}

                            </span>
                        </div>
                    </div>
                    <div>
                        <Link to={'/categories'} className='text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:dark:text-primary-300 transition-colors duration-300 flex items-center gap-1 justify-center'>
                            <span>
                                View All Deals
                            </span>
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
                <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {deals?.map((product) => <ProductCard key={product.id} productInfo={product} />)}

                </div>
            </div>

        </div>
    )
}
