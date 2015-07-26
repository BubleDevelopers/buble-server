# buble-server
API for Buble

## Prerequisites
- Node (http://nodejs.org/)

## Installation

```bash
  # Clone this repository
  git clone https://github.com/BubleDevelopers/buble-server.git
  # Go to the directory you cloned it to
  cd buble-server
  # Install dependencies
  npm install
  # Run the development server
  npm start
```

The server wil run at [http://localhost:3001/](http://localhost:3001/).


## Route Descriptions

Checkins

GET /api/checkins/near

Description: Returns all checkins within entered radius of entered longitude and latitude

Example: localhost:3001/checkins/near?lat=5&long=8&rad=2

Returns: A list of checkins in JSON format. Each checkin will be in the below format

```json
{
	userId: ~,
	location: 
	{
		lat: between 3 and 7,
		long: between 6 and 10,
		placeId: ~
	},
	arrived: ~,
	left: ~
}
```

GET /api/checkins/place/:placeId

Description: Returns all checkins with entered placeId

Example: localhost:3001/place/987654321

Return: A list of checkins in JSON format. Each checkin will be in the below format

```json
{
	userId: ~,
	location: 
	{
		lat: ~,
		long: ~,
		placeId: 987654321
	},
	arrived: ~,
	left: ~
}
```

Users

GET /api/users/me

Description: Returns current user

Returns: A user in JSON format

```json
{
	firstName: ~,
	lastName: ~,
	email: ~,
	pictureUrl: ~,
	facebookId: ~,
	googleId: ~,
	twitterId: ~,
	signupDate: ~,
	invisible: ~
}
```

Wallposts

GET /api/wallposts/near

Description: Returns all wallposts within entered radius of entered longitude and latitude

Example: localhost:3001/wallpost/near?lat=5&long=8&rad=2

Returns: A list of wallposts in JSON format. Each checkin will be in the below format

```json
{
	content: ~ ,
	rating: ~ ,
	location
	{
		lat: between 3 and 7,
		long: between 6 and 10,
		placeId: ~
	}
	timeOfPost: ~
}
```

GET /api/wallposts/place/:placeId
Description: Returns all wallposts with entered placeId
Example: localhost:3001/place/987654321
Returns: A list of wallposts in JSON format. Each wallpost will be in the below format

```json
{
	userId: ~,
	location: 
	{
		lat: ~,
		long: ~,
		placeId: 987654321
	},
	arrived: ~,
	left: ~
}
```


GET /api/wallposts/avg

Description: Returns an aggregation object that contains the average rating of all wallposts from the input location

Example: localhost:3001/avg?loc="2"

Returns: A mongodb aggregation object in JSON format

```json
{ "_id" : "2", "avgRating": 3.5 }
```
