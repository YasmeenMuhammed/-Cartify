import React from 'react'
import { FaLayerGroup } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router'

export default function BreadCrumb({ title, description, icon }) {
    return (
        <div className='bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white'>
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
                            <span>{title}</span>
                        </li>
                    </ul>
                </nav>
                <div className='flex items-center gap-5 mt-4'>
                    <div className='size-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                     <div className='text-3xl'>
                        {icon}
                        </div>   
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className='text-white/80 mt-1'>
                            {description}
                        </p>
                    </div>
                </div>

            </div>

        </div>

    )
}
