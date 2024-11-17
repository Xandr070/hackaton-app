import React, { useState } from 'react';
import axios from 'axios';
import { AuthBlock, getPasswordStrength } from "./AuthBlock";
import { Link, useNavigate } from 'react-router-dom';

export const Reg = () => {
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

        if (getPasswordStrength(password) < 4) {
            setError('Пароль должен быть надежным.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/User', {
                login,
                password,
            });

            if (response.status === 200) {
                alert('Регистрация успешна!');
                navigate('/login');
            }
        } catch (err) {
            if (err.response) {
                setError(`Ошибка регистрации: ${err.response.data.message || err.message}`);
            } else if (err.request) {
                setError('Ошибка: Нет ответа от сервера.');
            } else {
                setError(`Ошибка: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AuthBlock
                name="Регистрация"
                action={loading ? 'Загрузка...' : 'Зарегистрироваться'}
                click={<div className="flex h-4 justify-center items-center mt-6">
                    <Link to="/login" className="text-[#00309D] font-semibold hover:underline">
                        Вход в аккаунт
                    </Link>
                </div>}
                login={login}
                setLogin={setLogin}
                password={password}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                error={error}
                loading={loading}
                showPasswordStrength={true}
            />
        </div>
    );
};
