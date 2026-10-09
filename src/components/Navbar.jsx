
import Link from "next/link";

const Navbar = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    const navData = await res.json();

    return (
        <div className="flex gap-8 px-40 mt-5">
            {navData.map((n, idx) => <Link key={idx} href={n.slug}><span>{n.icon}</span>{n.nameBn}</Link>)}
        </div>
    );
};

export default Navbar;