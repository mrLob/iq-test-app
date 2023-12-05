import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select} from 'antd';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {getAuthHeaders} from "../../router/helpers";
import {API_URL} from "../../api";

interface User {
    id: string;
    first_name: string;
    second_name: string | null;
    last_name: string;
    login: string;
    email: string;
    date_of_birth: string | null;
    profession_id: string;
    photo_url: string | null;
}

interface Profession {
    id: string;
    name: string;
}

const AdminUserUpdate: React.FC = () => {
    const navigate = useNavigate();
    const {id: userId} = useParams();
    const [form] = Form.useForm();
    const [user, setUser] = useState<User | null>(null);
    const [professions, setProfessions] = useState<Profession[]>([]);

    useEffect(() => {
        fetchUser();
        fetchProfessions();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(API_URL + `/admin/users/${userId}`, getAuthHeaders());
            setUser(response.data);
            form.setFieldsValue({
                first_name: response.data.first_name,
                second_name: response.data.second_name,
                last_name: response.data.last_name,
                login: response.data.login,
                email: response.data.email,
                date_of_birth: response.data.date_of_birth,
                profession_id: response.data.profession_id,
            });
        } catch (error) {
            console.error('Error fetching user details', error);
            message.error('Failed to fetch user details');
        }
    };

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
            await axios.put(API_URL + `/admin/users/${userId}`, values, getAuthHeaders());
            message.success('User updated successfully');
            navigate(`/admin/users/${userId}`);
        } catch (error) {
            console.error('Error updating user', error);
            message.error('Failed to update user');
        }
    };

    return (
        <div>
            {user && (
                <>
                    <h1>Edit User</h1>
                    <Form form={form} onFinish={onFinish} labelCol={{span: 4}} wrapperCol={{span: 14}}
                          layout="horizontal">
                        <Form.Item label="First Name" name="first_name"
                                   rules={[{required: true, message: 'Please enter first name'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Second Name" name="second_name">
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
                        <Form.Item label="Date of Birth" name="date_of_birth">
                            <Input type="date"/>
                        </Form.Item>
                        <Form.Item label="Profession" name="profession_id"
                                   rules={[{type: 'string', message: 'Please select a profession'}]}>
                            <Select>
                                {professions.map((profession) => (
                                    <Select.Option key={profession.id} value={profession.id}>
                                        {profession.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 4, span: 14}}>
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
};

export default AdminUserUpdate;
