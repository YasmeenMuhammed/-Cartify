import React from "react";
import {
    FaShieldAlt,
    FaUserLock,
    FaDatabase,
    FaCookieBite,
    FaEnvelope,
    FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

const sections = [
    {
        id: "information",
        title: "Information We Collect",
        icon: FaDatabase,
        text: "We collect information you provide when creating an account, placing orders, contacting support, or using our services.",
        list: [
            "Name, email address, and phone number",
            "Shipping and billing address",
            "Order history and saved preferences",
            "Payment details processed securely by payment providers",
        ],
    },
    {
        id: "usage",
        title: "How We Use Your Information",
        icon: FaCheckCircle,
        text: "Your information helps us provide a better shopping experience and improve our services.",
        list: [
            "Process and deliver your orders",
            "Send order updates and customer support messages",
            "Improve website performance and personalization",
            "Prevent fraud and protect your account",
        ],
    },
    {
        id: "protection",
        title: "How We Protect Your Data",
        icon: FaUserLock,
        text: "We use security measures to help keep your personal information safe from unauthorized access.",
        list: [
            "Encrypted checkout experience",
            "Secure account authentication",
            "Limited access to personal data",
            "Regular monitoring for suspicious activity",
        ],
    },
    {
        id: "cookies",
        title: "Cookies",
        icon: FaCookieBite,
        text: "Cartify uses cookies to remember preferences, improve navigation, and understand how visitors use our website.",
        list: [
            "Keep you signed in",
            "Save cart and wishlist activity",
            "Analyze website traffic",
            "Personalize product recommendations",
        ],
    },
];

export default function Privacy() {
    return (
        <>
            <PageMetaData title={"Privacy Policy"} />
            <section className="bg-gray-50 dark:bg-slate-950 py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-6 text-sm text-gray-500 dark:text-slate-400">
                        <Link to="/" className="hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-700 dark:text-slate-200">Privacy Policy</span>
                    </div>

                    {/* Header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary-100 text-2xl text-primary-600">
                            <FaShieldAlt />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 md:text-4xl">
                            Privacy Policy
                        </h1>

                        <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-slate-400">
                            Your privacy matters to us. This policy explains how Cartify
                            collects, uses, and protects your personal information.
                        </p>

                        <p className="mt-3 text-sm text-gray-400 dark:text-slate-500">
                            Last updated: January 2026
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Sidebar */}
                        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="mb-4 font-bold text-gray-900 dark:text-slate-100">Policy Sections</h2>

                            <ul className="space-y-2">
                                {sections.map((section) => {
                                    const Icon = section.icon;

                                    return (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-950 hover:text-primary-600 dark:hover:text-primary-400"
                                            >
                                                <Icon />
                                                {section.title}
                                            </a>
                                        </li>
                                    );
                                })}

                                <li>
                                    <a
                                        href="#contact"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 transition hover:bg-primary-50 dark:hover:bg-slate-950 hover:text-primary-600 dark:hover:text-primary-400"
                                    >
                                        <FaEnvelope />
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </aside>

                        {/* Content */}
                        <div className="space-y-6 lg:col-span-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                                    Overview
                                </h2>

                                <p className="mt-4 leading-7 text-gray-600 dark:text-slate-400">
                                    At Cartify, we respect your privacy and are committed to
                                    protecting your personal data. This Privacy Policy explains what
                                    information we collect, why we collect it, and how we keep it
                                    secure while you use our website and services.
                                </p>
                            </div>

                            {sections.map((section) => {
                                const Icon = section.icon;

                                return (
                                    <div
                                        key={section.id}
                                        id={section.id}
                                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex size-11 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                                <Icon />
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                                                {section.title}
                                            </h2>
                                        </div>

                                        <p className="leading-7 text-gray-600 dark:text-slate-400">{section.text}</p>

                                        <ul className="mt-5 space-y-3">
                                            {section.list.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex gap-3 text-gray-600 dark:text-slate-400"
                                                >
                                                    <FaCheckCircle className="mt-1 shrink-0 text-primary-500" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}

                            <div
                                id="contact"
                                className="rounded-xl border border-primary-100 bg-primary-50 p-6 md:p-8 dark:border-primary-600/30 dark:bg-slate-900/80"
                            >
                                <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                                    Contact Us
                                </h2>

                                <p className="mt-3 leading-7 text-gray-600 dark:text-slate-400">
                                    If you have any questions about this Privacy Policy or how your
                                    data is handled, please contact our support team.
                                </p>

                                <div className="mt-5 space-y-2 text-gray-700 dark:text-slate-300">
                                    <p>
                                        <span className="font-semibold">Email:</span>{" "}
                                        support@cartify.com
                                    </p>
                                    <p>
                                        <span className="font-semibold">Phone:</span>{" "}
                                        +1 (800) 123-4567
                                    </p>
                                    <p>
                                        <span className="font-semibold">Address:</span>{" "}
                                        123 Commerce Street, New York, NY 10001
                                    </p>
                                </div>

                                <Link
                                    to="/contact"
                                    className="mt-5 inline-flex rounded-lg bg-primary-500 px-5 py-3 font-medium text-white transition hover:bg-primary-700"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}