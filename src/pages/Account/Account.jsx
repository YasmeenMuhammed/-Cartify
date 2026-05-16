import React, { useContext, useState, useEffect } from "react";
import {
    FaRegUser,
    FaShoppingBag,
    FaMapMarkerAlt,
    FaCreditCard,
    FaBell,
    FaSignOutAlt,
    FaPlus,
    FaTrash,
} from "react-icons/fa";
import Orders from "../Orders/Orders";
import { AuthContext } from "../../Context/Auth.context";
import { addAddress, deleteAddress, getAllAddresses } from "../../services/address-services";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

const tabs = [
    { id: "settings", label: "Account Settings", icon: FaRegUser },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "address", label: "My Address", icon: FaMapMarkerAlt },
    { id: "payment", label: "Payment Method", icon: FaCreditCard },
    { id: "notification", label: "Notification", icon: FaBell },
];



export default function Account() {
    const [activeTab, setActiveTab] = useState("settings");
    const { logOut } = useContext(AuthContext)

    return (
        <>
            <PageMetaData title={"Account"} />
            <section className="bg-gray-50 py-10">
                <div className="container mx-auto px-4">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">My Account</h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Sidebar */}
                        <aside className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <ul className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;

                                    return (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${activeTab === tab.id
                                                    ? "bg-primary-500 text-white"
                                                    : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                                                    }`}
                                            >
                                                <Icon className="text-lg" />
                                                {tab.label}
                                            </button>
                                        </li>
                                    );
                                })}

                                <li className="border-t border-gray-100 pt-2">
                                    <button
                                        onClick={logOut}
                                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600">
                                        <FaSignOutAlt className="text-lg" />
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </aside>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            {activeTab === "settings" && <AccountSettings />}
                            {activeTab === "orders" && <Orders />}
                            {activeTab === "address" && <MyAddress />}
                            {activeTab === "payment" && <EmptyState title="No payment method" text="Add your payment method later." />}
                            {activeTab === "notification" && <Notifications />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function AccountSettings() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">Account Settings</h2>
            <p className="mb-6 text-sm text-gray-500">
                Manage your personal information and account details.
            </p>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Yasmeen Muhammed"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="yasmeen@gmail.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        type="tel"
                        placeholder="+20 100 123 4567"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-primary-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <button className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition hover:bg-primary-700">
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
}

function MyAddress() {
    const [addressesList, setAddressesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ name: "", details: "", phone: "", city: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    async function fetchAddresses() {
        try {
            setIsLoading(true);
            const response = await getAllAddresses();
            if (response?.success) {
                setAddressesList(response.data?.data || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAddAddress(e) {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await addAddress(formData);
            if (response?.success) {
                toast.success("Address added successfully");
                setFormData({ name: "", details: "", phone: "", city: "" });
                setIsAdding(false);
                fetchAddresses();
            }
        } catch (error) {
            toast.error("Failed to add address");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteAddress(id) {
        try {
            const response = await deleteAddress(id);
            if (response?.success) {
                toast.success("Address deleted");
                fetchAddresses();
            }
        } catch (error) {
            toast.error("Failed to delete address");
        }
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">My Address</h2>
                    <p className="text-sm text-gray-500">
                        Manage your saved delivery addresses.
                    </p>
                </div>

                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-700">
                        <FaPlus />
                        Add Address
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleAddAddress} className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
                    <h3 className="mb-4 text-lg font-bold">Add New Address</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Name (e.g., Home, Work)</label>
                            <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                            <input required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} type="text" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                            <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="text" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Details / Street</label>
                            <input required value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} type="text" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAdding(false)} className="rounded-lg px-4 py-2 font-medium text-gray-600 hover:bg-gray-200">Cancel</button>
                        <button disabled={isSubmitting} type="submit" className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-700 disabled:opacity-50">
                            {isSubmitting && <CgSpinner className="animate-spin text-lg" />}
                            Save Address
                        </button>
                    </div>
                </form>
            )}

            {isLoading ? (
                <div className="flex justify-center py-10"><CgSpinner className="animate-spin text-4xl text-primary-500" /></div>
            ) : addressesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {addressesList.map((item) => (
                        <div
                            key={item._id}
                            className="rounded-xl border border-gray-200 p-5 transition hover:border-primary-300 hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleDeleteAddress(item._id)} className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-100 hover:text-red-600">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                                <p className="font-medium text-gray-800">{item.city}</p>
                                <p>{item.phone}</p>
                                <p>{item.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState title="No saved addresses" text="You don't have any addresses saved yet." />
            )}
        </div>
    );
}

function Notifications() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-gray-900">Notification</h2>
            <p className="mb-6 text-sm text-gray-500">
                Choose what notifications you want to receive.
            </p>

            <div className="space-y-4">
                {["Order updates", "New offers", "Product recommendations"].map((item) => (
                    <label
                        key={item}
                        className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                    >
                        <span className="font-medium text-gray-700">{item}</span>
                        <input type="checkbox" className="accent-primary-500" defaultChecked />
                    </label>
                ))}
            </div>
        </div>
    );
}

function EmptyState({ title, text }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-gray-500">{text}</p>
        </div>
    );
}