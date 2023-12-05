import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from 'axios';
import {API_URL} from "../api";
import {getRole, isAuthenticated} from "../router/helpers";
import {useNavigate} from "react-router-dom";

interface Props {
    onLogin: (token: any, user: any) => void;
}

const LoginForm: React.FC<Props> = ({onLogin}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            const response = await axios.post(API_URL + '/login', values);
            const {token, user} = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
            onLogin(token, user);
            message.success('Sign in success!');
            if (getRole() === 'user') {
                navigate('/cabinet');

            } else {
                navigate('/admin');

            }
        } catch (error) {
            console.error('Login failed', error);
            message.error('Sign in error. Check data.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (isAuthenticated() ? <div>User already signed</div>
            :
            <Form
                name="loginForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Email required!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Password required!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
    );
};

export default LoginForm;
