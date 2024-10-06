import app from "./app";
import * as http from "node:http";
import {DebugLogMessage} from "@configs/logs/logMessages";
import dotenv from 'dotenv';
dotenv.config();

async function StartHTTPServer(): Promise<void> {
  const port: number = parseInt(process.env.PORT as string, 10) || 5001;
  const server: http.Server = http.createServer(app);

  return new Promise((resolve) => {
    server.listen(port, () => {
      DebugLogMessage('[SERVER]', 'routes is now enabled on port: ' + port);
      resolve();
    });
  });
}


async function init() {
  try {
    await StartHTTPServer();
  } catch (error) {
    console.error("Error during initialization", error);
    process.exit(1);
  }
}

init().catch(err => console.error(err));
