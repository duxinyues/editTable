/*
 * @FileName: 
 * @Author: 1638877065@qq.com
 * @Date: 2021-06-29 23:50:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 22:45:21
 * @FilePath: \edittable\src\index.js
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EditableTable from './edit-table';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <EditableTable />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
