# Booking

A Hotel Booking app

## Features

- **User**: User can register, login, logout, update password, verify username, update profile and update password.

- **Bookings**: User can request for a booking and check his booking Status.

- **Rooms**: Get available room, search room by status such as suite type, price and maximum guest, check all available
  rooms and update rooms.

- **Profile**: Get user profile, update password and delete user.

## Built With:

- JavaScript
- Node
- Express
- dotenv
- nodemon
- bcryptjs
- cors
- jsonwebtoken
- joi

## Installation

- clone the repository

```sh
git clone git@github.com:olawuwo-abideen/booking.git
```

- navigate to the folder

```sh
cd booking.git
```

## Run the app in development mode

Open a terminal window session, or the equivalent on your machine, and enter the following command to install all the
Node modules needed to run the app:

```sh
npm install
```

After doing an `npm install` enter the following `npm start` command:

```sh

npm start

```

npm install

Set up the environment variables:

Create the .env file and setup the MongoDB URL.

The server will start running on the specified port (default: 3000) and establish a connection to the MongoDB database.

This will start the app and set it up to listen for incoming connections on port 3000. Open up your browser of choice
and go to the url

```sh

http://localhost:3000

```

to start using the app.

## API Endpoints

The following API endpoints are available:

- BaseUrl https://localhost:3000/

- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `POST /api/request-password-reset-link` - User update password
- `POST /api/email-verification-request` - Verify User email
- `PATCH /api/email-verification` - User update Profile
- `PATCH /api/reset-password` - User update password

* `GET /api/user-bookings` - Get User bookings
* `POST /api/bookings` - Request a bookings

- `GET /api/allrooms` - Get all available Rooms
- `GET /api/rooms/:id` -Get a room by parameter Rooms
- `GET /api//searchrooms/:value` - Search rooms by Parameters
- `GET /api/rooms` - Get a rooms
- `POST /api/room` - Add a Room
- `PUT /api/rooms/:id` - Update a Room

* `GET /api/profile` - Get a user profile
* `PATCH /api/profile` - Update a user profile
* `PATCH /api/password` - Update user password
* `DELETE /api/profile` - Delete a user

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Olawuwo-Abideen/booking/issues).

## Authors

👤 **Olawuwo Abideen**

- GitHub: [@Olawuwo Abideen](https://github.com/olawuwo-abideen)
- Twitter: [@Olawuwo Abideen](https://twitter.com/olawuwo_abideen)
- LinkedIn: [@Olawuwo Abideen](https://www.linkedin.com/in/olawuwo-abideen/)
