import QRCode from 'qrcode';
import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
// import qrCodeReader from 'qrcode-reader';

const GenerateQR = (Request: Request, Response: Response, next: NextFunction) => {
    const { email } = Request.query;
    QRCode.toFile(
        path.join(__dirname, 'Code', `testQr.png`),
        'Encode this text in QR code',
        {
            errorCorrectionLevel: 'H'
        },
        function (err) {
            if (err) throw err;
            console.log('QR code saved!');
        }
    );
};

export default GenerateQR;

// QRCode

// __ Read the image and create a buffer __ \\
// const buffer = fs.readFileSync('/output-file-path/file.png');

// __ Parse the image using Jimp.read() __ \\
// Jimp.read(buffer, function (err, image) {
//     if (err) {
//         console.error(err);
//     }
//     // __ Creating an instance of qrcode-reader __ \\

//     const qrCodeInstance = new qrCodeReader();

//     qrCodeInstance.callback = function (err, value) {
//         if (err) {
//             console.error(err);
//         }
//         // __ Printing the decrypted value __ \\
//         console.log(value.result);
//     };

//     // __ Decoding the QR code __ \\
//     qrCodeInstance.decode(image.bitmap);
// });
