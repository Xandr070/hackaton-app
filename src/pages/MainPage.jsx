import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import main from "../assets/static/Main.jpg";
import gift from "../assets/static/Gift.png";
import activity from "../assets/static/Activity.png";
import study from "../assets/static/study.png";
import Card from "../components/Card";
import Sidebar from "../components/SideBar";
import { Link } from "react-router-dom";
import image1 from "../assets/photo_2024-11-17_07-03-34.jpg";

export default function MainPage({ isSidebarOpen }) {
    const [isAlarmVisible, setIsAlarmVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Show the alarm after 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAlarmVisible(true);
        }, 6000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeAlarm = () => setIsAlarmVisible(false);

    return (
        <div className="flex relative">
            {isSidebarOpen && <Sidebar />}
            <div className="flex-1">
                <div className="flex flex-col items-center max-w-[960px] mx-auto my-12">
                    <div className="flex pb-4 h-auto">
                        <img
                            src={main}
                            alt=""
                            className="mt-4 h-[480px] w-[960px] object-cover"
                        />
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="text-xl text-[#4A739C]">
                            Позвольте искусственному интеллекту сделать вашу семейную жизнь ярче и проще. Мы поможем выбрать идеальный подарок, напомним о важных датах и предложим интересные идеи для совместного досуга. Больше никаких забытых годовщин и банальных подарков!
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <span className="text-2xl font-medium mt-8 text-[#0D141C]">Категории</span>
                        <div className="grid grid-cols-4 gap-5">
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
                    </div>
                    <div className="flex flex-col justify-center mt-12 space-y-6">
                        <span className="text-2xl font-medium text-[#0D141C]">Сегодня</span>
                        <Card
                            image={image1}
                            name="19:00 - 21:30 Цирковое представление Магия цирка"
                            description="Семейный поход в цирк. Акробаты, клоуны и дрессированные животные."
                        />
                    </div>
                </div>
            </div>

            {/* Alarm Popup */}
            {isAlarmVisible && (
                <div
                    className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg animate-bounce z-50 cursor-pointer"
                    onClick={() => {
                        openModal();
                        closeAlarm();
                    }}
                >
                    Маме Рите не помешала бы помощь
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
                        <h2 className="text-xl font-semibold text-gray-800">Помощь требуется</h2>
                        <p className="mt-4 text-gray-600">
                            Мама Рита просит помочь с приготовлением ужина на сегодня. Нужно помочь почистить овощи и
                            подготовить ингредиенты для блюда.
                        </p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                            >
                                Закрыть
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Понял!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
