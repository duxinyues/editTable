/*
 * @FileName: 
 * @Author: 1638877065@qq.com
 * @Date: 2021-06-29 23:50:37
 * @LastEditors: 1638877065@qq.com
 * @LastEditTime: 2021-07-06 00:24:06
 * @FilePath: \edittable\src\App.js
 * @Description: 编辑表格
 */
import React, { useState,useEffect } from 'react';
import { Table, Input, Form } from 'antd';
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
 
  const changeRow = ({target:{value,id}})=>{
    console.log("record==",record)
    console.log("====",value,id)
    if(id==="age"+record.key){
      console.log("000000")
    }
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex+record.key}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${dataIndex+record.key}!`,
            },
          ]}
        >
         <Input onChange={changeRow} />
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
  useEffect(()=>{
    data.map((item)=>{})
  },[])

  const edit = (record) => {
    console.log(record)
    // form.setFieldsValue({
    //   name: '12',
    //   age: '2',
    //   address: '43',
    //   ...record,
    // });
  };

 

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log("==",row)
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
      onCell:(record,index)=>{
       console.log("设置列")
      }
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
            cell: ({
              editing,
              dataIndex,
              title,
              inputType,
              record,
              index,
              children,
              ...restProps
            }) => {
             const _data = data
              const changeRow = ({target:{value,id}})=>{
                // console.log("record==",record)
                // console.log("====",value,id)
                console.log(data)
                _data.map((item)=>{
                  if(item.key===record.key){
                    item.address = value
                  }
                });
                setData([..._data])
              }
              return (
                <td {...restProps}>
                  {editing ? (
                    <Form.Item
                      name={dataIndex+record.key}
                      style={{
                        margin: 0,
                      }}
                      rules={[
                        {
                          required: true,
                          message: `Please Input ${dataIndex+record.key}!`,
                        },
                      ]}
                    >
                     <Input onChange={changeRow} />
                    </Form.Item>
                  ) : (
                    children
                  )}
                </td>
              );
            }
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        onRow={record => {
          return {
            onClick: event => {
              edit(record)
            }, // 点击行
          };
        }}
      />
    </Form>
      <button onClick = {save}>保存</button>
    </>
  );
};
  export  default EditableTable