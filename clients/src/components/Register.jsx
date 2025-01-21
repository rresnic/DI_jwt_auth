import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/userAuth";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError("");
        console.log(apiBaseUrl)
        try {
            await axios.post(
                `${apiBaseUrl}/api/user/register`,
                {email, password},
                {withCredentials: true}
            );
            const response = await axios.post(
                `${apiBaseUrl}/api/user/login`,
                {email, password},
                {withCredentials: true}
            );
            const {user, token, message} = response.data;
            console.log( {user, token, message});
            setError(message);
            navigate("/dashboard")
        } catch (error) {
            setError(error.response?.data?.message || "Register failed")
        }
    };
    return (
        <>
            <div className='auth-form-container'>
                <h2>Register</h2>
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
                    <button type="submit">Register</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </>
    )
}
export default Register;