# SwipeSoul

SwipeSoul is a modern web application that combines the excitement of meeting new people with the depth of soulful connections. Built with React, Node.js, Express, and MongoDB, SwipeSoul offers a seamless and engaging user experience.

![SwipeSoul Logo](./frontend/public/1.png)

## Features

- User authentication and authorization
- Profile creation and management
- Matching algorithm for connecting users
- Real-time chat functionality
- Responsive design for mobile and desktop

## Tech Stack

### Frontend

- React
- React Router for navigation
- Tailwind CSS for styling
- Zustand for state management

### Backend

- Node.js
- Express.js
- MongoDB for database
- Socket.io for real-time communication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/iamsufiyan560/SwipeSoul.git
   cd swipesoul
   ```

2. Install dependencies for both frontend and backend:

   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and add the following:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. Start the backend server:

   ```
   npm start
   ```

5. In a new terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
swipesoul/
├── frontend/
│   ├── public/
│   │   ├── 1.png
│   │   └── 2.png
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── cron/
│   └── server.js
└── README.md
```

## Screenshots

![SwipeSoul Screenshot](./frontend/public/2.png)

## Contributing

We welcome contributions to SwipeSoul! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
