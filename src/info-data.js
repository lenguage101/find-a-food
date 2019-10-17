let info = [
   {
      "restaurantName":"Trinity",
      "address":"225 W Valley Blvd, San Gabriel, CA 91776",
      "lat":34.080580,
      "long":-118.102130,
      "ratings":[
         {
            "stars": 4,
            "comment":"Good site for Quality Meals. honestly my favorite evening place. prices are reasonable."
         },
         {
            "stars":4,
            "comment": "I love this restaurant, I'm going to this place at least once a month, true authentic Italian food. All the crew always in a good mood. Highly recommended."
         }
      ]
   },
   {
      "restaurantName":"Azabu Sabo Japanese Restaurant",
      "address":"137 W Valley Blvd, San Gabriel, CA 91776",
      "lat":34.079910,
      "long":-118.101390,
      "ratings":[
         {
            "stars":3,
            "comment":"I had lunch there with my friends yesterday. The place was not crowded throughout lunch time. The service was very good and attentive. There were about 3-4 other tables.  The squid legs appetizer was really good and not over fried. I ordered the chicken ramen was not so good. It didn’t have any flavor or taste. It was salty enough just not very good. My friends had shrimp salad, tempura, and curry chicken. They said they were ok. Oh, they don’t have a lot of the sushi and rolls. No salmon!  I probably will try it again and order other stuff."
         },
         {
            "stars":4,
            "comment":"Teriyaki beef was delicious.  Got takoyaki but it was a little oily . And they have shrimp tempura dipping sauce was a little weak. All and all it is a great place to go"
         }
      ]
   }
]

info = JSON.stringify(info);

info = JSON.parse(info);

export default info;