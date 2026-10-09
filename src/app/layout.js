import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";


const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata = {
  title: "BazarDor | আজকের বাজারদর ও পণ্যের দাম",
  description: "BazarDor.com থেকে জানুন বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর। পণ্যের দাম তুলনা করুন, বাজারের আপডেট দেখুন এবং স্মার্ট কেনাকাটা করুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn" data-theme = "light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header></Header>
        <Suspense fallback={<div>লোড হচ্ছে...</div>}>
        <Navbar />
    </Suspense>

    <hr className="divider text-gray-300 mt-5 mb-2" />
        <Marquee></Marquee>
        <hr className="divider text-gray-300 mt-2" />
        {children}
        <hr className="divider text-gray-300" />
        <Footer></Footer>
        </body>
    </html>
  );
}
