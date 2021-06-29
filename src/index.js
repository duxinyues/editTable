/*
 * @FileName: 
 * @Author: 1638877065@qq.com
 * @Date: 2021-06-29 23:50:37
 * @LastEditors: 1638877065@qq.com
 * @LastEditTime: 2021-06-30 00:10:08
 * @FilePath: \edittable\src\index.js
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EditableTable from './App';
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
