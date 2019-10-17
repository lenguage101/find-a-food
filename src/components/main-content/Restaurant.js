import React, { Component } from 'react';
import './Restaurant.css';

class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			appearance : {
				display: 'none'
			},
			button: {
				wording: 'Add New Review'
			}
		}
	}
	submitComment = (evt) => {
		//Button to submit new data/comment to addNewReview function
		evt.preventDefault();
		let commentText = this.commentText.value; 
		if (commentText.length >= 3) {
			let dropdownScore = this.dropdownScore.value;
			this.props.addNewReview(this.props.restaurantName, this.props.address, dropdownScore, commentText);
			this.setState({
				show: !this.state.show,
				appearance : {
					display: 'none'
				},
				button: {
					wording: 'Add New Review'
				}
			})
			clearTextAndValue();
		} else {
			alert("Please enter more characters");
		}
	}
	openReview = () => {
		//Display or closes comment box
		if (this.state.show) {
			this.setState({
				show: !this.state.show,
				appearance : {
					display: 'block'
				},
				button: {
					wording: 'Cancel Review'
				}
			})
		}  else  {
			this.setState({
				show: !this.state.show,
				appearance : {
					display: 'none'
				},
				button: {
					wording: 'Add New Review'
				}
			})
		} 
		clearTextAndValue();
	}
	render() {
		let restStars = this.props.stars >= 0 ? this.props.stars : 'N/A';
		let numOfReviews = this.props.reviews !== 1 ? 'reviews' : 'review';
		return (
			<div className="restaurantList">
			  <h3>{this.props.restaurantName}</h3>
			  <p>
			  	<span className="restaurantInfo">Location:</span> {this.props.address}
			  </p>
			  <p>
			  	<span className="restaurantInfo">Average ratings: </span> 
			  	{restStars} stars out of {this.props.reviews} {numOfReviews}
			  </p>
			  <div id={this.props.restaurantName} className="addReviewForm" style={this.state.appearance}>
					<form>
						Number of Stars<br />
						<select 
							className="addReviewScore" 
							ref={(ref) => this.dropdownScore = ref}
						>
							<option value="5">5</option>
							<option value="4.5">4.5</option>
							<option value="4">4</option>
							<option value="3.5">3.5</option>
							<option value="3">3</option>
							<option value="2.5">2.5</option>
							<option value="2">2 </option>
							<option value="1.5">1.5</option>
							<option value="1">1</option>
							<option value="0.5">0.5</option>
							<option value="0">0</option>
						</select> <br />
						Add New Comment<br/>
						<textarea 
							className="addComment"
							ref={(ref) => this.commentText = ref}
						/>
						<div className="submitComment">
							<button onClick={this.submitComment}>Submit Comment</button>
						</div>
					</form>
				</div>
			  <div className="addReviewContainer">
			  	<button onClick={this.openReview} className="addReview">{this.state.button.wording}</button>
			  </div>
			</div>
	    );
	}
}

let clearTextAndValue = () => {
	//Clears textarea box 
	let textArea = document.getElementsByClassName("addComment");
	let addReviewScore = document.getElementsByClassName("addReviewScore");
	for(let i = 0; i < textArea.length; i++) {
		textArea[i].value = "";
		addReviewScore[i].selectedIndex = 0;
	}
}

export default Restaurant;