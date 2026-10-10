import SortSelect from "@/components/SortSelected";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoTriangle } from "react-icons/io5";

const getCards = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data = await res.json();
    return data;
};

const PageDetails = async ({ params, searchParams }) => {

    const { slug } = await params;
    const { sort = "default" } = await searchParams;
    const cardData = await getCards();
    const products = cardData.filter((p) => p.categorySlug === slug || p.category?.slug === slug || p.category === slug);

    if (products.length === 0) {
        notFound();
    }
    if (sort === "low") {
        products.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sort === "high") {
        products.sort((a, b) => Number(b.today) - Number(a.today));
    }

    const singleCard = products[0];

    return (
        <div className="min-h-screen bg-[#eff4ef] px-4 sm:px-6 lg:px-40 py-5">
            <div className="flex items-center gap-3 bg-[#fbfdfb] border border-[#dfe7df] rounded-2xl p-5">
                <div className="w-12 h-12 bg-[#f0f5f1] rounded-xl flex items-center justify-center text-3xl">
                    {singleCard?.categoryIcon}
                </div>

                <div>
                    <h1 className="text-xl font-bold">{singleCard?.categoryNameBn || slug} </h1>
                    <p className="text-sm text-gray-500">প্রতি পণ্যের আজকের দাম ও পরিবর্তন </p>
                </div>

            </div>

            <div className="bg-[#fbfdfb] border border-[#dfe7df] rounded-2xl p-4 mt-4">

                <div className="flex items-center justify-end gap-3">
                    <span className="text-sm text-gray-500">সাজান</span>
                    <SortSelect sort={sort} />
                </div>

            </div>

            <p className="text-sm text-gray-500 mt-4 mb-3"> মোট {products.length}টি পণ্য দেখানো হচ্ছে </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">


                {products.map((incP) => (
                    <Link key={incP.id}  href={`/${slug}/${incP.id}`}
                        className="bg-[#fbfdfb] border border-[#e0e8df] rounded-2xl p-4">

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#f0f5f1] rounded-xl flex items-center justify-center text-2xl">
                                {incP.categoryIcon}
                            </div>

                            <div>
                                <h3 className="font-bold text-[#1e2a20]">{incP.nameBn}</h3>
                                <p className="text-sm text-gray-600"> প্রতি কেজি </p>
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-4">

                            <div>
                                <p className="text-xs text-gray-600"> আজকের দাম</p>
                                <h2 className="text-xl font-bold text-[#1e2a20]"> {incP.today}<span className="text-sm font-normal ml-1"> টাকা</span> </h2>
                            </div>

                            <span className={"flex items-center gap-1 bg-[#f1f5f1] rounded-full px-3 py-1 text-xs font-semibold " + (incP.change?.dir === "up"
                                ? "text-red-600"
                                : incP.change?.dir === "down"
                                    ? "text-green-600"
                                    : "text-gray-500")}>

                                {["up", "down"].includes(incP.change?.dir) && (
                                    <IoTriangle
                                        className={
                                            "text-[10px] " +
                                            (incP.change.dir === "down"
                                                ? "rotate-180"
                                                : "")} />
                                )}
                                {Math.abs(Number(incP.change?.pct ?? 0))}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PageDetails;
