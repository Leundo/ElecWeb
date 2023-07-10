import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Divider } from 'antd';
import '../styles/SectionTable.css';


export default function SectionTable(props) {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let newColumns = props.keys.map((header) => {
            return {
                title: props.section.descriptions[props.section.getIndex(header)],
                key: header,
                dataIndex: header,
            }
        });
        let newData = [...Array(props.section.rowCount).keys()].map((index) => {
            let entity = { key: index };
            for (const header of props.keys) {
                entity[header] = props.section.getItem(header, index);
            }
            return entity;
        });

        setColumns(newColumns);
        setData(newData);
    }, [props.keys, props.section]);

    const handleTableChange = (pagination, filters, sorter, extra) => {
    };

    return (
        <div className='section-table'>
            <Divider orientation='left' plain>
                {`${props.section.name}----${data.length}行`}
            </Divider>
            <Table columns={columns} dataSource={data} size='small' onChange={handleTableChange} pagination={{ pageSize: 50 }} scroll={{ x: 1600, y: 520 }} />
        </div>
    );
}