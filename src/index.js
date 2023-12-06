import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles.css"
import { registerLicense } from '@syncfusion/ej2-base';
// import ENV from '../config'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVFpR2Nbe05xdF9CZ1ZSR2YuP1ZhSXxQd0djWn5edHNWQmRUUUQ=');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
