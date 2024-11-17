import React from 'react';
import Category from "../components/Category";
import test from "../assets/Card1.png"
import Sidebar from "../components/SideBar";

export default function DashBoards({familyProgress, personalProgress, isSideBarOpen}) {
    return (
        <div className="flex">
            {isSideBarOpen && (
                <Sidebar/>
            )}
            <div className="flex flex-col max-w-[960px] mx-auto my-20">
                <div className="flex flex-col space-y-3">
                    <span className="text-2xl font-medium mt-8 text-[#0D141C]">Welcome to your family dashboard</span>
                    <span className="text-[#4A739C]">Get a bird's eye view of your family's progress</span>
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col space-y-3 mt-8">
                        <span className="font-medium">Your family's tasks progress</span>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-500 h-3 rounded-full"
                                style={{width: `${familyProgress}%`}}
                            >
                            </div>
                        </div>
                        <span className="text-[#0D141C]">2/4 tasks completed</span>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <span className="font-medium text-xl">This week's goal</span>
                        <span>Be active for 3 hours this week. You're 1 hour in!</span>
                    </div>
                    <div className="flex flex-col space-y-3 mt-8">
                        <span className="font-medium">Your progress</span>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-500 h-3 rounded-full"
                                style={{width: `${personalProgress}%`}}
                            >
                            </div>
                        </div>
                        <span className="text-[#0D141C]">1/4 tasks completed</span>
                    </div>
                    <div>
                        <span className="font-medium text-xl">Family members</span>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                        <Category cardImage={test} cardName={"rkfkfkd"} cardDescription={"ofkfdksdkvg"}></Category>
                    </div>
                </div>
            </div>
        </div>
    )
}