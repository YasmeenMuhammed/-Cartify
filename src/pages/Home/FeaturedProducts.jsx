import { useContext, useEffect, useMemo, useState } from "react";
import {
  FaFilter,
  FaSearch,
  FaSortAmountDown,
} from "react-icons/fa";

import ProductCard from "../../Components/ProductCard";
import HomeLoading from "./HomeLoading";
import { ProductContext } from "../../Context/Products.context";
import { Listbox } from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";



export default function FeaturedProducts() {

  const { products, isLoading } = useContext(ProductContext);

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "low" },
    { label: "Price: High to Low", value: "high" },
    { label: "Name: A-Z", value: "az" },
  ];

  // FILTER STATES
  // =========================

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const PRODUCTS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {

    let updatedProducts = [...(products || [])];
    // SEARCH
    // =========================

    if (searchTerm.trim()) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // PRICE FILTER
    // =========================
    updatedProducts = updatedProducts.filter(
      (product) => product.price <= maxPrice
    );

    // CATEGORY FILTER
    // =========================

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category?.name === selectedCategory
      );
    }
    // SORTING
    // =========================

    if (sortType === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortType === "az") {
      updatedProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return updatedProducts;

  }, [
    products,
    searchTerm,
    maxPrice,
    selectedCategory,
    sortType,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );


  // GET UNIQUE CATEGORIES
  // =========================

  const categories = [
    ...new Set(
      products?.map((product) => product.category?.name)
    ),
  ];

  // FILTER + SORT LOGIC
  // =========================

  // =========================
  // LOADING
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, maxPrice, selectedCategory, sortType]);
  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="py-14 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">

      <div className="container mx-auto px-4">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-10 flex items-center justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3">

              <div className="h-10 w-2 rounded-full bg-linear-to-b from-violet-400 to-violet-700"></div>

              <h2 className="text-4xl font-black text-gray-800 dark:text-slate-100">
                Featured{" "}
                <span className="bg-linear-to-b from-violet-500 to-violet-700 bg-clip-text text-transparent">
                  Products
                </span>
              </h2>

            </div>

            <p className="text-gray-500 dark:text-slate-400">
              Discover our latest products
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 px-5 py-3 shadow-sm dark:shadow-none">
            <FaFilter className="text-violet-600 dark:text-violet-400" />
            <span className="font-semibold text-gray-700 dark:text-slate-200">
              {currentProducts.length} Products
            </span>
          </div>

        </div>

        {/* MAIN LAYOUT */}
        {/* ========================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* SIDEBAR */}
          {/* ========================= */}

          <div className="lg:col-span-3">

            <div className="sticky top-10 space-y-8 rounded-[32px] border border-white/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-6 shadow-xl dark:shadow-none backdrop-blur">
              {/* SEARCH */}

              <div>

                <div className="mb-3 flex items-center gap-2">
                  <FaSearch className="text-violet-600 dark:text-violet-400" />

                  <h3 className="font-bold text-gray-800 dark:text-slate-100">
                    Search
                  </h3>
                </div>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-750 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 p-3 outline-none transition focus:border-violet-500 focus:dark:border-violet-400"
                />

              </div>

              {/* PRICE FILTER */}

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="font-bold text-gray-800 dark:text-slate-100">
                    Max Price
                  </h3>

                  <span className="rounded-full bg-violet-100 dark:bg-violet-950/50 px-4 py-1 text-sm font-bold text-violet-700 dark:text-violet-300">
                    {maxPrice} EGP
                  </span>

                </div>

                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Number(e.target.value))
                  }
                  className="w-full cursor-pointer accent-violet-500 dark:accent-violet-400"
                />

                <div className="mt-2 flex justify-between text-sm text-gray-400 dark:text-slate-500">
                  <span>0</span>
                  <span>50K</span>
                </div>

              </div>

              {/* CATEGORY FILTER */}

              <div>

                <h3 className="mb-3 font-bold text-gray-800 dark:text-slate-100">
                  Categories
                </h3>

                <div className="space-y-2">

                  <button
                    onClick={() =>
                      setSelectedCategory("")
                    }
                    className={`w-full rounded-2xl px-4 py-3 text-left transition duration-200 ${selectedCategory === ""
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                      : "bg-gray-100 dark:bg-slate-800/40 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800"
                      }`}
                  >
                    All Categories
                  </button>

                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      className={`w-full rounded-2xl px-4 py-3 text-left transition duration-200 ${selectedCategory === category
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                        : "bg-gray-100 dark:bg-slate-800/40 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800"
                        }`}
                    >
                      {category}
                    </button>
                  ))}

                </div>

              </div>

              {/* SORT */}

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <FaSortAmountDown className="text-violet-600 dark:text-violet-400" />

                  <h3 className="font-bold text-gray-800 dark:text-slate-100">
                    Sort By
                  </h3>

                </div>

                <div className="relative">

                  <Listbox value={sortType} onChange={setSortType}>

                    <div className="relative">

                      {/* BUTTON */}

                      <Listbox.Button
                        className="
        relative w-full cursor-pointer rounded-2xl
        border border-gray-200 dark:border-slate-750 bg-white dark:bg-slate-800/50
        py-4 pl-5 pr-12 text-left
        shadow-sm transition
        hover:border-violet-400
        focus:border-violet-500
        focus:outline-none
        focus:ring-4 focus:ring-violet-100/50
      "
                      >
                        <span className="block truncate font-medium text-gray-700 dark:text-slate-200">

                          {
                            sortOptions.find(
                              (option) => option.value === sortType
                            )?.label
                          }

                        </span>

                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <FaChevronDown />
                        </span>

                      </Listbox.Button>

                      {/* OPTIONS */}

                      <Listbox.Options
                        className="
          absolute bottom-full z-50 mb-3 max-h-60 w-full overflow-auto
  rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-2xl dark:shadow-none
  ring-1 ring-black/5 focus:outline-none
      "
                      >

                        {sortOptions.map((option) => (

                          <Listbox.Option
                            key={option.value}
                            value={option.value}
                            className={({ active }) =>
                              `
              relative cursor-pointer select-none
              px-5 py-3 transition
              ${active
                                ? "bg-violet-500 text-white"
                                : "text-gray-700 dark:text-slate-200 hover:bg-slate-700/50"
                              }
            `
                            }
                          >

                            {({ selected }) => (

                              <div className="flex items-center justify-between">

                                <span className="font-medium">
                                  {option.label}
                                </span>

                                {selected && (
                                  <FaCheck className="text-sm" />
                                )}

                              </div>

                            )}

                          </Listbox.Option>

                        ))}

                      </Listbox.Options>

                    </div>

                  </Listbox>
                  {/* Custom Arrow */}

                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />

                    </svg>

                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* ========================= */}
          {/* PRODUCTS */}
          {/* ========================= */}

          <div className="lg:col-span-9">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                Products
              </h3>

              <p className="text-sm text-gray-500 dark:text-slate-400">
                Showing {currentProducts.length} of {filteredProducts.length} results
              </p>

            </div>

            {/* PRODUCTS GRID */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

              {currentProducts.length > 0 ? (

                currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    productInfo={product}
                  />
                ))

              ) : (

                <div className="col-span-full rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 p-12 text-center shadow-sm dark:shadow-none">

                  <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-slate-100">
                    No Products Found
                  </h3>

                  <p className="text-gray-500 dark:text-slate-400">
                    Try changing filters or search keyword
                  </p>

                </div>

              )}

            </div>
            {
              totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">

                  {/* Prev */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {/* Pages */}
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-11 w-11 rounded-xl font-semibold transition
              ${currentPage === page
                            ? "bg-violet-500 text-white shadow-md shadow-violet-500/20"
                            : "border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-800"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}