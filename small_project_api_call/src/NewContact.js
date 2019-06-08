import React from "react";
import "./css/styles.css"
import Button from 'react-bootstrap/Button';
import Contacts from './Contacts.js'
import ReactDOM from 'react-dom'

class NewContact extends React.Component {
	constructor(props)
	{

		const user = JSON.parse(localStorage.getItem('user'));
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userId: 0,
			address: '',
			email: '',
			phone: 0,
			contactId: 0,
			createDate: '',
		}

		this.state.userId = user.userId;
		this.addContact = this.addContact.bind(this);
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

	addContact()
	{
		console.log(this.state)
		const options = {
	      method : 'POST',
	      headers: { "Content-Type": "application/json; charset=UTF-8" },
	      body : JSON.stringify(this.state),
	    };
		
		fetch('https://murmuring-oasis-54026.herokuapp.com/contact/', options)
            .then(response => response.json())
			.then(data => {
				console.log(data);
				this.state.email = data.email;
				this.state.userId = data.userId;
				this.state.firstName = data.firstName;
				this.state.lastName = data.lastName;
				this.state.phone = data.phone;
				this.state.address = data.address;
				this.state.contactId = data.contactId;


				console.log('adding contact: ' + this.state.contactId);
				ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
				ReactDOM.render(<Contacts />, document.getElementById('root'))
			})
		
		ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Contacts />, document.getElementById('root'))
	}

	render() {
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		return (
			<div className={showHideClassName} style={{zIndex: 1}}>
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">New Contact</h5>
						<button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="inputFirstN">First Name</label>
									<input type="text" className="form-control" onChange = {this.handleChange} id="firstName" placeholder="First Name" />
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="inputLastN">Last Name</label>
									<input type="text" className="form-control" onChange = {this.handleChange} id="lastName" placeholder="Last Name" />
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputPhone">Phone Number:</label>
									<input type="tel" className="form-control" onChange = {this.handleChange} id="phone" placeholder="Phone Number" />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputEmail">Email:</label>
									<input type="email" className="form-control" onChange = {this.handleChange} id="email" placeholder="Email" />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputAddress">Address:</label>
									<input type="text" className="form-control" onChange = {this.handleChange} id="address" placeholder="123 University Dr, Orlando, FL 32801" />
								</div>
							</div>
							<br />
					
							<br />
							<div className="text-right">
								<button type="submit" onClick={this.addContact} className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default NewContact;
