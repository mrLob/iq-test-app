import React, {useEffect, useState} from 'react';
import {Button, message, Space, Table} from 'antd';
import {Link} from 'react-router-dom';
import {API_URL} from "../../api";
import axios from "axios";
import {getToken} from "../../router/helpers";
import {User} from "../../App";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL + '/admin/users', {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Replace with your authentication token
                },
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users', error);
            message.error('An error occurred');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Last login',
            dataIndex: 'last_login_date',
            key: 'last_login_date',
        },
        {
            title: 'Last edit self',
            dataIndex: 'last_personal_data_edit_date',
            key: 'last_personal_data_edit_date',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: { id: any; }) => (
                <Space size="middle">
                    <Link to={`/admin/users/${record.id}`}>Details</Link>
                    <Button type="dashed">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to={'/admin/users/create'}>Create new</Link>
            <Table columns={columns} dataSource={users} rowKey="id"/>
        </div>
    );
};

export default AdminDashboard;
