
# Group-Chatly Application 💬

## Objective
Group-Chatly is a real-time chat application that allows multiple clients to connect to a central server and participate in a shared chatroom. The application is built using **Node.js** and utilizes the standard socket library for communication.

---

## Architecture
The Group-Chatly application consists of two main components:

1. **Server**:
   - **Concurrency Handling**: Supports multiple simultaneous client connections using asynchronous I/O and `async/await` patterns in **Node.js**.
   - **Broadcasting**: Messages received from a client are broadcasted to all other connected clients in real time using **Socket.io**.
   - **Built with Node.js**: The server is implemented using **Node.js**, leveraging its event-driven, non-blocking I/O model to handle numerous client connections efficiently.
   - **Real-Time Communication with Socket.io**: **Socket.io** is used for real-time, bi-directional communication between the server and clients, enabling instant message delivery and updates.

2. **Client**:
   - **Socket Connection**: Establishes a socket connection to the server using **Socket.io** to enable real-time communication.
   - **User Interface**: Provides a modern, interactive user interface built with **React**, replacing the traditional text-based interface. This interface allows users to send and receive messages in a dynamic and user-friendly environment.
   - **Real-Time Message Display**: Displays real-time messages sent by other users in the chatroom as soon as they are broadcasted by the server. The **React** interface ensures smooth updates without page reloads, providing a dynamic user experience.
  
## Assumptions 
### 1) Design Choice

The user interface was implemented using **React** to provide a modern and intuitive chatting experience. While the requirement initially suggested a text-based interface (e.g., terminal-based), React was chosen to:

- **Enhance usability** with a graphical interface, offering a more user-friendly and visually appealing experience.
- **Allow scalability** for future enhancements, such as message formatting, making the app easier to expand.
- **Align with current industry standards** for building dynamic and interactive web applications, ensuring the app remains relevant and maintainable.

It is important to note that **React** was used solely for the user interface, while the chat logic (e.g., message handling, broadcasting) was implemented using standard **Node.js** and **Socket.io**. No external libraries were used for the core chat logic, as per the project requirements.

By leveraging React, the application ensures a smooth and user-friendly chat experience while maintaining the same functionality expected in a text-based interface.

### 2) Authentication
- **User Authentication**: Implemented user authentication to ensure secure access to the chat application. Users are required to sign up and log in before they can join the chatroom.
- **Token-Based Authentication**: Utilizes JSON Web Tokens (JWT) for secure, stateless authentication. Upon successful login, a token is generated and stored to maintain the user's session.
- **Protected Routes**: Certain routes and functionalities are protected, ensuring that only authenticated users can access the chat features.

### 3) Concurrency Handling
The server uses asynchronous patterns with `async/await` in Node.js to handle multiple client connections concurrently. This ensures non-blocking I/O operations, enabling efficient communication even with multiple active clients.

### 4) Error Handling

- **Client Disconnections**: Basic error handling is implemented for client disconnections. A global **online users map** is maintained to track connected users. When a client disconnects, their entry is removed from this map to ensure the server doesn't try to broadcast messages to a non-existent user.

---

## Instructions to Run the Chat Application

Clone the repository:

   ```bash
   git clone https://github.com/junaid77khan/group-chatly.git
   ```
### 1. Backend Setup

#### Prerequisites
- Make sure you have **Node.js** and **npm** installed on your system.
- Ensure that you have a **MongoDB** instance running or have access to a MongoDB URI.

1. Navigate into the backend directory:
   
   ```bash
   cd back-end
   ```
   
2. Install the required dependencies:
   
   ```bash
   npm install
   ```
   
3. Create a .env file in the root of the backend directory and add the necessary configuration values:

    Example .env file:

     ```bash
      PORT=5000
      MONGO_URL="your_mongoDB_URI/name_of_collection"
      ```
     
    Replace your_mongoDB_URI/name_of_collection with your actual MongoDB URI and database name.

4. Start the backend server in development mode:
   
   ```bash
   npm run dev
   ```
   
   This will start the server using nodemon for live reloading during development. If you want to start the server in production mode, use the following command:
   
   ```bash
   npm start
   ```
   
   The server will be running on port 5000 by default.

### 2. Frontend Setup

1. Navigate into the frontend directory:
   
   ```bash
   cd front-end
   ```
   
2. Install the required dependencies:
   
   ```bash
   npm install
   ```
   
3. Create a .env file in the root of the frontend directory and add the necessary configuration values:

     Example .env file:
  
     ```bash
    REACT_APP_LOCALHOST_KEY="chat-app-current-user"
    ```

4. Start the frontend application:
   
    ```bash
    npm start
    ```
   
   The application will be running on http://localhost:3000.

### 3. Accessing the Chat Application
  - Once both the backend and frontend are running, you can access the chat application at http://localhost:3000 in your browser.
  - Open the frontend in multiple browser tabs to simulate multiple users interacting with the chat.
