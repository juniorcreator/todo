import React, {Component } from 'react';

import './add-item.css'


export default class AddItem extends Component {

	state = {
		text: ''
	}

	onsubmitForm = (e) => {

		e.preventDefault();

		if(this.state.text.length === 0) {return}

		this.props.onAddItem(this.state.text);
		this.setState({
			text: ''
		}) 

	}

	onInputChange = (e) => {

		this.setState({
			text: e.target.value
		}) 

	}

	render() {

		return (
			<form 
			className='add-item d-flex'
			onSubmit={this.onsubmitForm}
			> 
			<input 
			className='form-control'
			type='text' 
			placeholder='new item name'
			onChange={this.onInputChange}
			value={this.state.text}


			/>
			<button 
			className='btn btn-outline-secondary'
			onClick={() => {}}
			>Add item </button>
			</form>
			)
	}

}


