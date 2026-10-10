import Link from 'next/link';
import React from 'react';
import { IoTriangle } from 'react-icons/io5';

const DecreasePrice = async () => {

    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data = await res.json();
    const DecreasePrice = data.filter(p => p.change?.dir === "down").slice(0, 6);

    return (
        <div className='px-4 sm:px-6 lg:px-40 pt-5 pb-10 bg-[#eff4ef]'>
            <div className='flex gap-3 '>
                <IoTriangle className="text-[10px] rotate-180 text-green-700 mt-2" />
                <h1 className=' text-2xl font-bold'>আজ দাম কমেছে</h1>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

                {DecreasePrice.map(incP => (
                    <Link key={incP.id} href={`/${incP.categorySlug || incP.category?.slug || (typeof incP.category === "string" ? incP.category : "")}/${incP.id}`}
                        className="bg-[#fbfdfb] border border-[#dfe7df] rounded-[22px] p-5" >

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#f0f5f1] rounded-xl flex items-center justify-center text-2xl">
                                {incP.categoryIcon}
                            </div>

                            <div className="min-w-0">
                                <h3 className="font-bold text-[#1e2a20] break-words">{incP.nameBn} </h3>
                                <p className="text-sm text-gray-600"> প্রতি কেজি</p>
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <p className="text-xs text-gray-600">আজকের দাম</p>
                                <h2 className="text-xl font-bold text-[#1e2a20]"> {incP.today} <span className="text-sm font-normal">টাকা</span> </h2>
                            </div>

                            <span className="flex items-center gap-1 bg-[#f1f5f1] text-green-600 rounded-full px-3 py-1 text-xs font-semibold">
                                <IoTriangle className="text-[10px] rotate-180" />
                                {Math.abs(Number(incP.change.pct))}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default DecreasePrice;