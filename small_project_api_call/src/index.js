import React from "../node_modules/react";
import ReactDOM from '../node_modules/react-dom';
import './index.css';
import App from './App';
import Contact from "./Contact.js"
import Login from "./Login.js"
import User from "./User"
import { Route, Link, BrowserRouter, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

document.title="Contact Manager"
ReactDOM.render(<Login />,document.getElementById('root'));

