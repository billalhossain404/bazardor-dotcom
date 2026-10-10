import React from 'react';
import { IoTriangle } from 'react-icons/io5';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {

    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data = await res.json();
    const headLine = data;
    return (
        <div>
            <MarqueeText direction="right" duration={15}>

                {headLine.map(h => (<span key={h.id} className="flex items-center mr-10 gap-5">
                    {h.categoryIcon} {h.nameBn} {h.today} টাকা/কেজি

                    <span className={`flex items-center ${h.change.dir === "up" ? "text-red-600" : "text-green-600"}`}>
                        <IoTriangle className={h.change.dir === "down" ? "rotate-180" : ""} />
                        {Math.abs(Number(h.change.pct))}%
                    </span></span>))}

            </MarqueeText>
        </div>
    );
};

export default Marquee;