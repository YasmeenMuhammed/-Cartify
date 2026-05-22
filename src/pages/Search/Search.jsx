import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router";

import {
  FaBoxOpen,
  FaCheck,
  FaChevronDown,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
} from "react-icons/fa";

import { Listbox } from "@headlessui/react";

import ProductCard from "../../Components/ProductCard";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import HomeLoading from "../Home/HomeLoading";

import { getAllProducts } from "../../services/products-services";

export default function Search() {

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // FILTERS
  // ======================

  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  // PAGINATION
  // ======================

  const PRODUCTS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);

  // SORT OPTIONS
  // ======================

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "low" },
    { label: "Price: High to Low", value: "high" },
    { label: "Name: A-Z", value: "az" },
  ];

  // FETCH PRODUCTS
  // ======================

  async function fetchProducts() {
    try {

      setIsLoading(true);

      const response = await getAllProducts();

      setProducts(response?.data?.data || []);

      setIsLoading(false);

    } catch (error) {

      console.log(error);

      setProducts([]);

      setIsLoading(false);

    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // CATEGORIES
  // ======================

  const categories = [
    ...new Set(
      products?.map((product) => product.category?.name)
    ),
  ];

  // FILTER + SEARCH + SORT
  // ======================

  const filteredProducts = useMemo(() => {

    let updatedProducts = [...products];

    // SEARCH

    if (keyword.trim()) {

      updatedProducts = updatedProducts.filter((product) => {

        const searchValue = keyword.toLowerCase();

        return (
          product.title?.toLowerCase().includes(searchValue) ||

          product.category?.name
            ?.toLowerCase()
            .includes(searchValue) ||

          product.brand?.name
            ?.toLowerCase()
            .includes(searchValue) ||

          product.description
            ?.toLowerCase()
            .includes(searchValue)
        );
      });
    }

    // PRICE

    updatedProducts = updatedProducts.filter(
      (product) => product.price <= maxPrice
    );

    // CATEGORY

    if (selectedCategory) {

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category?.name === selectedCategory
      );
    }

    // SORT

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
    keyword,
    maxPrice,
    selectedCategory,
    sortType,
  ]);

  // PAGINATION
  // ======================

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  // RESET PAGE ON FILTER CHANGE
  // ======================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    keyword,
    maxPrice,
    selectedCategory,
    sortType,
  ]);

  // LOADING
  // ======================

  if (isLoading) return <HomeLoading />;

  return (
    <>
      <BreadCrumb
        title={`Search: ${keyword}`}
        description={`Showing search results for "${keyword}"`}
        icon={<FaSearch />}
      />

      <div className="py-14 bg-[#f8fafc] dark:bg-slate-950">

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* SIDEBAR */}

            <div className="lg:col-span-3">

              <div className="sticky top-10 space-y-8 rounded-4xl border border-white/60 bg-white/90 p-6 shadow-xl dark:border-slate-700/40 dark:bg-slate-900/90">

                {/* PRICE */}

                <div>

                  <div className="mb-4 flex items-center justify-between">

                    <h3 className="font-bold text-gray-800 dark:text-slate-100">
                      Max Price
                    </h3>

                    <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
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
                    className="w-full cursor-pointer accent-violet-500"
                  />

                </div>

                {/* CATEGORIES */}

                <div>

                  <h3 className="mb-3 font-bold text-gray-800 dark:text-slate-100">
                    Categories
                  </h3>

                  <div className="space-y-2">

                    <button
                      onClick={() =>
                        setSelectedCategory("")
                      }
                      className={`w-full rounded-2xl px-4 py-3 text-left transition
                        ${selectedCategory === ""
                          ? "bg-violet-500 text-white"
                          : "bg-gray-100 text-gray-700"
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
                        className={`w-full rounded-2xl px-4 py-3 text-left transition
                          ${selectedCategory === category
                            ? "bg-violet-500 text-white"
                            : "bg-gray-100 text-gray-700"
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

                    <FaSortAmountDown className="text-violet-600" />

                    <h3 className="font-bold text-gray-800 dark:text-slate-100">
                      Sort By
                    </h3>

                  </div>

                  <Listbox
                    value={sortType}
                    onChange={setSortType}
                  >

                    <div className="relative">

                      <Listbox.Button className="relative w-full rounded-2xl border border-gray-200 bg-white py-4 pl-5 pr-12 text-left dark:border-slate-700 dark:bg-slate-900">

                        <span>
                          {
                            sortOptions.find(
                              (option) =>
                                option.value === sortType
                            )?.label
                          }
                        </span>

                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                          <FaChevronDown />
                        </span>

                      </Listbox.Button>

                      <Listbox.Options className="absolute bottom-full z-50 mb-3 w-full rounded-2xl bg-white shadow-xl dark:bg-slate-900 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

                        {sortOptions.map((option) => (

                          <Listbox.Option
                            key={option.value}
                            value={option.value}
                            className={({ active }) =>
                              `px-5 py-3 cursor-pointer
                              ${active
                                ? "bg-violet-500 text-white"
                                : ""
                              }`
                            }
                          >

                            {({ selected }) => (

                              <div className="flex items-center justify-between">

                                <span>{option.label}</span>

                                {selected && <FaCheck />}

                              </div>

                            )}

                          </Listbox.Option>

                        ))}

                      </Listbox.Options>

                    </div>

                  </Listbox>

                </div>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="lg:col-span-9">

              <div className="mb-6 flex items-center justify-between">


                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                  Search Results
                </h3>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Showing {currentProducts.length} of {filteredProducts.length}
                </p>

              </div>
              {/* ACTIVE FILTERS */}

              <div className="mb-8 flex flex-wrap items-center gap-3">

                <span className="font-semibold text-gray-700 dark:text-slate-200">
                  Active Filters:
                </span>

                {/* SEARCH */}

                {keyword && (
                  <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">

                    <span>
                      Search: {keyword}
                    </span>

                  </div>
                )}

                {/* CATEGORY */}

                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >

                    <span>
                      {selectedCategory}
                    </span>

                    <span className="text-lg leading-none">
                      ×
                    </span>

                  </button>
                )}

                {/* PRICE */}

                {maxPrice < 50000 && (
                  <button
                    onClick={() => setMaxPrice(50000)}
                    className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >

                    <span>
                      Max: {maxPrice} EGP
                    </span>

                    <span className="text-lg leading-none">
                      ×
                    </span>

                  </button>
                )}

                {/* SORT */}

                {sortType && (
                  <button
                    onClick={() => setSortType("")}
                    className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >

                    <span>
                      {
                        sortOptions.find(
                          (option) => option.value === sortType
                        )?.label
                      }
                    </span>

                    <span className="text-lg leading-none">
                      ×
                    </span>

                  </button>
                )}

                {/* CLEAR ALL */}

                {(selectedCategory ||
                  maxPrice < 50000 ||
                  sortType) && (

                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setMaxPrice(50000);
                        setSortType("");
                      }}
                      className="text-sm text-gray-500 underline hover:text-black dark:text-slate-400 dark:hover:text-slate-100"
                    >
                      Clear all
                    </button>
                  )}

              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                {currentProducts.length > 0 ? (

                  currentProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      productInfo={product}
                    />
                  ))

                ) : (

                  <div className="col-span-full rounded-3xl bg-white p-12 text-center dark:bg-slate-900">

                    <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-slate-100">
                      No Products Found
                    </h3>

                    <p className="text-gray-500 dark:text-slate-400">
                      Try another search keyword
                    </p>

                  </div>

                )}

              </div>

              {/* PAGINATION */}

              {totalPages > 1 && (

                <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    className="rounded-xl border bg-white px-4 py-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, index) => {

                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-11 w-11 rounded-xl transition
                          ${currentPage === page
                            ? "bg-violet-500 text-white"
                            : "border bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    className="rounded-xl border bg-white px-4 py-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Next
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}