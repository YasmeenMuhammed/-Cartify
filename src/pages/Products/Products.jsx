import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { FaBoxOpen } from "react-icons/fa";

import ProductCard from "../../Components/ProductCard";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { getAllProducts } from "../../services/products-services";
import HomeLoading from "../Home/HomeLoading";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 20;

  const categoryId = searchParams.get("category[in]");
  const brandId = searchParams.get("brand");

  async function fetchProducts() {
    try {
      setIsLoading(true);

      const response = await getAllProducts({
        category: categoryId,
        brand: brandId,
        page: currentPage,
        limit: LIMIT,
      });
      setIsLoading(false);
      console.log(response);

      setProducts(response?.data?.data || []);
      setTotalPages(response?.data?.metadata?.numberOfPages || 1);

    } catch (error) {
      setIsLoading(false);

      console.log(error);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [categoryId, brandId, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, brandId]);
  const hasProducts = products.length > 0;


  if (isLoading) return <HomeLoading />

  return (
    <>
      <PageMetaData title={"All Products"} />
      {/* Breadcrumb */}

      {!categoryId && !brandId ? (
        <BreadCrumb
          title="All Products"
          description="Explore our complete product collection"
          icon={<FaBoxOpen />}
        />
      ) : hasProducts ? (
        <BreadCrumb
          title={
            brandId
              ? products?.[0]?.brand?.name
              : products?.[0]?.category?.name
          }
          description={
            brandId
              ? `Discover top ${products?.[0]?.brand?.name} and find the perfect products for your needs`
              : `Discover top ${products?.[0]?.category?.name} and find the perfect products for your needs`
          }
          icon={
            brandId ? (
              <img
                src={products?.[0]?.brand?.image}
                alt={products?.[0]?.brand?.name}
                className="size-16 rounded-2xl bg-white/20 backdrop-blur-sm object-contain"
              />
            ) : (
              <img
                src={products?.[0]?.category?.image}
                alt={products?.[0]?.category?.name}
                className="size-16 rounded-2xl bg-white/20 backdrop-blur-sm object-contain"
              />
            )
          }
        />
      ) : (
        <BreadCrumb
          title="All Products"
          description="Explore our complete product collection"
          icon={<FaBoxOpen />}
        />
      )}

      <div className="container py-4">
        {/* Filters */}

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {brandId || categoryId ? (
            <>
              <span className="font-semibold text-gray-700">
                Active Filters:
              </span>

              {hasProducts && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  <span>
                    {brandId
                      ? products?.[0]?.brand?.name
                      : products?.[0]?.category?.name}
                  </span>

                  <button
                    onClick={() => {
                      setSearchParams({});
                    }}
                    className="text-lg leading-none hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              )}
            </>
          ) : (
            <span className="font-semibold text-gray-700">
              All Products
            </span>
          )}

          {(brandId || categoryId) && (
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="text-sm text-gray-500 underline hover:text-black"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Products */}

        {hasProducts ? (
          <>
            <p className="mb-6 text-gray-500">
              Showing {products.length} products
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  productInfo={product}
                />
              ))}
            </div>
            {
              totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">

                  {/* Prev */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="rounded-xl border px-4 py-2 disabled:opacity-50"
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
                        className={`size-10 rounded-xl transition
              ${currentPage === page
                            ? "bg-primary-500 text-white"
                            : "border hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="rounded-xl border px-4 py-2 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )
            }
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
              <FaBoxOpen className="text-4xl text-gray-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              No products match your current filters.
            </p>

            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="mt-8 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </>
  );
}