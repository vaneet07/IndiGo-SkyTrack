# IndiGo-SkyTrack


## Prerequisites

- Node.js
- MongoDB
- Firebase Project
- Twilio Account

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/flight-status-backend.git
    cd flight-status-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
    TWILIO_ACCOUNT_SID=your-twilio-account-sid
    TWILIO_AUTH_TOKEN=your-twilio-auth-token
    TWILIO_PHONE_NUMBER=your-twilio-phone-number
    ```

4. Set up Firebase:
    - Download the Firebase service account key JSON file and place it in the `config` directory.
    - Update the path in `firebaseConfig.js`:
        ```javascript
        const serviceAccount = require('./path/to/serviceAccountKey.json');
        ```

5. Populate initial data in `server.js`.

## Running the Backend

1. Ensure MongoDB is running on your machine.
2. Start the server:
    ```bash
    node server.js
    ```
    The backend will be running on `http://localhost:5000`.

## Dependencies

- Express
- Mongoose
- Body-parser
- Nodemailer
- Twilio
- Firebase-admin
- Axios (for frontend requests)

Install these dependencies with:
```bash
npm install express mongoose body-parser nodemailer twilio firebase-admin axios
