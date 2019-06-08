import React from "react";
import placeholder from "./img/user.png";
import "./css/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from "react-dom"
import Contacts from './Contacts'
import UpdateContact from './UpdateContact.js'

// var data = [
// 	{ firstName: 'Tony', lastName: 'Giumenta', phone: '123-456-7890', email: 'tony@google.com' },
// 	{ firstName: 'Andy', lastName: 'Tschida', phone: '123-456-7890', email: 'andy@google.com' },
// 	{ firstName: 'Michael', lastName: 'Mignon', phone: '123-456-7890', email: 'michael@google.com' },
// 	{ firstName: 'Justin', lastName: 'Sapp', phone: '123-456-7890', email: 'justin@google.com' },
// 	{ firstName: 'Ivan', lastName: 'Chaffardett', phone: '123-456-7890', email: 'ivan@google.com' },
// 	{ firstName: 'Shady', lastName: 'Saleh', phone: '123-456-7890', email: 'shady@google.com' }
// ];

class Table extends React.Component {
	
	constructor(props)
	{
		super(props);
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(props);
		const options = localStorage.getItem('search');

		this.state = {
			contacts : [],
			userId : user.userId,
			contactData: [],
			contactId: 0,
			crit: props.crit,
			critPresent: props.critPresent
		}

		console.log(this.state)
		this.state.userId = user.userId;
		this.deleteContact = this.deleteContact.bind(this);
		// this.updateContact = this.updateContact.bind(this);
	}
	
	componentWillMount()
	{
		let url;
		console.log(url);
	
	
		let options = {};
		if(this.state.crit === '')
		{
			url = 'https://murmuring-oasis-54026.herokuapp.com/contact/userId/' + this.state.userId + '/' ;
			options = {
				method : 'GET',
				headers: { 	"Content-Type": "application/json; charset=UTF-8"},
			}
		}
		else
		{
			console.log('criteria: ' + [this.state.crit])
			url = 'https://murmuring-oasis-54026.herokuapp.com/contact/search/' + this.state.userId + '/' ;
			options = {
				method : 'GET',
				headers: { 	"Content-Type": "application/json; charset=UTF-8", "criteria": [this.state.crit]},
			}
			this.state.critPresent = true;
		}
		fetch(url,options)
		.then(response=>response.json())
		.then(data => {
			this.state.contacts = data;
			console.log(data);
			this.setState({contacts:data})			
		})
	}

	deleteContact(id, event)
	{
		//const id = this.state.contactId;
		console.log("CONTACT ID = " + id);
		
		const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/' + id + '/';
		const options = {
			method : 'DELETE',
			headers: { 	"Content-Type": "application/json; charset=UTF-8" },
			body : JSON.stringify(id)
		};
		
		fetch(url, options).then(response => response.json()).then(data=>{console.log(data);
			ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
			ReactDOM.render(<Contacts />, document.getElementById('root'))

		})
	}

	state = { show: false, item: "" };

  	showModal = (item) => {
    	this.setState({ show: true, contact: item});
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};  

	// updateContact()
	// {
	// 	localStorage.setItem("contact", JSON.stringify(this.state));
	// 	ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
	// 	ReactDOM.render(<UpdateContact show={this.state.show} handleClose={this.hideModal} />, document.getElementById('root'))
	// }

	updateContact(contact) {
		const c = JSON.parse(contact);

		console.log("Contact ID to update = " + c.contactId);

		const json = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			securityAnswer: this.state.securityAnswer,
			securityQuestion: this.state.securityQuestion,
			userId: this.state.userId,
			username: this.state.username,
		};

		console.log("First: " + JSON.stringify(json));

  		const options = {
	      	method : 'PUT',
	      	headers: { "Content-Type": "application/json; charset=UTF-8"},
	      	body : JSON.stringify(json),
	    };

		const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/';
		console.log(url);

	    fetch(url, options)
	        .then(response => response.json())
	      	.then(data => {
	      		this.setState({json: data});
	      		console.log("Second: " + JSON.stringify(json));
	      	})
	}

	render() {
		let contacts=[];
		this.state.contacts.forEach((item, index) => {
			contacts.push(
				<tr key={index}>
					<td className="contact-name">{item.firstName} {item.lastName}</td>
					<td className="contact-number">{item.phone}</td>
					<td className="contact-email d-none d-md-table-cell">{item.email}</td>
					<td className="table-action">
						<a href="#"><span onClick={this.showModal.bind(this, JSON.stringify(item))}><FontAwesomeIcon icon={faPen} className="align-middle" /></span></a>
						&nbsp;&nbsp;
						<a href="#"><span type="submit" onClick={this.deleteContact.bind(this, item.contactId)}><FontAwesomeIcon icon={faTrash} className="align-middle" /></span></a>
					</td>
				</tr>
			)
		})

		if (contacts.length <= 0)
		{
			contacts.push(
				<div style={{fontSize : 1.2 + "em", margin : 10}}>You have no contacts :( </div>
			)
		}

		return (
			<div className="row">
				<UpdateContact show={this.state.show} contact={this.state.contact} handleClose={this.hideModal} handleSubmit={this.updateContact.bind(this, this.state.contact)}/>
				<div className="col-12 col-xl-12">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title">Your Contacts</h5>
						</div>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th style={{width: '35%'}}>Name</th>
									<th style={{width: '25%'}}>Phone Number</th>
									<th className="d-none d-md-table-cell" style={{width: '30%'}}>Email Address</th>
									<th className="text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{contacts}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Table;
