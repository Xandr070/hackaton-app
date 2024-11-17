import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChatHistory() {
    const { categoryId } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const savedSessions = JSON.parse(localStorage.getItem(`chatSessions-${categoryId}`)) || [];
        setSessions(savedSessions);
    }, [categoryId]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">История чатов ({categoryId})</h1>
            {sessions.length === 0 ? (
                <p>Нет сохранённых сессий для данной категории.</p>
            ) : (
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div key={session.id} className="p-4 border rounded-lg bg-gray-100">
                            <p className="text-sm text-gray-500">Сессия от {new Date(session.timestamp).toLocaleString()}</p>
                            <ul className="mt-2 space-y-2">
                                {session.messages.map((msg) => (
                                    <li
                                        key={msg.id}
                                        className={`p-2 rounded ${
                                            msg.sender === "user" ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        {msg.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatHistory;
