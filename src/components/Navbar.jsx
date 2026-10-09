import Link from "next/link";

const Navbar = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const navData = await res.json();

    return (
        <div className="flex flex-wrap gap-8 px-4 lg:px-40 mt-5">
            {navData.map((n, idx) => <Link key={idx} href={`/${n.slug}`} className="flex items-center gap-2"><span>{n.icon}</span>{n.nameBn}</Link>)}
        </div>
    );
};

export default Navbar;