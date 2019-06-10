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

		var { show, contact, handleClose, handleSubmit } = props;
		
		if (contact === undefined)
			return null;

		this.state = {
			firstName: '',
			lastName: '',
			userId: '',
			address: '',
			email: '',
			phone: '',
			contactId: '',
			createDate: '',
			displayName: "",
			tempfirstName: "",
			templastName: '',
			tempuserId: 0,
			tempaddress: "",
			tempemail: "",
			tempphone: 0,
			tempcontactId: 0,
			tempcreateDate: "",
			tempdisplayName: "",
			contactData: null,
		}

		// Parse contact from API call into JSON object
		this.state.contactData = JSON.parse(contact);

		// Initialize contact info variables and corresponding tempvariables
		console.log('Initializing tempvariables according to this JSON data:');
		console.log(this.state.contactData);

		this.state.firstName = this.state.tempfirstName = this.state.contactData.firstName;
		this.state.lastName = this.state.templastName = this.state.contactData.lastName;
		this.state.email = this.state.tempemail = this.state.contactData.email;
		this.state.address = this.state.tempaddress = this.state.contactData.address;
		this.state.phone = this.state.tempphone = this.state.contactData.phone;

		console.log('New component state after tempvariable initialization:');
		console.log(this.state);		

		// Set the state variables for userId and contact Id
		this.state.contactId = this.state.contactData.contactId;
		this.state.userId = this.state.contactData.userId;

		console.log("Component state after constructor initializations:")
		console.log(this.state);

		// Set the state variable for the handleSubmit() function reference
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	exitPage()
	{
	    ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Contacts />, document.getElementById('root'))
	}
	  
	handleChange(event)
	{				
		// If a non-null value was entered, set the state's tempvariable to that value
		if(event.target.value !== null)
		{
			console.log('Setting ' + event.target.id + ' to ' + event.target.value);

		    this.setState({
		    [event.target.id]: event.target.value
			});
		}
		// Else set the state's tempvariable to the contact property's original value
		// else
		// {
		// 	console.log('Setting ' + event.target.id + ' to original value (' + originalValue + ')');

		// 	this.setState({
		// 	[event.target.id]: this.state.contactData[event.target.id]
		// 	});
		// }
	}

	handleSubmit(temp)
	{
		console.log('Values received as "temp" in handleSubmit():');
		console.log(temp);

		console.log('Component state at the beginning of handleSubmit()');
		console.log(this.state);
		if(temp === null)
		{
			return null;
		}

		// Set state variables to new values from Update Contact form
		this.state.firstName = this.state.tempfirstName;
		this.state.lastName = this.state.templastName;
		this.state.email = this.state.tempemail;
		this.state.address = this.state.tempaddress;
		this.state.phone = this.state.tempphone;			

		// Form an API request to update contact
		console.log('Updating contact ' + this.state.contactId + '. Sending PUT request with new component state:')
		console.log(this.state)
  		const options = {
	      method : 'PUT',
	      headers: { "Content-Type": "application/json; charset=UTF-8"},
	      body : JSON.stringify(this.state),
	    };

		// Send the API request
		const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/';
	    fetch(url, options)
			.then(response => response.json())
			.then(data => {
			ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	   		ReactDOM.render(<Contacts />, document.getElementById('root'))
		}) 
		this.exitPage();

	}

	render() 
	{
		var { show, contact, handleClose, handleSubmit } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";		

		console.log('Rendering update form for contact ' + this.state.contactId);
		
		
		// Set the displayName value based on the contact JSON's name values
		const c = this.state.contactData;
		const displayName = c.firstName + " " + c.lastName;

		return (
			<div className={showHideClassName} style={{zIndex: 1}}>
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Update Contact Info For: {displayName}</h5>
						<button onClick={handleClose} type="button" className="close" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="inputFirstN">First Name</label>
									<input type="text" className="form-control" onChange ={(event) => this.handleChange(event)} id="tempfirstName" value={this.tempfirstName} />
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="inputLastN">Last Name</label>
									<input type="text" className="form-control" onChange ={(event) => this.handleChange(event)}  id="templastName" value={this.templastName} />
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputPhone">Phone Number:</label>
									<input type="tel" className="form-control" onChange ={(event) => this.handleChange(event)}  id="tempphone" value={this.tempphone} />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputEmail">Email:</label>
									<input type="email" className="form-control" onChange ={(event) => this.handleChange(event)} id="tempemail" value={this.tempemail} />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputAddress">Address:</label>
									<input type="address" className="form-control" onChange ={(event) => this.handleChange(event)} id="tempaddress" value={this.tempaddress} />
								</div>
							</div>
							<br />
				
							<br />
							<div className="text-right">
								<button type="submit" onClick={temp => this.handleSubmit(c)} className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

