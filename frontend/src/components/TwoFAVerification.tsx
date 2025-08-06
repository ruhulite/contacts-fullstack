import {useState} from "react";
import {reset2FA, verify2FA} from "../service/authApi.ts";

export const TwoFAVerification = ({onVerifySuccess, onResetSuccess}) => {
    const [otp, setOtp] = useState<string>('');
    const  [error, setError] = useState<string>('');

    const handleTokenVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await verify2FA(otp);
            onVerifySuccess(data);
        } catch (err) {
            console.log(err);
            setError('Invalid OTP');
            setOtp('')
        }
    }

    const handleReset = async () => {
        try {
            const { data } = await reset2FA();
            onResetSuccess(data);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setOtp('')
        }
    }

    return (
        <form
            className="bg-white rounded-lg shadow-md w-full max-w-sm max-auto"
            onSubmit={handleTokenVerification}
        >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">
                    Validate TOTP
                </h2>
            </div>
            <hr className="text-gray-200 mt-6 mb-6" />
            <p className="text-gray-600 text-center text-lg font-light">
                Please enter 6-digit time based OTP to verify 2FA authentication
            </p>
            <div className="p-6 ">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">TOTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOtp(event.target.value)}
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Enter your TOTP"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3"
                >
                    Verify TOTP
                </button>
                <button
                    type="button"
                    className="w-full bg-slate-500 text-white py-2 rounded-md"
                    onClick={handleReset}
                >
                    Reset 2FA
                </button>

            </div>
        </form>
    );
};