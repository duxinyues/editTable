import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { list } from "./data"

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    form,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )
            }
        </td >
    );
};

export const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(list);
    const [editingKey, setEditingKey] = useState('');
    console.log("form", form)
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

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
    // return <table>
    //     <thead>
    //         <tr>
    //             <td>name</td>
    //             <td>content</td>
    //             <td>age</td>
    //             <td>operation</td>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             data.map((record) => {
    //                 form.setFieldsValue({ ...record })
    //                 return <tr>
    //                     <ItemForm record={record} />
    //                 </tr>

    //             })
    //         }
    //     </tbody>
    // </table>
    return (

        <Table
            components={{
                body: {
                    cell: EditableCell,
                    row: (params) => {
                        console.log("params", params)

                        const record = params.children[0].props.record
                        return <tr>
                            <ItemForm record={record} />
                        </tr>
                    }
                },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey={record => record.id}
        />
    );
};

const ItemForm = ({ record }) => {
    const [form] = Form.useForm();
    form.setFieldsValue({ ...record })
    return <Form form={form} component={false}>
        <td>
            <Form.Item
                name='name'
                style={{
                    margin: 0,
                }}

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
                    form.setFieldsValue({ ...record, content: value, age: Number(value) + 908 })
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