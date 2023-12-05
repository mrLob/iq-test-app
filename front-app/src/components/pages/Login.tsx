import React from 'react';
import LoginForm from "../LoginForm";

interface Props {
    handleLogin: (token: any, user: any) => void;
}

const Login: React.FC<Props> = ({handleLogin}) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin}/>
        </div>
    );
};

export default Login;
