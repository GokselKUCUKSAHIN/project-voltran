import * as express from "express";

const app = express();

app.get('/', function (req, res) {
    const ip = req.socket.remoteAddress.split(':').pop();
    console.log(ip);
});

const port = 8500;

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});