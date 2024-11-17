import React, { useState } from 'react';

export const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 0) strength += 1;
    if (password.length >= 8) {
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[@$!%*?&#]/.test(password)) strength += 1;
    }
    return strength;
};

export const AuthBlock = ({ name, action, click, login, setLogin, password, onPasswordChange, onSubmit, error, loading, showPasswordStrength }) => {
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        onPasswordChange(newPassword);

        if (showPasswordStrength) {
            const score = getPasswordStrength(newPassword);
            setPasswordStrength(score);
        }
    };

    const getBarColor = (index) => {
        if (passwordStrength > 0 && passwordStrength <= 2 && index === 0) return 'bg-red-500';
        if (passwordStrength === 3 && index < 2) return 'bg-orange-500';
        if (passwordStrength === 4 && index < 3) return 'bg-yellow-500';
        if (passwordStrength === 5 && index < 4) return 'bg-green-500';
        return 'bg-gray-300';
    };

    const getTextColor = () => {
        if (passwordStrength <= 2) return 'text-red-500';
        if (passwordStrength === 3) return 'text-orange-500';
        if (passwordStrength === 4) return 'text-yellow-500';
        if (passwordStrength === 5) return 'text-green-500';
        return 'text-gray-500';
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="bg-white px-8 py-12 rounded-2xl w-[25rem] h-auto">
                <h2 className="text-2xl text-[#00081A] font-bold text-center mb-6">{name}</h2>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Телефон или email"
                            className="w-full h-10 p-3 border placeholder:text-[14px] placeholder:text-[#A2ABC2] rounded-lg focus:outline-none focus:border-[#515151]"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            placeholder="Пароль"
                            className="w-full h-10 p-3 border placeholder:text-[14px] placeholder:text-[#A2ABC2] rounded-lg focus:outline-none focus:border-[#515151]"
                            required
                        />
                    </div>

                    {showPasswordStrength && isPasswordFocused && (
                        <div className="space-y-2">
                            <div className="flex space-x-1">
                                {[0, 1, 2, 3].map((index) => (
                                    <div
                                        key={index}
                                        className={`h-1 rounded-full flex-grow ${getBarColor(index)}`}
                                    ></div>
                                ))}
                            </div>

                            <div className={`${getTextColor()} text-[11px] font-medium`}>
                                {passwordStrength === 0 ? '' :
                                    passwordStrength <= 2
                                        ? 'Очень слабый пароль'
                                        : passwordStrength === 3
                                            ? 'Слабый пароль'
                                            : passwordStrength === 4
                                                ? 'Нормальный пароль'
                                                : 'Надежный пароль'}
                            </div>
                        </div>
                    )}

                    {error && <div className="text-red-500 text-center">{error}</div>}

                    <button
                        type="submit"
                        className={`flex justify-center items-center w-full h-10 bg-[#00309D] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {action}
                    </button>
                </form>

                <div className="flex items-center my-6 space-x-2">
                    <hr className="border flex grow border-[#E2E5ED]" />
                    <span className="text-[#89909D]">или используйте</span>
                    <hr className="border flex grow border-[#E2E5ED]" />
                </div>

                <div className="flex flex-col justify-start space-y-2">
                </div>
                {click}
            </div>
        </div>
    );
};
