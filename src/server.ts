import http from "http";
import app from "./app";

//Define the port
const PORT = process.env.PORT || 7777;

//Create the HTTP server using Express app
const server = http.createServer(app);

//Start  listening on the defined port
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//Handle server errors
server.on("error", (error: NodeJS.ErrnoException) => {
    console.error(`Server Error starting server: ${error.message}`);
});
