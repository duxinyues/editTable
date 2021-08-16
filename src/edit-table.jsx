import React, { useState } from "react";
import { Table, Input, Form, Button, message } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import "./App.css";
const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [saveData, setsaveData] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: "name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: () => <span>age <PlusCircleOutlined style={{ color: "red" }} onClick={addColumns} /></span>,
      dataIndex: "age",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      editable: true,
    },
  ])
  const addData = () => {
    const _data = data;
    _data.push({
      key: new Date().getTime(),
      name: "",
      age: "",
      age1: "",
      age2: "",
      age3: "",
      age4: "",
      age5: "",
      age6: "",
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
      console.log("数据==", _data)
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const addColumns = () => {
    const _columns = columns;
    const age6 = columns.findIndex((item) => item.dataIndex === "age6");
    if (age6 > 0) {
      message.warning("最多只能添加6组年龄");
      return
    }
    const middleArr = columns.filter((item) => item.dataIndex.includes("age"));
    let obj = {};

    middleArr.map((item) => {
      const index = _columns.findIndex((its) => its.dataIndex === item.dataIndex);
      _columns.splice(index + 1, 0, {
        title: "age" + index,
        dataIndex: "age" + index,
        editable: true,
      })
    })
    // 数组去重
    const resetArr = _columns.reduce(function (item, next) {
      const str = obj[next.dataIndex] ? '' : obj[next.dataIndex] = true && item.push(next);
      return item;
    }, []);
    setColumns([...resetArr])
  }
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
        {/* <Form form={form} component={false}> */}
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
                        if (id.includes("age1")) {
                          item.age1 = value;
                        }
                        if (id.includes("age2")) {
                          item.age2 = value;
                        }
                        if (id.includes("age3")) {
                          item.age3 = value;
                        }
                        if (id.includes("age4")) {
                          item.age4 = value;
                        }
                        if (id.includes("age5")) {
                          item.age5 = value;
                        }
                        if (id.includes("age6")) {
                          item.age6 = value;
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
                              message: `Please Input ${dataIndex + record.key
                                }!`,
                            },
                          ]}
                        >
                          <Input onBlur={changeRow} allowClear />
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
        {/* </Form> */}
        <div className="preview-data">
          <h3>预览数据</h3>
          <Table
            columns={columns}
            dataSource={saveData}
            rowKey={(record) => record.key}
          />
        </div>
      </div>
    </>
  );
};
export default EditableTable;