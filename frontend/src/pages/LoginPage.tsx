import {LoginForm} from "../components/LoginForm.tsx";
import {useNavigate} from "react-router-dom";
import {useSession} from "../context/SessionContext.tsx";

interface UserLogin {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useSession();

    const handleLoginSuccess = (userData: UserLogin) => {
        login(userData);
        if (!userData.isMfaActive) {
            navigate('/setup-2fa');
        } else {
            navigate('/verify-2fa');
        }
    }

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}