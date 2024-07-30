// const admin = require('firebase-admin');

// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
// });

// module.exports = admin;


const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const serviceAccount = require('./firebaseServiceAccountKey.json'); // Update the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Ensure these are set in your environment variables
    pass: process.env.EMAIL_PASS  // Ensure these are set in your environment variables
  }
});

const sendEmail = async (recipient, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: 'Flight Status Notification',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (recipient, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: recipient
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

const sendAppNotification = async (recipient, message) => {
  const payload = {
    notification: {
      title: 'Flight Status Update',
      body: message
    },
    token: recipient
  };

  try {
    await admin.messaging().send(payload);
    console.log('App notification sent successfully');
  } catch (error) {
    console.error('Error sending app notification:', error);
  }
};

module.exports = { sendEmail, sendSMS, sendAppNotification };

