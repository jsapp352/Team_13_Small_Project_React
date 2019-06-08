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


ReactDOM.render(<BrowserRouter>
				<Switch>
					<Route path="/" component={App}></Route>
					<Route path="login" component={Login}></Route>
					<Route path="user" component={User}></Route>
					<Route path="contact" component={Contact} />
				</Switch>
				</BrowserRouter>, 
				document.getElementById('root'));

