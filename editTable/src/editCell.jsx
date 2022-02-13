import React, { useContext, useState, useEffect } from 'react';
import { Table, Input, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const form = useContext(EditableContext);
    useEffect(() => {
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    }, [editable]);

    const save = async ({ target: { value } }) => {
        if (dataIndex === 'age') {
            form.setFieldsValue({
                address: 10 * Number(value)
            });
        }
        try {
            const values = await form.validateFields();
            console.log("表单", value, dataIndex);
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = <Form.Item
            style={{
                margin: 0,
            }}
            name={dataIndex}
        >
            <Input onChange={save} />
        </Form.Item>
    }

    return <td {...restProps}>{childNode}</td>;
};

const EditableTable = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ])
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = [{
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
    },
    {
        title: 'age',
        dataIndex: 'age',
        editable: true,
    },
    {
        title: 'address',
        dataIndex: 'address',
        editable: true,
    },]


    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData)
    };
    const editColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    })
    return <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={editColumns}
    />
}
export default EditableTable