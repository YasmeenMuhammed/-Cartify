import React, { useContext, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaCog, FaGift, FaHeadphones, FaHeart, FaPhoneAlt, FaRegHeart, FaRegUser, FaSearch, FaTruck, FaUserPlus, FaWifi } from 'react-icons/fa'
import { IoIosArrowDown, IoIosCart, IoIosMan, IoMdMail, IoMdMenu } from 'react-icons/io'
import miniLogo from '../assets/Images/mini-logo.png'
import { Link, NavLink, useNavigate } from 'react-router'
import { BiSolidCategory } from 'react-icons/bi'
import { FaMobileRetro, FaXmark } from 'react-icons/fa6'
import { GrRestroomWomen } from 'react-icons/gr'
import { GiHealthPotion } from 'react-icons/gi'
import { AuthContext } from '../Context/Auth.context'
import { CartContext } from '../Context/Cart.context'
import { CgSpinner } from 'react-icons/cg'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { FiBox, FiLogOut, FiMapPin } from 'react-icons/fi'

export default function NavBar() {
  const isOnline = useOnlineStatus();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);



  const { logOut, token } = useContext(AuthContext);
  const { cartInfo, isLoading } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }
  function handleSearch(e) {
    e.preventDefault();

    if (!searchValue.trim()) return;

    navigate(`/search?keyword=${searchValue}`);
  }

  return (
    <header>
      {/* Top Nav */}
      <nav className=' hidden lg:block border-b border-gray-300 pb-2 pt-4'>
        <div className='flex justify-between px-4' >
          <ul className='text-gray-700 flex *:flex *:items-center *:gap-2 gap-3 '>
            <li>
              <FaTruck className='text-primary-500' />
              Free Shipping on Orders 500 EGP
            </li>
            <li >
              <FaGift className='text-primary-500' />
              New Arrivals Daily
            </li>
            {isOnline && <>
              <li className='flex items-center text-sm text-green-500'>
                <FaWifi />Online
              </li>
            </>}
          </ul>
          <div className='flex gap-3 '>
            <ul className='flex *:flex *:items-center *:gap-2 gap-3 pe-2 border-e border-gray-300'>
              <li className='text-gray-600 hover:text-primary-500 transition-colors'>
                <FaPhoneAlt />
                <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
              </li>
              <li className='text-gray-600 hover:text-primary-500 transition-colors'>
                <IoMdMail />
                <a href="mailto:+1 (800) 123-4567">support@cartify.com</a>
              </li>
            </ul>
            <ul className='flex items-center gap-3 relative'>
              {userInfo?.name ? (
                <li className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-500 font-medium transition-colors cursor-pointer focus:outline-none select-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <FaRegUser className="text-sm" />
                    </div>
                    <span>{userInfo.name}</span>
                  </button>

                  {isOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden text-slate-700">

                        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg">
                            <FaRegUser />
                          </div>
                          <span className="font-bold text-slate-800">{userInfo.name}</span>
                        </div>

                        <ul className="p-2 space-y-1">
                          <li>
                            <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                              <FaRegUser className="text-slate-400 text-lg" />
                              <span>My Profile</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                              <FiBox className="text-slate-400 text-lg" />
                              <span>My Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                              <FaHeart className="text-slate-400 text-md" />
                              <span>My Wishlist</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                              <FiMapPin className="text-slate-400 text-lg" />
                              <span>Addresses</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
                              <FaCog className="text-slate-400 text-lg" />
                              <span>Settings</span>
                            </Link>
                          </li>
                        </ul>

                        <div className="p-2 border-t border-gray-100">
                          <button
                            onClick={() => { logOut(); setIsOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 text-red-500 font-bold transition-colors text-left"
                          >
                            <FiLogOut className="text-lg rotate-180" />
                            <span>Sign Out</span>
                          </button>
                        </div>

                      </div>
                    </>
                  )}
                </li>
              ) : (
                <>
                  <li>
                    <Link to={'/login'} className='flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors cursor-pointer'>
                      <CiUser /> Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to={'/signup'} className='flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors cursor-pointer'>
                      <FaUserPlus /> Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>

          </div>
        </div>
      </nav>
      {/* bottom Nav */}
      <nav className="w-full bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-[76px] lg:gap-5">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="logo flex items-center gap-2">
                <img className="w-9 sm:w-10" src={miniLogo} alt="cartifyLogo" />
                <h1 className="text-xl font-bold sm:text-2xl">Cartify</h1>
              </div>
            </Link>

            {/* Search Input */}
            <div className="relative hidden flex-1 lg:block">
              <form
                onSubmit={handleSearch}
                className="flex items-center"
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 ps-5 pe-14 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                />

                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white transition-colors duration-300 hover:bg-primary-700"
                >
                  <FaSearch />
                </button>

              </form>

            </div>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-4 lg:flex">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"} hover:text-primary-500 transition-colors`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"} hover:text-primary-500 transition-colors`
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li className="relative group">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"} flex items-center hover:text-primary-500 transition-colors`
                  }
                >
                  Categories
                  <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
                </NavLink>

                <div className="invisible z-999 absolute top-8  min-w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="divide-y-2 divide-gray-100 py-3">
                    <li className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-100 hover:text-primary-600">
                      <BiSolidCategory />
                      <Link className="ms-3" to="/categories">All Categories</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-100 hover:text-primary-600">
                      <FaMobileRetro />
                      <Link className="ms-3" to="/products?category[in]=6439d2d167d9aa4ca970649f">Electronics</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-100 hover:text-primary-600">
                      <GrRestroomWomen className="text-xl" />
                      <Link className="ms-3" to="/products?category[in]=6439d58a0049ad0b52b9003f">Women's Fashion</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-100 hover:text-primary-600">
                      <IoIosMan className="text-xl" />
                      <Link className="ms-3" to="/products?category[in]=6439d5b90049ad0b52b90048">Men's Fashion</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-100 hover:text-primary-600">
                      <GiHealthPotion className="text-xl" />
                      <Link className="ms-3" to="/products?category[in]=6439d30b67d9aa4ca97064b1">Beauty & Health</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"} hover:text-primary-500 transition-colors`
                  }
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            {/* Actions */}
            <ul className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link to="/wishlist">
                <li className="flex size-10 items-center justify-center rounded-full bg-white text-gray-600 transition-all duration-100 hover:bg-gray-100 hover:text-primary-500">
                  <FaRegHeart className="text-xl" />
                </li>
              </Link>

              <Link to="/cart">
                <li className="relative flex size-10 items-center justify-center rounded-full bg-white text-gray-600 transition-all duration-100 hover:bg-gray-100 hover:text-primary-500">
                  <IoIosCart className="text-2xl" />
                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                    {isLoading ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      token ? (cartInfo?.numOfCartItems || 0) : 0
                    )}
                  </span>
                </li>
              </Link>

              <button
                className="btn flex size-10 items-center justify-center bg-primary-500 p-0 text-2xl text-white lg:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <FaXmark /> : <IoMdMenu />}
              </button>

              {!token ? (
                <Link to="/login">
                  <button className="hidden items-center gap-1 rounded-full bg-primary-500 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary-700 lg:flex">
                    <CiUser className="text-xl" />
                    <span>Sign in</span>
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button
                    onClick={logOut}
                    className="hidden items-center gap-1 rounded-full bg-primary-500 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary-700 lg:flex"
                  >
                    <CiUser className="text-xl" />
                    <span>Log Out</span>
                  </button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isMenuOpen && <>

        <div className=' background fixed inset-0 bg-black/50 z-30' onClick={toggleMenu}></div>
        <div className=' offcanvas divide-y-2 *:py-7 divide-gray-100 z-40 bg-white fixed bottom-0 top-0 p-5 animate-slide-in'>
          <div className=' flex justify-between items-center'>
            <div className="logo">
              <Link to={'/home'} className='flex'>
                <img className='w-10' src={miniLogo} alt="cartifyLogo" />
                <h1 className='text-3xl font-bold'>Cartify</h1>
              </Link>

            </div>
            <button className='btn rounded-full p-3' onClick={toggleMenu}>
              <FaXmark />
            </button>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for Products..."
              className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 ps-4 pe-14 text-sm outline-none focus:border-primary-500"
            />

            <button
              type="button"
              className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white transition-colors duration-300 hover:bg-primary-700"
            >
              <FaSearch />
            </button>
          </div>

          <ul className='flex  gap-1 flex-col'>
            <li>
              <NavLink to={'/'} className={({ isActive }) => { return `${isActive ? 'text-primary-500' : ''} text-gray-600 hover:text-primary-500 transition-colors` }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/products'} className={({ isActive }) => { return `${isActive ? 'text-primary-500' : ''} text-gray-600 hover:text-primary-500 transition-colors` }}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to={'/categories'} className={({ isActive }) => { return `${isActive ? 'text-primary-500' : ''} text-gray-600 hover:text-primary-500 transition-colors` }}>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to={'/brands'} className={({ isActive }) => { return `${isActive ? 'text-primary-500' : ''} text-gray-600 hover:text-primary-500 transition-colors` }}>
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink to={'/brands'} className={({ isActive }) => { return `${isActive ? 'text-primary-500' : ''} text-gray-600 hover:text-primary-500 transition-colors` }}>
                Brands
              </NavLink>
            </li>

          </ul>
          <ul className='flex  gap-1 flex-nowrap ' >
            <Link to={'/wishlist'}>
              <li className='bg-white gap-2 p-2  transition-all duration-100 hover:bg-gray-100  text-gray-600 hover:text-primary-500 flex items-center '>
                <FaRegHeart className='text-2xl' />
                <span>WishList</span>
              </li>
            </Link>
            <Link to={'/cart'}>
              <li className='bg-white gap-2 p-2 transition-all duration-100 hover:bg-gray-100  text-gray-600 hover:text-primary-500 flex items-center '>
                <IoIosCart className='text-3xl' />
                <span>Cart</span>
              </li>

            </Link>
          </ul>
          <div className='flex'>
            {!token ? <>
              <Link to={'/login'}>
                <button className='bg-primary-500 w-40 hover:bg-primary-700 transition-colors duration-300 text-white text-md flex items-center gap-1 py-2 px-1.5 rounded-xl'>
                  <CiUser className='text-xl' />
                  Sign In
                </button>
              </Link>
              <Link to={'/signup'}>
                <button className='text-primary-500 w-40 border-2 border-primary-500  hover:bg-gray-100/50 transition-colors duration-300 bg-white text-md flex items-center gap-1 py-2 px-1.5 rounded-xl'>
                  <CiUser className='text-xl' />
                  Sign Up
                </button>
              </Link></> : <>
              <Link to={'/login'}>
                <button onClick={logOut} className='bg-primary-500 w-40 hover:bg-primary-700 transition-colors duration-300 text-white text-md flex items-center gap-1 py-2 px-1.5 rounded-xl'>
                  <CiUser className='text-xl' />
                  Log Out
                </button>
              </Link>
            </>}
          </div>
          <div >
            <NavLink to={'/contact'} className='text-gray-600 hover:text-gray-500 transition-colors flex items-center gap-1'>
              <div className='size-10 rounded-full bg-primary-100 flex items-center justify-center'>
                <FaHeadphones className='text-xl text-primary-500' />
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-400'>Need Help?</span>
                <span>Contact Support</span>
              </div>
            </NavLink>
          </div>



        </div>
      </>}

    </header>
  )
}
