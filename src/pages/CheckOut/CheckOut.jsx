import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import {
  FaClipboardList,
  FaHome,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaLock,
  FaTruck,
  FaUndo,
  FaArrowLeft,
  FaShoppingBag,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import { CartContext } from './../../Context/Cart.context';
import HomeLoading from './../Home/HomeLoading';
import { createOrder } from "../../services/payment-services";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();

  const { cartInfo, isLoading, setCartInfo } = useContext(CartContext);

  const validationSchema = yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    shippingAddress: yup.object({
      details: yup.string().required("Street address is required"),
      phone: yup.string().required("Phone number is required").matches(/^01[0-2,5][0-9]{8}$/, "Invalid Egyptian phone number"),
      city: yup.string().required("City is required"),
    })
  })


  async function handleCreatingOrder(values) {
    try {
      const response = await createOrder({
        cartId,
        shippingAddress: values.shippingAddress,
        paymentMethod: values.paymentMethod,
      })
      console.log(response);
      if (response.success) {
        if (response.data.session) {
          toast.loading('your order is being processed...');
          setTimeout(() => {
            window.location.href = response.data.session.url;
          }, 3000);
        } else {
          toast.success('Order placed successfully!');
          setTimeout(() => {
            navigate('/allorders');
          }, 3000);
          setCartInfo({
            noOfCartItems: 0,
            data: {
              products: [],
              totalCartPrice: 0,
            }
          });
        }
      }

    } catch (error) {
      console.error("Error creating order:", error);
    }


  }



  const formik = useFormik({
    initialValues: {
      paymentMethod: "online",

      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    validationSchema: validationSchema,
    onSubmit: handleCreatingOrder,
  });




  if (isLoading) { return <HomeLoading /> }

  const { cartId, noOfCartItems, data } = cartInfo || {};
  const { totalCartPrice = 0, products = [] } = data || {};






  const subtotal = products.reduce(
    (acc, prod) => acc + prod.count * prod.price,
    0
  );

  function handlePaymentMethodChange(e) {
    formik.setFieldValue("paymentMethod", e.target.value);
  }


  return (
    <div className="min-h-screen bg-[#f5f6f8] py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* Breadcrumb */}
          <ul className='flex items-center text-sm text-gray-500 mb-4'>
            <li className='flex items-center '>
              <NavLink to={'/'} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                <IoMdHome className='text-xl' />
                <span className='mt-1'>Home</span>
              </NavLink>
              <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
            </li>
            <li className='flex items-center '>
              <NavLink to={'/cart'} className='text-gray-500 hover:text-primary-600 transition flex gap-1 items-center justify-center'>
                <span className='mt-1'>Cart</span>
              </NavLink>
              <MdOutlineKeyboardArrowRight className='text-xl mt-1' />
            </li>
            <li className='flex items-center '>
              <NavLink to={'/checkout'} className='text-gray-800 transition flex gap-1 items-center justify-center'>
                <span className='mt-1'>CheckOut</span>
              </NavLink>
            </li>
          </ul>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md">
                <FaClipboardList className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-slate-900">
                  Complete Your Order
                </h1>
                <p className=" text-gray-500">
                  Review your items and complete your purchase
                </p>
              </div>
              <div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-violet-700">
              <FaArrowLeft />
              Back to Cart
            </button>
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[3fr_380px]">
            {/* Left Side */}
            <div className="space-y-3">
              {/* Shipping Address */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-violet-600 px-6 py-3 text-white">
                  <div className="flex items-center gap-3">
                    <FaHome className="text-lg" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        Shipping Address
                      </h2>
                      <p className="text-sm text-violet-100">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-5 p-6">
                  {/* Alert */}
                  <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                    <div className="mt-1 text-blue-500">
                      <FaInfoCircle />
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-700">
                        Delivery Information
                      </h4>

                      <p className="text-sm text-blue-500">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-3 transition focus-within:border-violet-500">
                      <FaHome className="text-gray-400" />

                      <input
                        type="text"
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                        value={formik.values.shippingAddress.city}
                        name="shippingAddress.city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                    </div>
                    {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
                      <div className="text-red-500 text-xs mt-1">
                        *{formik.errors.shippingAddress.city}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Street Address <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-3 transition focus-within:border-violet-500">
                      <FaMapMarkerAlt className="mt-1 text-gray-400" />

                      <textarea
                        value={formik.values.shippingAddress.details}
                        name="shippingAddress.details"
                        onChange={formik.handleChange}
                        rows="3"
                        placeholder="Street name, building number, floor, apartment..."
                        className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        onBlur={formik.handleBlur}
                      />

                    </div>
                    {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
                      <div className="text-red-500 text-xs mt-1">
                        *{formik.errors.shippingAddress.details}
                      </div>
                    )}
                  </div>


                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition focus-within:border-violet-500">
                      <FaPhoneAlt className="text-gray-400" />

                      <input
                        type="text"
                        placeholder="01xxxxxxxxx"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                        value={formik.values.shippingAddress.phone}
                        name="shippingAddress.phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <span className="text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>
                    {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
                      <div className="text-red-500 text-xs mt-1">
                        *{formik.errors.shippingAddress.phone}
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="bg-primary-700 px-4 py-3 text-white">
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-lg" />

                    <div>
                      <h2 className="text-lg font-semibold">
                        Payment Method
                      </h2>

                      <p className="text-sm text-violet-100">
                        Choose how you'd like to pay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  {/* Cash On Delivery */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition ${formik.values.paymentMethod === "cash"
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 bg-white hover:border-violet-300"
                      }`}
                    htmlFor="cash"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex size-10 items-center justify-center rounded-xl ${formik.values.paymentMethod === "cash"
                          ? "bg-violet-500 text-white"
                          : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        <FaMoneyBillWave className="text-lg" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Cash on Delivery
                        </h3>

                        <p className="text-sm text-gray-500">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                    </div>

                    {/* Hidden Radio */}
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formik.values.paymentMethod === "cash"}
                      onChange={(e) => handlePaymentMethodChange(e)}
                      className="hidden"
                    />

                    {/* Custom Check Circle */}
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${formik.values.paymentMethod === "cash"
                        ? "border-violet-600 bg-violet-600 text-white"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      {formik.values.paymentMethod === "cash" && "✓"}
                    </div>
                  </label>
                  {/* Pay Online */}
                  {/* Pay Online */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${formik.values.paymentMethod === "online"
                      ? "border-violet-500 bg-[#f4fbf8]"
                      : "border-gray-200 bg-white hover:border-violet-300"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex size-10 items-center justify-center rounded-2xl shadow-md ${formik.values.paymentMethod === "online"
                          ? "bg-linear-to-br from-cyan-500 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <FaCreditCard className="text-xl" />
                      </div>

                      <div>
                        <h3
                          className={`font-semibold ${formik.values.paymentMethod === "online"
                            ? "text-violet-700"
                            : "text-slate-900"
                            }`}
                        >
                          Pay Online
                        </h3>

                        <p className="text-sm text-gray-500">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>

                        {/* Cards */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            VISA
                          </span>

                          <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-blue-900">
                            MC
                          </span>

                          <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            AMEX
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hidden Radio */}
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formik.values.paymentMethod === "online"}
                      onChange={(e) => handlePaymentMethodChange(e)}
                      className="hidden"
                    />

                    {/* Custom Check Circle */}
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${formik.values.paymentMethod === "online"
                        ? "border-violet-600 bg-violet-600 text-white"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      {formik.values.paymentMethod === "online" && "✓"}
                    </div>
                  </label>
                  {/* Security Box */}
                  <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                      <FaShieldAlt />
                    </div>

                    <div>
                      <h4 className="font-semibold text-violet-700">
                        Secure & Encrypted
                      </h4>

                      <p className="text-sm text-violet-600">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Right Side */}
            <div className="h-fit overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="bg-violet-600 px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <FaShoppingBag />

                  <div>
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <p className="text-sm text-violet-100">
                      {products.length} items
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="max-h-80 space-y-4 overflow-y-auto p-5">
                {products.map((product) => (
                  <Link to={`/product/${product.product._id}`} key={product.id} className="flex items-center gap-4 rounded-2xl bg-gray-50 p-3">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                        {product.product.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {product.count} × {product.price.toLocaleString()} EGP
                      </p>
                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {(product.count * product.price).toLocaleString()}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-4 border-t border-gray-100 px-6 py-5">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>{subtotal.toLocaleString()} EGP</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Shipping</span>

                  <span className="font-semibold text-violet-600">FREE</span>
                </div>

                <div className="flex items-end justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>

                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-violet-600">
                      {subtotal.toLocaleString()}
                    </span>

                    <span className="pb-1 text-sm text-gray-500">EGP</span>
                  </div>
                </div>

                {/* Button */}
                <button type="submit" className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-2 text-lg font-semibold text-white transition hover:bg-violet-700">
                  <FaLock />
                  {formik.values.paymentMethod === "cash"
                    ? "Place Order"
                    : "Proceed to Payment"
                  }
                </button>

                {/* Features */}
                <div className="flex items-center justify-center gap-5 pt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaLock className="text-violet-500" />
                    Secure
                  </div>

                  <div className="flex items-center gap-1">
                    <FaTruck className="text-blue-500" />
                    Fast Delivery
                  </div>

                  <div className="flex items-center gap-1">
                    <FaUndo className="text-orange-500" />
                    Easy Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >

  );
}