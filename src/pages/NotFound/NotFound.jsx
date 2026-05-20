import {
  FaAppleAlt,
  FaArrowLeft,
  FaCarrot,
  FaHome,
  FaLeaf,
  FaShoppingCart,
  FaSeedling,
} from "react-icons/fa";

const floatingIcons = [
  { Icon: FaAppleAlt, className: "left-[5%] top-[9%] text-3xl opacity-70" },
  { Icon: FaAppleAlt, className: "left-[15%] top-[53%] text-2xl opacity-35" },
  { Icon: FaLeaf, className: "left-[8%] bottom-[20%] text-3xl opacity-55 rotate-[-18deg]" },
  { Icon: FaCarrot, className: "right-[10%] top-[23%] text-2xl opacity-45 rotate-[-35deg]" },
  { Icon: FaCarrot, className: "right-[5%] top-[43%] text-xl opacity-25 rotate-[-35deg]" },
  { Icon: FaSeedling, className: "right-[15%] bottom-[9%] text-3xl opacity-60 rotate-[-12deg]" },
];

const destinations = ["All Products", "Categories", "Today's Deals", "Contact Us"];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfdfe] px-5 py-10 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_31%,rgba(34,197,94,0.11),transparent_18%),radial-gradient(circle_at_91%_16%,rgba(34,197,94,0.10),transparent_22%),radial-gradient(circle_at_6%_92%,rgba(34,197,94,0.10),transparent_19%)]" />

      {floatingIcons.map(({ Icon, className }, index) => (
        <Icon
          key={index}
          className={`pointer-events-none absolute text-violet-300 ${className}`}
          aria-hidden="true"
        />
      ))}

      <section className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="flex h-40 w-56 items-center justify-center rounded-[22px] border border-violet-50 bg-white/85 shadow-[0_24px_70px_rgba(16,185,129,0.16)] backdrop-blur">
            <FaShoppingCart className="text-7xl text-violet-400" aria-hidden="true" />
          </div>

          <div className="absolute -right-8 -top-6 grid h-24 w-24 place-items-center rounded-full border-[8px] border-white bg-violet-500 text-2xl font-black text-white shadow-[0_12px_24px_rgba(22,163,74,0.28)]">
            404
          </div>

          <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-start gap-4 text-violet-400">
            <span className="mt-3 h-3 w-3 rounded-full bg-current" />
            <span className="h-4 w-8 rounded-b-full border-b-2 border-current" />
            <span className="mt-3 h-3 w-3 rounded-full bg-current" />
          </div>
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-normal text-slate-950 sm:text-6xl">
          Oops! Nothing Here
        </h1>

        <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-slate-500">
          Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-violet-600 px-8 text-base font-extrabold text-white shadow-[0_10px_20px_rgba(22,163,74,0.28)] transition hover:-translate-y-0.5 hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            <FaHome className="text-lg" aria-hidden="true" />
            Go to Homepage
          </a>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 text-base font-extrabold text-slate-700 shadow-[0_4px_10px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <FaArrowLeft className="text-lg" aria-hidden="true" />
            Go Back
          </button>
        </div>

        <nav
          className="mt-14 w-full max-w-xl rounded-[22px] border border-slate-200 bg-white/90 px-8 py-7 shadow-[0_4px_12px_rgba(15,23,42,0.08)] backdrop-blur"
          aria-label="Popular destinations"
        >
          <p className="text-sm font-extrabold uppercase tracking-normal text-slate-400">
            Popular Destinations
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {destinations.map((item, index) => (
              <a
                key={item}
                href={index === 0 ? "/products" : "#"}
                className={`flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold transition ${index === 0
                  ? "bg-violet-50 text-violet-700 hover:bg-violet-100"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}
