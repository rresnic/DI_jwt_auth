import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/userAuth";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError("");
        console.log(apiBaseUrl)
        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/user/login`,
                {email, password},
                {withCredentials: true}
            );
            const {user, token, message} = response.data;
            console.log( {user, token, message});
            setError(message);
            login(user, token);
            navigate("/")
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
        }
    };
    return (
        <>
            <div className='auth-form-container'>
                <h2>Login</h2>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </>
    )
}
export default Login;