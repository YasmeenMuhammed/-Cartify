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
    <div className="py-14 bg-[#f8fafc]">

      <div className="container mx-auto px-4">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-10 flex items-center justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3">

              <div className="h-10 w-2 rounded-full bg-linear-to-b from-emerald-400 to-emerald-700"></div>

              <h2 className="text-4xl font-black text-gray-800">
                Featured{" "}
                <span className="bg-linear-to-b from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  Products
                </span>
              </h2>

            </div>

            <p className="text-gray-500">
              Discover our latest products
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-sm">
            <FaFilter className="text-emerald-600" />
            <span className="font-semibold text-gray-700">
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

            <div className="sticky top-10 space-y-8 rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              {/* SEARCH */}

              <div>

                <div className="mb-3 flex items-center gap-2">
                  <FaSearch className="text-emerald-600" />

                  <h3 className="font-bold text-gray-800">
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
                  className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-emerald-500"
                />

              </div>

              {/* PRICE FILTER */}

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="font-bold text-gray-800">
                    Max Price
                  </h3>

                  <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700">
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
                  className="w-full cursor-pointer accent-emerald-500"
                />

                <div className="mt-2 flex justify-between text-sm text-gray-400">
                  <span>0</span>
                  <span>50K</span>
                </div>

              </div>

              {/* CATEGORY FILTER */}

              <div>

                <h3 className="mb-3 font-bold text-gray-800">
                  Categories
                </h3>

                <div className="space-y-2">

                  <button
                    onClick={() =>
                      setSelectedCategory("")
                    }
                    className={`w-full rounded-2xl px-4 py-3 text-left transition ${selectedCategory === ""
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                      className={`w-full rounded-2xl px-4 py-3 text-left transition ${selectedCategory === category
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

                  <FaSortAmountDown className="text-emerald-600" />

                  <h3 className="font-bold text-gray-800">
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
        border border-gray-200 bg-white
        py-4 pl-5 pr-12 text-left
        shadow-sm transition
        hover:border-emerald-400
        focus:border-emerald-500
        focus:outline-none
        focus:ring-4 focus:ring-emerald-100
      "
                      >
                        <span className="block truncate font-medium text-gray-700">

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
  rounded-2xl bg-white  shadow-2xl
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
                                ? "bg-emerald-500 text-white"
                                : "text-gray-700"
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

              <h3 className="text-xl font-bold text-gray-800">
                Products
              </h3>

              <p className="text-sm text-gray-500">
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

                <div className="col-span-full rounded-3xl bg-white p-12 text-center shadow-sm">

                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    No Products Found
                  </h3>

                  <p className="text-gray-500">
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
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                            ? "bg-emerald-500 text-white"
                            : "border border-gray-200 bg-white hover:bg-gray-100"
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
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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