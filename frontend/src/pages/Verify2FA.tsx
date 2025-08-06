
import {useNavigate} from "react-router-dom";
import {TwoFaVerification} from "../components/TwoFAVerification.tsx";

export const Verify2Fa = () => {
    const navigate = useNavigate();

    const handleVerifySuccess = async (data) => {
        if (data) {
            navigate("/");
        }
    }

    const handleResetSuccess = async (data) => {
        if (data) {
            navigate("/setup-2fa");
        }
    }

    return <TwoFaVerification onVerifySuccess={handleVerifySuccess} onResetSuccess={handleResetSuccess} />
};