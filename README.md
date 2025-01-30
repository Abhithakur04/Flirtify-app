# Flirtify API Documentation

## Introduction
Flirtify is a platform designed for developers to connect and build professional relationships. This API documentation outlines the available endpoints for managing user accounts, profiles, and connection requests, as well as the messaging feature that allows users to chat with their connections in real-time.

---

## Authentication Routes

### `POST /signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "firstName": "string",
   "lastName": "string",
    "email": "string",
    "password": "string"
  }

### `POST /login`
- **Description: Logs in an existing user.
- **Request Body:
  ```json
  {
  "email": "string",
  "password": "string"
  }

### `POST /logout`
- **Description: Logs out the current user.
- **No request body needed.
  ## Profile Routes

### `GET /profile/view`
- **Description**: Fetches the profile details of the current user.

- **Response**:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "about": "string",
    "skills": ["skill1", "skill2"]
  }





### `PATCH /profile/edit`
- **Description**: Edits the current user’s profile.

- **Request Body**:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "about": "string",
    "skills": ["skill1", "skill2"]
  }




## Connection Request Routes
### `POST /request/send/:status/:userId`
- **Description: Sends a connection request to another user. The status can be ignored, interested, accepted, or rejected.
Parameters:
status: The status of the request (ignored, interested, accepted, rejected).
userId: The ID of the user to send the request to.
### `POST /request/review/:status/:requestId`
- **Description: Reviews a pending connection request. The status can be accepted or rejected.
Parameters:
status: The status of the review (accepted, rejected).
requestId: The ID of the connection request to review.


## User Routes

### `GET /user/requests/received`
- **Description**: Retrieves the list of connection requests received by the current user.

- **Response**:
  ```json
  [
    {
      "requestId": "string",
      "userId": "string",
      "status": "string",
      "sender": {
        "username": "string",
        "email": "string"
      }
    }
  ]

### `GET /user/connections`
- **Description**: Retrieves the list of accepted connections of the current user.

- **Response**:
  ```json
  [
    {
      "connectionId": "string",
      "userId": "string",
      "username": "string",
      "email": "string"
    }
  ]

### `GET /user/feed`
- **Description**: Gets a feed of profiles from other users on the platform.

- **Response**:
  ```json
  [
    {
      "userId": "string",
      "username": "string",
      "email": "string",
      "bio": "string",
      "skills": ["skill1", "skill2"]
    }
  ]

## WebSocket - Messaging Feature

- **Description**: Users can chat with their connections in real-time using WebSockets. Once two users have accepted each other’s connection request, they can send messages back and forth in real-time.

- **Usage**: Set up a WebSocket connection to the server, and messages can be sent/received between connected users.



### Events:
- **connect**: The WebSocket connection is established.
- **message**: A new message is received.
- **send**: Sends a message to the connected user.

### Status Options for Requests:
- **ignored**: The user has ignored the connection request.
- **interested**: The user is interested in the connection but hasn’t accepted yet.
- **accepted**: The connection request has been accepted, and both users are now connected.
- **rejected**: The user has rejected the connection request.

### Notes:
- The WebSocket service allows real-time messaging between connected users. Ensure the WebSocket server is properly configured and users are connected before attempting to send or receive messages.


