import React, { useEffect, useState } from 'react'
import { getAllBrands } from '../../services/category-services'
import BrandsCard from '../../Components/BrandsCard/BrandsCard';
import HomeLoading from '../Home/HomeLoading';
import { Link } from 'react-router';
import { IoMdHome, IoMdPricetags } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PageMetaData from '../../Components/PageMetaData/PageMetaData';

export default function Brands() {

  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(false)



  async function getBrands() {
    try {
      setIsLoading(true);
      const response = await getAllBrands();
      setIsLoading(false);
      console.log(response);
      setBrands(response.data.data);

    } catch (error) {
      setIsLoading(false)
      console.log(error);

    }

  }

  useEffect(() => {
    getBrands();
  }, [])

  if (isLoading) {
    return <HomeLoading />
  }


  return (
    <>
      <PageMetaData title={"Brands"} />
      <div className='bg-linear-to-br from-violet-600 via-violet-500 to-violet-400 text-white'>
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className='flex items-center gap-2 text-sm text-white/70 '>
            <ul className='flex items-center'>
              <li className='flex items-center gap-2 text-sm text-white/70 '>
                <Link to="/" className='flex items-center gap-2 text-sm '>
                  <IoMdHome className='text-xl' />
                  <span className='mt-1'>Home</span>
                </Link>
                <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
              </li>
              <li className='mt-1 text-white'>
                <span>Brands</span>
              </li>
            </ul>
          </nav>
          <div className='flex items-center gap-5 mt-4'>
            <div className='size-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
              <IoMdPricetags className='text-3xl' />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h1>
              <p className='text-white/80 mt-1'>
                Shop from your favorite brands
              </p>
            </div>
          </div>

        </div>

      </div>
      <div className='container mx-auto py-8 px-4 mt-10'>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>

          {brands?.map((brand) => (
            <BrandsCard key={brand._id} brand={brand} />))}
        </div>
      </div>
    </>

  )
}
