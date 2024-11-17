import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Chat() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typingEffectText, setTypingEffectText] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [messageToDelete, setMessageToDelete] = useState(null);

    useEffect(() => {
        // Generate a unique session ID for the current session
        const newSessionId = uuidv4();
        setSessionId(newSessionId);

        // Load all sessions for the category
        const savedSessions = JSON.parse(localStorage.getItem(`chatSessions-${categoryId}`)) || [];
        if (savedSessions.length > 0) {
            const lastSession = savedSessions[savedSessions.length - 1];
            setMessages(lastSession.messages || []);
        }
    }, [categoryId]);

    useEffect(() => {
        if (!sessionId) return;

        // Save current session to local storage
        const savedSessions = JSON.parse(localStorage.getItem(`chatSessions-${categoryId}`)) || [];
        const updatedSessions = [
            ...savedSessions.filter((session) => session.id !== sessionId),
            { id: sessionId, timestamp: new Date().toISOString(), messages },
        ];

        localStorage.setItem(`chatSessions-${categoryId}`, JSON.stringify(updatedSessions));
    }, [messages, categoryId, sessionId]);

    const staticResponses = {
        wishList: (input) => `Учитывая увлечения Софии (12 лет), вот несколько идей подарков:

Для рисования:
    Профессиональный набор акварельных красок
    Качественные кисти для рисования
    Скетчбук или альбом для акварели
    Для танцев:
    Стильная танцевальная сумка
    Новая танцевальная форма
    Удобная спортивная обувь для танцев
Для творчества:
    Набор для создания контента в TikTok (кольцевая лампа, штатив)
    Альбом для коллекционирования наклеек
    Набор креативных канцелярских принадлежностей в стиле K-pop
    Для развлечений:
    Билеты на концерт K-pop группы
    Подарочный набор с корейской косметикой и K-pop атрибутикой
    Сертификат в кафе-мороженое
В жанре фэнтези:
    Новые книги в жанре фэнтези
    Подписка на электронную библиотеку
    Тематические сувениры по любимым книжным сериям
    Особые подарки:
    Мягкая игрушка корги (если мечтает о собаке)
    Футболка или аксессуары с K-pop айдолами
    Набор для творчества в корейском стиле
Рекомендация:
    С учетом возраста и интересов Софии, можно выбрать несколько небольших подарков, например:

Набор для создания контента (кольцевая лампа и штатив)
Новый скетчбук с качественными акварельными красками
Мягкая игрушка корги
Сертификат в кафе-мороженое
Такой комплект подарков разнообразит её увлечения и обязательно порадует!`,
        homework: (input) => `Я вижу что ваше задание - это геометрическая задача, направленная на использование теоремы Пифагора. Согласно этой теореме: сумма квадратов катетов равна квадрату гиппотенузы. В общем виде это выражается в формуле a^2 + b^2 = c^2.
Этой информации должно хватить для решения задачи. 
Дайте знать, если у Вас возникнут вопросы!`,
        leisure: (input) => `Здравствуйте! Мы можем попробовать найти время для совместной активности с вашей мамой в этой неделе. Сначала нужно уточнить, когда вы свободен и какой вид активности вы предпочитаете.
Возможно, можно провести время вместе на следующий день, 21 ноября. Ваш отец будет заниматься в тренажерном зале, а ваша сестра уроками английского и танцами. Если вы предпочитаете какой-либо вид активности, то можно попробовать составить план для этого дня.
Например, можно посетить музей или парк, где можно прогуляться и пообщаться. Может быть, вы также захотите посмотреть фильм или играть в игры на компьютере вместе.
Пожалуйста, скажите, какой вид активности вы предпочитаете, чтобы мы могли подготовить лучший план для вас и вашей мамы.`,
        routine: (input) => `You're working on your routine: ${input}. Keep it up!`,
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");

        const botMessageText = staticResponses[categoryId]
            ? staticResponses[categoryId](input)
            : "Sorry, I didn't understand that. Can you please clarify?";

        setTimeout(() => {
            let currentText = "";
            setTypingEffectText(currentText);

            for (let i = 0; i < botMessageText.length; i++) {
                setTimeout(() => {
                    currentText += botMessageText[i];
                    setTypingEffectText(currentText);

                    if (i === botMessageText.length - 1) {
                        const botMessage = {
                            id: Date.now() + 1,
                            text: botMessageText,
                            sender: "bot",
                        };
                        setMessages((prevMessages) => [...prevMessages, botMessage]);
                        setTypingEffectText("");
                    }
                }, i * 10);
            }
        }, Math.floor(Math.random() * 3000) + 1000);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const confirmDeleteMessage = (messageId) => {
        setMessageToDelete(messageId);
    };

    const deleteMessage = () => {
        const updatedMessages = messages.filter((msg) => msg.id !== messageToDelete);
        setMessages(updatedMessages);
        setMessageToDelete(null);
    };

    const cancelDelete = () => {
        setMessageToDelete(null);
    };

    return (
        <div className="flex flex-col w-full h-screen mx-auto border">
            <div className="flex-1 p-4 overflow-y-auto mt-20">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-4 p-3 rounded-lg max-w-xs ${
                            msg.sender === "user"
                                ? "bg-[#268CF5] text-white self-end ml-auto animate-fadeIn"
                                : "bg-white border text-black self-start animate-fadeIn"
                        }`}
                    >
                        {msg.text}
                        <button
                            onClick={() => confirmDeleteMessage(msg.id)}
                            className="ml-4 text-red-500 hover:text-red-700 transition"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
                {typingEffectText && (
                    <div className="mb-4 p-3 rounded-lg max-w-xs bg-white border text-black self-start animate-fadeIn">
                        {typingEffectText}
                    </div>
                )}
            </div>
            {messageToDelete !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <p className="text-lg font-medium mb-4">
                            Вы уверены, что хотите удалить это сообщение?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={deleteMessage}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button
                className="p-2 bg-blue-500 text-white rounded-full self-start m-2"
                onClick={() => navigate(`/activityChatHistory/${categoryId}`)}
            >
                Посмотреть историю
            </button>
            <div className="flex p-4 border-t">
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="flex-1 p-2 border rounded-[8px] mr-2"
                />
                <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-full">
                    Отправить
                </button>
            </div>
        </div>
    );
}

export default Chat;
