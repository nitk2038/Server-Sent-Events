const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { join } = require("node:path");
const PORT = 3000;

const server = createServer(app);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

app.get("/sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control',  'no-cache');
    res.write('data: Welcome to server sent events \n\n');
    
    const intervalId = setInterval(() => {
        res.write(`data: Server Time ${new Date().toLocaleString()}\n\n`);
    }, 1000)

    req.on('close', () => {
        clearInterval(intervalId);
    })
});

server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})