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
		}

		// this.state.userId = user.userId;
		// this.update = this.update.bind(this);
		console.log(this.state);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	exitPage()
	{
	    ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Contacts />, document.getElementById('root'))
	}
	  
	// handleChange = event => {
	handleChange(c, event){
			console.log(c);
		if(event.target.value)
		{
		    this.setState({
		    [event.target.id]: event.target.value
			});
		}
		else
		{
			this.setState({
			[event.target.id]: c
			})
		}
	}


	

	handleSubmit(temp)
	{


		console.log(temp);

		console.log(this.state);
		if(temp === null)
		{
			return null;
		}

		this.state.firstName = this.state.tempfirstName;
		this.state.lastName = this.state.templastName;
		this.state.email = this.state.tempemail;
		this.state.address = this.state.tempaddress;
		this.state.phone = this.state.tempphone;
			

		if(this.state.firstName === '' || this.state.firstName === null){
			this.state.firstName = temp.firstName;
		}

		if(this.state.lastName === '' || this.state.lastName === null){
			this.state.lastName = temp.lastName;
		}

		if(this.state.email === '' || this.state.email === null){
			this.state.email = temp.email;
		}

		if(this.state.phone === 0 || this.state.phone === null){
			this.state.phone = temp.phone;
		}

		if(this.state.address === '' || this.state.address === null){
			this.state.address = temp.address
		}

		// console.log("state in: ")
		console.log('herer' + this.state.contactId)
		console.log(this.state)
  		const options = {
	      method : 'PUT',
	      headers: { "Content-Type": "application/json; charset=UTF-8"},
	      body : JSON.stringify(this.state),
	    };

		const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/';
	    fetch(url, options)
	            .then(response => response.json())
	      .then(data => {
			ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	   		ReactDOM.render(<Contacts />, document.getElementById('root'))
		}) 
		this.exitPage();

	}

	render() {
		var { show, contact, handleClose, handleSubmit } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";
		if (contact == undefined)
			return null;

		// Parse contact from API call into JSON object
		const c = JSON.parse(contact);

		// Set the state variables for userId and contact Id
		this.state.contactId = c.contactId;
		this.state.userId = c.userId;

		// Set temp variables for contact info based on JSON data
		 this.state.tempfirstName = c.firstName;
		 this.state.templastName = c.lastName;
		 this.state.tempemail = c.email;
		 this.state.tempaddress = c.address;
		 this.state.tempphone = c.phone;

		console.log(this.state.contactId)
		// this.fetchHelper(c);

		// Set the displayName value based on the contact JSON's name values
		const displayName = c.firstName + " " + c.lastName
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
									<input type="text" className="form-control" onChange ={(event) => this.handleChange(c.firstName, event)} id="tempfirstName" value={this.tempfirstName} />
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="inputLastN">Last Name</label>
									<input type="text" className="form-control" onChange ={(event) => this.handleChange(c.lastName, event)}  id="templastName" value={this.templastName} />
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputPhone">Phone Number:</label>
									<input type="tel" className="form-control" onChange ={(event) => this.handleChange(c.phone, event)}  id="tempphone" value={this.tempphone} />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputEmail">Email:</label>
									<input type="email" className="form-control" onChange ={(event) => this.handleChange(c.email, event)} id="tempemail" value={this.tempemail} />
								</div>
							</div>
							<br />
							<div className="form-row">
								<div className="col-sm-12">
									<label htmlFor="inputAddress">Address:</label>
									<input type="address" className="form-control" onChange ={(event) => this.handleChange(c.address, event)} id="tempaddress" value={this.tempaddress} />
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

