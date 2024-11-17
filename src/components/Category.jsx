import React from 'react';

export default function Category({cardImage, cardName, cardDescription}) {
    return (
        <div className="flex flex-col space-y-3 mt-4 cursor-pointer">
            <img src={cardImage} alt="" className="rounded-xl w-[223px] h-[223px] object-cover"/>
            <span className="font-medium text-[#0D141C]">{cardName}</span>
            <span>{cardDescription}</span>
        </div>
    )
}