
"use client";

import { useRouter, usePathname } from "next/navigation";

const SortSelect = ({ sort }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <select
            value={sort}
            onChange={(e) => router.push(`${pathname}?sort=${e.target.value}`)}
            className="border border-gray-200 rounded-md p-2 text-sm"
        >
            <option value="default">ডিফল্ট</option>
            <option value="high">বেশি থেকে কম</option>
            <option value="low">কম থেকে বেশি</option>
        </select>
    );
};

export default SortSelect;
