
# Group-Chatly Application 💬

## Live Link
https://group-chatly.vercel.app

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

## 2) Authentication

- **User Authentication**: Implemented user authentication to ensure secure access to the chat application. Users must sign up and log in before they can access the chatroom.

- **Token-Based Authentication**: Utilizes JSON Web Tokens (JWT) for secure, stateless authentication. After a successful login or registration, a JWT token is generated and returned to the user. This token is used to verify the user's identity in subsequent requests, ensuring secure and seamless access without the need for repeated logins. The token is stored client-side (typically in local storage) and sent with each request to authenticate the user.

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


## Guidance on Accessing the Chat Application Once Deployed

### 1. Accessing the Frontend Application

Once your chat application is deployed to a hosting platform (such as **Netlify**, **Vercel**, **Heroku**, or any cloud provider), you can access the frontend application via the provided **URL**. 

For example:
- If deployed on **Netlify**, the URL might look like: `https://your-chat-app.netlify.app`
- If deployed on **Vercel**, the URL might look like: `https://your-chat-app.vercel.app`

Add the front-end url in index.js (Backend) to avoid CORS Error.

### 2. Accessing the Backend Application

The backend application should also be deployed to a cloud provider or hosting platform. Once deployed, the backend API can be accessed via the public URL of the server.

For example:
- If deployed on **Heroku**, the URL might look like: `https://your-chat-app-backend.herokuapp.com`
- If using **AWS**, **Azure**, or **Google Cloud**, the URL might look like: `https://your-backend-url.com`

Ensure that the frontend application is configured to make requests to the correct backend API URL.
Add Backend URL in APIRoutes (In Utils Folder), to specify the server url in Frontend.

### 3. How to Use the Chat Application

Once both the **Frontend** and **Backend** are deployed, follow these steps to use the application:

1. **Open the Chat Application**:
   - Navigate to the deployed frontend URL (e.g., `https://your-chat-app.netlify.app`).
   
2. **Create an account**
   
3. **Join the Chatroom**:
   - After this, You will be connected to the backend server, and a real-time chat interface will appear.

4. **Send and Receive Messages**:
   - You can send messages using the input box, and they will appear in the chatroom for all connected users. Messages are broadcasted to all users in real time.

5. **Multiple Users**:
   - Open the chat application in multiple tabs or devices to simulate multiple users. All connected users will be able to see the messages in real-time.

### 4. Troubleshooting

- **Backend Connection Issues**: If the frontend cannot connect to the backend (due to server downtime or misconfiguration), check the network status and ensure the backend URL is correctly configured in the frontend `.env` file.

- **MongoDB Issues**: If you encounter database connection issues, ensure that the MongoDB instance is running and the correct URI is provided in the backend `.env` file.

---

### 5. Deployment Notes

- Ensure that all environment variables (`MONGO_URL`, `REACT_APP_LOCALHOST_KEY`, etc.) are correctly set up in your deployment platforms.
- If using services like **Heroku**, **AWS**, or **Google Cloud**, you may need to configure your environment variables in their respective dashboards or configuration files.

---

