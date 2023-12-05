import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, message, Select, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import {API_URL} from "../../api";
import {getAuthHeaders} from "../../router/helpers";

const {Option} = Select;

const AdminUserCreate: FC = () => {
    const [form] = Form.useForm();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [professions, setProfessions] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        fetchProfessions();
    }, []);

    const fetchProfessions = async () => {
        try {
            const response = await axios.get(API_URL + '/professions');
            setProfessions(response.data);
        } catch (error) {
            console.error('Error fetching professions', error);
        }
    };

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('second_name', values.second_name);
            formData.append('last_name', values.last_name);
            formData.append('login', values.login);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('date_of_birth', values.date_of_birth);
            formData.append('profession_id', values.profession_id);
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            await axios.post(API_URL + '/admin/users', formData, getAuthHeaders());

            message.success('User created successfully');
            form.resetFields();
            setPhotoFile(null);
        } catch (error) {
            console.error('Error creating user', error);
            message.error('Failed to create user');
        }
    };

    const onFileChange = (file: any) => {
        setPhotoFile(file.file);
    };

    return (
        <div>
            <h1>Create User</h1>
            <Form form={form} onFinish={onFinish} labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal">
                <Form.Item label="First Name" name="first_name"
                           rules={[{required: true, message: 'Please enter first name'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Second Name" name="second_name"
                           rules={[{required: true, message: 'Please enter second name'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="last_name"
                           rules={[{required: true, message: 'Please enter last name'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Login" name="login" rules={[{required: true, message: 'Please enter login'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email"
                           rules={[{required: true, type: 'email', message: 'Please enter a valid email'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: 'Please enter password'}]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Date of Birth" name="date_of_birth"
                           rules={[{type: 'date', message: 'Please enter a valid date'}]}>
                    <Input type="date"/>
                </Form.Item>
                <Form.Item label="Profession" name="profession_id"
                           rules={[{type: 'string', message: 'Please select a profession'}]}>
                    <Select>
                        {professions.map((profession) => (
                            <Option key={profession.id} value={profession.id}>
                                {profession.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Photo" name="photo">
                    <Upload onChange={onFileChange} beforeUpload={() => false} listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined/>}>Upload Photo</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 14}}>
                    <Button type="primary" htmlType="submit">
                        Create User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminUserCreate;
