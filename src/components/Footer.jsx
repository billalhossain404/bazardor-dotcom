import React from 'react';

const Footer = () => {
    return (
        <div className='flex flex-col sm:flex-row sm:justify-between gap-3 px-4 sm:px-6 lg:px-40 mb-10 mt-10 text-sm sm:text-base'>
            <div className="max-w-full">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            </div>
            <div className="max-w-full sm:text-right">
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;