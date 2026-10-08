'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full"
});

    return (
        <div>
            
        <div className='flex justify-between px-40 mt-5'>

            <div className='flex items-center gap-3'>
                <Image className='bg-[#05893E] rounded-xl p-3' height={50} width={50} src={"/logo-icon.png"} alt='Bazardor.com'></Image>
                <div>
                    <h2 className='text-2xl font-bold'>বাজার দর</h2>
                    <p className='text-[#1D271F]'>{date}</p>
                </div>
            </div>

            <div className='flex gap-4 text-[15px] font-semibold justify-center items-center'>
                <Link href="/sign-in">সাইন ইন</Link>
                <Link href="/sign-up" className='bg-[#0c9146] rounded-md px-3 py-2 text-white shadow-[0_5px_4px_-1px_rgba(12,145,70,0.5)]'>সাইন আপ</Link>
            </div>
            
        </div>
        <hr className="divider text-gray-200 mt-4" />
        </div>
    );
};

export default Header;