import "./server";
import connectDatabase from "./database";
import startBackgroundJobs from "./jobs";
import ImExists from '@routes/user/user.controller';

//Async Initialization function

async function init() {
    try {
        // or await Promise.all([connectDatabase(), startBackgroundJobs()]);
        console.log("Initializing services...");

        // initialize database connection
        ImExists();

        // initialize background jobs
        startBackgroundJobs();

        console.log("Services initialized");

        // Start the server
        //require("./server");
    } catch (error) {
        console.error("Error during initialization", error);
        process.exit(1);
    }
}

init();
