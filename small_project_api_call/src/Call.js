/*
**********************

All Classes Will Be Moved to Separate Files

**********************
*/


import React from 'react';

// - Contact Class -> Will fetch and add data from API
// - Contains members name, phone, etc, in "state"
// - Constructor method is responsible for creating all data in Class
// - componentDidMount() is reserved keyword that is called after
//		the component is render to DOM. This is where fetch() and
// 		setState will be called to create object from JSON
// - getPayload method creates the formatted json text to be sent to API
class Contact extends React.Component
{
	constructor()
	{
		super();

		this.state = {
			address : '',
			contactId : 0,
			createDate : '',
			email: '',
			firstName : '',
			lastName : '',
			phone : 0,
			userId : 0
		}
	}

	componentDidMount()
	{

	}

	getPayload()
	{
		const payload = '{' +
						'"address:" "' + this.state.address + '", ' +
						'"contactId:" ' + this.state.contactId + ', ' +
						'"createDate:" "' + this.state.createDate + ', ' +
						'"email:" "' + this.state.email + ', ' +
						'"firstName:" "' + this.state.firstName + '", ' +
						'"lastName:" "' + this.state.lastName + '", ' +
						'"phone:" ' + this.state.phone + ', ' +
						'"userId:" ' + this.state.userId + '' +
						'}'
					;

		return payload;
	}

	render()
	{
		return (<div>{this.getPayload()}</div>)
	}

}

// User class, basically the same as Contact with different members.
// Contains a working componentDidMount(). populate_members method is
// commented out for future reference and possible changes
class User extends React.Component
{
	constructor()
	{
		super();

		this.state = {
			loading : false,
			userId: 0,
			username : '',
			password : '',
			firstName: '',
			lastName : '',
			securityQuestion: '',
			securityAnswer: '',
			createDate: '' ,
			email: '',
			json: []
		}
		this.setState = this.setState.bind(this);

	}

	componentDidMount()
	{
		// this.setState({loading:true});
		fetch('http://localhost:8080/user/2')
            .then(response => response.json())
            .then(data => {
                this.setState({
					loading: false,
              	userId : data.userId,
					createdDate : data.createdDate,
					// email : this.state.json.email,
					firstName : data.firstName,
					lastName : data.lastName,
					password : data.password,
					username : data.username,
					securityAnswer : data.securityAnswer,
					securityQuestion : data.securityQuestion
                })
            })
	}

	populate_members()
	{
		this.setState({
			userId : this.state.json.userId,
			createdDate : this.json.createdDate,
			// email : this.state.json.email,
			firstName : this.state.json.firstName,
			lastName : this.state.json.lastName,
			password : this.state.json.password,
			username : this.state.json.username,
			securityAnswer : this.state.json.securityAnswer,
			securityQuestion : this.state.json.securityQuestion
		});

	}

	getPayload()
	{
		const payload = '{' +
							 '"userId:" "' + this.state.userId + '", ' +
							 '"createdDate:" "' + this.state.createdDate + '", ' +
							 // '"email:" "' + this.state.email + '", ' +
							 '"firstName:" "' + this.state.firstName + '", ' +
							 '"lastName:" "' + this.state.lastName + '", ' +
							 '"password:" "' + this.state.password + '", ' +
							 '"username:" "' + this.state.username + '", ' +
							 '"securityAnswer:" "' + this.state.securityAnswer + '", ' +
							 '"securityQuestion:" "' + this.state.securityQuestion + '"' +
							 '}'
					;

		return payload;
	}

	render()
	{
		// return (<div><Contact /></div>)
		return (<div>{this.getPayload()}</div>)
	}
}

export default User;
