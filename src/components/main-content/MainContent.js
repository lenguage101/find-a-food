
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import info from '../../info-data';
import RestaurantMap from './RestaurantMap';
import { displayContent, consoleLogging } from './RestaurantMap';
import List from './List';
import './MainContent.css';

class MainContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: info,
			info: info,
			restMap: ''
		}
	}
	getRestMap = (restMap) => {
		this.setState({
			data: this.state.data,
			info: this.state.info,
			restMap: restMap
		})
	}
	updateRestaurantList = (data) => {
		//Updates the data being received from Google Places API
		let newData = info;
		data.map( data => {
			let updatedData = {};
			updatedData.restaurantName = data.result.name;
			updatedData.address = data.result.formatted_address;
			updatedData.lat = data.result.geometry.location.lat;
			updatedData.long = data.result.geometry.location.lng;
			updatedData.ratings = [];
			if (data.result.reviews !== undefined) {
				data.result.reviews.forEach( (review, i) => {
					updatedData.ratings[i] = {};
					updatedData.ratings[i].stars = review.rating;
					updatedData.ratings[i].comment = `${review.text} - ${review.author_name}`;
				})
			}
			newData.push(updatedData);
			return null;
		})
		this.setState({
			data: newData, 
			info: newData,
			restMap: this.state.restMap
		})
	}
	verifyFilter = (dataFromSortListComponent) => {
		//Checks if the restaurant matches the number of stars
		if (dataFromSortListComponent !== 'min' && dataFromSortListComponent !== 'max') {
			this.setState({
				data: this.state.data,
		        info: this.state.data.filter( data => {
			            let numValue = parseInt(dataFromSortListComponent);
			            let ratings = [];
			            let sum = 0;
			            data.ratings.map( rating => {
		                    ratings.push(rating.stars);
		                    return sum = sum + rating.stars;
			            })
			            let averageStars = Math.round(100 * (sum / ratings.length) ) /100;
			            if (averageStars >= numValue && averageStars < (numValue + 1) ) {
			                return data;
			            } else if (dataFromSortListComponent === 'all') {
			                return data;
			            }
			            return null;
			        }
		        ),
		        restMap: this.state.restMap
	        })
	    //Else checks if the data is from lowest to highest or vice versa
		} else {
			let restNameAndRatings = [];
			let info = [];
			this.state.data.map( data => {
				let ratings = [];
				let sum = 0;
				let averageStars;
				if (data.ratings.length > 0) {
					data.ratings.map( rating => {
	                    ratings.push(rating.stars);
	                    return sum = sum + rating.stars;
		            })
		            averageStars = Math.round(100 * (sum / ratings.length) ) /100;
				} else {
					averageStars = 0;
				}
				restNameAndRatings.push({
					'name': data.restaurantName,
					'stars': averageStars
				});
			})
			let sortByMin = restNameAndRatings.slice(0);
			sortByMin.sort( (a, b) => a.stars - b.stars); 
			if (dataFromSortListComponent === 'max') {
				sortByMin.reverse();	
			}
			sortByMin.map( rest => {
				this.state.data.map( data => {
					if ( rest.name === data.restaurantName) {
						info.push(data)
					} 
				})
			})
			this.setState({
				data: this.state.data,
				info: info
			})
		}
	}
	addNewReview = (whichRestaurant, restAddress, howManyStars, newComment) => {
		//Adds new review to matching restaurant name
		this.setState({
			data: this.state.data,
	        info: this.state.data.map( (data, j) => {
		     	if (this.state.data[j].restaurantName === whichRestaurant 
					&& this.state.data[j].address === restAddress) {
		     	 	this.state.data[j].ratings.push({
					 	stars : Number(howManyStars),
					 	comment : newComment
					})
		     	 	return data;
		     	} else {
		     	 	return data;
		     	}
	        }),
	        restMap: this.state.restMap
	    })
	    displayContent(this.state.data, consoleLogging, this.state.restMap);
	}
	addNewRestaurant = (newRestaurantName, newAddress, NewLat, NewLong) => {
		//Creates a new restaurant and adds to the existing list of restaurants
		let newData = this.state.data;
		newData.push({
          	restaurantName: newRestaurantName,
          	address: newAddress,
          	lat: NewLat,
          	long: NewLong,
          	ratings: []
	    })
		this.setState({
			  data: newData,
			  info: newData,
			  restMap: this.state.restMap
	    });
	}
	render() {
		return (
			<Grid container>
				<Grid item md={9} xs={12}>
					<RestaurantMap
						data={this.state.data}
						info={this.state.info}
						addNewRestaurant={this.addNewRestaurant}
						updateRestaurantList={this.updateRestaurantList}
						getRestMap={this.getRestMap}
					/>
				</Grid>
				<Grid item md={3} sm={12} id="leftSide">
					<List 
						info={this.state.info} 
						verifyFilter={this.verifyFilter}
						addNewReview={this.addNewReview}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default MainContent;