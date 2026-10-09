"use client";

import Image from "next/image";
import Link from "next/link";

const Banner = () => {

        const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    });

    return (
        <div className="bg-[#eff4ef] px-4 sm:px-6 lg:px-40 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[25px] border border-[#dfe7df] bg-[#fbfdfb] px-5 sm:px-8 py-6 md:min-h-[290px]">

                <div className="w-full md:w-2/3">
                    <p className="inline-block bg-[#e1f3e8] text-[#07883d] rounded-full px-4 py-1 text-sm font-medium">{date}</p>
                    <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2a20]">আজকের বাজারের দাম এক নজরে </h1>
                    <p className="mt-5 mb-8 max-w-[600px] text-sm sm:text-base leading-7 text-[#5f6761]"> চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিকএবং দামের পরিবর্তন এক জায়গায়।</p>
                    <Link href="/products" className="inline-block rounded-lg bg-[#0c9146] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_3px_rgba(12,145,70,0.4)] hover:bg-[#087a3a] transition-colors"> সব পণ্য দেখুন</Link>
                
                </div>

                <div className="flex w-full md:w-1/3 items-center justify-center md:justify-end">
                    <Image src="/bazar-hero.png" alt="Bazar Hero"width={300}height={250}priorityclassName="w-[200px] sm:w-[250px] lg:w-[280px] h-auto object-contain" />
                </div>

            </div>
        </div>
    );
};

export default Banner;
