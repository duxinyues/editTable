import React, { useState } from 'react';
import { Table, Input, Form, Typography, Checkbox } from 'antd';
import { list } from "./data"

export const EditableTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState(list);
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'content',
            dataIndex: 'content',
            width: '15%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return <Typography.Link >
                    添加
                </Typography.Link>
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: true,
            }),
        };
    });
    const rowSelection = {
        selectedRowKeys,
        onChange: (rowKeys) => {
            console.log("rowKeys", rowKeys);
            setSelectedRowKeys(rowKeys);
            let newList = list.map(item => {
                if (rowKeys.length > 0) {
                    return { ...item, checked: true }
                } else {
                    return { ...item, checked: false }
                }
            });
            setData([...newList])
        },
    }
    return (
        <Table
            components={{
                body: {
                    row: (params) => {
                        const record = params.children[0].props.record
                        return <tr>
                            <ItemForm record={record} onChange={(value) => {
                                if(!value.checked){
                                    
                                }
                                data.forEach(element => {
                                    if (element.id === value.id) {
                                        element.content = value.content;
                                        element.age = Number(value.content) + Number(element.age)
                                    }
                                });
                            }} />
                        </tr>
                    }
                },
            }}
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey={record => record.id}
            rowSelection={rowSelection}
        />
    );
};

const ItemForm = ({ record, onChange }) => {
    console.log("添加", record)
    const [form] = Form.useForm();
    form.setFieldsValue({ ...record })

    return <Form form={form} component={false}>
        <td>
            <Checkbox checked={record.checked} onChange={({ target: { value } }) => {
                onChange({ ...record, checked: value })
            }} />
        </td>
        <td>
            <Form.Item
                name='name'
                style={{
                    margin: 0,
                }}
                messageVariables={{ another: 'good' }}
            >
                <Input />
            </Form.Item>
        </td>
        <td>
            <Form.Item
                name='content'
                style={{
                    margin: 0,
                }}
                onChange={({ target: { value } }) => {
                    onChange({
                        ...record,
                        content: value,
                        age: Number(value) + 908
                    })
                    form.setFieldsValue({
                        ...record,
                        content: value,
                        age: Number(value) + 908
                    })
                }}
            >
                <Input />
            </Form.Item>
        </td>
        <td>
            <Form.Item
                name='age'
                style={{
                    margin: 0,
                }}
            >
                <Input />
            </Form.Item>
        </td>
        <td><Typography.Link >
            添加
        </Typography.Link></td>
    </Form>
}