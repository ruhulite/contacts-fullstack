import {TwoFaSetup} from "../components/TwoFASetup.tsx";
import {useNavigate} from "react-router-dom";


export const Setup2FA = () => {
    const navigate = useNavigate();

    const handleSetupComplete = () => {
        navigate("/verify-2fa");
    }
    return <TwoFaSetup onSetupComplete={handleSetupComplete} />
}