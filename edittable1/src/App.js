import React, { useEffect, useState } from "react";
import { Table, Input, Form, Typography, Popconfirm, Button, Modal, Select } from "antd";
import "./App.css";
import { data } from "./data";
const { Option } = Select;
const Dome = () => {
  const [visible, setVisible] = useState(false);
  return <React.Fragment>
    <Button type="primary" onClick={() => setVisible(true)}>编辑</Button>
    <Modal visible={visible} cancel={() => setVisible(false)}>
      <EditableTable />
    </Modal>
  </React.Fragment>
}
const EditableTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    console.log("data", data)
    setDataSource(data)
  }, [])
  const isEditing = (record) => record.id === editingKey;
  const cancel = () => { setEditingKey('') }
  const save = async () => {
    const from = await form.validateFields();
    console.log("表单", from)
  }
  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      content: record.content,
    });
    setEditingKey(record.id)
  }
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
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
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
        editing: isEditing(record),
        form
      }),
    };
  });
  return <React.Fragment>
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={dataSource}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  </React.Fragment>
};

const EditableCell = ({ editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  form,
  ...restProps }) => {
  console.log("====", dataIndex)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {
            dataIndex === "name" ? <Input /> : <Select onChange={(e) => {
              console.log("select", e)
              form.setFieldsValue({
                content: e
              })
            }}>
              <Option value="90">90</Option>
              <Option value="43">43</Option>
              <Option value="65">65</Option>
            </Select>
          }
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
export default Dome;
