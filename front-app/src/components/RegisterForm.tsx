// components/RegisterForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const RegisterForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('first_name', values.firstName);
            formData.append('second_name', values.secondName);
            formData.append('last_name', values.lastName);
            formData.append('login', values.login);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('date_of_birth', values.dateOfBirth.format('YYYY-MM-DD'));
            formData.append('profession_id', values.professionId);
            if (values.photo && values.photo.file) {
                formData.append('photo', values.photo.file);
            }

            const response = await axios.post('/register', formData);
            message.success(response.data.message);
        } catch (error) {
            console.error('Registration failed', error);
            message.error('Registration error. Please check the entered data.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="registerForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Second Name"
                name="secondName"
                rules={[{ required: true, message: 'Please enter your second name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Login"
                name="login"
                rules={[{ required: true, message: 'Please enter your login!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter a password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="Profession"
                name="professionId"
                rules={[{ required: true, message: 'Please select your profession!' }]}
            >
                <Select>
                    <Option value="1">Profession 1</Option>
                    <Option value="2">Profession 2</Option>
                    {/* Add more profession options as needed */}
                </Select>
            </Form.Item>

            <Form.Item
                label="Photo"
                name="photo"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
            >
                <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
