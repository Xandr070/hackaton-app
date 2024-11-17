import Card from "../components/Card";
import React from "react"
import quest from "../assets/Quest.png"
import Sidebar from "../components/SideBar";
import image1 from "../assets/photo_2024-11-17_07-03-34.jpg"
import image2 from "../assets/photo_2024-11-17_07-03-32.jpg"
import image3 from "../assets/photo_2024-11-17_07-03-31.jpg"

export default function Activity({isSideBarOpen}) {
    return (
        <div className="flex">
            {isSideBarOpen && (
            <Sidebar/>
        )}
            <div className="flex flex-col mt-20 max-w-[960px] mx-auto space-y-4 mb-10">
                <span className="pl-3 text-2xl font-medium mb-4">Предстоящие события</span>
                <Card image={image1} name="19:00 - 21:30 Цирковое представление Магия цирка" description="Семейный поход в цирк. Акробаты, клоуны и дрессированные животные."></Card>
                <Card image={image2} name="11:00 - 15:00 Семейный пикник в Центральном парке" description="Отдых на природе всей семьей. Игры, угощения и свежий воздух."></Card>
                <Card image={image3} name="10:00 - 13:00 Субботний завтрак у бабушки" description="Традиционные бабушкины блинчики и семейные разговоры за столом."></Card>
            </div>
        </div>
    )
}