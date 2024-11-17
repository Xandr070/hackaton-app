import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import DashBoards from "./pages/DashBoards";
import Chat from "./pages/Chat";
import { Reg } from "./user/Reg";
import { Login } from "./user/Login";
import Activity from "./pages/Activity";
import ChatHistory from "./pages/ChatHistory";

export default function App() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const location = useLocation(); // Access the current location

    // Automatically close the sidebar when the route changes
    useEffect(() => {
        setIsSideBarOpen(false);
    }, [location]);

    const handleMenuClick = () => {
        setIsSideBarOpen((prevState) => !prevState);
    };

    return (
        <div>
            <Header isSidebarOpen={isSideBarOpen} onMenuClick={handleMenuClick}/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Reg/>}/>
                <Route path="/" element={<MainPage isSidebarOpen={isSideBarOpen}/>}/>
                <Route path="/dashBoards"
                       element={<DashBoards familyProgress={50} personalProgress={25} isSideBarOpen={isSideBarOpen}/>}/>
                <Route path="/activity" element={<Activity isSideBarOpen={isSideBarOpen}/>}/>
                <Route path="/activityChat/:categoryId" element={<Chat/>}/>
                <Route path="/activityChatHistory/:categoryId" element={<ChatHistory/>}/>
            </Routes>
        </div>
    );
}
