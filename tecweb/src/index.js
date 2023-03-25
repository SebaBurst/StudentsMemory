import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './componentes/login';
import Profesor from './componentes/profesor';
import Student from './componentes/estudiante';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from './componentes/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
