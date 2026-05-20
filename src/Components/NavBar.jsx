import React, { useContext, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaCog, FaGift, FaHeadphones, FaHeart, FaPhoneAlt, FaRegHeart, FaRegUser, FaSearch, FaTruck, FaUserPlus, FaWifi, FaSun, FaMoon } from 'react-icons/fa'
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
import { ThemeContext } from '../Context/Theme.context'
import { motion } from 'framer-motion'

export default function NavBar() {
  const isOnline = useOnlineStatus();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

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


    <header className="relative z-50 w-full">
      {/* Mobile Menu */}

      {/* Top Navbar */}
      <nav className="hidden border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors duration-300 lg:block">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">

          {/* Left Side */}
          <ul className="flex items-center gap-5 text-sm text-gray-600 dark:text-slate-300">
            <li className="flex items-center gap-2 whitespace-nowrap">
              <FaTruck className="text-primary-500" />
              <span>Free Shipping on Orders 500 EGP</span>
            </li>

            <li className="flex items-center gap-2 whitespace-nowrap">
              <FaGift className="text-primary-500" />
              <span>New Arrivals Daily</span>
            </li>

            {isOnline && (
              <li className="flex items-center gap-2 text-violet-500 whitespace-nowrap">
                <FaWifi />
                <span>Online</span>
              </li>
            )}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-4 border-e border-gray-200 dark:border-slate-800 pe-5 text-sm">
              <li>
                <a
                  href="tel:+1 (800) 123-4567"
                  className="flex items-center gap-2 text-gray-600 dark:text-slate-300 transition hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <FaPhoneAlt />
                  +1 (800) 123-4567
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@cartify.com"
                  className="flex items-center gap-2 text-gray-600 dark:text-slate-300 transition hover:text-primary-500 dark:hover:text-primary-400"
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
                    className="flex h-10 items-center gap-2 rounded-full px-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex size-9 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                      <FaRegUser />
                    </div>

                    <span className="max-w-30 truncate font-medium text-gray-700 dark:text-slate-200">
                      {userInfo.name}
                    </span>
                  </button>

                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsOpen(false)}
                      />

                      <div className="absolute right-0 top-14 z-40 w-72 overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">

                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 p-4">
                          <div className="flex size-11 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                            <FaRegUser />
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white">
                              {userInfo.name}
                            </h3>
                          </div>
                        </div>

                        <ul className="space-y-1 p-2">
                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <FaRegUser />
                              My Profile
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/allorders"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <FiBox />
                              My Orders
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/wishlist"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <FaHeart />
                              Wishlist
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <FiMapPin />
                              Addresses
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/account"
                              className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <FaCog />
                              Settings
                            </Link>
                          </li>
                        </ul>

                        <div className="border-t border-gray-100 dark:border-slate-800 p-2">
                          <button
                            onClick={() => {
                              logOut();
                              setIsOpen(false);
                            }}
                            className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/20"
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
                    className="flex items-center gap-2 text-gray-600 dark:text-slate-300 transition hover:text-primary-500"
                  >
                    <CiUser />
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="flex items-center gap-2 text-gray-600 dark:text-slate-300 transition hover:text-primary-500"
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
      <nav className="w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-850/80 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-[76px] lg:gap-5">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <div className="logo flex items-center gap-2">
                <img className="w-9 sm:w-10" src={miniLogo} alt="cartifyLogo" />
                <h1 className="text-xl font-bold sm:text-2xl text-slate-800 dark:text-white">Cartify</h1>
              </div>
            </Link>

            {/* Search Input */}
            <div className="relative hidden flex-1 lg:block">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="h-12 w-full rounded-full border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/60 placeholder:text-slate-500 dark:placeholder:text-slate-500 ps-5 pe-14 text-sm text-gray-800 dark:text-white outline-none transition focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900"
              />

              <button
                type="button"
                className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white transition-colors duration-300 hover:bg-primary-700"
              >
                <FaSearch />
              </button>
            </div>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-4 lg:flex">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600 dark:text-slate-300"} hover:text-primary-500 transition-colors`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600 dark:text-slate-300"} hover:text-primary-500 transition-colors`
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li className="relative group">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600 dark:text-slate-300"} flex items-center hover:text-primary-500 transition-colors`
                  }
                >
                  Categories
                  <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
                </NavLink>

                <div className="invisible absolute top-8 z-50 min-w-52 overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="divide-y-2 divide-gray-100 dark:divide-slate-850 py-3">
                    <li className="flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-850 hover:text-primary-600 dark:hover:text-primary-400">
                      <BiSolidCategory />
                      <Link className="ms-3" to="/categories">All Categories</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-850 hover:text-primary-600 dark:hover:text-primary-400">
                      <FaMobileRetro />
                      <Link className="ms-3" to="/categories">Electronics</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-850 hover:text-primary-600 dark:hover:text-primary-400">
                      <GrRestroomWomen className="text-xl" />
                      <Link className="ms-3" to="/categories">Women's Fashion</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-850 hover:text-primary-600 dark:hover:text-primary-400">
                      <IoIosMan className="text-xl" />
                      <Link className="ms-3" to="/categories">Men's Fashion</Link>
                    </li>

                    <li className="flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-850 hover:text-primary-600 dark:hover:text-primary-400">
                      <GiHealthPotion className="text-xl" />
                      <Link className="ms-3" to="/categories">Beauty & Health</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `${isActive ? "text-primary-500" : "text-gray-600 dark:text-slate-300"} hover:text-primary-500 transition-colors`
                  }
                >
                  Brands
                </NavLink>
              </li>
            </ul>

            {/* Actions */}
            <ul className="flex shrink-0 items-center gap-2 sm:gap-3">
              <li>
                <motion.button
                  onClick={toggleTheme}
                  className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm border border-slate-200 transition-all hover:bg-slate-200 focus:outline-none dark:bg-slate-800 dark:text-amber-400 dark:border-slate-700 dark:hover:bg-slate-700 cursor-pointer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    {isDark ? <FaSun className="text-lg text-amber-400" /> : <FaMoon className="text-lg text-slate-600" />}
                  </motion.div>
                </motion.button>
              </li>

              <Link to="/wishlist">
                <li className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-200 transition-all duration-100 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary-500 dark:hover:text-primary-400 border dark:border-slate-700">
                  <FaRegHeart className="text-xl" />
                </li>
              </Link>

              <Link to="/cart">
                <li className="relative flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-200 transition-all duration-100 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary-500 dark:hover:text-primary-400 border dark:border-slate-700">
                  <IoIosCart className="text-2xl" />
                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                    {isLoading ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      cartInfo?.numOfCartItems || 0
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
      overflow-y-auto bg-white dark:bg-slate-900 p-5 shadow-2xl transition-all
      duration-300 ease-in-out lg:hidden border-r dark:border-slate-800
      
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        {/* Top */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-5">
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

            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Cartify
            </h1>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm border border-slate-200 transition-all hover:bg-slate-200 focus:outline-none dark:bg-slate-800 dark:text-amber-400 dark:border-slate-700 dark:hover:bg-slate-700 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {isDark ? <FaSun className="text-lg text-amber-400" /> : <FaMoon className="text-lg text-slate-600" />}
              </motion.div>
            </motion.button>

            <button
              onClick={toggleMenu}
              className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 transition hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              <FaXmark />
            </button>
          </div>
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
            className="h-12 w-full rounded-full border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-850 ps-4 pe-14 text-sm text-gray-800 dark:text-white outline-none focus:border-primary-500 dark:focus:bg-slate-900"
          />

          <button
            type="submit"
            className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white"
          >
            <FaSearch />
          </button>
        </form>

        {/* Links */}
        <ul className="flex flex-col gap-2 border-b border-gray-100 dark:border-slate-800 pb-6">
          <li>
            <NavLink
              to="/"
              onClick={toggleMenu}
              className="flex h-12 items-center rounded-xl px-4 text-gray-700 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-850 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              onClick={toggleMenu}
              className="flex h-12 items-center rounded-xl px-4 text-gray-700 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-850 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              onClick={toggleMenu}
              className="flex h-12 items-center rounded-xl px-4 text-gray-700 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-850 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/brands"
              onClick={toggleMenu}
              className="flex h-12 items-center rounded-xl px-4 text-gray-700 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-850 hover:text-primary-500 dark:hover:text-primary-400"
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
                <button className="h-12 w-full rounded-xl border border-primary-500 text-primary-500 transition hover:bg-primary-50 dark:hover:bg-primary-950/20">
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
        <div className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className="flex items-center gap-3"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-950/30">
              <FaHeadphones className="text-primary-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-400 dark:text-slate-400">
                Need Help?
              </span>

              <span className="font-medium text-gray-700 dark:text-slate-200">
                Contact Support
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
