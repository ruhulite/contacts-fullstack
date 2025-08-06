import {Link} from "react-router-dom";
import {useState} from "react";
import {loginUser, register} from "../service/authApi.ts";

export const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data } = await loginUser(userName, password);
            setIsRegister(true);
            setUserName("");
            setPassword("");
            setError('');
            onLoginSuccess(data);
        } catch (error) {
            console.log("error", error);
            setMessage('');
            setError('Invalid login credentials');
        }

    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data } = await register(userName, password);
            setIsRegister(false);
            setMessage(data.message);
            setUserName('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        } catch (error) {
            console.log(error);
            setError('Something went wrong during registration.');
            setUserName('');
            setPassword('');
            setConfirmPassword('');
            setMessage('')
        }
    }

    const handleRegisterToggle = () => {
        setIsRegister(!isRegister)
        setMessage("")
        setError("");
    }



    return (
        <form
            className="bg-white rounded-lg shadow-md w-full max-w-sm max-auto"
            onSubmit={() => isRegister ? handleRegister : handleLogin}
        >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">
                    {isRegister ? "Create Account" : "Login"}
                </h2>
            </div>
            <hr className="text-gray-200 mt-6 mb-6" />
            <p className="text-gray-600 text-center text-lg font-light">
                {isRegister ? "Looks like you are new here" : "We are glad to see you again"}
            </p>
            <div className="p-6 ">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Enter your Username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Enter your Password"
                        required
                    />
                </div>
                {isRegister ? (
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="Enter Password Again"
                            required
                        />
                    </div>
                ) : null}
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    {isRegister ? "Register" : "Login"}
                </button>
                <div>
                    <p className="pt-4 text-center text-gray-600 text-sm">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}
                            <Link
                            to=""
                            onClick={handleRegisterToggle}
                        >
                            {isRegister ? 'Login' : 'Create Account'}
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
};