import React from 'react';
import User from "./User"
import Login from "./Login"
import Signup from "./Signup"
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import PasswordReset from "./PasswordReset"
import ForgotPassword from "./ForgotPassword"
import UpdateContact from './UpdateContact'
//http://localhost:5000/user/


function App()
{

	
	return (<div><Login /></div>)
	// return(
	// 		<BrowserRouter>
	// 			<Switch>
	// 				<Route path="/" component={Login} />
	// 				<Route path="signup" component={Signup} />
	// 				<Route path="user" component={User} />
	// 			</Switch>
	// 		</BrowserRouter>
	// 	);
}	

export default App;

