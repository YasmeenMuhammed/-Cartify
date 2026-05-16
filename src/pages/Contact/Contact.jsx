import React from "react";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaShippingFast,
    FaUndoAlt,
    FaShieldAlt,
    FaHeadset,
} from "react-icons/fa";
import { Link } from "react-router";

export default function Contact() {
    return (
        <section className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary-500">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">Contact Us</span>
                </div>

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-3 text-gray-500">
                        We'd love to hear from you. Get in touch with our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="space-y-5">
                        <ContactInfoCard
                            icon={<FaPhoneAlt />}
                            title="Phone"
                            subtitle="Mon-Fri from 8am to 6pm"
                            text="+1 (800) 123-4567"
                        />

                        <ContactInfoCard
                            icon={<FaEnvelope />}
                            title="Email"
                            subtitle="We'll respond within 24 hours"
                            text="support@cartify.com"
                        />

                        <ContactInfoCard
                            icon={<FaMapMarkerAlt />}
                            title="Office"
                            subtitle="123 Commerce Street"
                            text="New York, NY 10001, United States"
                        />

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                    <FaClock />
                                </div>
                                <h3 className="font-bold text-gray-900">Business Hours</h3>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Monday - Friday: 8am - 6pm</p>
                                <p>Saturday: 9am - 4pm</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h3 className="mb-4 font-bold text-gray-900">Follow Us</h3>

                            <div className="flex gap-3">
                                {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                                    (Icon, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition hover:bg-primary-500 hover:text-white"
                                        >
                                            <Icon />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Send us a Message
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Fill out the form and we'll get back to you
                            </p>

                            <form className="mt-6 space-y-5">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Subject
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-500 outline-none transition focus:border-primary-500">
                                        <option>Select a subject</option>
                                        <option>General Inquiry</option>
                                        <option>Order Support</option>
                                        <option>Shipping Question</option>
                                        <option>Returns & Refunds</option>
                                        <option>Product Information</option>
                                        <option>Feedback & Suggestions</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        rows="6"
                                        placeholder="Write your message here..."
                                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition hover:bg-primary-700"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Help Center */}
                        <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                Looking for quick answers?
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Check out our Help Center for frequently asked questions about
                                orders, shipping, returns, and more.
                            </p>

                            <Link
                                to="/help"
                                className="mt-4 inline-block font-medium text-primary-600 hover:text-primary-800"
                            >
                                Visit Help Center →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        icon={<FaShippingFast />}
                        title="Free Shipping"
                        text="On orders over 500 EGP"
                    />
                    <FeatureCard
                        icon={<FaUndoAlt />}
                        title="Easy Returns"
                        text="14-day return policy"
                    />
                    <FeatureCard
                        icon={<FaShieldAlt />}
                        title="Secure Payment"
                        text="100% secure checkout"
                    />
                    <FeatureCard
                        icon={<FaHeadset />}
                        title="24/7 Support"
                        text="Contact us anytime"
                    />
                </div>
            </div>
        </section>
    );
}

function ContactInfoCard({ icon, title, subtitle, text }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    {icon}
                </div>

                <div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                    <p className="mt-2 font-medium text-gray-800">{text}</p>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, text }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-100 text-xl text-primary-600">
                {icon}
            </div>
            <h4 className="mt-4 font-bold text-gray-900">{title}</h4>
            <p className="mt-1 text-sm text-gray-500">{text}</p>
        </div>
    );
}