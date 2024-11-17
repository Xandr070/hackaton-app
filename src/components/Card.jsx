import React from "react";

export default function Card({image, name, description}) {
    return (
        <div className="flex items-center mt-4">
            <div className="flex space-x-4">
                <img src={image} alt="" className="w-[464px] h-[256px] object-cover rounded-[8px]"/>
                <div className="flex flex-col space-y-2 w-1/3 mt-4">
                    <span className="font-medium text-xl text-[#0D141C]">{name}</span>
                    <span className="text-[#4A739C]">{description}</span>
                </div>
            </div>
            {/*<button className="text-white text-xl px-6 py-2 bg-[#268CF5] my-3 rounded-full">Начать</button>*/}
        </div>
    )
}