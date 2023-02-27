import crypto from 'crypto';

const GenerateOTP = () => {
    // Generate a 6-digit random number
    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    // Set the expiration time for the OTP to 5 minutes from now
    const expiresIn = 60 * 60 * 1000; //  1 Hour in milliseconds
    const expirationTime = Date.now() + expiresIn;

    // Return the OTP and expiration time
    return { OTP: OTP, expiresIn: expiresIn, expirationTime: expirationTime };
};

export default GenerateOTP;

// const express = require('express');
// const session = require('express-session');
// const app = express();

// app.use(
//     session({
//         secret: 'yoursecretkey',
//         resave: false,
//         saveUninitialized: true
//     })
// );

// app.get('/generate-otp', (req, res) => {
//     const otp = generateOTP();
//     req.session.otp = otp;
//     res.send(otp);
// });
