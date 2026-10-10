import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoTriangle } from "react-icons/io5";

const getCards = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await res.json();
    return data;
};

const ProductDetails = async ({ params }) => {

    const { slug, productId } = await params;
    const cardData = await getCards();

    const product = cardData.find((p) => String(p.id) === String(productId) && (p.categorySlug === slug || p.category?.slug === slug || p.category === slug));

    if (!product) {
        notFound();
    }

    const markets = product.markets || [];

    const minPrice = markets.length ? Math.min(...markets.map(m => Number(m.min))) : null;
    const maxPrice = markets.length ? Math.max(...markets.map(m => Number(m.max))) : null;
    const averagePrice = markets.length ? markets.reduce((total, m) => total + (Number(m.min) + Number(m.max)) / 2, 0) / markets.length : null;
    const formatPrice = (price) => price == null ? "—" : Number(price).toLocaleString("bn-BD", { maximumFractionDigits: 2 });
    const priceChange = product.yesterday == null ? null : Number(product.today) - Number(product.yesterday);

    return (
        <div className="min-h-screen bg-[#eff4ef] px-4 sm:px-6 lg:px-40 py-5">

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#4c594e] mb-6">
                <Link href="/">হোম</Link><span>›</span>
                <Link href={`/${slug}`}> {product.categoryNameBn || slug}</Link> <span>›</span><span>{product.nameBn}</span>
            </div>

            <div className="bg-[#fbfdfb] border border-[#dfe7df] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f0f5f1] rounded-xl flex items-center justify-center text-3xl shrink-0">
                        {product.categoryIcon}
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-lg sm:text-xl font-bold text-[#1e2a20]"> {product.nameBn}</h1>
                        <p className="text-xs text-gray-500 mt-1">  প্রতি {product.unit || "কেজি"} · {product.categoryNameBn} </p>
                        {priceChange !== null && (<p className="text-[11px] text-gray-600 mt-2">  গতকালের তুলনায় আজ দাম {priceChange > 0 ? " বেড়েছে - " : priceChange < 0 ? " কমেছে - " : " অপরিবর্তিত - "} {formatPrice(Math.abs(priceChange))} টাকা </p>)}
                    </div>
                </div>

                <div className="bg-[#f0f5f1] rounded-xl px-4 py-3 text-center shrink-0 self-stretch sm:self-auto">

                    <p className="text-[11px] text-gray-500"> আজকের দাম</p>
                    <h2 className="text-2xl font-bold text-[#1e2a20] mt-1"> {formatPrice(product.today)}</h2>
                    <p className="text-[11px] text-gray-500"> টাকা / {product.unit || "কেজি"} </p>

                    <span className={"flex items-center justify-center gap-1 text-xs font-semibold mt-1 " + (product.change?.dir === "up"
                        ? "text-red-600"
                        : product.change?.dir === "down"
                            ? "text-green-600"
                            : "text-gray-500")}>

                        {["up", "down"].includes(product.change?.dir) && (
                            <IoTriangle className={
                                "text-[9px] " +
                                (product.change.dir === "down"
                                    ? "rotate-180"
                                    : "")} />)}

                        {formatPrice(Math.abs(Number(product.change?.pct ?? 0)))}%
                    </span>
                </div>
            </div>

            <div className="bg-[#fbfdfb] border border-[#dfe7df] rounded-2xl p-4 mt-4">

                <h2 className="text-sm font-bold text-[#1e2a20] mb-3"> দামের সারসংক্ষেপ </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                    <div className="bg-[#fbfdfb] border border-[#e2e9e2] rounded-xl p-4">

                        <p className="text-xs text-gray-500"> সর্বনিম্ন দাম</p>
                        <h3 className="text-xl font-bold text-green-600 mt-1"> {formatPrice(minPrice)}  <span className="text-xs ml-1">টাকা</span> </h3>
                        <p className="text-[11px] text-gray-500 mt-1">সবচেয়ে কম দামের বাজার </p>
                    </div>


                    <div className="bg-[#fbfdfb] border border-[#e2e9e2] rounded-xl p-4">

                        <p className="text-xs text-gray-500"> সর্বোচ্চ দাম</p>
                        <h3 className="text-xl font-bold text-red-600 mt-1"> {formatPrice(maxPrice)} <span className="text-xs ml-1">টাকা</span></h3>
                        <p className="text-[11px] text-gray-500 mt-1"> সবচেয়ে বেশি দামের বাজার </p>

                    </div>

                    <div className="bg-[#fbfdfb] border border-[#e2e9e2] rounded-xl p-4">
                        <p className="text-xs text-gray-500">  গড় দাম </p>
                        <h3 className="text-xl font-bold text-green-600 mt-1"> {formatPrice(averagePrice)} <span className="text-xs ml-1">টাকা</span></h3>
                        <p className="text-[11px] text-gray-500 mt-1"> প্রতি {product.unit || "কেজি"}-এর হিসাবে </p>
                    </div>
                </div>


                <h2 className="text-sm font-bold text-[#1e2a20] mt-6 mb-3"> বাজারভিত্তিক আজকের দাম </h2>

                <div className="border border-[#dfe7df] rounded-xl overflow-x-auto">
                    <table className="w-full min-w-[580px] text-xs text-left">

                        <thead className="bg-[#fbfdfb] text-gray-500">
                            <tr>
                                <th className="px-3 py-3 font-medium">  বাজার </th>
                                <th className="px-3 py-3 font-medium"> বিভাগ</th>
                                <th className="px-3 py-3 text-right font-medium"> সর্বনিম্ন</th>
                                <th className="px-3 py-3 text-right font-medium">  সর্বোচ্চ </th>
                                <th className="px-3 py-3 text-right font-medium"> গড়  </th>
                            </tr>
                        </thead>

                        <tbody>
                            {markets.map((market, index) => (
                                <tr key={index} className="border-t border-[#aeb9af] even:bg-[#f0f5f1]"  >

                                    <td className="px-3 py-2.5 text-[#1e2a20]"> {market.market} </td>
                                    <td className="px-3 py-2.5 text-gray-600">{market.division} </td>
                                    <td className="px-3 py-2.5 text-right"> {formatPrice(market.min)} টাকা   </td>
                                    <td className="px-3 py-2.5 text-right">  {formatPrice(market.max)} টাকা </td>
                                    <td className="px-3 py-2.5 text-right font-bold text-[#1e2a20]">  {formatPrice((Number(market.min) + Number(market.max)) / 2)} টাকা  </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {markets.length === 0 && (<p className="text-center text-gray-500 p-5 text-sm"> বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি। </p>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
