const app = require('./app');
const conectDatabase = require('./config/database');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handle uncaught exceptions
process.on('uncaughtException',(err)=>{ //  This uncaught exception handler should be set n top 
    console.log('ERROR : ',err.stack)
    console.log(`Shutting down due to uncaught exception`)
    process.exit(0) //exit(0) indicates that the program terminated without errors. exit(1) indicates that there were an error. You can use different values other than 1 to differentiate between different kind of errors.
})
// console.log(x)
//Setting up config file
dotenv.config({
    path: 'backend/config/config.env'
})

//Connecting to database

connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)
    server.close(()=>{  //  This function is asynchronous, the server is finally closed when all connections are ended and the server emits a 'close' event. i.e. when you call server. close() , server stops accepting new connections, but it keeps the existing connections open indefinitely.
        process.exit() //   The process. exit() method is used to end the process which is running at the same time with an exit code in NodeJS.
    })
})