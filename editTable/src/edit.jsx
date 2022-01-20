import React from 'react';
import { Table, Input, Form, Typography } from 'antd';
import { list } from "./data"

export const EditableTable = () => {
    const str = { data: list }
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
    console.log("str===", str)
    return (
        <Table
            components={{
                body: {
                    row: (params) => {
                        const record = params.children[0].props.record
                        return <tr>
                            <ItemForm record={record} onChange={(value) => {
                                str.data.forEach(element => {
                                    if (element.id == value.id) {
                                        element.content = value.content;
                                        element.age = Number(value.content) + Number(element.age)
                                    }
                                });
                            }} />
                        </tr>
                    }
                },
            }}
            bordered
            dataSource={list}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey={record => record.id}
        />
    );
};

const ItemForm = ({ record, onChange }) => {
    const [form] = Form.useForm();
    form.setFieldsValue({ ...record })

    return <Form form={form} component={false}>
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