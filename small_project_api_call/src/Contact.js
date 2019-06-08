import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Must be called in format:

//<Contact option='' address='' email='' userId='' ... etc />
// Option designates the action being taken
// This is necessary to build proper url
// all passed params will be added to the contact

export default class Contact extends React.Component
{
	constructor(props)
	{
		super(props);
		const user = JSON.parse(localStorage.getItem('contact'));
		this.state = {
			address: "",
			contactId: 0,
			createDate: "",
			email: "",
			firstName: "",
			lastName: "",
			phone: 0,
			userId: user.userId,
			option: "",
		}
	
		console.log("user: " + this.state.userId)
	}

	contactControl(props)
	{
		const op = props.option;

		let method = '';
		let extension = '';

		if(op === 'createContact')
		{
			method = 'POST';
			extension = '';
		}
		else if(op === 'updateContact')
		{
			method = 'PUT';
			extension = '';
		}
		else if(op === 'getContactByContactId')
		{
			method = 'GET';
			extension =  this.state.contactId;
		}
		else if(op === 'deleteContact')
		{
			method = 'DELETE';
			extension = this.state.contactId;
		}
		else if(op === 'getContactBySearchCriteria')
		{
			method = 'GET';
			extension = "search/" + this.state.contactId;
		}
		else if(op === 'getContactsByUserId')
		{
			method = 'GET';
			extension = "userId/" + [this.state.userId];
		}
		
		let options;
		if(method === "GET")
		{
			options = {
				method : method,
				headers: {  "Content-Type": "application/json; charset=UTF-8" },
			};
		}
		else
		{
			options = {
				method : method,
				headers: { "userId":[this.state.userId], "Content-Type": "application/json; charset=UTF-8" },
				body : JSON.stringify(this.state),
			};
		}

		const url = new URL('http://localhost:5000/contact/' + extension);		
		console.log(url);

		fetch(url, options)
            .then(response => response.json())
			.then(data => {console.log(data)

				this.setState({
					address : data.address,	
					contactId: 0,
					createDate: "",
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastNmae,
					phone: data.phone,
				})
			})	
	}


	handleSubmit = event => {
		event.preventDefault();
		
		this.contactControl()
	}
	
	render()
	{
		// const op = props.
	    return (
	      <div>
	        <MuiThemeProvider>
	          <div>
	          <AppBar
	             title="PLACEHOLDER: NEEDS CONDITIONALS"
	           />
	           <TextField
	             hintText="Enter Contact Name"
	             floatingLabelText="name"
	             onChange = {(event,newValue) => this.setState({username:newValue})}
				 />
	           <br/>
	             <TextField
	               hintText="Enter Phone Number"
	               floatingLabelText="phone"
				   onChange = {(event,newValue) => this.setState({password:newValue})}
	               />
	             <br/>
	             <RaisedButton label="Add Contact" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
	         </div>
	         </MuiThemeProvider>
	      </div>
	    );
	}
}
const style = {
  margin: 15,
  flex : 1,
};

