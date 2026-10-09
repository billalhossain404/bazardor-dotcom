
"use client";

import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";

const Header = () => {

    const { data: session, isPending } = useSession();

    // const date = new Date().toLocaleDateString("bn-BD", {
    //     dateStyle: "full"
    // });


    const authLinks = <>
        {!isPending && (
            session?.user ? (
                <details className="relative group">
                    <summary className="flex items-center gap-2 cursor-pointer list-none">
                        {session.user.image ? (
                            <Image
                                unoptimized
                                src={session.user.image}
                                alt="Profile"
                                width={38}
                                height={38}
                                className="rounded-xl object-cover w-9 h-9"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                {session.user.name?.charAt(0)}
                            </div>
                        )}

                        <span className="text-[14px] font-semibold">
                            {session.user.name?.split(" ")[0]}
                        </span>

                        <span className="text-xs text-gray-500 group-open:rotate-180 transition-transform">
                            <FiChevronDown />
                        </span>
                    </summary>

                    <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">

                        <div className="border-b border-gray-100 pb-3 mb-3">
                            <h3 className="font-semibold text-[15px] text-gray-800">
                                {session.user.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1 break-all">
                                {session.user.email}
                            </p>
                        </div>

                        <Link
                            href="/profile"
                            className="flex items-center gap-2 text-[14px] text-gray-700 hover:text-green-600 py-2"
                        >
                            <span><LuUserRound /></span>
                            আমার প্রোফাইল
                        </Link>

                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="flex items-center gap-2 text-[14px] text-red-500 hover:text-red-600 py-2 cursor-pointer w-full"
                        >
                            <span>↪</span>
                            সাইন আউট
                        </button>

                    </div>

                </details>
            ) : (
                <div className="flex gap-4 text-[15px] font-semibold justify-center items-center">
                    <Link href="/sign-in">
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="bg-[#0c9146] rounded-md px-3 py-2 text-white shadow-[0_5px_4px_-1px_rgba(12,145,70,0.5)]"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )
        )}
    </>;


    return (
        <div>

            <div className="flex justify-between items-center px-40 mt-5">

                <Link href="/">
                    <div className="flex items-center gap-3">
                        <Image
                            className="bg-[#05893E] rounded-xl p-3"
                            height={50}
                            width={50}
                            src="/logo-icon.png"
                            alt="Bazardor.com"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">
                                বাজার দর
                            </h2>
                            {/* <p className="text-[#1D271F]">{date}</p> */}
                        </div>
                    </div>
                </Link>

                {authLinks}

            </div>
              <hr className="border-t border-gray-100 opacity-120 mt-4 mb-2" />
        </div>
    );
};

export default Header;
