import React, {useEffect, useState} from 'react';
import {List, Typography} from 'antd';
import axios from 'axios';
import {API_URL, BACK_URL} from '../../api';
import {getAuthHeaders} from '../../router/helpers';

interface Attachment {
    id: number;
    url: string;
    type: string;
    download_url: string; // Добавляем download_url к интерфейсу Attachment
}

const CabinetDashboard: React.FC = () => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    useEffect(() => {
        fetchAttachments();
    }, []);

    const fetchAttachments = async () => {
        try {
            const response = await axios.get(API_URL + '/cabinet', getAuthHeaders());
            setAttachments(response.data);
        } catch (error) {
            console.error('Error fetching attachments', error);
        }
    };

    return (
        <div>
            <h1>Cabinet Dashboard</h1>
            <List
                dataSource={attachments}
                renderItem={(attachment) => (
                    <List.Item key={attachment.id}>
                        <span>
                            <img src={BACK_URL + '/' + attachment.download_url} alt={attachment.url}
                                 style={{maxWidth: '100px'}}/>
                        </span>
                        <span><Typography.Link href={BACK_URL + attachment.download_url}
                                               type={'success'}
                                               target="_blank">{attachment.type}</Typography.Link></span>
                        <Typography.Link>
                            <a href={BACK_URL + attachment.download_url} download>
                                Download
                            </a>
                        </Typography.Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CabinetDashboard;
