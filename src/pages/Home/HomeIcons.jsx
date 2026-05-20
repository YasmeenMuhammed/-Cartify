import React from 'react'
import { FaShieldAlt, FaTruck } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { IoHeadsetSharp } from 'react-icons/io5'
import { motion } from "framer-motion";

const features = [
    {
        icon: FaTruck,
        title: "Free Shipping",
        desc: "On orders over 500 EGP",
        bg: "bg-blue-200",
        color: "text-blue-500",
    },
    {
        icon: FaShieldAlt,
        title: "Secure Payment",
        desc: "100% secure transactions",
        bg: "bg-violet-50",
        color: "text-violet-500",
    },
    {
        icon: FaArrowRotateLeft,
        title: "Easy Returns",
        desc: "14-day return policy",
        bg: "bg-orange-50",
        color: "text-orange-500",
    },
    {
        icon: IoHeadsetSharp,
        title: "24/7 Support",
        desc: "Dedicated support team",
        bg: "bg-purple-50",
        color: "text-purple-500",
    },
];
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2, 
             duration: 0.6, ease: [0.16, 1, 0.3, 1]
        },
    },
};
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function FeatureCard({ icon: Icon, title, desc, bg, color }) {
    return (
        <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white dark:bg-slate-900/60 border border-transparent dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl p-4 gap-4"
        >
            <div className={`rounded-full size-12 shrink-0 ${bg} dark:bg-slate-800/80 ${color} flex items-center justify-center text-lg`}>
                <Icon />
            </div>

            <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
export default function HomeIcons() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-8"
        >
            {features.map((item, index) => (
                <FeatureCard key={index} {...item} />
            ))}
        </motion.div>
    )
}
