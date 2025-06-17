# My React Forum App

This project is a forum application built with React, utilizing Ant Design and Shadcn components styled with Tailwind CSS. It integrates Firebase for user authentication and Firestore for data storage, allowing users to create and interact with forum posts.

## Features

- User authentication using Firebase
- Forum functionality with Firestore for data storage
- Responsive design with Tailwind CSS
- Component library integration with Ant Design and Shadcn

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/my-react-forum-app.git
   ```

2. Navigate to the project directory:

   ```
   cd my-react-forum-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Google authentication in the Firebase Authentication section.
3. Copy your Firebase configuration and update the `src/Firebase/firebaseServices.js` file with your credentials.

### Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `build` folder with the optimized application.

## Usage

- Users can log in using their Google account.
- Once logged in, users can view and create posts in the forum.
- The application features a responsive design, ensuring usability across devices.

## License

This project is licensed under the MIT License. See the LICENSE file for details.