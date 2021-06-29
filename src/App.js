/*
 * @FileName: 
 * @Author: 1638877065@qq.com
 * @Date: 2021-06-29 23:50:37
 * @LastEditors: 1638877065@qq.com
 * @LastEditTime: 2021-06-30 00:56:57
 * @FilePath: \edittable\src\App.js
 * @Description: b编辑表格
 */
import React, { useState,useEffect } from 'react';
import { Table, Input, InputNumber, Form } from 'antd';
const originData = [];
document.title = "编辑表格"
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
// console.log("dataIndex:",dataIndex)
// console.log("title:",title)
// console.log("inputType:",inputType)
// console.log("index:",index)
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex+index}
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
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState([0,1,2,3]);
  useEffect(()=>{
    data.map((item)=>{})
  },[])

  const edit = (record) => {
    console.log(record)
    console.log(data)
    form.setFieldsValue({
      name: '12',
      age: '2',
      address: '43',
      ...record,
    });
  };

 

  const save = async (key) => {
    try {
      const row = await form.validateFields();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    console.log("col==",col)
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
  return (<>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
      <button onClick = {save}>保存</button>
    </>
  );
};
  export  default EditableTable