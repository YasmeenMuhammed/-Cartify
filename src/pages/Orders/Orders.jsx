import React, { useContext, useEffect, useState } from "react";
import {
  FaBox,
  FaShoppingBag,
  FaCalendarAlt,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaPhoneAlt,
} from "react-icons/fa";

import { IoMdHome } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/Auth.context";
import { getUserOrder } from "../../services/order-services";
import HomeLoading from "../Home/HomeLoading";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Orders() {
  const { userInfo } = useContext(AuthContext);

  const [openOrder, setOpenOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setIsError] = useState(null);

  async function fetchOrders() {
    try {
      setIsLoading(true);

      const response = await getUserOrder({
        userId: userInfo.id,
      });

      if (response.success) {
        setOrders(response.data);
        console.log(response);
      }
    } catch (error) {
      setIsError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userInfo?.id) {
      fetchOrders();
    }
  }, [userInfo]);

  if (isLoading) return <HomeLoading />;

  return (
    <>
      <PageMetaData title={"Orders"} />
      <div className="min-h-screen bg-[#f5f6f8] py-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Breadcrumb */}
          <ul className="mb-5 flex items-center text-sm text-gray-500">
            <li className="flex items-center">
              <NavLink
                to="/"
                className="flex items-center gap-1 transition hover:text-violet-600"
              >
                <IoMdHome className="text-lg" />
                <span>Home</span>
              </NavLink>

              <MdOutlineKeyboardArrowRight className="mt-0.5 text-md" />
            </li>

            <li>
              <span className="font-medium text-slate-800">My Orders</span>
            </li>
          </ul>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-lg shadow-violet-200">
                <FaBox className="text-2xl" />
              </div>

              <div>
                <h1 className="text-4xl font-black text-slate-900">
                  My Orders
                </h1>

                <p className="mt-1 text-gray-500">
                  Track and manage your orders
                </p>
              </div>
            </div>

            <Link to={'/'} className="hidden items-center gap-2 font-medium text-violet-600 transition hover:text-violet-700 md:flex">
              <FaShoppingBag className="text-sm" />
              Continue Shopping
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl bg-red-100 px-4 py-3 text-red-600">
              {error}
            </div>
          )}

          {/* Empty Orders */}
          {!orders.length && !isLoading && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <FaBox className="mx-auto mb-4 text-5xl text-gray-300" />

              <h2 className="text-2xl font-bold text-slate-800">
                No Orders Yet
              </h2>

              <p className="mt-2 text-gray-500">
                You haven't placed any orders yet.
              </p>
            </div>
          )}

          {/* Orders */}
          <div className="space-y-5">
            {orders.map((order) => {
              const isOpen = openOrder === order.id;

              const totalItems = order.cartItems.reduce(
                (total, item) => total + item.count,
                0
              );

              return (
                <div
                  key={order._id}
                  className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 ${isOpen
                    ? "border-violet-200"
                    : "border-gray-200 hover:shadow-md"
                    }`}
                >
                  {/* Main Card */}
                  <div className="p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      {/* Left */}
                      <div className="flex items-start gap-5">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                            <img
                              src={
                                order.cartItems[0]?.product?.imageCover
                              }
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {order.cartItems.length > 1 && (
                            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                              +{order.cartItems.length - 1}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div>
                          {/* Status */}
                          <div
                            className={`mb-3 flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${order.isPaid
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                              }`}
                          >
                            <span className="h-2 w-2 rounded-full bg-current"></span>

                            {order.isPaid ? "Paid" : "Cash"}
                          </div>

                          {/* Order Number */}
                          <h2 className="text-2xl font-black text-slate-900">
                            #{order.id}
                          </h2>

                          {/* Meta */}
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-xs" />

                              {new Date(
                                order.createdAt
                              ).toLocaleDateString()}
                            </div>

                            <span>•</span>

                            <div className="flex items-center gap-1">
                              <FaBoxOpen className="text-xs" />
                              {totalItems} items
                            </div>

                            <span>•</span>

                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-xs" />
                              {order.shippingAddress.city}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mt-5 flex items-end gap-1">
                            <span className="text-xl font-black text-slate-900">
                              {order.totalOrderPrice.toLocaleString()}
                            </span>

                            <span className="pb-1 text-sm font-semibold text-gray-400">
                              EGP
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-row items-end justify-between gap-5 lg:flex-col">
                        {/* Payment */}
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${order.paymentMethodType === "card"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {order.paymentMethodType === "card" ? (
                            <FaCreditCard className="text-xl" />
                          ) : (
                            <FaMoneyBillWave className="text-xl" />
                          )}
                        </div>

                        {/* Toggle Button */}
                        <button
                          onClick={() =>
                            setOpenOrder(isOpen ? null : order.id)
                          }
                          className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition ${isOpen
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                            : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                            }`}
                        >
                          {isOpen ? "Hide" : "Details"}

                          {isOpen ? (
                            <FaChevronUp className="text-xs" />
                          ) : (
                            <FaChevronDown className="text-xs" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <div
                    className={`grid transition-all duration-500 ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-gray-100 bg-[#fcfcfc] p-5">
                        {/* Order Items */}
                        <div className="mb-6">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                              <FaClipboardList className="text-sm" />
                            </div>

                            <h3 className="font-bold text-slate-900">
                              Order Items
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {order.cartItems.map((product) => (
                              <div
                                key={product._id}
                                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                      src={
                                        product.product.imageCover
                                      }
                                      alt=""
                                      className="h-full w-full object-cover"
                                    />
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-slate-800">
                                      {product.product.title}
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.count} ×{" "}
                                      {product.price.toLocaleString()} EGP
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <h4 className="text-xl font-black text-slate-900">
                                    {(
                                      product.price * product.count
                                    ).toLocaleString()}
                                  </h4>

                                  <span className="text-sm font-semibold text-gray-400">
                                    EGP
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Cards */}
                        <div className="grid gap-4 lg:grid-cols-2">
                          {/* Address */}
                          <div className="rounded-3xl border border-gray-100 bg-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaMapMarkerAlt className="text-sm" />
                              </div>

                              <h3 className="font-bold text-slate-900">
                                Delivery Address
                              </h3>
                            </div>

                            <div className="space-y-3 text-gray-600">
                              <p className="font-semibold text-slate-800">
                                {order.shippingAddress.city}
                              </p>

                              <p>
                                {order.shippingAddress.details}
                              </p>

                              <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-sm text-gray-400" />

                                {order.shippingAddress.phone}
                              </div>
                            </div>
                          </div>

                          {/* Summary */}
                          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-5">
                            <div className="mb-4 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <FaMoneyBillWave className="text-sm" />
                              </div>

                              <h3 className="font-bold text-slate-900">
                                Order Summary
                              </h3>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-gray-600">
                                <span>Subtotal</span>

                                <span>
                                  {order.totalOrderPrice.toLocaleString()} EGP
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-gray-600">
                                <span>Shipping</span>

                                <span>Free</span>
                              </div>

                              <div className="border-t border-yellow-200 pt-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-slate-900">
                                    Total
                                  </span>

                                  <span className="text-3xl font-black text-slate-900">
                                    {order.totalOrderPrice.toLocaleString()} EGP
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}