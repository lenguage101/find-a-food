import React, { Component } from 'react';
import './SortList.css';

class SortList extends Component {
	//Gets info from select menu and passes to its parent Component List.js
	sort = () => {
		let itemSelected = this.dropdown.value;
		this.props.verifyFilter(itemSelected);
	}
	render() {
		return (
			<div className="listItemContainer">
				<h3 id="dropdownTitle">Filter By</h3>
				<select 
					id="dropdown" 
					onChange={this.sort}
					ref={(ref) => this.dropdown = ref}
				>
					<option value="all">All</option>
					<option value='min'>0 to 5 stars</option>
					<option value='max'>5 to 0 stars</option>
					<option value="5">5 Stars</option>
					<option value="4">4 Stars</option>
					<option value="3">3 Stars</option>
					<option value="2">2 Stars</option>
					<option value="1">1 Stars</option>
					<option value="0">0 Stars</option>
				</select>
			</div>
		);
	}
}

export default SortList;