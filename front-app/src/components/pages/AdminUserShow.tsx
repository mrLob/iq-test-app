import React, {FC, useEffect, useState} from 'react';
import {Button, Descriptions, message, Table, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import {API_URL, BACK_URL} from '../../api';
import {useNavigate, useParams} from 'react-router-dom';
import {getAuthHeaders} from '../../router/helpers';

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
    attachments: Attachment[];
}

interface Attachment {
    id: string;
    url: string;
    type: string;
    download_url?: string;
}

interface Profession {
    id: string;
    name: string;
}

const AdminUserShow: FC = () => {
    const {id: userId} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [profession, setProfession] = useState<Profession | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);
    const handleDeleteAttachment = async (attachmentId: string) => {
        try {
            await axios.delete(`${API_URL}/admin/users/${userId}/detach/${attachmentId}`, getAuthHeaders());
            message.success('File detached successfully');
            fetchUser(); // Обновите данные после удаления файла
        } catch (error) {
            console.error('Error detaching file', error);
            message.error('Failed to detach file');
        }
    };
    const fetchUser = async () => {
        try {
            const response = await axios.get(API_URL + `/admin/users/${userId}`, getAuthHeaders());
            setUser(response.data);

            if (response.data.profession_id) {
                const professionResponse = await axios.get(API_URL + `/professions/${response.data.profession_id}`);
                setProfession(professionResponse.data);
            }
        } catch (error) {
            console.error('Error fetching user details', error);
            message.error('Failed to fetch user details');
        }
    };

    const handleUpload = async (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            fetchUser();
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${API_URL}/admin/users/${userId}`, getAuthHeaders());
            message.success('User deleted successfully');
            navigate('/admin/users'); // Перенаправление после удаления пользователя
        } catch (error) {
            console.error('Error deleting user', error);
            message.error('Failed to delete user');
        }
    };
    const renderAttachmentColumn = (text: string, record: Attachment) => {
        if (isImageType(record.type)) {
            return <img src={record.download_url} alt={record.id} style={{maxWidth: '100px'}}/>;
        } else {
            return (
                <>
                    <img src={BACK_URL + '/' + record.download_url} alt={record.id} style={{maxWidth: '100px'}}/>
                </>
            );
        }
    };

    const columns = [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: 'URL', dataIndex: 'url', key: 'url', render: renderAttachmentColumn},
        {title: 'Type', dataIndex: 'type', key: 'type'},
        {
            title: 'Actions', key: 'actions', render: (text: string, record: Attachment) => <>
                <a href={BACK_URL + record.download_url} download>
                    Download
                </a>
                <Button type="dashed" danger onClick={() => handleDeleteAttachment(record.id)}>
                    Delete
                </Button></>
        }
    ];
    const isImageType = (type: string) => {
        return type.startsWith('image/');
    };

    return (
        <div>
            {user && (
                <>
                    <h1>User Details</h1>
                    <Descriptions title="User Info">
                        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                        <Descriptions.Item label="First Name">{user.first_name}</Descriptions.Item>
                        <Descriptions.Item label="Second Name">{user.second_name || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Last Name">{user.last_name}</Descriptions.Item>
                        <Descriptions.Item label="Login">{user.login}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">{user.date_of_birth || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Profession">{profession ? profession.name : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Photo">
                            {user.photo_url && <img src={user.photo_url} alt="User" style={{maxWidth: '100px'}}/>}
                        </Descriptions.Item> </Descriptions>
                    <Table dataSource={user.attachments} columns={columns}/>
                    <Upload
                        name="file"
                        action={`${API_URL}/admin/users/${userId}/attach`}
                        headers={getAuthHeaders().headers}
                        onChange={handleUpload}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined/>}>Attach File</Button>
                    </Upload>
                    <Button type="primary" onClick={() => navigate(`/admin/users/${userId}/edit`)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={handleDeleteUser}>
                        Delete User
                    </Button>
                </>
            )}
        </div>
    );
};

export default AdminUserShow;
