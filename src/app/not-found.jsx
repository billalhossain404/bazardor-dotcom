import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#eff4ef] px-4 text-center">

            <h1 className="text-8xl font-bold text-green-700"> 404</h1>
            <h2 className="text-3xl font-bold mt-5">পেজটি খুঁজে পাওয়া যায়নি!</h2>
            <p className="text-gray-500 mt-3">দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই।</p>
            <Link href="/" className="mt-7 bg-green-700 text-white px-7 py-3 rounded-lg hover:bg-green-800 transition"> হোম পেজে ফিরে যান </Link>

        </div>
    );
}
