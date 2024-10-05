import express, { Application } from "express";

//Initialize Express App
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
    res.json({ message: "Server up and running" });
});

export default app;
