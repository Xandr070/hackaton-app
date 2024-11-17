import React, { useState } from "react";
import love from "../assets/love.svg";
import chat from "../assets/Chat.svg";
import home from "../assets/Home.svg";
import { Link } from "react-router-dom";
import Category from "./Category";
import gift from "../assets/static/Gift.png";
import study from "../assets/static/study.png";
import activity from "../assets/static/activity.png";

export default function Sidebar({ isOpen }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
    const [accessCode, setAccessCode] = useState("");

    // Function to generate a random access code
    const generateAccessCode = () => {
        const code = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates an 8-character code
        setAccessCode(code);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openAccessCodeModal = () => {
        generateAccessCode();
        setIsAccessCodeModalOpen(true);
    };

    const closeAccessCodeModal = () => {
        setIsAccessCodeModalOpen(false);
    };

    return (
        <div className="fixed h-full flex flex-col">
            <div className="w-64 h-full shadow-lg bg-white p-8 flex flex-col justify-between">
                <div>
                    <h2 className="font-bold text-lg">Меню</h2>
                    <Link to={"/"}>
                        <button className="flex space-x-3 items-center mt-8">
                            <img src={home} alt="Home" />
                            <span>Главная</span>
                        </button>
                    </Link>
                    <Link to={"/activity"}>
                        <button className="flex space-x-3 items-center mt-8">
                            <img src={love} alt="Activity" />
                            <span>Ваши моменты</span>
                        </button>
                    </Link>
                    <button
                        onClick={openModal}
                        className="flex space-x-3 items-center mt-8"
                    >
                        <img src={chat} alt="Chat" />
                        <span>Чат</span>
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg max-w-lg w-full h-[80vh] mt-10 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold mb-4">Выберите категорию для продолжения</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link to={"/activityChat/wishList"}>
                                    <Category cardImage={gift} cardName="Желания" />
                                </Link>
                                <Link to={"/activityChat/homework"}>
                                    <Category cardImage={study} cardName="Домашняя работа" />
                                </Link>
                                <Link to={"/activityChat/leisure"}>
                                    <Category cardImage={activity} cardName="Досуг" />
                                </Link>
                            </div>
                            <button
                                onClick={closeModal}
                                className="mt-4 w-full bg-blue-500 text-white rounded-full py-1"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}

                <div>
                    <div
                        className="flex flex-col items-center text-center justify-center py-2 border rounded-[8px] mt-3"
                    >
                        <span className="text-xl font-medium">4</span>
                        <span className="text-[12px] text-[#5E707E]">Участники семьи</span>
                    </div>
                    <button
                        onClick={openAccessCodeModal}
                        className="bg-[#268DF5] text-white w-full rounded-full py-1 mt-3"
                    >
                        Доступ
                    </button>
                </div>
            </div>

            {/* Access Code Modal */}
            {isAccessCodeModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeAccessCodeModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-medium mb-4">Ваш код для доступа</h3>
                        <div className="flex justify-center items-center mb-4">
                            <span className="text-2xl font-semibold">{accessCode}</span>
                        </div>
                        <button
                            onClick={closeAccessCodeModal}
                            className="w-full bg-blue-500 text-white rounded-full py-1"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
