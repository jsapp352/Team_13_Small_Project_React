import React from 'react'
import ReactDOM from 'react-dom'
import Contacts from './Contacts'
import Table from "./Table"

export default class Loading extends React.Component
{
	constructor()
	{
		super();
	}


	load()
	{
		ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
		ReactDOM.render(<Table />, document.getElementById('root'));
		ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
		ReactDOM.render(<Contacts />, document.getElementById('root'));
		
	}
	render()
	{
		this.load();
		return(<div></div>)
	}
}
