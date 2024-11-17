import React from "react";
import menu from "../assets/Menu.svg";
import {Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Header({isSidebarOpen, onMenuClick}) {
    return (
        <header className="flex z-50 fixed bg-white inset-0 justify-between items-center h-16 border-b px-10 py-3">
            <Link to="/">
                <div className="flex">
                    <div className="text-black cursor-pointer font-bold text-2xl">AI</div>
                    <AutoAwesomeIcon fontSize={"small"}/>
                </div>
            </Link>
            <div className="space-x-9 flex items-center">
                <div className="flex space-x-3">
                    <button
                        onClick={onMenuClick}
                        className={`p-2 rounded-full ${
                            isSidebarOpen ? "border border-[#268CF5]" : "bg-[#E8EDF5]"
                        }`}
                    >
                        <img src={menu} alt="Menu"/>
                    </button>
                    <Link to="/login">
                        <button className="bg-[#E8EDF5] flex items-center p-2 rounded-full">
                            <LogoutIcon fontSize="small"/>
                        </button>
                    </Link>

                </div>
            </div>
        </header>
    );
}
