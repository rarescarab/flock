# Flock
---
## Flock API

The following outlines server-side requests that can be sent to the Flock API.

+ [Users](#users)
+ [Boards](#boards)
+ [Cards](#cards)
+ [Venues](#venues)

<a name="users"></a>
### Users

##### GET
Endpoint: `/api/users`

Example: `/api/users?username=myusername`

Append a query to the URL path with a username parameter (accessed by `request.param('username')`). The response sends back a JSON object containing the user's ID, name, username, and an array of populated boards.

##### POST
Endpoint: `/api/users`
```javascript
request.body = {
  authId: // Facebook ID
  name: // user name pulled from Facebook
  username: // user's name trimmed for whitespace and set to lowercase
}
```
The client triggers a POST request when users are signing up or signing in. A Facebook ID is sent in the request along with the user's name and username.

If the Facebook ID is not in the database, a new user profile is created and returned in the response. Otherwise, the user is simply retrieved from the database and sent back to the client.

The response sends back a JSON object containing the user's ID, name, username, and an array of populated boards (or empty array if new profile).

##### UPDATE
Endpoint: `/api/users`
```javascript
request.body = {
  id: // User's unique Mongo-DB-generated ID
  [name]: // User's new name
  [username]: // User's new username
}
```

The client triggers an update to change a user's name or username. The two fields are optional and all other fields are not updatable. Existing fields (i.e., _id, authId, boards) are deleted from the request body to prevent accidental updating.

##### DELETE
Endpoint: `/api/users`
```javascript
request.body = {
  id: // User's unique Mongo-DB-generated ID
}
```

A user's database ID can be sent in a DELETE request to remove that user's profile from the database. The response sends back a an object with information about how many documents were deleted from MongoDB.

<a name="boards"></a>
### Boards

##### GET
Endpoint: `/api/users/:id`

##### POST
Endpoint: `/api/users`
```javascript
request.body = {}
```

##### UPDATE
Endpoint: `/api/users`
```javascript
request.body = {}
```

##### DELETE
Endpoint: `/api/users`
```javascript
request.body = {
  id: // Board's unique Mongo-DB-generated ID
}
```

<a name="cards"></a>
### Cards

##### GET
Endpoint: `/api/users/:id`

##### POST
Endpoint: `/api/users`
```javascript
request.body = {}
```

##### UPDATE
Endpoint: `/api/users`

##### DELETE
Endpoint: `/api/users`
```javascript
request.body = {
  id: // Card's unique Mongo-DB-generated ID
}
```

<a name="venues"></a>
### Venues

##### GET
Endpoint: `/api/users/:id`

##### POST
Endpoint: `/api/users`
```javascript
request.body = {}
```

##### UPDATE
Endpoint: `/api/users`

##### DELETE
Endpoint: `/api/users`
```javascript
request.body = {
  id: // Venue's unique Mongo-DB-generated ID
}
```

## File Structure

```
.
├── client
│   └── components
│   │   ├── App.jsx
│   │   ├── Nav.jsx
│   │   ├── Search.jsx
│   │   ├── board
│   │   │   ├── Board.jsx
│   │   │   ├── BoardCard.jsx
│   │   │   ├── BoardCardModal.jsx
│   │   ├── feed
│   │   │   ├── AuthModal.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── FeedCard.jsx
│   │   └── user
│   │   │   ├── User.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── BoardModal.jsx
│   └── lib
│   └── config
│   │   ├── facebookAuth.js
│   │   ├── foursquareAPI.js
├── server
│   └── config.js
├── public
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   ├── assets
│   └── lib
├── db
├── spec
│   ├── client
│   └── server
├── package.json
├── bower.json
├── .bowerrc
├── .gitignore
├── _PRESS_RELEASE.md
└── README.md

```
