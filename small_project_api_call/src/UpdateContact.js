import React from "react";
import "./css/styles.css"
import Button from 'react-bootstrap/Button';
import Contacts from './Contacts.js'
import ReactDOM from 'react-dom'

export default class UpdateContact extends React.Component {
	constructor(props)
	{

		const user = JSON.parse(localStorage.getItem('contact'));
		super(props);
		this.state = {
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user.userId,
			address: user.address,
			email: user.email,
			phone: user.phone,
			contactId: user.contactId,
			createDate: user.createDate,
		}

		this.state.userId = user.userId;
		// this.update = this.update.bind(this);
	}

	exitPage()
	{
	    ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Contacts />, document.getElementById('root'))
	}
	  
	handleChange = event => {
	    this.setState({
	    [event.target.id]: event.target.value
	    });
	}


	// update() {
	// 	const json = {
	// 		firstName: this.state.firstName,
	// 		lastName: this.state.lastName,
	// 		password: this.state.password,
	// 		securityAnswer: this.state.securityAnswer,
	// 		securityQuestion: this.state.securityQuestion,
	// 		userId: this.state.userId,
	// 		username: this.state.username,
	// 	};

	// 	console.log("First: " + json);

 //  		const options = {
	//       	method : 'PUT',
	//       	headers: { "Content-Type": "application/json; charset=UTF-8"},
	//       	body : JSON.stringify(json),
	//     };

	// 	const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/';
	// 	console.log(url);

	//     fetch(url, options)
	//         .then(response => response.json())
	//       	.then(data => {
	//       		this.setState({json: data});
	//       		console.log("Second: " + json);
	//       	})
	// }

	render() {
		var { show, contact, handleClose, handleSubmit } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";
		
		if (contact == undefined)
			return null;

		const c = JSON.parse(contact);

		return (
			<div className={showHideClassName} style={{zIndex: 1}}>
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Update Contact Info For: {this.state.firstName} {this.state.lastName}</h5>
						<button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="inputFirstN">First Name</label>
									<input type="text" value={c.firstName} className="form-control" onChange = {this.handleChange} id="firstName" placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="inputLastN">Last Name</label>
									<input type="text" value={c.lastName}className="form-control" onChange = {this.handleChange} id="lastName" placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputPhone">Phone Number:</label>
									<input type="tel"value={c.phone} className="form-control" onChange = {this.handleChange} id="phone" placeholder="Phone Number" />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputEmail">Email:</label>
									<input type="email"value={c.email} className="form-control" onChange = {this.handleChange} id="email" placeholder="Email" />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputAddress">Address:</label>
									<input type="text" value={c.address}className="form-control" onChange = {this.handleChange} id="address" placeholder="123 University Dr, Orlando, FL 32801" />
								</div>
							</div>
							<br />
				
							<br />
							<div className="text-right">
								<button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

