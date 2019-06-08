import React from "react";
import "./css/login-style.css"
import Button from 'react-bootstrap/Button';
import cover from './img/cover1.jpg';
import ReactDOM from "react-dom"
import Signup from './Signup.js'
import avatar from './img/avatar.jpg';
import {Redirect, Link} from 'react-router-dom'
import User from "./User"
import ForgotPassword from "./ForgotPassword.js"
import Contacts from "./Contacts.js"

class Login extends React.Component 
{
	state = { show: false, showForgot: false };

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};  	

  	showForgotModal = () => {
    	this.setState({ showForgot: true });
  	};

  	hideForgotModal = () => {
    	this.setState({ showForgot: false });
  	};

	constructor() {
		super();

		this.state = {
			createDate: "",
			email: "",
			firstName: "",
			lastName: "",
			phone: 0,
			userId: 0,
			username : "",
			password : "",
			securityQuestion: "",
			securityAnswer: "",
		};
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleUsernameChange = event => {
		this.state.username = event.target.value;
		this.setState({
			username : event.target.value,
		})
	}

	handlePasswordChange = event => {
		this.state.password = event.target.value;
		this.setState({
			password: event.target.value,
		});
	}

	handleSubmit = event => {
		let password = require('password-hash');
		let hashedPassword;
		event.preventDefault();
		const json = {
	    "password": this.state.password,
	    "username": this.state.username,
		}
	
		const options = {
			method : 'POST',
			headers: { 	"Content-Type": "application/json; charset=UTF-8",
						"username" : [this.state.username],
						"password" : [this.state.password]	
					},
			body : JSON.stringify(this.state),
		};
		
		fetch('https://murmuring-oasis-54026.herokuapp.com/user/login/', options)
            .then(response => response.json())
			.then(data => {

				this.state.email = data.email;
				this.state.userId = data.userId;
				this.state.firstName = data.firstName;
				this.state.lastName = data.lastName;
				this.state.phone = data.phone;
				this.state.username = data.username;
				this.state.password = password.generate(data.password);
				this.state.securityQuestion = data.securityQuestion;
				this.state.securityAnswer = data.securityAnswer;


				console.log("userId : " + this.state.userId)
				const user = JSON.stringify(this.state);
				localStorage.setItem('user', user);
				ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
				ReactDOM.render(<Contacts />, document.getElementById('root'))
		
			})
	}

	render() {
		return (
  		<div>
		<main className="main h-100 col-sm-12 col-md-6 col-lg-6 float-right">
	  		<div className="container h-100">
				<div className="row h-100">
		  			<div className="col-10 col-sm-10 col-md-10 col-lg-9 mx-auto d-table h-100">
						<div className="d-table-cell align-middle">
			 			<div className="text-center mt-4">
							<h1 className="h2">Welcome!</h1>
							<p className="lead">
				  				Sign in to your account to continue
							</p>
			  			</div>
			  			<div className="card">
							<div className="card-body">
				  				<div className="m-sm-4">
									<div className="text-center">
					  					<img src={avatar} alt={"avatar"} className="img-fluid rounded-circle" width={132} height={132} />
									</div>
									<form onSubmit={this.handleSubmit}>
									  	<div className="form-group">
											<label>Username</label>
											<input className="form-control form-control-lg" 
													type="username" 
													name="username"
													value={this.state.username}
													onChange={this.handleUsernameChange}
													placeholder="Enter Your User Name" />
									  	</div>
									  	<div className="form-group">
											<label>Password</label>
											<input className="form-control form-control-lg" 
													type="password" 
													name="password" 
													value={this.state.password}
													onChange={this.handlePasswordChange}
													placeholder="Enter Your Password" />
											<small><a style={{cursor: "pointer"}} onClick={this.showForgotModal}>Forgot password?</a></small>
									  	</div>
									  	<div className="text-center mt-3">
											<Button
												block
												bssize="large"
												disabled={!this.validateForm()}
												type="submit"
													
												className="btn btn-primary"
											>
											Login
											</Button>
									  	</div><br />
									  	<p>Not signed up yet? <a href="#" className="open" onClick={this.showModal}>
										  	Create account
										</a></p>
									</form>
				  				</div>
							</div>
			  			</div>
					</div>
		  		</div>
			</div>
	  	</div>
	  	<Signup show={ this.state.show } handleClose={this.hideModal} />
	  	<ForgotPassword show={ this.state.showForgot } handleClose={this.hideForgotModal} />
		</main>
		<div className="cover d-none d-sm-none d-md-block" style={{"height" : "100%", "width" : "50%", "backgroundImage" : "url(" + cover + ")"}} /></div>
		);
	}
}

export default Login;
