import React from 'react';
import { useState, useCallback, useEffect, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import '../styles/FolderUploader.css';

import { formatDate } from '../utils/DateFormatter';

export default function FolderUploader(props) {
    const fileListColumns = [
        {
            title: '文件名',
            key: 'filename',
            dataIndex: 'filename',
        },
        {
            title: '修改时间',
            key: 'lastModifiedDate',
            dataIndex: 'lastModifiedDate',
        },
        {
            title: '动作',
            key: 'action',
            render: (_, record) => (
                <Button onClick={(event) => { selectFile(event, record) }} > 选择 </Button>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);

    useImperativeHandle(props.onRef, () => {
        return {
            clickInput: () => { document.getElementById('uplodding-input').click() },
        };
    });

    const uploader = useCallback((node) => {
        if (node !== null) {
            node.setAttribute('webkitdirectory', '');
            node.setAttribute('directory', '');
            node.setAttribute('multiple', '');
        }
    }, []);

    const uploadFolder = (event) => {
        let files = [...event.target.files].filter(($0) => { return $0.name.endsWith('.dat') });
        let newFileInfoList = [];
        for (let file of files) {
            newFileInfoList.push({
                key: file.name,
                filename: file.name,
                lastModified: file.lastModified,
                lastModifiedDate: formatDate(file.lastModifiedDate, 'yyyy/MM/dd hh:mm:ss'),
            });
        }
        files = files.sort(($0, $1) => {return $0.name < $1.name});
        props.handleUploadingFiles(files, newFileInfoList);
    }

    const selectFile = (event, record) => {
        props.handleSelcetingFile(record.filename);
    }

    const handleTableChange = (pagination, filters, sorter, extra) => {
    };

    return (
        <div className='folder-uploader'>
            <input id='uplodding-input' type='file' onChange={uploadFolder} ref={uploader} style={{ display: 'none' }} />
            <Table columns={fileListColumns} dataSource={props.fileInfoList} size='small' onChange={handleTableChange} pagination={{ pageSize: 50 }} scroll={{ y: 300 }} />
        </div>
    );
};