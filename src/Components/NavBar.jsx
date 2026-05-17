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


    <header className="w-full overflow-x-hidden">
      {/* Mobile Menu */}

      {/* Top Navbar */}
      <nav className="hidden border-b border-gray-200 bg-white lg:block">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">

          {/* Left Side */}
          <ul className="flex items-center gap-5 text-sm text-gray-600">
            <li className="flex items-center gap-2 whitespace-nowrap">
              <FaTruck className="text-primary-500" />
              <span>Free Shipping on Orders 500 EGP</span>
            </li>

            <li className="flex items-center gap-2 whitespace-nowrap">
              <FaGift className="text-primary-500" />
              <span>New Arrivals Daily</span>
            </li>

            {isOnline && (
              <li className="flex items-center gap-2 text-green-500 whitespace-nowrap">
                <FaWifi />
                <span>Online</span>
              </li>
            )}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-4 border-e border-gray-200 pe-5 text-sm">
              <li>
                <a
                  href="tel:+1 (800) 123-4567"
                  className="flex items-center gap-2 text-gray-600 transition hover:text-primary-500"
                >
                  <FaPhoneAlt />
                  +1 (800) 123-4567
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@cartify.com"
                  className="flex items-center gap-2 text-gray-600 transition hover:text-primary-500"
                >
                  <IoMdMail />
                  support@cartify.com
                </a>
              </li>
            </ul>

            {/* User */}
            <div className="relative">
              {userInfo?.name ? (
                <>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 items-center gap-2 rounded-full px-2 transition hover:bg-gray-100"
                  >
                    <div className="flex size-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <FaRegUser />
                    </div>

                    <span className="max-w-30 truncate font-medium text-gray-700">
                      {userInfo.name}
                    </span>
                  </button>

                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsOpen(false)}
                      />

                      <div className="absolute right-0 top-14 z-40 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                          <div className="flex size-11 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <FaRegUser />
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {userInfo.name}
                            </h3>
                          </div>
                        </div>

                        <ul className="space-y-1 p-2">
                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 transition hover:bg-slate-50"
                            >
                              <FaRegUser />
                              My Profile
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/orders"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 transition hover:bg-slate-50"
                            >
                              <FiBox />
                              My Orders
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/wishlist"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 transition hover:bg-slate-50"
                            >
                              <FaHeart />
                              Wishlist
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 transition hover:bg-slate-50"
                            >
                              <FiMapPin />
                              Addresses
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 transition hover:bg-slate-50"
                            >
                              <FaCog />
                              Settings
                            </Link>
                          </li>
                        </ul>

                        <div className="border-t border-gray-100 p-2">
                          <button
                            onClick={() => {
                              logOut();
                              setIsOpen(false);
                            }}
                            className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-red-500 transition hover:bg-red-50"
                          >
                            <FiLogOut className="rotate-180" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-600 transition hover:text-primary-500"
                  >
                    <CiUser />
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="flex items-center gap-2 text-gray-600 transition hover:text-primary-500"
                  >
                    <FaUserPlus />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-20 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">

          <div className="flex min-h-18 items-center justify-between gap-3">

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="flex items-center gap-2">
                <img
                  className="w-9 sm:w-10"
                  src={miniLogo}
                  alt="cartifyLogo"
                />

                <h1 className="text-xl font-bold sm:text-2xl">
                  Cartify
                </h1>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden flex-1 lg:block">
              <form
                onSubmit={handleSearch}
                className="relative mx-auto max-w-2xl"
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for products..."
                  className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 ps-5 pe-14 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-700"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-6 lg:flex">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"
                    } font-medium transition hover:text-primary-500`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"
                    } font-medium transition hover:text-primary-500`
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"
                    } font-medium transition hover:text-primary-500`
                  }
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600"
                    } font-medium transition hover:text-primary-500`
                  }
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">

              {/* Wishlist */}
              <Link to="/wishlist">
                <div className="flex size-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-primary-500">
                  <FaRegHeart className="text-xl" />
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <div className="relative flex size-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-primary-500">

                  <IoIosCart className="text-3xl" />

                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                    {isLoading ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      token
                        ? cartInfo?.numOfCartItems || 0
                        : 0
                    )}
                  </span>
                </div>
              </Link>

              {/* Auth Button */}
              {!token ? (
                <Link to="/login" className="hidden lg:block">
                  <button className="flex h-11 items-center gap-2 rounded-full bg-primary-500 px-5 text-sm font-medium text-white transition hover:bg-primary-700">
                    <CiUser className="text-lg" />
                    Sign In
                  </button>
                </Link>
              ) : (
                <button
                  onClick={logOut}
                  className="hidden h-11 items-center gap-2 rounded-full bg-primary-500 px-5 text-sm font-medium text-white transition hover:bg-primary-700 lg:flex"
                >
                  <FiLogOut />
                  Logout
                </button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={toggleMenu}
                className="flex size-10 items-center justify-center rounded-full bg-primary-500 text-white lg:hidden"
              >
                {isMenuOpen ? <FaXmark /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <>
          {/* Overlay */}
          <div
            onClick={toggleMenu}
            className={`
      fixed inset-0 z-998 bg-black/50 transition-all duration-300 lg:hidden
      ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
    `}
          />

          {/* Sidebar */}
          <div
            className={`
      fixed left-0 top-0 z-999 h-screen w-[85%] max-w-[320px]
      overflow-y-auto bg-white p-5 shadow-2xl transition-transform
      duration-300 ease-in-out lg:hidden
      
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
          >
            {/* Top */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                <img
                  className="w-10"
                  src={miniLogo}
                  alt="logo"
                />

                <h1 className="text-2xl font-bold">
                  Cartify
                </h1>
              </Link>

              <button
                onClick={toggleMenu}
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
              >
                <FaXmark />
              </button>
            </div>

            {/* Search */}
            <form
              onSubmit={(e) => {
                handleSearch(e);
                toggleMenu();
              }}
              className="relative my-6"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 ps-4 pe-14 text-sm outline-none focus:border-primary-500"
              />

              <button
                type="submit"
                className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white"
              >
                <FaSearch />
              </button>
            </form>

            {/* Links */}
            <ul className="flex flex-col gap-2 border-b border-gray-100 pb-6">
              <li>
                <NavLink
                  to="/"
                  onClick={toggleMenu}
                  className="flex h-12 items-center rounded-xl px-4 text-gray-700 transition hover:bg-primary-50 hover:text-primary-500"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  onClick={toggleMenu}
                  className="flex h-12 items-center rounded-xl px-4 text-gray-700 transition hover:bg-primary-50 hover:text-primary-500"
                >
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/categories"
                  onClick={toggleMenu}
                  className="flex h-12 items-center rounded-xl px-4 text-gray-700 transition hover:bg-primary-50 hover:text-primary-500"
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  onClick={toggleMenu}
                  className="flex h-12 items-center rounded-xl px-4 text-gray-700 transition hover:bg-primary-50 hover:text-primary-500"
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            {/* Bottom Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {!token ? (
                <>
                  <Link to="/login" onClick={toggleMenu}>
                    <button className="h-12 w-full rounded-xl bg-primary-500 text-white transition hover:bg-primary-700">
                      Sign In
                    </button>
                  </Link>

                  <Link to="/signup" onClick={toggleMenu}>
                    <button className="h-12 w-full rounded-xl border border-primary-500 text-primary-500 transition hover:bg-primary-50">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                  className="h-12 w-full rounded-xl bg-primary-500 text-white transition hover:bg-primary-700"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Contact */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className="flex items-center gap-3"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary-100">
                  <FaHeadphones className="text-primary-500" />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">
                    Need Help?
                  </span>

                  <span className="font-medium text-gray-700">
                    Contact Support
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </>
      </nav>
    </header>
  )
}
