import http from 'http';


const server = {};

server.httpServer = http.createServer(() => {
    console.log('skambutis i sukurta serveri');
});

server.init = () => {
    console.log('Bandau paleisti serverio procesa...');
    server.httpServer.listen(3000, () => {
        console.log('Tavo serveris sukasi ant http://localhost:3000');
    });
}

export { server }