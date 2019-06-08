import React from "react";
import "./Login.css";
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import Login from './Login'
import Bootstrap from 'react-bootstrap'
import { Switch } from 'react-router-dom'
import User from "./User.js"
import Contacts from "./Contacts"

class Signup extends React.Component
{
	constructor()
	{
		super();

		this.state = {
				createDate: "",
				firstName: "",
				lastName: "",
				password: "",
				securityAnswer: "",
				securityQuestion: "",
				userId: 0,
				username: "",
			}

		this.addUser = this.addUser.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	addUser()
	{
		console.log("Username: " + this.state.username) 
	}
	
	validateForm() 
	{
		return this.state.firstName.length > 0 && 
				 this.state.lastName.length > 0 &&
				 this.state.username.length > 0 &&
				 this.state.password.length > 0 &&
				 this.state.securityQuestion.length > 0 &&
				 this.state.securityAnswer.length > 0;
	}

	handleChange = event => {
		this.setState({
		[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		let password = require('password-hash');
		let hashedPassword;
		console.log(this.state)
		const options = {
			method : 'POST',
			headers: { "Content-Type": "application/json; charset=UTF-8" },
			body : JSON.stringify(this.state),
		};
		fetch('https://murmuring-oasis-54026.herokuapp.com/user/', options)
						.then(response => response.json())
			.then(data => {
	
				console.log("here")
				this.state.firstName = data.firstName;
				this.state.lastName = data.lastName;
				this.state.phone = data.phone;
				this.state.userId = data.userId;
				this.state.securityQuestion = data.securityQuestion;
				this.state.securityAnswer = data.securityAnswer;
				this.state.username = data.username;
				this.state.password = password.generate(data.password);
				const user = localStorage.setItem('user', JSON.stringify(this.state));
			// console.log("Local Stored from Signup.js : " + user);
				console.log("added user: "+ this.state.password)
				ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
				ReactDOM.render(<Contacts />, document.getElementById('root'))
	
			})   
	}

	render() 
	{
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		return(
			<div className={showHideClassName}> 
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Get Started</h5>
						<button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>First Name</label>
									<input type="text" className="form-control" 
										id="firstName"
										value={this.state.firstName}
										onChange = {this.handleChange}
										placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input type="text" className="form-control" 
										id="lastName"
										value={this.state.lastName}
										onChange = {this.handleChange}
										placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Username</label>
									<input type="text" className="form-control" 
										id="username"
										value={this.state.username}
										onChange = {this.handleChange}
										placeholder="Username" />
								</div>
								<div className="form-group col-md-6">
									<label>Password</label>
									<input type="password" className="form-control" 
										id="password" 
										value={this.state.password}
										onChange = {this.handleChange}
										placeholder="Password" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">Security Question</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" 
										id="securityQuestion" 
										value={this.state.securityQuestion}
										onChange = {this.handleChange}
										placeholder="Question" />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">Security Answer</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" 
										id="securityAnswer" 
										value={this.state.securityAnswer}
										onChange = {this.handleChange}
										placeholder="Answer" />
								</div>
							</div>
							<br />
							<div className="text-right">
								<button type="submit" className="btn btn-primary"
									onClick={this.handleSubmit}
								>Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
