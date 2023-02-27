// import pin

import pino from 'pino';
const logger = pino(
    pino.destination({
        dest: './my-file', // omit for stdout
        minLength: 4096, // Buffer before writing
        sync: false // Asynchronous logging
    })
);
