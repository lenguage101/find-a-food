import React, { Component } from 'react';
import './RestaurantMap.css';

let lat = 0;
let long = 0;
let thisRestaurantMap;

class RestaurantMap extends Component {
	constructor(props) {
		super(props);
		thisRestaurantMap = this;
		this.state = {
			appearance: 'noPopUp',
			clickLat: '',
			clickLng: '',
			map: undefined,
			markerList: []
		}
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(this.success);
	}
	//Submit New Restaurant
	submit = (evt) => {
		evt.preventDefault();
		let newRestaurantName = this.newRestaurantName.value;
		let newRestaurantAddress = this.newRestaurantAddress.value;
		let inputRestaurantName = document.getElementsByClassName("newRestaurantName")[0];
		let inputRestaurantAddress = document.getElementsByClassName("newRestaurantAddress")[0]; 
		if (newRestaurantName.length > 0 &&  newRestaurantAddress.length > 0) {
			this.props.addNewRestaurant(newRestaurantName, newRestaurantAddress, this.state.clickLat, this.state.clickLng);
			displayContent(this.props.data, addMarker, this.state.map);	
			this.setState({
				appearance : 'noPopUp',
				clickLat: '',
				clickLng: '',
				map: this.state.map,
				markerList: this.state.markerList
			})					
			inputRestaurantName.value = '';
			inputRestaurantAddress.value = '';
			this.props.getRestMap(this.state.map)	
		} 
		else {
			alert('Please enter the correct values');
		}	
	}
	//Close Modal Window 
	cancel = (evt) => {
		evt.preventDefault();
		let inputRestaurantName = document.getElementsByClassName("newRestaurantName")[0];
		let inputRestaurantAddress = document.getElementsByClassName("newRestaurantAddress")[0];
		displayContent(this.props.data, consoleLogging, this.state.map);	 
		this.setState({
			appearance : 'noPopUp',
			clickLat: this.state.clickLat,
			clickLng: this.state.clickLng,
			map: this.state.map,
			markerList: this.state.markerList
		})
		inputRestaurantName.value = '';
		inputRestaurantAddress.value = '';
	}
	// Initializes map
	initMap() {
	    let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long},
          zoom: 15
        });
        map.setCenter({lat:lat, lng:long})
        thisRestaurantMap.props.getRestMap(map);
        thisRestaurantMap.setState({
        	appearance: thisRestaurantMap.state.appearance,
        	clickLat: thisRestaurantMap.state.clickLat,
        	clickLng: thisRestaurantMap.state.clickLng,
        	map: map,
        	markerList: thisRestaurantMap.state.markerList
        })
        let markerCenter = new window.google.maps.Marker({
            position: {lat:lat, lng:long},
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: 'blue',
                fillOpacity: 0.3,
                scale: 20,
                strokeColor: 'blue',
                strokeWeight: 1,
                zIndex: 1
            }
       });
       markerCenter.setMap(map)
        map.addListener('click', (evt) => {
        	if (thisRestaurantMap.state.appearance === 'noPopUp') {
        		thisRestaurantMap.setState({
        			appearance : 'popUp',
        			clickLat: evt.latLng.lat(),
        			clickLng: evt.latLng.lng(),
        			map: map,
        			markerList: thisRestaurantMap.state.markerList
        		})
        	} else {
        		thisRestaurantMap.setState({
        			appearance : 'noPopUp',
        			clickLat: evt.latLng.lat(),
        			clickLng: evt.latLng.lng(),
        			map: map,
        			markerList: thisRestaurantMap.state.markerList
        		})
        	}
        	displayContent(thisRestaurantMap.props.data, consoleLogging, thisRestaurantMap.state.map);
        });        	
      }
    //Passes user's latitude & longitude 
	success(pos) {
		let crd = pos.coords;
		lat = crd.latitude;
	    long = crd.longitude;
	    let restData = [];
		fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?
			location=${lat},${long}&
			radius=1500&
			type=restaurant&
			key=AIzaSyCf2hQ7y7oNDYCVHm_44FyaNvioTieAmo0`)
			.then(res => res.json())
			.then(data => 
				Promise.all(
					data.results.map( placeInfo => {
					return fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/
						json?
						placeid=${placeInfo.place_id}&
						key=AIzaSyCf2hQ7y7oNDYCVHm_44FyaNvioTieAmo0&
						fields=formatted_address,geometry,opening_hours,name,rating,review,user_ratings_total`
					)
					.then(res => res.json())
					.then(data => restData.push(data))
					.catch(err => console.log('inside', err))
				}))
				.then(res => {
					thisRestaurantMap.props.updateRestaurantList(restData);
					displayContent(thisRestaurantMap.props.info, addMarker, thisRestaurantMap.state.map);
				})
			)
			.catch(err => console.log('outside', err))
	    window.initMap = thisRestaurantMap.initMap;
	    thisRestaurantMap.setState({
			appearance: thisRestaurantMap.state.appearance,
			clickLat: thisRestaurantMap.state.clickLat,
			clickLng: thisRestaurantMap.state.clickLng,
			map: thisRestaurantMap.state.map,
			markerList: thisRestaurantMap.state.markerList
		})
	}
	render() {
		if (this.state.markerList.length === this.props.data.length) {
			for (let i = 0; i < this.state.markerList.length; i++) {
				this.state.markerList[i].setVisible(false);
			}
			if (this.props.info.length >= 1) {

				for (let i = 0; i < this.props.data.length; i++) {
					for (let j = 0; j < this.props.info.length; j++) {
						if (this.props.data[i].restaurantName === this.props.info[j].restaurantName) {
							this.state.markerList[i].setVisible(true);
							j = this.props.info.length;
						}
					}
				} 
			}
		}
		return (
			<div className="parentDiv">
				<div style={{height:"75vh"}} id="map"></div>
				<div className={this.state.appearance}>
					<div className="modalDiv">
						<form>
							<h3>Add New Place</h3>
							<p>Restaurant Name: </p>
							<input type="text" className="newRestaurantName" ref={(ref) => this.newRestaurantName = ref}/>
							<p>Restaurant Address: </p>
							<input type="text" className="newRestaurantAddress" ref={(ref) => this.newRestaurantAddress = ref}/>
							<div className="modalButtonDiv">
								<button className="submitRestaurant" onClick={this.submit}>Submit New Restaurant</button>
							</div>
							<div className="modalButtonDiv">
								<button className="cancelSubmit" onClick={this.cancel}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

//Provides the reviews for each marker on the map
const displayContent = (restList, addingMarker, displayMap) => {
	let markerListArr = thisRestaurantMap.state.markerList.length !== 0 ? thisRestaurantMap.state.markerList : [];
	//Using Google API to create content and markers
	if (markerListArr !== thisRestaurantMap.state.markerList) {
		restList.map( (restaurant, i) => {
	    	let restImg;
	    	let contentInMap = '';
	    	let size = '200x100';
	    	if (window.innerWidth >= 768) {
	    		size = '400x200';
	    	}
	    	fetch(`https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${restaurant.lat.toString()},${restaurant.long.toString()}&key=AIzaSyCf2hQ7y7oNDYCVHm_44FyaNvioTieAmo0`)
				.then(response => {
					restImg = response.url;
					contentInMap += `<img src=${restImg} alt=${restaurant.restaurantName}/>`;
		        	contentInMap += `<h2> ${restaurant.restaurantName} </h2>`;
		    		for (let j = 0; j < restaurant.ratings.length; j++) {
		    			if (restaurant.ratings.length > 0) {
		    				contentInMap += `<p><strong>Review:</strong> ${restaurant.ratings[j].stars} out of 5 stars </p>`;
			        		contentInMap += `<p><strong>Comment:</strong> ${restaurant.ratings[j].comment} </p>`;
		    			}
					}
					if (addMarker === addingMarker) {
						let marker = addingMarker({
							lat: restaurant.lat,
							lng: restaurant.long
						}, contentInMap, displayMap)
						markerListArr.push(marker);
					}
			})
			return contentInMap; 
	    });
	    //Adds content and marker from newly created restaurant
	} else {
		for (let i = 0; i < restList.length; i++) {
			let restaurant = thisRestaurantMap.props.data[i];
			let lastRestaurant = restList.length - 1;
			let restImg;
	    	let contentInMap = '';
	    	let size = '200x100';
	    	if (window.innerWidth >= 768) {
	    		size = '400x200';
	    	}
	    	fetch(`https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${restaurant.lat.toString()},${restaurant.long.toString()}&key=AIzaSyCf2hQ7y7oNDYCVHm_44FyaNvioTieAmo0`)
				.then(response => {
					restImg = response.url;
					contentInMap += `<img src=${restImg} alt=${restaurant.restaurantName}/>`;
		        	contentInMap += `<h2> ${restaurant.restaurantName} </h2>`;
		    		for (let j = 0; j < restaurant.ratings.length; j++) {
		    			if (restaurant.ratings.length > 0) {
		    				contentInMap += `<p><strong>Review:</strong> ${restaurant.ratings[j].stars} out of 5 stars </p>`;
			        		contentInMap += `<p><strong>Comment:</strong> ${restaurant.ratings[j].comment} </p>`;
		    			}
					}
					if (addingMarker === addMarker && lastRestaurant === i) {
						let marker = addingMarker({
							lat: restaurant.lat,
							lng: restaurant.long
						}, contentInMap, displayMap)
						markerListArr.push(marker);
					} else if (addingMarker !== addMarker) {
						infowindowArr[i].setContent(contentInMap);
					}
					return contentInMap;
			})
		}
	} 
	thisRestaurantMap.setState({
    	appearance : thisRestaurantMap.state.appearance,
		clickLat: thisRestaurantMap.state.clickLat,
		clickLng: thisRestaurantMap.state.clickLng,
		map: thisRestaurantMap.state.map,
		markerList: markerListArr
	})
}

//Adds Marker on map
let infowindowArr = [];

const addMarker = ( (coords, content, displayMap) => {
	let infowindow = new window.google.maps.InfoWindow({
		content: content
	});
	let newMarker = new window.google.maps.Marker({
		position: coords, 
		map: displayMap
	});
	newMarker.addListener('click', () => infowindow.open(displayMap, newMarker));
	infowindowArr.push(infowindow);
	return newMarker;
})

const consoleLogging = () => console.log('something');

export default RestaurantMap;
export { displayContent, consoleLogging};