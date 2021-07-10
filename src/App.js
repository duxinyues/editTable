/*
 * @FileName:
 * @Author: 1638877065@qq.com
 * @Date: 2021-06-29 23:50:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-10 14:28:33
 * @FilePath: \edittable\src\App.js
 * @Description: 编辑表格
 */
import React, { useState } from "react";
import { Table, Input, Form, Button } from "antd";
import "./App.css";
const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [saveData, setsaveData] = useState([]);
  const addData = () => {
    const _data = data;
    _data.push({
      key: new Date().getTime(),
      name: "",
      age: "",
      address: "",
    });
    setData([..._data]);
  };

  const save = async (key) => {
    const _data = data;
    try {
      await form.validateFields();
      form.setFieldsValue();
      setData([])
      setsaveData([..._data]);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });
  return (
    <>
      <div className="btn">
        <Button onClick={addData}>添加数据</Button>
        <Button onClick={save}>提交</Button>
      </div>
      <div className="container">
        <Form form={form} component={false}>
          <Table
            style={{ width: "660px" }}
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
                  const changeRow = ({ target: { value, id } }) => {
                    data.map((item) => {
                      if (item.key === record.key) {
                        if (id.includes("name")) {
                          item.name = value;
                        }
                        if (id.includes("age")) {
                          item.age = value;
                        }
                        if (id.includes("address")) {
                          item.address = value;
                        }
                      }
                      return value;
                    });
                  };
                  return (
                    <td {...restProps}>
                      {editing ? (
                        <Form.Item
                          name={dataIndex + record.key}
                          style={{
                            margin: 0,
                          }}
                          rules={[
                            {
                              required: true,
                              message: `Please Input ${
                                dataIndex + record.key
                              }!`,
                            },
                          ]}
                        >
                          <Input onBlur={changeRow} allowClear/>
                        </Form.Item>
                      ) : (
                        children
                      )}
                    </td>
                  );
                },
              },
            }}
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            rowKey={(record) => record.key}
          />
        </Form>
        <div className="preview-data">
          <h3>预览数据</h3>
          <Table
            columns={[
              { title: "姓名", dataIndex: "name" },
              { title: "年龄", dataIndex: "age" },
              { title: "地址", dataIndex: "address" },
            ]}
            dataSource={saveData}
            rowKey={(record) => record.key}
          />
        </div>
      </div>
    </>
  );
};
export default EditableTable;
