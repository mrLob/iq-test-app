import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from 'axios';
import {API_URL} from "../../api";
import {getAuthHeaders} from "../../router/helpers";

interface User {
    id: number;
    first_name: string;
    second_name: string;
    last_name: string;
    login: string;
    date_of_birth: string;
    profession_id: number;
    photo_url: string;
}

const CabinetProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(API_URL + '/cabinet/profile', getAuthHeaders());
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile', error);
        }
    };

    const onFinish = async (values: any) => {
        try {
            const response = await axios.put(API_URL + '/cabinet/profile', values, getAuthHeaders());
            setUser(response.data);
            message.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile', error);
            message.error('Failed to update profile');
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Cabinet Profile</h1>
            <Form initialValues={user} onFinish={onFinish}>
                <Form.Item label="First Name" name="first_name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="last_name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Login" name="login">
                    <Input/>
                </Form.Item>
                <Form.Item label="Date of Birth" name="date_of_birth">
                    <Input/>
                </Form.Item>
                <Form.Item label="Profession ID" name="profession_id">
                    <Input/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Profile
                </Button>
            </Form>
        </div>
    );
};

export default CabinetProfile;
