import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {EditableTable} from './edit';
import EditableTable from "./edit-table"
// import AutoTable  from './autoTable';
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
