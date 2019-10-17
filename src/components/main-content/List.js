import React, { Component } from 'react';
import Restaurant from './Restaurant';
import SortList from './SortList';
import ScrollBar from './ScrollBar';

let averageRatingOfRestaurants = [];

class List extends Component {
      //Passes data to parent MainContnet
	render() {
            //Map through props and displays info about the restaurant
		const restaurantInfo = this.props.info.map((data, i) => {
      		let ratings = [];
      		let sum = 0;
      		data.ratings.map((rating) => {
      			ratings.push(rating.stars);
      			return sum = sum + rating.stars;
      		})
      		let averageStars = Math.round(100*(sum/ratings.length))/100;
                  averageRatingOfRestaurants.push({
                        restaurantName : data.restaurantName,
                        ratings: data.ratings,
                        averageStars: averageStars
                  })
      		return ( 
      			<Restaurant 
                              addNewReview={this.props.addNewReview}
      				key={i}
      				restaurantName={data.restaurantName}
      				address={data.address}
      				stars={averageStars}
                              reviews={ratings.length}
      			/>
      		)
      	});
	      return (
      	      <div>
                        <SortList verifyFilter={this.props.verifyFilter}>
                        </SortList>
                        <ScrollBar>
      	      	    {restaurantInfo}
                        </ScrollBar>
      	      </div>
	      );
	}
}

export default List;