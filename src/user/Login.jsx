import React, { useState } from 'react';
import axios from 'axios';
import { AuthBlock } from './AuthBlock';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ setUserId }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const api = axios.create({
        baseURL: 'https://api.gencom-v2.udev.developa.site/api/'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/User');

            const users = response.data;

            console.log('Пользователи с сервера:', users);

            const user = users.find((u) => u.login === login);

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            console.log('Введенный пароль:', password);
            console.log('Пароль с сервера:', user.password);

            localStorage.setItem('userId', user.id);
            setUserId(user.id);

            if (user.password !== password) {
                throw new Error('Неверный пароль');
            }
            navigate('/');
            alert('Вход успешен!');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AuthBlock
                name="Вход в аккаунт"
                action={loading ? 'Загрузка...' : 'Войти'}
                showPasswordStrength={false}
                click={
                    <div className="flex h-4 justify-center items-center mt-6 space-x-4">
                        <Link to="/register" className="text-[#00309D] font-semibold hover:underline">
                            Регистрация
                        </Link>
                        <hr className="w-[1px] h-full bg-[#E2E5ED]" />
                        <a href="#" className="text-[#00309D] font-semibold hover:underline">
                            Забыли пароль?
                        </a>
                    </div>
                }
                login={login}
                setLogin={setLogin}
                password={password}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                error={error}
                loading={loading}
            />
        </div>
    );
};
