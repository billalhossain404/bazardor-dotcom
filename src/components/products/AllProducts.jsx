import React from 'react';
import { IoTriangle } from 'react-icons/io5';

const AllProducts = async() => {

     const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data = await res.json();
    const AllProducts = data;

    return (
        <div className='px-40 pt-5 pb-25 bg-[#eff4ef]'>
            <div className='mb-5'>
                <h1 className='text-2xl font-bold'>সব পণ্য</h1>
                <p className='text-[#5f6761]'>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            </div>

            <div className="w-full grid grid-cols-3 gap-5 ">

            {AllProducts.map(incP => (
                <div key={incP.id} className="bg-[#fbfdfb] border border-[#dfe7df] rounded-[22px] p-5">

                    <div className="flex items-center gap-4">

                        <div className="w-15 h-15 bg-[#f0f5f1] rounded-2xl flex items-center justify-center text-3xl">
                            {incP.categoryIcon}
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#1e2a20]"> {incP.nameBn} </h3>
                            <p className="text-sm text-gray-500"> প্রতি কেজি</p>
                        </div>

                    </div>

                    <div className="flex items-end justify-between mt-5">

                        <div>
                            <p className="text-sm text-gray-500"> আজকের দাম </p>

                            <h2 className="text-2xl font-bold text-[#1e2a20]"> {incP.today} <span className="text-base font-normal ml-1">  টাকা</span> </h2>
                        </div>

                        <span className={"flex items-center gap-2 bg-[#f0f5f1] rounded-full px-4 py-1 text-sm font-medium " + (incP.change.dir === "up" ? "text-red-600" : "text-green-600")}>

                            <IoTriangle className={"text-xs " + (incP.change.dir === "down" ? "rotate-180" : "")} />
                            {Math.abs(Number(incP.change.pct))}%

                        </span>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default AllProducts;